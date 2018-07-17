import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessSetComponent } from './business-set.component';
import { BusinessSetRoutingModule } from './business-set-routing.module';
import { ArchiveManageComponent } from './archivesManagement/archivesManagement.component';
@NgModule({
  imports: [
    CommonModule,
    BusinessSetRoutingModule
  ],
  declarations: [BusinessSetComponent,ArchiveManageComponent]
})
export class BusinessSetModule { }
