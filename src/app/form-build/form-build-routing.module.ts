import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuildComponent } from './form-build.component';


const routes:Routes = [  
  { path:'',component:FormBuildComponent}  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class FormBuildRoutingModule { }
