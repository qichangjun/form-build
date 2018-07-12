import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManageComponent } from './project-manage.component';
import { DataModuleComponent } from './data-module/data-module.component';
import { ShareModule } from '../share/share.module';
import { ProjectManageRoutingModule } from './project-manage-routing.module'
import { MatDialogModule } from '@angular/material/dialog';
import { addFileNameDialog } from './data-module/dialog/addFileName/addFileName.dialog';
import { editFileDialog } from './data-module/dialog/editFile/editFile.dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { editCustomDataDialog } from './data-module/dialog/editCustomData/editCustomData.dialog';
import { updateNameDialog } from './data-module/dialog/updateName/updateName.dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  imports: [
    CommonModule,
    ProjectManageRoutingModule,
    MatDialogModule,
    MatSelectModule,  
    MatCheckboxModule,
    MatSliderModule,
    MatCardModule,
    ShareModule
  ],
  declarations: [ProjectManageComponent,DataModuleComponent,addFileNameDialog,editFileDialog,editCustomDataDialog,updateNameDialog],
  entryComponents:[
    addFileNameDialog,
    editFileDialog,
    editCustomDataDialog,
    updateNameDialog
  ]
})
export class ProjectManageModule { }
