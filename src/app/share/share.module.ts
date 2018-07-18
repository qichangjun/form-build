import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule,JsonpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorPickerDirective } from './directive/color-picker.directive';
import { CollapsibleTreeDirective } from './directive/collapsibleTree.directive';

import { NavBarComponent } from './component/navBar/navBar.component';
import { TopSearchBarComponent } from './component/topSearchBar/topSearchBar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingMessageComponent } from './component/loadingMessage/loadingMessage.component';
import { BreadCrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { ZTreeComponent } from './component/z-tree/z-tree.component';

import { Sizefilter } from './pipe/size.pipe';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    JsonpModule,
    FormsModule,ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports:[
    CommonModule,
    HttpModule,
    JsonpModule,
    FormsModule,ReactiveFormsModule,
    RouterModule,ColorPickerDirective,
    CollapsibleTreeDirective,NavBarComponent,
    TopSearchBarComponent,LoadingMessageComponent,
    Sizefilter,ZTreeComponent,
    MatProgressSpinnerModule,BreadCrumbComponent,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [ColorPickerDirective,CollapsibleTreeDirective,NavBarComponent,TopSearchBarComponent,LoadingMessageComponent,Sizefilter,ZTreeComponent,BreadCrumbComponent]
})
export class ShareModule { }
