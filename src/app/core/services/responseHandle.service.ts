import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
@Injectable()
export class ResponseHandleService {
  constructor(
      private router : Router
  ) { }
  public handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public extractData(res: Response) {
    let body = res.json();    
    if (body.code == 1){
      return body.data || { };
    }else{
      if (body.message == '用户认证失败' || body.message == '请求的用户名或密码不正确'){
        this.router.navigate(['/login']);
      }
      alert(body.message)
      return Promise.reject(body.message);
    }    
  }

  extractDataWithOutError(res: Response){
    let body = res.json();   
    return body || { }; 
  }

  public extractDataSuccess(res: Response) {      
    let body = res.json();    
    if (body.code == 1){      
      alert(body.message)
      return body.data || { };
    }else{        
      if (body.message == '用户认证失败' || body.message == '请求的用户名或密码不正确'){
        this.router.navigate(['/login'], { queryParams: {returnUrl:window.location.href} });       
      }    
      alert(body.message)
      return Promise.reject(body.message);
    }    
  }
}
