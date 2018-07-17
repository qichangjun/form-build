import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessSetComponent } from './business-set.component';
import { ArchiveManageComponent } from './archivesManagement/archivesManagement.component';
const routes:Routes = [  
  {path:'',redirectTo:'businessSet'},
  {path:'businessSet',component:BusinessSetComponent,children:[
    {path:'',redirectTo:'archiveManage'},
    {path:'archiveManage',component:ArchiveManageComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class BusinessSetRoutingModule { }
