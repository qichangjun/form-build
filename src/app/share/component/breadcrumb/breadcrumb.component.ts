import { Component,OnInit,Input,OnChanges,SimpleChange,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'bread-crumb',
  templateUrl: './breadCrumb.component.html',
  styleUrls: ['./breadCrumb.component.scss'],
})
export class BreadCrumbComponent implements OnInit,OnChanges{
  @Input() breadCrumbLists : any;
  @Input() idLists : any;
  @Input() rootName : string;

  @Output() clickBreadCrumb : EventEmitter<any> = new EventEmitter();
  constructor() {}
  gotoRoot(rootName){
    this.clickBreadCrumb.emit({ids:[this.idLists.split('.')[0]],node:{object_name:rootName}});
  }
  onSelect(breadNode){
    for (let i = 0 ; i < this.breadCrumbLists.length;i++) {
      if (this.breadCrumbLists[i].id == breadNode.id) {
        this.breadCrumbLists.splice(i+1,this.breadCrumbLists.length - i);
        break;
      }
    }
    let treeNodeIds = [];
    for (let i = 0 ; i < this.breadCrumbLists.length;i++) {
      treeNodeIds.push(this.breadCrumbLists[i].id)
    }
    let ids = []
    ids = ids.concat(treeNodeIds)
    this.clickBreadCrumb.emit({ids:ids,node:breadNode});
  }
  ngOnInit(){}
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = chng.currentValue;
    }
  }
}
