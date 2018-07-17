import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Jsonp } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ApiUrlService } from '../../core/services/api.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';

@Injectable({
  providedIn: 'root'
})
export class ArchiveManagementService {
  constructor(
    private jsonp:Jsonp,
    private http : Http,
    private _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getNodeInfo(objectId) : Promise<any> {
    let params = new URLSearchParams();    
    params.set('callback','JSONP_CALLBACK')
    params.set('objectId',objectId)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)  
    return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['categoryInfo'],{search:params})
      .toPromise()
      .then(res=>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getPolicy() : Promise<any> {
    let params = new URLSearchParams();    
    params.set('callback','JSONP_CALLBACK')
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)  
    return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['getPolicy'],{search:params})
      .toPromise()
      .then(res=>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getRetentionPeriod(collectionWay) : Promise<any> {
    let params = new URLSearchParams();    
    params.set('callback','JSONP_CALLBACK')
    params.set('collectionWay',collectionWay)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)  
    return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['getRetentionPeriod'],{search:params})
      .toPromise()
      .then(res=>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  removeCategory(id) : Promise<any> {
    let params = new URLSearchParams();    
    params.set('callback','JSONP_CALLBACK')
    params.set('objectId',id)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)  
    return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['categoryDelete'],{search:params})
      .toPromise()
      .then(res=>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  updateCategory(info) : Promise<any> {
    let params = new URLSearchParams();    
    params.set('callback','JSONP_CALLBACK')
    for (let key in info){
      params.set(key,info[key])
    }
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)  
    return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['categoryUpdate'],{search:params})
      .toPromise()
      .then(res=>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  addCategory(info,parentId) : Promise<any> {
    let params = new URLSearchParams();    
    params.set('callback','JSONP_CALLBACK')
    for (let key in info){
      params.set(key,info[key])
    }
    params.set('parentId',parentId)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)  
    return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['addCategory'],{search:params})
      .toPromise()
      .then(res=>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

}
