import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataModuleComponent } from './data-module/data-module.component';
import { ProjectListManageComponent } from './project-list/project-list.component';
import { ProjectManageComponent } from './project-manage.component';


const routes:Routes = [  
  {path:'',redirectTo:'projectList'},
  {path:'projectList',component:ProjectListManageComponent},
  { path:'projectManage',component:ProjectManageComponent,children:[
    { path:'dataModule',component:DataModuleComponent},
    { path:'formBuild',loadChildren:'./form-build/form-build.module#FormBuildModule'},
    { path:'',redirectTo:'dataModule'}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ProjectManageRoutingModule { }
