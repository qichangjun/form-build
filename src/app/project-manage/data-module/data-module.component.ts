import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { addFileNameDialog } from './dialog/addFileName/addFileName.dialog';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
import Swal from 'sweetalert2'
import { EventService } from '../../core/services/event.service';
import { editFileDialog } from './dialog/editFile/editFile.dialog';
import { editCustomDataDialog } from './dialog/editCustomData/editCustomData.dialog';
import { updateNameDialog } from './dialog/updateName/updateName.dialog';
import { DataModuleService } from './data-module.service';
import { ProjectEditService } from '../project-edit/project-edit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../../core/services/util.service';
declare var XML: any;
@Component({
  selector: 'app-data-module',
  templateUrl: './data-module.component.html',
  styleUrls: ['./data-module.component.css'],
  providers:[DataModuleService]
})
export class DataModuleComponent implements OnInit {
  nodes = undefined
  fileSysAttrLists = []
  recordSysAttrLists = []
  nodeSysAttrLists = []
  TYPE_BLOCK = 'block'
  TYPE_FILE = 'file'
  TYPE_NODE = 'node'
  TYPE_RECORD = 'record'
  hasNode : boolean = false;
  nameList = []
  keepContainer = undefined
  editAble = true
  slidSize = 10;
  xotree = new XML.ObjTree();

  module : any = undefined;
  projectInfo : any = {};
  versionList : Array<any>=[];
  currentVesion = undefined;
  routerSubscription : any;
  updateAble : boolean = false;
  moduleEditAble : boolean = true;
  parameter = {
    objectId : undefined,
    create : undefined
  }
  loading : boolean = false;
  constructor(
    public dialog: MatDialog,
    private _eventService : EventService,
    private _dataModuleService : DataModuleService,
    private _projectEditService : ProjectEditService,
    private route: ActivatedRoute,
    private router: Router,
    private _utilService : UtilService
  ) { 
    this.routerSubscription = this.route.queryParams.subscribe((data: any) => {
      this.parameter = Object.assign(this.parameter, data)
      this.getSysAttr()
    })
  }

  ngOnInit() {
  }

  async getSysAttr(){
    this.loading = true
    let nodeAttr = await this._dataModuleService.getSysAttr(this.TYPE_NODE)
    this.nodeSysAttrLists = []
    nodeAttr.forEach((c)=>{
      this.nodeSysAttrLists.push({
        '-sys' : 'true',
        '-title' : c.title,
        '-type' : c.attrType,
        '-name' : c.attrName,
        '-maxLength' : c.attrLength,
        '-nullAble' : c.nullAble
      })
    })
    let recordAttr = await this._dataModuleService.getSysAttr(this.TYPE_RECORD)
    this.recordSysAttrLists = []
    recordAttr.forEach((c)=>{
      this.nodeSysAttrLists.push({
        '-sys' : 'true',
        '-title' : c.title,
        '-type' : c.attrType,
        '-name' : c.attrName,
        '-maxLength' : c.attrLength,
        '-nullAble' : c.nullAble
      })
    })
    this.getProjectInfo()
    let fileAttr = await this._dataModuleService.getSysAttr(this.TYPE_FILE)
    this.fileSysAttrLists = []
    fileAttr.forEach(c => {
      this.fileSysAttrLists.push({
        '-sys' : 'true',
        '-title' : c.title,
        '-type' : c.attrType,
        '-name' : c.attrName,
        '-maxLength' : c.attrLength,
        '-nullAble' : c.nullAble
      })
    });
    this.getVersionList()
  }

  async getProjectInfo(){    
    this.projectInfo = await this._projectEditService.getProjectInfo(this.parameter.objectId)
  }

  async getVersionList(){
    let res = await this._dataModuleService.getModuleVersionList(this.parameter.objectId)
    this.versionList = res 
    if(this.versionList.length == 0){
      this.updateAble = false
      this.nodes = {
        "-name": this.projectInfo.projectName,
        "code" : UUID.UUID(),
        "type" : "record",
        "children": [],
        "property":_.cloneDeep(this.recordSysAttrLists),
        "file":[]
      }
      this.module = {
        businessCode :  this.projectInfo.businessCode,
        creator : this.projectInfo.creator,
        projectId : this.projectInfo.id,
        versionNo : 1
      }
      if (this.parameter.create){
        this.versionList.push({versionNo:1.0})
        this.currentVesion = 1.0
      }
      this.loading = false 
      return 
    }
    this.updateAble = true 
    this.currentVesion = this.versionList[this.versionList.length - 1].id
    this.getModuleInfo()
  }

  async getModuleInfo(){
    if (!this.currentVesion){
      return 
    }
    this.loading = true
    let res = await this._dataModuleService.getModuleInfo(this.currentVesion)
    if(this.currentVesion != this.versionList[this.versionList.length - 1].id){
      this.moduleEditAble = false
    }else{
      this.moduleEditAble = true 
    }
    this.module = res.template 
    this.nodes = _.cloneDeep(this.xotree.parseXML(this.module.templateXml).record)
    this.nodes['type'] = 'record'  
    this.formatJson(this.nodes)
    this.loading = false 
  }

