import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module'
import { ShareModule } from './share/share.module';

import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRouterModule } from './app-router.module';
@NgModule({
  declarations: [
    AppComponent
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
