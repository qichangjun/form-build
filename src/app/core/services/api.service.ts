import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrlService {
  login = "/user/login";  
  getProjectList = "/project/list";
  getDataBaseList = "/project/database/list";
  newProject = "/project/create";
  deleteProject = "/project/remove";
  getUserLists = "/user/list";
  getProjectInfo = "/project/detail";
  updateProject = "/project/update";

  getSysAttr = "/project/template/system_attribute/list";
  getModuleVersionList = "/project/template/version/list";
  getModuleInfo = "/project/template/detail";
  createModule = "/project/template/create";
  updateVersion = "/project/template/upgrade";
  editModule = "/project/template/update";
  exportSample = "/project/template/sample"
  exportModule = "/project/template/download"

  userInfo = "/user/info"
  departmentList = "/dept/list"
  changeState = "/user/changeStatedsds"
  upload = "/common/upload"
  importUserList = "/user/import"
}
