import { Component } from '@angular/core';
import { ICellRendererAngularComp} from "ag-grid-angular/main";
@Component({
    selector: 'operation-user',
    template: `
    <span>
      <a (click)="editUser()">编辑</a> 
      <a (click)="frozenUser()">冻结用户</a> 
      
    </span>
    `  
  })
  export class OpeartionUserComponent implements ICellRendererAngularComp {
    public params: any;
  
    agInit(params: any): void {
        this.params = params;
    }
  
    public editUser() {
        this.params.context.componentParent.edit(this.params.data)
    }

    public frozenUser(){
        this.params.context.componentParent.frozenUser(this.params.data)
    }
  
    refresh(): boolean {
        return false;
    }
  
  }