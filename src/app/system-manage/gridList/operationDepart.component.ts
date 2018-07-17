import { Component } from '@angular/core';
import { ICellRendererAngularComp} from "ag-grid-angular/main";
@Component({
    selector: 'operation-depart',
    template: `
    <span>
      <a (click)="editDepart()">编辑</a> 
      <a (click)="removeDepart()">删除</a> 
      
    </span>
    `  
  })
  export class OpeartionDepartComponent implements ICellRendererAngularComp {
    public params: any;
  
    agInit(params: any): void {
        this.params = params;
    }
  
    public editDepart() {
        this.params.context.componentParent.editDepart(this.params.data)
    }

    public removeDepart(){
        this.params.context.componentParent.removeDepart(this.params.data)
    }
  
    refresh(): boolean {
        return false;
    }
  
  }