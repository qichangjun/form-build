import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectEditService } from './project-edit.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormErrorMessageService } from '../../core/services/formErrorMessage.service';
import { ProjectListManageService } from '../project-list/project-list.service';
@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  routerSubscription: any;
  myForm: FormGroup;
  projectInfo: any = {};
  parameter = {
    objectId: undefined
  }
  dataBaseList = [];
  dataBaseDisplayLists = [];
  dataBaseVersions = [];
  loading : boolean = false;
  constructor(
    private fb: FormBuilder,
    public _formErrorMessageService: FormErrorMessageService,
    private _projectEditService: ProjectEditService,
    private _projectListManageService : ProjectListManageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm()
    this.routerSubscription = this.route.queryParams.subscribe((data: any) => {
      this.parameter = Object.assign(this.parameter, data)
      this.getProjectInfo()
    })
  }

  ngOnInit() {
  }

  createForm() {
    this.myForm = this.fb.group({
      projectName: ['', [Validators.required]],
      systemName: [''],
      databaseName: ['', [Validators.required]],
      databaseVersion: ['', [Validators.required]],
      extractionMethod: ['', [Validators.required]]
    });
  }

  async getProjectInfo() {
    this.projectInfo = await this._projectEditService.getProjectInfo(this.parameter.objectId)       
    this.getDataBaseList()
  }

  async getDataBaseList() {
    let res = await this._projectListManageService.getDataBaseList()
    this.dataBaseList = res
    this.dataBaseDisplayLists = []
    this.dataBaseList.forEach(c => {
      if (this.dataBaseDisplayLists.indexOf(c.databaseName) == -1) {
        this.dataBaseDisplayLists.push(c.databaseName)
      }
    })
    this.loadDataBaseVersion({value :this.projectInfo.databaseName})
    for( let key in this.myForm.controls){     
      this.myForm.controls[key].setValue(this.projectInfo[key])
    }    
  }

  loadDataBaseVersion({ value }) {    
    this.myForm.controls.databaseVersion.setValue('')
    this.dataBaseVersions = []
    this.dataBaseList.forEach(c => {
      if (c.databaseName == value) {
        this.dataBaseVersions.push(c.databaseVersion)
      }
    })    
  }

  async postDate(){
    this.loading = true
    try{
      let params = Object.assign(this.projectInfo,this.myForm.value)
      await this._projectEditService.updateProject(params)   
      this.loading = false
    }catch(err){
      this.loading = false
    }     
  }
}
