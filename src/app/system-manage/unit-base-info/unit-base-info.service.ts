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
export class UnitBaseInfoService {

    constructor(
        private jsonp: Jsonp,
        private http: Http,
        private _apiUrlService: ApiUrlService,
        private _authenticationService: AuthenticationService,
        private _configService: ConfigService,
        private _responseHandleService: ResponseHandleService
    ) { }
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

}
