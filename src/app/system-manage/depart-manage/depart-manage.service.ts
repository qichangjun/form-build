import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Jsonp } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ApiUrlService } from '../../core/services/api.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';
import { GridNameComponent } from '../gridList/gridName.component';
import { OpeartionDepartComponent } from '../gridList/operationDepart.component';

@Injectable({
    providedIn: 'root'
})
export class DepartManageService {

    constructor(
        private jsonp: Jsonp,
        private http: Http,
        private _apiUrlService: ApiUrlService,
        private _authenticationService: AuthenticationService,
        private _configService: ConfigService,
        private _responseHandleService: ResponseHandleService
    ) { }

    getDepartLists(): Promise<any> {
        let params = new URLSearchParams();
        params.set('callback', 'JSONP_CALLBACK')
        params.set('accessToken', this._authenticationService.getCurrentUser().accessToken)
        params.set('accessUser', this._authenticationService.getCurrentUser().accessUser)
        return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['getDepartLists'], { search: params })
            .toPromise()
            .then(res =>
                this._responseHandleService.extractData(res)
            )
            .catch(error =>
                this._responseHandleService.handleError(error)
            );
    }

    deleteUnit(unitGroupName): Promise<any> {
        let params = new URLSearchParams();
        params.set('unitGroupName', unitGroupName)
        params.set('callback', 'JSONP_CALLBACK')
        params.set('accessToken', this._authenticationService.getCurrentUser().accessToken)
        params.set('accessUser', this._authenticationService.getCurrentUser().accessUser)
        return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['deleteUnit'], { search: params })
            .toPromise()
            .then(res =>
                this._responseHandleService.extractData(res)
            )
            .catch(error =>
                this._responseHandleService.handleError(error)
            );
    }

    getDetailInfo(unitGroupName): Promise<any> {
        let params = new URLSearchParams();
        params.set('unitGroupName', unitGroupName)
        params.set('callback', 'JSONP_CALLBACK')
        params.set('accessToken', this._authenticationService.getCurrentUser().accessToken)
        params.set('accessUser', this._authenticationService.getCurrentUser().accessUser)
        return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['unitInfo'], { search: params })
            .toPromise()
            .then(res =>
                this._responseHandleService.extractData(res)
            )
            .catch(error =>
                this._responseHandleService.handleError(error)
            );
    }

    getUserList(deptGroupName): Promise<any> {
        let params = new URLSearchParams();
        params.set('deptGroupName', deptGroupName)
        params.set('callback', 'JSONP_CALLBACK')
        params.set('accessToken', this._authenticationService.getCurrentUser().accessToken)
        params.set('accessUser', this._authenticationService.getCurrentUser().accessUser)
        return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['getDepartmentUser'], { search: params })
            .toPromise()
            .then(res =>
                this._responseHandleService.extractData(res)
            )
            .catch(error =>
                this._responseHandleService.handleError(error)
            );
    }

    getDepartColumnDefs(): Array<any> {
        return [
            {
                headerName: "序号",
                field: "deptNOCode",
                // cellRendererFramework: GridNameComponent,
                width: 100
            },
            {
                headerName: "部门名称",
                field: "deptDisplayName",
                width: 100
            },
            {
                headerName: "部门负责人",
                field: "deptOfficerDisplayName",
                width: 100
            },
            {
                headerName: "",
                cellRendererFramework: OpeartionDepartComponent,
                field: "",
                minWidth: 200
            }
        ]
    }
}
