import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  { path:'',redirectTo:'form-build',pathMatch:'prefix'},  
  { path:'form-build',loadChildren:'./form-build/form-build.module#FormBuildModule'},
  { path:'data-module',loadChildren:'./data-module/data-module.module#DataModuleModule'},
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
