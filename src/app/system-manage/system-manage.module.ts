import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemManageComponent } from './system-manage.component';
import { ShareModule } from '../share/share.module';
import { SystemManageRoutingModule } from './system-manage-routing.module';
import { UserManageComponent } from './userManage/userManage.component';

@NgModule({
  imports: [
    CommonModule,
    SystemManageRoutingModule,
    ShareModule
  ],
  declarations: [SystemManageComponent,UserManageComponent]
})
export class SystemManageModule { }
