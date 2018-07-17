import {Injectable} from "@angular/core";
import { Http, Headers, Response,URLSearchParams,Jsonp } from '@angular/http';
import { ResponseHandleService } from '../../../core/services/responseHandle.service';

@Injectable()
export class zTreeService {
    constructor(
        private jsonp:Jsonp,
        private http : Http,
        private _responseHandleService : ResponseHandleService
    ){}
    getTreeDataPaths(url : string,ids : Array<any>,otherParam : Object) : Promise<any> {
        let params = new URLSearchParams();
        params.set('callback','JSONP_CALLBACK')
        params.set('parentId',ids.join('.'));
        for (let key in otherParam) {
            params.set(key,otherParam[key])
        }         
        return this.jsonp.get(url,{ search: params })
                        .toPromise()
                        .then(res =>
                          this._responseHandleService.extractData(res)
                        )
                        .catch(error =>
                          this._responseHandleService.handleError(error)
                        );
    }
}