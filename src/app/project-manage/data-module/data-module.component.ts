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

declare var XML: any;
@Component({
  selector: 'app-data-module',
  templateUrl: './data-module.component.html',
  styleUrls: ['./data-module.component.css']
})
export class DataModuleComponent implements OnInit {
  nodes =  {
    "-name": '12',
    "code" : UUID.UUID(),
    "type" : "record",
    "children": [],
    "property": [],
    "file":[],
    "changeType":1
  }
  fileSysAttrLists = []
  nodeSysAttrLists = []
  TYPE_BLOCK = 'block'
  TYPE_FILE = 'file'
  TYPE_NODE = 'node'
  hasNode : boolean = false;
  nameList = []
  keepContainer = undefined
  editAble = true
  slidSize = 10;
  constructor(
    public dialog: MatDialog,
    private _eventService : EventService
  ) { }

  ngOnInit() {
  }

  async getSysAttr(){
    
  }

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
        alert('名称不能为空')
        return
      }
      d['-can_repeat'] = res.canRepeat
      d['-required'] = res.required
      let updateNameFn = (node,id,canRepeat,name,required)=>{
        if (node.code == id){
          node['-name'] = name
          node['-can_repeat'] = canRepeat
          node['-required'] = required
          this._eventService.toggleEvent({ type: 'updateName', value: {id,name}})
          return 
        }else if (node.children){
          node.children.forEach(c=>{
            updateNameFn(c,id,canRepeat,name,required)
          })
        }
      }
      updateNameFn(this.nodes,d.code,res.canRepeat,res.name,res.required)      
    });
  }
}
