import { Component, OnInit } from '@angular/core';
import { ProjectListManageService } from './project-list.service';
import { Router } from '@angular/router';
import { newProjectDialog } from './dialog/newProject/newProject.dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListManageComponent implements OnInit {
  projectList : Array<any> = []
  loading : boolean = false;
  constructor(
    public dialog: MatDialog,
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

  newProject(){
    const dialogRef = this.dialog.open(newProjectDialog);
    dialogRef.afterClosed().subscribe(res => {
      if(!res){
        return
      }
      this.getProjectList()
    });
  }

  async deleteProject(event,item,index){
    event.stopPropagation()
    let res = await Swal({
      title: '删除项目',
      text: '确定要删除该项目吗',
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#40B98E",
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
    if(res.value){
      this.loading = true 
      try{
        await this._ProjectListManageService.deleteProject(item.id)
        this.projectList.splice(index,1)
        this.loading = false
      }catch(err){
        this.loading = false
      }            
    }
  }
}
