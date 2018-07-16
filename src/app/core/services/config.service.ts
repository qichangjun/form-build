import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

@Injectable()
export class ConfigService {
  constructor() { }
  infoarchivesApiUrl() {
    return environment.infoarchivesApiUrl;
  }
  adminApiUrl(){
    return environment.adminApiUrl;
  }
  ermsApiUrl(){
    return environment.ermsApiUrl;
  }
}
