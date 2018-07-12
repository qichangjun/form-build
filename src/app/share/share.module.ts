import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorPickerDirective } from './directive/color-picker.directive';
import { CollapsibleTreeDirective } from './directive/collapsibleTree.directive';
import { NavBarComponent } from './component/navBar/navBar.component';
import { TopSearchBarComponent } from './component/topSearchBar/topSearchBar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,ReactiveFormsModule,
    RouterModule,
    MatToolbarModule
  ],
  exports:[
    CommonModule,
    HttpModule,
    FormsModule,ReactiveFormsModule,
    RouterModule,ColorPickerDirective,
    CollapsibleTreeDirective,NavBarComponent,
    TopSearchBarComponent
  ],
  declarations: [ColorPickerDirective,CollapsibleTreeDirective,NavBarComponent,TopSearchBarComponent]
})
export class ShareModule { }
