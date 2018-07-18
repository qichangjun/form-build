import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataModuleComponent } from './data-module/data-module.component';
import { ShareModule } from '../share/share.module';
import { ProjectManageRoutingModule } from './project-manage-routing.module'

import { addFileNameDialog } from './data-module/dialog/addFileName/addFileName.dialog';
import { editFileDialog } from './data-module/dialog/editFile/editFile.dialog';

import { editCustomDataDialog } from './data-module/dialog/editCustomData/editCustomData.dialog';
import { updateNameDialog } from './data-module/dialog/updateName/updateName.dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { ProjectListManageComponent } from './project-list/project-list.component';
import { ProjectManageComponent } from './project-manage.component';
import { newProjectDialog } from './project-list/dialog/newProject/newProject.dialog';
import { ProjectEditComponent } from './project-edit/project-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectManageRoutingModule,
    MatSliderModule,
    MatCardModule,
    ShareModule
  ],
  declarations: [ProjectManageComponent,ProjectListManageComponent,DataModuleComponent,addFileNameDialog,editFileDialog,editCustomDataDialog,updateNameDialog,newProjectDialog, ProjectEditComponent],
  entryComponents:[
    newProjectDialog,
    addFileNameDialog,
    editFileDialog,
    editCustomDataDialog,
    updateNameDialog
  ]
})
export class ProjectManageModule { }
