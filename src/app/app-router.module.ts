import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes:Routes = [
  { path:'',redirectTo:'login',pathMatch:'prefix'},  
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
