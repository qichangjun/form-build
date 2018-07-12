import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataModuleComponent } from './data-module/data-module.component';
import { ProjectManageComponent } from './project-manage.component';



const routes:Routes = [  
  { path:'',component:ProjectManageComponent},
  { path:'dataModule',component:DataModuleComponent}    
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ProjectManageRoutingModule { }
