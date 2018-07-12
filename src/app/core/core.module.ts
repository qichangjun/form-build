import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthenticationService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { ApiUrlService } from './services/api.service';
import { ResponseHandleService } from './services/responseHandle.service';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: []
})
export class CoreModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [AuthenticationService,ConfigService,ApiUrlService,ResponseHandleService,AuthGuard]
    };
  }
}
