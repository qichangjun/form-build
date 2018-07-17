import { Injectable } from '@angular/core';
import { Http, Headers, Response,URLSearchParams } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

declare var Cookies:any;
@Injectable()

export class AuthenticationService {
    constructor(
        private http : Http,
        private router: Router
    ) { }

    /**
     * 
     */
    getCurrentUser() {    
        return Cookies.getJSON('current_user') || {}
    }

    setCurrentUser(user){
        let cookiePara={ expires: 999 }
        Cookies.set('current_user', user, cookiePara);
    }

    /**
     * 
     * @param user 
     */
    setUserInfo(user){
        let cookiePara={ expires: 999 }
        Cookies.set('user_info', user, cookiePara);
    }

    getUserInfo(){
        return Cookies.getJSON('user_info') || {}
    }

    /**
     * 
     */
    setUnitInfo(unit){
        let cookiePara={ expires: 999 }
        Cookies.set('unit_info', unit, cookiePara);
    }

    getUnitInfo(){
        return Cookies.getJSON('unit_info') || {}
    }

}