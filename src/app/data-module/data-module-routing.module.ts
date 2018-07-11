import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataModuleComponent } from './data-module.component';



const routes:Routes = [  
  { path:'',component:DataModuleComponent}  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class DataModuleRoutingModule { }
