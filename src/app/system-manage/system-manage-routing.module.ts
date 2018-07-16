import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemManageComponent } from './system-manage.component';
import { UserManageComponent } from './userManage/userManage.component';
import { UnitManageComponent } from './unitManage/unit-manage.component';
import { UnitBaseInfoComponent } from './unit-base-info/unit-base-info.component';
import { DepartManageComponent } from './depart-manage/depart-manage.component';
const routes:Routes = [  
  { path:'',component:SystemManageComponent,children:[
    {path:'userManage',component:UserManageComponent},
    {path:'unitManage',component:UnitManageComponent},
    {path:'unitBaseInfo',component:UnitBaseInfoComponent},
    {path:'departManage',component:DepartManageComponent},
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
