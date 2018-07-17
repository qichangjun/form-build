
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
declare var Cookies:any;
@Injectable()

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (Cookies.getJSON('current_user')) {      
      return true;
    } else{      
      this.router.navigate(['/login'], { queryParams: {returnUrl:encodeURIComponent(window.location.href)} });         
      return false;
    }
  }
}
