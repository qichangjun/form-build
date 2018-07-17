import { Component } from '@angular/core';
import { ICellRendererAngularComp} from "ag-grid-angular/main";
@Component({
    selector: 'app-grid-name',
    template: `
    <span>
      <a (click)="invokeParentMethod()">{{params.value}}</a> 
      
    </span>
    `  
  })
  export class GridNameComponent implements ICellRendererAngularComp {
    public params: any;
  
    agInit(params: any): void {
        this.params = params;
    }
  
    public invokeParentMethod() {
        this.params.context.componentParent.clickName(this.params)
    }
  
    refresh(): boolean {
        return false;
    }
  
  }