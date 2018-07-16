import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemManageComponent } from './system-manage.component';
import { ShareModule } from '../share/share.module';
import { SystemManageRoutingModule } from './system-manage-routing.module';
import { UserManageComponent } from './userManage/userManage.component';
import { AgGridModule } from "ag-grid-angular/main";
import { GridNameComponent } from './gridList/gridName.component';
import { OpeartionUserComponent } from './gridList/operationUser.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { editUserDialog } from './userManage/dialog/editUser/editUser.dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { frozenUserDialog } from './userManage/dialog/frozenUser/frozenUser.dialog';
import { addUserDialog } from './userManage/dialog/addUser/addUser.dialog';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
@NgModule({
  imports: [
    CommonModule,
    SystemManageRoutingModule,
    AgGridModule,
    ShareModule,
    NgbModule.forRoot(),
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FileUploadModule,
    AgGridModule.withComponents([GridNameComponent,OpeartionUserComponent])
  ],
  declarations: [SystemManageComponent,UserManageComponent,GridNameComponent,OpeartionUserComponent,editUserDialog,frozenUserDialog,addUserDialog],
  entryComponents:[editUserDialog,frozenUserDialog,addUserDialog]
})
export class SystemManageModule { }
