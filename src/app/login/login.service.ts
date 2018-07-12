import { Injectable } from '@angular/core';
import { Http,URLSearchParams } from '@angular/http';
import { AuthenticationService } from '../core/services/auth.service';
import { ConfigService } from '../core/services/config.service';
import { ApiUrlService } from '../core/services/api.service';
import { ResponseHandleService } from '../core/services/responseHandle.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http : Http,
    private _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  login(parameter: any) : Promise<any> {
    let params = new URLSearchParams();
    let post_data = {
      loginName : parameter.username,
      password : parameter.password
    }
    return this.http.post(this._configService.adminApiUrl() + this._apiUrlService['login'],post_data,{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }
}
