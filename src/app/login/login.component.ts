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
  loading : boolean = false;
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
    try{
      let res = await this._loginService.login(this.model)
      let user_info = {
        accessToken : res.accessToken,
        accessUser : res.accessUser
      }
      this._authenticationService.setCurrentUser(user_info)
      this._authenticationService.setUserInfo(res.user)
      this._authenticationService.setUnitInfo(res.unit)
      this._authenticationService.setArchiveFileInfo(res.archiveFile)
      this.router.navigate(['/main'])
    }catch(err){
      return 
    }        
    
  }
}
