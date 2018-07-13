import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataModuleComponent } from './data-module/data-module.component';
import { ProjectListManageComponent } from './project-list/project-list.component';
import { ProjectManageComponent } from './project-manage.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';

const routes:Routes = [  
  {path:'',redirectTo:'projectList'},
  {path:'projectList',component:ProjectListManageComponent},
  { path:'projectManage',component:ProjectManageComponent,children:[
    { path:'dataModule',component:DataModuleComponent},
    { path:'projectEdit',component:ProjectEditComponent},
    { path:'formBuild',loadChildren:'./form-build/form-build.module#FormBuildModule'},
    { path:'',redirectTo:'projectEdit'}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ProjectManageRoutingModule { }
