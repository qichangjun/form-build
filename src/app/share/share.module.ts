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
import { LoadingMessageComponent } from './component/loadingMessage/loadingMessage.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  exports:[
    CommonModule,
    HttpModule,
    FormsModule,ReactiveFormsModule,
    RouterModule,ColorPickerDirective,
    CollapsibleTreeDirective,NavBarComponent,
    TopSearchBarComponent,LoadingMessageComponent
  ],
  declarations: [ColorPickerDirective,CollapsibleTreeDirective,NavBarComponent,TopSearchBarComponent,LoadingMessageComponent]
})
export class ShareModule { }
