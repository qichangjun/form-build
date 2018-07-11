import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorPickerDirective } from './directive/color-picker.directive';
import { CollapsibleTreeDirective } from './directive/collapsibleTree.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    CommonModule,
    HttpModule,
    FormsModule,ReactiveFormsModule,
    RouterModule,ColorPickerDirective,
    CollapsibleTreeDirective
  ],
  declarations: [ColorPickerDirective,CollapsibleTreeDirective]
})
export class ShareModule { }
