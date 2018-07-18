import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileManageComponent } from './file-manage.component';

const routes:Routes = [  
  { path:'',component:FileManageComponent}  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class FileManageRoutingModule { }
