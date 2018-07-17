import { Injectable } from '@angular/core';
import { Http,URLSearchParams } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ApiUrlService } from '../../core/services/api.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectListManageService {

  constructor(
    private http : Http,
    private _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getProjectList() : Promise<any> {
    let params = new URLSearchParams();
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    return this.http.get(this._configService.infoarchivesApiUrl() + this._apiUrlService['getProjectList'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  getDataBaseList() : Promise<any> {
    let params = new URLSearchParams();
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    return this.http.get(this._configService.infoarchivesApiUrl() + this._apiUrlService['getDataBaseList'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  newProject(info) : Promise<any> {
    let params = new URLSearchParams();    
    for( let key in info){
      params.set(key,info[key])      
    }
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    return this.http.get(this._configService.infoarchivesApiUrl() + this._apiUrlService['newProject'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  deleteProject(objectId) : Promise<any> {
    let params = new URLSearchParams();    
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('id',objectId)
    return this.http.get(this._configService.infoarchivesApiUrl() + this._apiUrlService['deleteProject'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }
}
