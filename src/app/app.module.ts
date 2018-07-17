import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module'
import { ShareModule } from './share/share.module';

import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRouterModule } from './app-router.module';
import { UploadFileComponent } from './uploadFIle/uploadFIle.component';
@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent
  ],
  imports: [    
    BrowserModule,
    ShareModule,
    CoreModule.forRoot(),
    AppRouterModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
