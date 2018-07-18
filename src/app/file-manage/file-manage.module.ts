import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManageComponent } from './file-manage.component';
import { ShareModule } from '../share/share.module';
import { FileManageRoutingModule } from './file-manage-routing.module';
import { AgGridModule } from "ag-grid-angular/main";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridFileNameComponent } from './girdList/gridName.component';
@NgModule({
  imports: [
    CommonModule,
    FileManageRoutingModule,
    ShareModule,
    NgbModule.forRoot(),
    AgGridModule.withComponents([GridFileNameComponent])
  ],
  declarations: [FileManageComponent,GridFileNameComponent]
})
export class FileManageModule { }
