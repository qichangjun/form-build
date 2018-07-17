import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessSetComponent } from './business-set.component';
import { BusinessSetRoutingModule } from './business-set-routing.module';
import { ArchiveManageComponent } from './archivesManagement/archivesManagement.component';
import { ShareModule } from '../share/share.module';
import { addCategoryDialog } from './archivesManagement/dialog/addCategory/addCategory.dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { removeCategoryDialog } from './archivesManagement/dialog/deleteCategory/deleteCategory.dialog';
@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    BusinessSetRoutingModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  declarations: [BusinessSetComponent,ArchiveManageComponent,addCategoryDialog,removeCategoryDialog],
  entryComponents:[addCategoryDialog,removeCategoryDialog]
})
export class BusinessSetModule { }
