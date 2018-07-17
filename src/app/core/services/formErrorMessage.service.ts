import { Injectable } from '@angular/core';

@Injectable()
export class FormErrorMessageService {
  constructor() { }
  getErrorMessage(info){
    return info.hasError('required') ? '不能为空' :
            info.hasError('minlength') ? '长度过短' :
            info.hasError('email') ? '格式不正确' :
            info.hasError('errors') ? '两次密码不一致' :
            '';
  }
}