  formatJson = (container)=>{
    container['code'] = UUID.UUID(),  
    container['file'] = this._utilService.formatModuleArray(container['file'])
    container['property'] = this._utilService.formatModuleArray(container['property'])
    let type = [this.TYPE_BLOCK,this.TYPE_NODE]
    type.forEach((containerType)=>{
      container[containerType] = this._utilService.formatModuleArray(container[containerType])
      container[containerType] = container[containerType] || []
      if (containerType == this.TYPE_NODE && container[containerType].length > 0){
        container.hasNode = true
        this.hasNode = true 
      }
      container[containerType].forEach((c)=>{
        c['type'] = containerType
      })
    })      
    container.children = _.concat(container.block,container.node)
    container.children.forEach((c)=>{
      this.formatJson(c)
    })
    type.forEach((containerType)=>{
      delete(container[containerType])
    })      
  }

  createModule(){
    this.versionList.push({versionNo:1.0});
    this.currentVesion='1.0'
  }

  async editProject(){
    let saveMode = _.cloneDeep(this.nodes)
    let formatServiceData = (container)=>{
      container.block = []
      container.node = []
      if (container.type == 'block'){
        container['-can_repeat'] = container['-can_repeat'] || false
        container['-required'] = container['-required'] || false       
      }else if (container.type == 'node'){
        container['-required'] = container['-required'] || false       
      }
      container.file.forEach((c)=>{
        c['-required'] = c['-required'] || false
      })
      container.children.forEach(c=>{
        formatServiceData(c)
        if(c.type == 'block') container.block.push(c)
        if(c.type == 'node') container.node.push(c)
        delete(c.children)
        delete(c.type)
        delete(c.code)
        delete(c.hasNode)
      })
    }
    formatServiceData(saveMode)
   
    delete(saveMode.children)
    delete(saveMode.type)
    delete(saveMode.code)
    delete(saveMode.hasNode)
    let xmlData = this.xotree.writeXML({record:saveMode})
    this.module.templateXml = xmlData
    if (!this.updateAble){
      await this._dataModuleService.createModule(this.module)
      this.unupdateAbleAlert()
    }else{
      this.unupdateAbleAlert()
    }
  }

  async unupdateAbleAlert(){
    let res = await Swal({
      title:'确定升级吗?',
      text:"数据模板修改之后需要升级",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#40B98E",
      confirmButtonText: '升级',
      cancelButtonText: '不升级'
    })
    if (res){
      await this._dataModuleService.updateVersion(this.module)
      this.getVersionList()
    }else{
      await this._dataModuleService.editModule(this.module)
      this.getVersionList()
    }
  }

  async exportSample(){
    this.loading = true
    let res = await this._dataModuleService.exportSample(this.currentVesion)
    this.loading = false 
    window.location.href = res.downloadUrl;
  }

  async exportModule(){
    this.loading = true
    let res = await this._dataModuleService.exportModule(this.currentVesion)
    this.loading = false 
    window.location.href = res.downloadUrl;
  }
  //---------------------------------------------------------------------- 模版方法 ------------------------------------------------------------------------------------

  addBlock(d){
    this.nameList = []
    this.searchParent(this.nodes,d.code)    
    this.addContainer(this.nodes,d.code,this.TYPE_BLOCK,this.nameList.length)
  }

  addNode(d){
    this.nameList = []
    this.searchParent(this.nodes,d.code)    
    this.addContainer(this.nodes,d.code,this.TYPE_NODE,this.nameList.length)
  }

  addFile(d){
    const dialogRef = this.dialog.open(addFileNameDialog);
    dialogRef.afterClosed().subscribe(res => {
      if(!res){
        return
      }
      this.searchContainer(this.nodes,d.code)
      this.keepContainer.file.push({
        '-type' : res,
        'property' : _.cloneDeep(this.fileSysAttrLists)
      })
      d.file.push({
        '-type' : res,
        'property' : _.cloneDeep(this.fileSysAttrLists)
      })
      this._eventService.toggleEvent({ type: 'updateNodes', value: d })
      this.editFile(d)
    });
  }
  
