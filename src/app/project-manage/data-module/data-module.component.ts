import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { UUID } from 'angular2-uuid';
import Swal from 'sweetalert2'
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
  constructor() { }

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
         let deleteNodes = _.remove(node.children,(c)=>{
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
}
