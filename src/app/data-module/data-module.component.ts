import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-data-module',
  templateUrl: './data-module.component.html',
  styleUrls: ['./data-module.component.css']
})
export class DataModuleComponent implements OnInit {
  nodes =  {
    "-name": '12',
    "code" : '231232',
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
  constructor() { }

  ngOnInit() {
  }

  addBlock(d){
    let nameList = []
    this.searchParent(this.nodes,d.code)
    this.addContainer(this.nodes,d.code,this.TYPE_BLOCK,nameList.length)
  }
  
          
  searchParent(node, parentCode){
    var i, nameList, rows, _len, _ref, _results;
    if (node.code === parentCode) {
      return nameList = Object.assign([],node.children);
    } else if (node.children) {
      _ref = node.children;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        rows = _ref[i];
        _results.push(rows.code === parentCode ? nameList = Object.assign([],rows.children) : this.searchParent(rows, parentCode));
      }
      return _results;
    }
  };

  addContainer (node, id, type, name) {
    var i, newContainer, rows, _len, _ref, _results;
    if (node.code === id) {
      newContainer = {
        "-name": this.TYPE_BLOCK + name,
        "code": Math.floor(Math.random() * (1000 - 0+1)) + 0,
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
          return;
        }
        node.children.splice(i + 1, 0, newContainer);
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
