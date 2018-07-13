import { Injectable } from '@angular/core';
import { Http,URLSearchParams } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ApiUrlService } from '../../core/services/api.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';
import { GridNameComponent } from '../gridList/gridName.component';
@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  constructor(
    private http : Http,
    private _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getUserLists() : Promise<any> {
    let params = new URLSearchParams();
    params.set('keywords','undefined')
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    let post_data = {"columns":[],"orders":[{"column":"submitTime","direction":"DESC"}],"page":1,"length":50}
    return this.http.post(this._configService.infoarchivesApiUrl() + this._apiUrlService['getUserLists'],post_data,{ search: params })
                    .toPromise()
                    .then(res =>
                      this._responseHandleService.extractData(res)
                    )
                    .catch(error =>
                      this._responseHandleService.handleError(error)
                    );
  }

  getUserColumnDefs(): Array<any>{
    return [
        {
          headerCheckboxSelection: true,
          checkboxSelection:true,
          suppressSizeToFit : true,
          suppressResize : true
        },     
        {
          headerName: "名称",
          field: "dataName",
          cellRendererFramework: GridNameComponent,
          width: 100
        }, 
        {
          headerName: "主管部门",
          field: "dataPath",
          cellRenderer: (params) =>{
            var span = "<span>" + params.value.toString() + "</span>";            
            return span;
          },
          minWidth: 200,            
        },
        {
          headerName: "文档管理员",
          field: "title",          
          minWidth: 200
        },
      ]
  }
}
