import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemManageComponent } from './system-manage.component';
import { UserManageComponent } from './userManage/userManage.component';
const routes:Routes = [  
  { path:'',component:SystemManageComponent,children:[
    {path:'userManage',component:UserManageComponent},
    {path:'',redirectTo:'userManage'}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class SystemManageRoutingModule { }
