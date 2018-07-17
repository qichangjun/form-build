import { Component } from '@angular/core';
import { ICellRendererAngularComp} from "ag-grid-angular/main";
@Component({
    selector: 'operation-unit',
    template: `
    <span>
      <a (click)="editUnit()">编辑</a> 
      <a (click)="deleteUnit()">删除</a> 
      
    </span>
    `  
  })
  export class OpeartionUnitComponent implements ICellRendererAngularComp {
    public params: any;
  
    agInit(params: any): void {
        this.params = params;
    }
  
    public editUnit() {
        this.params.context.componentParent.editUnit(this.params.data)
    }

    public deleteUnit(){
        this.params.context.componentParent.deleteUnit(this.params.data)
    }
  
    refresh(): boolean {
        return false;
    }
  
  }