import { Injectable } from '@angular/core';

@Injectable()
export class FormErrorMessageService {
  constructor() { }
  getErrorMessage(info){
    return info.hasError('required') ? '不能为空' :
            info.hasError('minlength') ? '长度不正确' :
            '';
  }
}
