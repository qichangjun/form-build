import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemManageComponent } from './system-manage.component';
import { ShareModule } from '../share/share.module';
import { SystemManageRoutingModule } from './system-manage-routing.module';

import { AgGridModule } from "ag-grid-angular/main";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridNameComponent } from './gridList/gridName.component';
/**
 * 用户
 */
import { editUserDialog } from './userManage/dialog/editUser/editUser.dialog';
import { frozenUserDialog } from './userManage/dialog/frozenUser/frozenUser.dialog';
import { addUserDialog } from './userManage/dialog/addUser/addUser.dialog';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { OpeartionUserComponent } from './gridList/operationUser.component';
import { UserManageComponent } from './userManage/userManage.component';
//单位
import { UnitManageComponent } from './unitManage/unit-manage.component';
import { OpeartionUnitComponent } from './gridList/operationUnit.component';
import { removeUnitDialog } from './unitManage/dialog/removeUnit/removeUnit.dialog';
import { editUnitDialog } from './unitManage/dialog/editUnit/editUnit.dialog';
import { addUnitDialog } from './unitManage/dialog/addUnit/addUnit.dialog';
import { UnitBaseInfoComponent } from './unit-base-info/unit-base-info.component';
import { editUnitBaseInfoDialog } from './unit-base-info/dialog/editUnitBase.dialog';
//部门
import { DepartManageComponent } from './depart-manage/depart-manage.component';
import { OpeartionDepartComponent } from './gridList/operationDepart.component';
import { DepartManageService } from './depart-manage/depart-manage.service';
import { editDepartDialog } from './depart-manage/dialog/editDepart/editDepart.dialog';
import { addDepartDialog } from './depart-manage/dialog/addDepart/addDepart.dialog';
@NgModule({
  imports: [
    CommonModule,
    SystemManageRoutingModule,
    AgGridModule,
    ShareModule,
    NgbModule.forRoot(),
    FileUploadModule,
    AgGridModule.withComponents([GridNameComponent,OpeartionUserComponent,OpeartionUnitComponent,OpeartionDepartComponent])
  ],
  declarations: [SystemManageComponent,UserManageComponent,
    GridNameComponent,OpeartionUserComponent,
    editUserDialog,frozenUserDialog,addUserDialog, 
    UnitManageComponent,OpeartionUnitComponent,removeUnitDialog,editUnitDialog,addUnitDialog, 
    UnitBaseInfoComponent,editUnitBaseInfoDialog, 
    DepartManageComponent,OpeartionDepartComponent,editDepartDialog,addDepartDialog],
  entryComponents:[editUserDialog,frozenUserDialog,addUserDialog,removeUnitDialog,editUnitDialog,addUnitDialog,editUnitBaseInfoDialog,editDepartDialog,addDepartDialog]
})
export class SystemManageModule { }
