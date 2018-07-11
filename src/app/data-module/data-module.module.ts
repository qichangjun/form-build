import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataModuleComponent } from './data-module.component';
import { ShareModule } from '../share/share.module';
import { DataModuleRoutingModule } from './data-module-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    DataModuleRoutingModule
  ],
  declarations: [DataModuleComponent]
})
export class DataModuleModule { }