  editFile(d){
    const dialogRef = this.dialog.open(editFileDialog,{
      data:{fileLists:d.file}
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        d.file = res 
        this.searchContainer(this.nodes,d.code)
        this.keepContainer.file = res 
        this._eventService.toggleEvent({ type: 'updateNodes', value: d })
      }      
    })    
  }

  async nodeDelete(d){
    let res = await Swal({
      title: '删除节点',
      text: '确定要删除该节点吗',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '是的, 删除!',
      cancelButtonText: '不，保留'
    })
    if (res.value == true){
      let deleteNode=(node,id)=>{
        if (node.children){
          _.remove(node.children,(c)=>{
            if(c['code'] != id){
              deleteNode(c,id)
            }
            return c['code'] == id
          })                   
        }
      }
      deleteNode(this.nodes,d.code)
      this.hasNode = false
      this.nodes = _.cloneDeep(this.nodes)   
      let checkHasNode=(node)=>{
        if (node['type'] == 'node'){
          this.hasNode = true;
          return 
        }
        if (node.children){
          node.children.map((c)=>{
            if(c['type'] == 'node'){
              this.hasNode = true;
              return 
            }else{
              checkHasNode(c)
            }
          })
        }
      }
      checkHasNode(this.nodes)
      if(!this.hasNode){
        let updateParentNode=(node,code)=>{
          if (node.code == code){
            node.hasNode = false;
            return
          }
          if (node.children){
            node.children.map((c)=>{
              if(c['code'] == code){
                c['hasNode'] = false
              }else{
                updateParentNode(c,code)
              }
            })
          }
        }
        updateParentNode(this.nodes,d.parent.code)
      }
    }
  }

  searchParent(node, parentCode){
    var i, rows, _len, _ref, _results;
    if (node.code === parentCode) {
      return this.nameList = Object.assign([],node.children);
    } else if (node.children) {
      _ref = node.children;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        rows = _ref[i];
        _results.push(rows.code === parentCode ? this.nameList = Object.assign([],rows.children) : this.searchParent(rows, parentCode));
      }
      return _results;
    }
  };

  searchContainer(container,code){
    if (container.code == code){
      this.keepContainer = container
    }
    container.children.forEach(c => {
      this.searchContainer(c,code)
    });
  }

  addContainer (node, id, type, name) {
    var i, newContainer, rows, _len, _ref, _results;
    if (node.code === id) {
      newContainer = {
        "-name": '节点' + name,
        "code": UUID.UUID(),
        "type": type,
        "children": [],
        "property": [],
        "file": []
      };
      if (type === this.TYPE_BLOCK) {  
        i = _.findLastIndex(node.children, (c) => {
          return c['type'] === this.TYPE_BLOCK;
        });     
        node.children.splice(i + 1, 0, newContainer);         
        this.nodes = _.cloneDeep(this.nodes)    
        return;
      } else if (type === this.TYPE_FILE) {
        newContainer.property = _.cloneDeep(this.fileSysAttrLists);
        node.children.push(newContainer);
        return;
      } else if (type === this.TYPE_NODE) {
        newContainer.property = _.cloneDeep(this.nodeSysAttrLists);
        node.hasNode = true;
        this.hasNode = true;
        i = _.findLastIndex(node.children, (c) =>{
          return c['type'] === this.TYPE_NODE;
        });
        if (i === -1) {
          node.children.push(newContainer);
          this.nodes = _.cloneDeep(this.nodes)        
          return;
        }
        node.children.splice(i + 1, 0, newContainer);
        this.nodes = _.cloneDeep(this.nodes)        
        return;
      }
    }
    if (node.children) {
      _ref = node.children;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        rows = _ref[i];
        _results.push(this.addContainer(rows, id, type, name));
      }
      return _results;
    }
  };

  addCustomData(d){
    let noSysattrRules = d.property.filter((c)=>c['-sys'] == 'false')
    let sysattrRules = d.property.filter((c)=>c['-sys'] == 'true')
    const dialogRef = this.dialog.open(editCustomDataDialog,{
      data:{
        noSysattrRules : noSysattrRules,
        sysattrRules : sysattrRules,    
        containerId : d.code,         
        containerType : d['type']
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if(!res){
        d.property = _.concat(noSysattrRules,sysattrRules)
        return 
      }
      this.searchContainer(this.nodes,d.code)
      d.property = _.concat(res.sysattrRules,res.noSysattrRules)
      this.keepContainer.property = _.concat(res.sysattrRules,res.noSysattrRules)
      return 
    });
    
  }

  updateName(d){
    this.nameList = []
    this.searchParent(this.nodes,d.parent.code)
    let brothersName = _.map(this.nameList,'-name')
    const dialogRef = this.dialog.open(updateNameDialog,{
      data:{
        name : d['-name'],
        brothersName : brothersName,
        canRepeat : d['-can_repeat'],
        type : d.type,
        required : d['-required']
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if(!res){
        return
      }
      d['-can_repeat'] = res.canRepeat
      d['-required'] = res.required
      let updateNameFn = (node,id,canRepeat,name,required)=>{
        if (node.code == id){
          node['-name'] = name          
          node['-can_repeat'] = canRepeat
          node['-required'] = required
          this._eventService.toggleEvent({ type: 'updateName', value: {id,name,d}})
          return 
        }else if (node.children){
          node.children.forEach(c=>{
            updateNameFn(c,id,canRepeat,name,required)
          })
        }
      }
      updateNameFn(this.nodes,d.code,res.canRepeat,res.name,res.required)      
      this.nodes = _.cloneDeep(this.nodes)
    });
  }
}
