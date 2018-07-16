import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { UploadFileComponent } from './uploadFIle/uploadFIle.component';
const routes:Routes = [
  { path:'',redirectTo:'main',pathMatch:'prefix'},  
  { path:'uploadFile', component: UploadFileComponent,outlet: 'uploadFile',canActivate: [AuthGuard]},
  { path:'main',loadChildren:'./main/main.module#MainModule'},
  { path:'login',loadChildren:'./login/login.module#LoginModule'},
  { path:'404',loadChildren:'./404/notFound.module#NotFoundModule'},
  { path:'**',redirectTo:'404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRouterModule {}
