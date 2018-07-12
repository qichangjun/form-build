import { Component, OnInit } from '@angular/core';
import { ProjectListManageService } from './project-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListManageComponent implements OnInit {
  projectList : Array<any> = []
  constructor(
    private _router : Router,
    private _ProjectListManageService : ProjectListManageService
  ) { }

  ngOnInit() {
    this.getProjectList()
  }

  async getProjectList(){
    let res = await this._ProjectListManageService.getProjectList()
    this.projectList = res;
  }

  gotoEdit(item){
    this._router.navigate(['main/projectManage/dataModule'],{queryParams:{objectId:item.id}})
  }

  newProject(){

  }
}
