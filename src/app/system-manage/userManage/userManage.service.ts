import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Jsonp } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ApiUrlService } from '../../core/services/api.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';
import { GridNameComponent } from '../gridList/gridName.component';
import { OpeartionUserComponent } from '../gridList/operationUser.component';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  constructor(
    private jsonp : Jsonp,
    private http : Http,
    private _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getUserLists(info) : Promise<any> {
    let params = new URLSearchParams();
    params.set('callback','JSONP_CALLBACK')
    params.set('userState',info.userState)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)
    // let post_data = {"columns":[],"orders":[{"column":"submitTime","direction":"DESC"}],"page":1,"length":50}
    return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['getUserLists'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  getDetailInfo(info): Promise<any> {
    let params = new URLSearchParams();
    params.set('callback','JSONP_CALLBACK')
    params.set('objectId',info.objectId)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['userInfo'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  getDept(): Promise<any> {
    let params = new URLSearchParams();
    params.set('callback','JSONP_CALLBACK')
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['departmentList'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  importUser(storagePath): Promise<any> {
    let params = new URLSearchParams();
    params.set('callback','JSONP_CALLBACK')
    params.set('storagePath',storagePath)    
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['importUserList'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  changeState(info): Promise<any> {
    let params = new URLSearchParams();    
    params.set('callback','JSONP_CALLBACK')
    params.set('lockReason',info.lockReason)
    params.set('objectId',info.objectId)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['changeState'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractDataSuccess(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  getUserColumnDefs(): Array<any>{
    return [
        // {
        //   headerCheckboxSelection: true,
        //   checkboxSelection:true,
        //   suppressSizeToFit : true,
        //   suppressResize : true
        // },     
        {
          headerName: "部门",
          field: "deptDisplayName",
          // cellRendererFramework: GridNameComponent,
          width: 100
        }, 
        {
          headerName:"姓名",
          field:"userDisplayName",
          width:100
        },
        {
          headerName:"角色名称",
          field:"roleDisplayName",
          width:100
        },
        {
          headerName:"电子邮件",
          field:"userAddress",
          width:100
        },
        {
          headerName:"电话",
          field:"telphone",
          width:100
        },
        {
          headerName:"",
          cellRendererFramework: OpeartionUserComponent,
          field:"",
          minWidth:200
        }
        // {
        //   headerName: "主管部门",
        //   field: "dataPath",
        //   cellRenderer: (params) =>{
        //     var span = "<span>" + params.value.toString() + "</span>";            
        //     return span;
        //   },
        //   minWidth: 200,            
        // },
        // {
        //   headerName: "文档管理员",
        //   field: "title",          
        //   minWidth: 200
        // },
      ]
  }
}
