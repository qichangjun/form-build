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

    getCurrentUser() {    
        return Cookies.getJSON('current_user') || {}
    }

    setCurrentUser(user){
        let cookiePara={ expires: 999 }
        Cookies.set('current_user', user, cookiePara);
    }
}