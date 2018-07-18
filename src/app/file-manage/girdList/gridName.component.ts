import { Component } from '@angular/core';
import { ICellRendererAngularComp} from "ag-grid-angular/main";
@Component({
    selector: 'file-name',
    template: `
    <span>
    <img  [src]="'assets/images/icon/dm_cabinet.png'" alt="" />
      <a (click)="invokeParentMethod()">{{params.value}}</a> 
      
    </span>
    `  
  })
  export class GridFileNameComponent implements ICellRendererAngularComp {
    public params: any;
  
    agInit(params: any): void {
        this.params = params;
    }
  
    public invokeParentMethod() {
        this.params.context.componentParent.clickName(this.params.data)
    }
  
    refresh(): boolean {
        return false;
    }
  
  }