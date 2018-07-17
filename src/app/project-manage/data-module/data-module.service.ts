import { Injectable } from '@angular/core';
import { Http,URLSearchParams } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ApiUrlService } from '../../core/services/api.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';

@Injectable({
  providedIn: 'root'
})
export class DataModuleService {
  constructor(
    private http : Http,
    private _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getSysAttr(type) : Promise<any> {
    let params = new URLSearchParams();
    params.set('type',type)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    return this.http.get(this._configService.infoarchivesApiUrl() + this._apiUrlService['getSysAttr'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  getModuleVersionList(id) : Promise<any> {
    let params = new URLSearchParams();
    params.set('projectId',id)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    return this.http.get(this._configService.infoarchivesApiUrl() + this._apiUrlService['getModuleVersionList'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  getModuleInfo(id) : Promise<any> {
    let params = new URLSearchParams();
    params.set('id',id)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    return this.http.get(this._configService.infoarchivesApiUrl() + this._apiUrlService['getModuleInfo'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  createModule(module) : Promise<any> {
    let params = new URLSearchParams();    
    let post_data ={
        "template" : module
    }
    params.set('accessUser',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    return this.http.post(this._configService.infoarchivesApiUrl() + this._apiUrlService['createModule'],post_data,{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  updateVersion(module) : Promise<any> {
    let params = new URLSearchParams();    
    let post_data ={
        "template" : module
    }
    params.set('accessUser',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    return this.http.post(this._configService.infoarchivesApiUrl() + this._apiUrlService['updateVersion'],post_data,{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }
  editModule(module) : Promise<any> {
    let params = new URLSearchParams();    
    let post_data ={
        "template" : module
    }
    
    params.set('accessUser',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    return this.http.post(this._configService.infoarchivesApiUrl() + this._apiUrlService['editModule'],post_data,{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  exportSample(templateId) : Promise<any> {
    let params = new URLSearchParams();
    params.set('templateId',templateId)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    return this.http.get(this._configService.infoarchivesApiUrl() + this._apiUrlService['exportSample'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  exportModule(templateId) : Promise<any> {
    let params = new URLSearchParams();
    params.set('templateId',templateId)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    return this.http.get(this._configService.infoarchivesApiUrl() + this._apiUrlService['exportModule'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }
}
