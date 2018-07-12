import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManageComponent } from './project-manage.component';
import { DataModuleComponent } from './data-module/data-module.component';
import { ShareModule } from '../share/share.module';
import { ProjectManageRoutingModule } from './project-manage-routing.module'
@NgModule({
  imports: [
    CommonModule,
    ProjectManageRoutingModule,
    ShareModule
  ],
  declarations: [ProjectManageComponent,DataModuleComponent]
})
export class ProjectManageModule { }
