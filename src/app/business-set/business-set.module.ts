import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessSetComponent } from './business-set.component';
import { BusinessSetRoutingModule } from './business-set-routing.module';
import { ArchiveManageComponent } from './archivesManagement/archivesManagement.component';
import { ShareModule } from '../share/share.module';
import { addCategoryDialog } from './archivesManagement/dialog/addCategory/addCategory.dialog';
import { MatRadioModule } from '@angular/material/radio';
import { removeCategoryDialog } from './archivesManagement/dialog/deleteCategory/deleteCategory.dialog';
@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    BusinessSetRoutingModule,
    MatRadioModule
  ],
  declarations: [BusinessSetComponent,ArchiveManageComponent,addCategoryDialog,removeCategoryDialog],
  entryComponents:[addCategoryDialog,removeCategoryDialog]
})
export class BusinessSetModule { }
