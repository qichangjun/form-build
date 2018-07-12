import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../core/guard/auth.guard';

const routes:Routes = [  
  { path:'',component:MainComponent,children:[
    { path:'',redirectTo:'project',pathMatch:'prefix'},      
    { path:'project',loadChildren:'../project-manage/project-manage.module#ProjectManageModule',canActivate:[AuthGuard]},
    { path:'systemManage',loadChildren:'../system-manage/system-manage.module#SystemManageModule',canActivate:[AuthGuard]}
  ]}, 
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class MainRoutingModule { }
