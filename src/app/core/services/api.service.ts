import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrlService {
  login = "/user/login";  
  getProjectList = "/project/list";
  getDataBaseList = "/project/database/list";
  newProject = "/project/create";
  deleteProject = "/project/remove";
  getUserLists = "/receive_log/list"
}
