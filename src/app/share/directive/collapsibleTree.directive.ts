import { Directive, ElementRef, AfterViewInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
declare var d3: any;
@Directive({
    selector: '[collapsibleTree]'
})
export class CollapsibleTreeDirective implements AfterViewInit, OnChanges {
    width = 200
    height = 200
    radius = 490
    maxDepth = 0
    m = [20, 120, 20, 120]
    w = 900 - (this.m[1]) - (this.m[3])
    h = 500 - (this.m[0]) - (this.m[2])
    i = 0
    size = 1                    //初始化svg放大倍数
    root = undefined            //设置根节点为全局变量
    tree = undefined
    newWidth = undefined
    zoom = undefined
    vis = undefined
    nodeWidth = 120             //每个容器节点的宽度,高度
    nodeHeight = 75
    horizontalSeparationBetweenNodes = 60   //节点之间间隔的宽度,高度
    verticalSeparationBetweenNodes = 128
    @Input() nodes: any;
    @Input() editAble: boolean;
    @Output() updateName: EventEmitter<any> = new EventEmitter();
    @Output() addBlock: EventEmitter<any> = new EventEmitter();
    @Output() addNode: EventEmitter<any> = new EventEmitter();
    @Output() nodeDelete: EventEmitter<any> = new EventEmitter();
    @Output() addFile: EventEmitter<any> = new EventEmitter();
    @Output() editFile: EventEmitter<any> = new EventEmitter();
    @Output() addCustomData: EventEmitter<any> = new EventEmitter();

    constructor(private el: ElementRef) {
        this.initView()
    }

    ngAfterViewInit() {

    }
    initView() {
        this.tree = d3.layout.tree().nodeSize([this.nodeWidth + this.horizontalSeparationBetweenNodes, this.nodeHeight + this.verticalSeparationBetweenNodes])
            .size([this.w, this.h])                    //初始化树节点
        this.newWidth = null             //设置变量,保存每次结构变化后的图片宽度
        this.zoom = d3.behavior.zoom()
            .scaleExtent([0.1, 2])
        this.vis = d3.select(this.el.nativeElement).append('svg:svg').attr('id', 'mySvg')
            .attr('height', this.h + this.m[0] + this.m[2]).append('svg:g').attr('id', 'mySvgg')
            .call(this.zoom).on('dblclick.zoom', null)
            .attr('transform', 'translate(' + 100 + ',' + this.m[0] + ')')
    }
    clickContainer(d) {
        var deleteContainer, editContainer, toolContainer, _self;
        this.clearSelected();
        _self = document.querySelector('#' + 'container' + d.code);
        _self.querySelector('rect').style.strokeWidth = '7px';
        this.vis.selectAll('g.node').sort(function (a, b) {
            if (a.code !== d.code) {
                return -1;
            } else {
                return 1;
            }
        });
        toolContainer = d3.select(_self).append('svg:g').attr('class', 'nodeTool');
        setTimeout((function () {
            return toolContainer.attr('class', 'nodeTool-animate nodeTool');
        }))
        editContainer = d3.select(_self).append('svg:g').attr('class', 'editTool');
        deleteContainer = d3.select(_self).append('svg:g').attr('class', 'deleteTool');
        if (this.editAble) {
            this.checkisNodeChild(toolContainer, d, d.parent);
            this.append_addDeleteButton(deleteContainer, d);
            this.append_addFileButton(editContainer, d);
            this.append_addBlockButton(toolContainer, d);
            this.append_editNodeName(editContainer, d);
        }
        this.append_editFileButton(editContainer, d);
        this.append_editCustomButton(editContainer, d);
    };
    update(source) {
        let diagonal = d3.svg.diagonal().projection((d) => {            
            return [d.x + 20, d.y]
        })
        var levelWidth = [1]
        var childCount = (level, n) => {
            if (n.children && n.children.length > 0) {
                if (levelWidth.length <= level + 1) {
                    levelWidth.push(0)
                }
                levelWidth[level + 1] += n.children.length;
                n.children.forEach(d => childCount(level + 1, d))
                return
            }
        }
        childCount(0, this.root);
        let newWidth = d3.max(levelWidth) * 280 + 100
        this.tree = this.tree.size([newWidth, this.h])
        this.el.nativeElement.querySelector('#mySvg').setAttribute('width', (newWidth + 400) * this.size)
        let duration = d3.event && d3.event.altKey ? 5000 : 500
        let nodes = this.tree.nodes(this.root).reverse()
        nodes.forEach(d => {
            if (d.depth > this.maxDepth) {
                this.maxDepth = d.depth
                this.el.nativeElement.querySelector('#mySvg').setAttribute('height', (200 + (this.maxDepth + 1) * 200) * this.size)
            }
            d.y = d.depth * 190 + 20
            return
        });
        let node = this.vis.selectAll('g.node').data(nodes, (d) =>
            d.code || (d.code = ++this.i)
        )
        let nodeEnter = node.enter().append('svg:g').attr('id', function (d) {
            return 'container' + d.code;
        }).attr('class', 'node').attr('transform', 'translate(' + source.x0 + ',' + source.y0 + ')').on('click', (d)=> {
            return this.clickContainer(d)
        });
        nodeEnter.append('svg:rect').attr('width', 140).attr('height', 47).attr('rx', 23).attr('x', - 50).attr('y', -15).attr('class', function (d) {
            return d['type'];
        });
        nodeEnter.append('svg:text').attr('x', function (d) {
            if (!d['-name']) {
                return;
            }
            if (d['-name'].length > 8) {
                d['-name'] = d['-name'].substring(0, 8) + '...';
            }
            return '1em';
        }).attr('dy', '1em').attr('id', function (d) {
            return 'text' + d.code;
        }).attr('text-anchor', 'middle').text(function (d) {
            if (!d['-name']) {
                return;
            }
            if (d['-name'].length > 8) {
                return d['-name'].substring(0, 8) + '...';
            } else {
                return d['-name'];
            }
        }).style('fill', 'white').style('font-size', '13px').style('fill-opacity', 1e-6);
        let nodeUpdate = node.transition().duration(duration).attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });
        nodeUpdate.select('rect').attr('width', 140).attr('height', 47).attr('rx', 23).attr('x', - 50).attr('y', -15);
        nodeUpdate.select('text').style('fill-opacity', 1);
        let nodeExit = node.exit().transition().duration(duration).attr('transform', 'translate(' + source.x + ',' + source.y + ')').remove();
        nodeExit.select('rect').attr('r', 1e-6);
        nodeExit.select('text').style('fill-opacity', 1e-6);
        let link = this.vis.selectAll('path.link').data(this.tree.links(nodes), function (d) {
            return d.target.code;
        });
        link.enter().insert('svg:path', 'g').attr('class', 'link').attr('d',  (d) => {
            var o;
            o = {
                x: source.x0,
                y: source.y0
            };            
            return diagonal({
                source: o,
                target: o
            });
        }).transition().duration(duration).attr('d', diagonal);
        link.transition().duration(duration).attr('d', diagonal);
        link.exit().transition().duration(duration).attr('d', (d) => {
            var o;
            o = {
                x: source.x,
                y: source.y
            };
            
            return diagonal({
                source: o,
                target: o
            });
        }).remove();
        nodes.forEach(function (d) {
            d.x0 = d.x;
            return d.y0 = d.y;
        });
        return;
    }
    
    clearSelected = function () {
        var i, rects, rows, _len;
        rects = this.el.nativeElement.querySelectorAll('rect');
        for (i = 0, _len = rects.length; i < _len; i++) {
            rows = rects[i];
            rows.style.strokeWidth = '0px';
        }
        if (this.el.nativeElement.querySelector('.nodeTool') || document.querySelector('.editTool') || document.querySelector('.deleteTool')) {
            this.el.nativeElement.querySelector('.nodeTool').remove();
            this.el.nativeElement.querySelector('.editTool').remove();
            this.el.nativeElement.querySelector('.deleteTool').remove();
        }
    };
    append_editNodeName = function (editContainer, info) {
        var self;
        self = Object.assign({}, info);
        if (info.type == 'record') {
            return
        }
        editContainer.append('svg:text').attr('x', 98).attr('y', -4).text('\uf044').attr("font-family", "FontAwesome").attr('class', 'icon-size').on('click', function (d) {
            setTimeout(() => {
                if (info.type !== 'record' && this.editAble) {
                    this.updateName.emit(self);
                }
            });
        });
        editContainer.append('svg:text').attr('x', 120).attr('y', -6).attr('text-anchor', 'start').attr('class', 'cursor-pointer').text('修改名称').on('click', function (d) {
            setTimeout(() => {
                if (info.type !== 'record' && this.editAble) {
                    this.updateName.emit(self);
                }
            });
        });

    };
    append_addBlockButton = function (toolContainer, d) {
        toolContainer.append('svg:rect').attr('width', 140).attr('height', 47).attr('rx', 23).attr('x', - 50).attr('y', 38).attr('class', 'new-rect').on('click',  (d) =>{
            this.addBlock.emit(d);
            window.event.stopPropagation();
        });
        toolContainer.append('svg:text').attr('x', -10).attr('y', 66).attr('class', 'icon-size').text((d)=> {
            return '\uf067';
        }).attr("font-family", "FontAwesome").style('fill', 'white').on('click', (d)=> {
            this.addBlock.emit(d);
            window.event.stopPropagation();
        });
        toolContainer.append('svg:text').attr('x', 10).attr('y', 65).attr('text-anchor', 'start').attr('class', 'cursor-pointer').style('fill', 'white').text('数据块').on('click', (d) =>{
            this.addBlock.emit(d);
            window.event.stopPropagation();
        });
    };
    append_addNodeButton = function (toolContainer, d) {
        if (d.type !== 'node') {
            toolContainer.append('svg:rect').attr('width', 140).attr('height', 47).attr('rx', 23).attr('x', - 50).attr('y', 88).attr('class', function (d) {
                return 'node'
            }).on('click', (d) => {
                this.addNode.emit(d);
                return window.event.stopPropagation();
            });

            toolContainer.append('svg:text').attr('x', -10).attr('y', 116).attr('class', 'icon-size').text(function (d) {
                return '\uf067';
            }).attr("font-family", "FontAwesome").style('fill', 'white').on('click',(d) => {
                this.addNode.emit(d);
                window.event.stopPropagation();
            });
            return toolContainer.append('svg:text').attr('x', 10).attr('y', 115).attr('text-anchor', 'start').attr('class', 'cursor-pointer').style('fill', 'white').text('活动节点').on('click', (d) => {
                this.addNode.emit(d);
                window.event.stopPropagation();
            });
        }
    };
    append_addDeleteButton = function (deleteContainer, d) {
        if (d.type !== 'record') {
            return deleteContainer.append('svg:text').attr('x', -75).attr('y', 13).text('\uf1f8').attr("font-family", "FontAwesome").attr('class', 'icon-size').style('fill', 'DE6262').on('click', (d) => {
                this.nodeDelete.emit(d);
                return window.event.stopPropagation();
            });
        }
    };
    append_addFileButton = function (editContainer, d) {
        editContainer.append('svg:text').attr('x', 98).attr('y', 31).text('\uf055').attr("font-family", "FontAwesome").attr('class', 'icon-size').on('click', (d)=> {
            this.addFile.emit(d);
            window.event.stopPropagation();
        });
        return editContainer.append('svg:text').attr('x', 120).attr('y', 30).attr('text-anchor', 'start').attr('class', 'cursor-pointer').text('添加文件').on('click', (d) => {
            this.addFile.emit(d);
            window.event.stopPropagation();
        });
    };
    append_editFileButton = function (editContainer, d) {
        if (d.file && d.file.length > 0) {
            editContainer.append('svg:text').attr('x', 99).attr('y', 49).text('\uf0f6').attr("font-family", "FontAwesome").attr('class', 'icon-size').on('click', (d) =>{
                this.editFile.emit(d);
                window.event.stopPropagation();
            });
            editContainer.append('svg:text').attr('x', 120).attr('y', 48).attr('id', 'fileNum' + d.code).attr('text-anchor', 'start').attr('class', 'cursor-pointer').text('文件列表' + '(' + d.file.length + ')').on('click', (d) => {
                this.editFile.emit(d);
                window.event.stopPropagation();
            });
        }
    };
    append_editCustomButton = function (editContainer, d) {
        editContainer.append('svg:text').attr('x', 97).attr('y', 13).text('\uf121').attr("font-family", "FontAwesome").attr('class', 'icon-size').on('click', (d) => {
            this.addCustomData.emit(d);
            window.event.stopPropagation();
        });
        return editContainer.append('svg:text').attr('x', 120).attr('y', 12).attr('text-anchor', 'start').attr('class', 'cursor-pointer').text('自定义元数据').on('click', (d) =>{
            this.addCustomData.emit(d);
            window.event.stopPropagation();
        });
    };
    checkisNodeChild = function (toolContainer, d, parent) {
        if (parent) {
            if (parent.type === 'node') { } else if (this.hasNode === true && !d.hasNode) { } else {
                return this.checkisNodeChild(toolContainer, d, parent.parent);
            }
        } else if (this.hasNode === true && !d.hasNode) { } else {
            return this.append_addNodeButton(toolContainer, d);
        }
    };

    ngOnChanges() {
        if (this.nodes) {
            this.root = Object.assign({}, this.nodes)
            this.root.x0 = this.w / 2 + 60
            this.root.y0 = 50
            this.update(this.root)
        }
    }
}