import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Jsonp } from '@angular/http';
import { AuthenticationService } from '../core/services/auth.service';
import { ConfigService } from '../core/services/config.service';
import { ApiUrlService } from '../core/services/api.service';
import { ResponseHandleService } from '../core/services/responseHandle.service';
// import { OpeartionUserComponent } from '../gridList/operationUser.component';
import { GridFileNameComponent } from './girdList/gridName.component';

@Injectable({
  providedIn: 'root'
})
export class FileManageService {

  constructor(
    private jsonp : Jsonp,
    private http : Http,
    private _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getFileLists(info,objectId) : Promise<any> {
    let params = new URLSearchParams();
    params.set('callback','JSONP_CALLBACK')    
    params.set('isFiled','false')    
    params.set('objectType',info.objectType)
    params.set('parentId',objectId)
    params.set('objectId',objectId)    
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['getFileLists'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  getBreadCrumb(ids) : Promise<any> {
    let params = new URLSearchParams();
    params.set('callback','JSONP_CALLBACK')    
    params.set('objectId',ids)    
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['getBreadCrumb'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  getFileColumnDefs(): Array<any>{
    return [
        {
          headerCheckboxSelection: true,
          checkboxSelection:true,
          suppressSizeToFit : true,
          suppressResize : true
        },     
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


  getCategoryColumnDefs(): Array<any>{
    return [
        {
          headerCheckboxSelection: true,
          checkboxSelection:true,
          suppressSizeToFit : true,
          // suppressSizeToFit : true,
          // suppressResize : true,
          width:50
        },     
        {
          headerName: "文件名",
          field: "objectName",
          cellRendererFramework: GridFileNameComponent,
          width: 100
        }, 
        {
          headerName:"创建人",
          field:"creator",
          width:100
        },
        {
          headerName:"创建时间",
          field:"creationDate",
          width:100
        }
      ]
  }
}
