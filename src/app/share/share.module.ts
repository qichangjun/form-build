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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Sizefilter } from './pipe/size.pipe';
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    JsonpModule,
    FormsModule,ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  exports:[
    CommonModule,
    HttpModule,
    JsonpModule,
    FormsModule,ReactiveFormsModule,
    RouterModule,ColorPickerDirective,
    CollapsibleTreeDirective,NavBarComponent,
    TopSearchBarComponent,LoadingMessageComponent,
    Sizefilter
  ],
  declarations: [ColorPickerDirective,CollapsibleTreeDirective,NavBarComponent,TopSearchBarComponent,LoadingMessageComponent,Sizefilter]
})
export class ShareModule { }
