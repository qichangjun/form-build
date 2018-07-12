import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { ShareModule } from '../share/share.module';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    ShareModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
