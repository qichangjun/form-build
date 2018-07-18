import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuildComponent } from './form-build.component';
import { FormBuildRoutingModule } from './form-build-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DndModule } from 'ng2-dnd';
import { ResizableModule } from 'angular-resizable-element';
import { ColorPickerModule } from 'ngx-color-picker';
import { ShareModule } from '../../share/share.module';
@NgModule({
  imports: [
    ShareModule,
    FormBuildRoutingModule,
    MatGridListModule,
    MatSidenavModule,
    MatRadioModule,
    MatCheckboxModule,
    DndModule.forRoot(),
    ResizableModule,
    ColorPickerModule,
    CommonModule
  ],
  providers:[],
  declarations: [FormBuildComponent]
})
export class FormBuildModule { }
