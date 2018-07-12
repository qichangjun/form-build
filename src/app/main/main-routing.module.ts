import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../core/guard/auth.guard';

const routes:Routes = [  
  { path:'',component:MainComponent,children:[
    { path:'',redirectTo:'projectManage',pathMatch:'prefix'},  
    { path:'formBuild',loadChildren:'../form-build/form-build.module#FormBuildModule',canActivate:[AuthGuard]},
    { path:'projectManage',loadChildren:'../project-manage/project-manage.module#ProjectManageModule',canActivate:[AuthGuard]},
  ]}, 
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class MainRoutingModule { }
