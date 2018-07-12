import { Component, OnInit } from '@angular/core';
import { ProjectManageService } from './project-manage.service';

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.css']
})
export class ProjectManageComponent implements OnInit {
  projectList : Array<any> = []
  constructor(
    private _projectManageService : ProjectManageService
  ) { }

  ngOnInit() {
    this.getProjectList()
  }

  async getProjectList(){
    let res = await this._projectManageService.getProjectList()
    this.projectList = res;
  }
}
