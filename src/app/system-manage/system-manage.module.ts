import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemManageComponent } from './system-manage.component';
import { ShareModule } from '../share/share.module';
import { SystemManageRoutingModule } from './system-manage-routing.module';
import { UserManageComponent } from './userManage/userManage.component';
import { AgGridModule } from "ag-grid-angular/main";
import { GridNameComponent } from './gridList/gridName.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    SystemManageRoutingModule,
    AgGridModule,
    ShareModule,
    NgbModule.forRoot(),
    AgGridModule.withComponents([GridNameComponent])
  ],
  declarations: [SystemManageComponent,UserManageComponent,GridNameComponent]
})
export class SystemManageModule { }
