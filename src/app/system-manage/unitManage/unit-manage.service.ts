import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Jsonp } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ApiUrlService } from '../../core/services/api.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';
import { GridNameComponent } from '../gridList/gridName.component';
import { OpeartionUnitComponent } from '../gridList/operationUnit.component';

@Injectable({
    providedIn: 'root'
})
export class UnitManageService {

    constructor(
        private jsonp: Jsonp,
        private http: Http,
        private _apiUrlService: ApiUrlService,
        private _authenticationService: AuthenticationService,
        private _configService: ConfigService,
        private _responseHandleService: ResponseHandleService
    ) { }

    getUnitLists(): Promise<any> {
        let params = new URLSearchParams();
        params.set('callback', 'JSONP_CALLBACK')
        params.set('accessToken', this._authenticationService.getCurrentUser().accessToken)
        params.set('accessUser', this._authenticationService.getCurrentUser().accessUser)
        return this.jsonp.get(this._configService.ermsApiUrl() + this._apiUrlService['getUnitLists'], { search: params })
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

    getUnitColumnDefs(): Array<any> {
        return [
            {
                headerName: "单位全宗",
                field: "fonds",
                // cellRendererFramework: GridNameComponent,
                width: 100
            },
            {
                headerName: "单位名称",
                field: "unitDisplayName",
                width: 100
            },
            {
                headerName: "档案员",
                field: "unitOfficer",
                width: 100
            },
            {
                headerName: "联系电话",
                field: "unitTel",
                width: 100
            },
            {
                headerName: "兼职档案员人数",
                field: "unitPst",
                width: 100
            },
            {
                headerName: "注册用户数",
                field: "totalNum",
                width: 100
            },
            {
                headerName: "冻结用户数",
                field: "unableNum",
                width: 100
            },
            {
                headerName: "归档总数",
                field: "totalFiles",
                width: 100
            },
            {
                headerName: "",
                cellRendererFramework: OpeartionUnitComponent,
                field: "",
                minWidth: 200
            }
        ]
    }
}
