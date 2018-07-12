import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { AuthenticationService } from '../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  model = {
    username : '',
    password : ''
  }
  constructor(
    private router : Router,
    private _loginService : LoginService,
    private _authenticationService : AuthenticationService
  ) { }

  ngOnInit() {
  }

  async login(){
    let res = await this._loginService.login(this.model)
    this._authenticationService.setCurrentUser(res)
    this.router.navigate(['/main'])
  }
}
