import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormErrorMessageService } from '../../../../core/services/formErrorMessage.service';
import { ProjectListManageService } from '../../project-list.service';
@Component({
    selector: 'new-project-dialog',
    templateUrl: 'newProject.dialog.html',
})
export class newProjectDialog {
    loading : boolean = false;
    myForm : FormGroup;
    dataBaseList : Array<any> = [];
    dataBaseDisplayLists : Array<any> = [];
    dataBaseVersions : Array<any> = [];
    constructor(
        private _projectListManageService : ProjectListManageService,
        private fb: FormBuilder,
        public _formErrorMessageService : FormErrorMessageService,
        public dialogRef: MatDialogRef<newProjectDialog>,
        @Inject(MAT_DIALOG_DATA) public data
    ){
        this.createForm();
        this.getDataBaseList();
    }

    createForm() {
        let myDate = new Date()
        let businessCode = 'IA' +
        myDate.getFullYear().toString() +
        (myDate.getMonth() + 1).toString() +
        myDate.getDate().toString() +
        Date.parse(myDate.toString()).toString()
        this.myForm = this.fb.group({
            projectName: ['', [Validators.required]],
            businessCode : [businessCode],
            systemName: [''],
            databaseName : ['',[Validators.required]],
            databaseVersion : ['',[Validators.required]],
            extractionMethod : ['0',[Validators.required]]
        });
    }
    // 提交表单函数
    async postDate() {
        if(!this.myForm.valid){
            return                         
        }
        this.loading = true
        try{            
            let res = await this._projectListManageService.newProject(this.myForm.value)
            this.loading = false
            this.dialogRef.close(true)
        }catch(err){
            this.loading = false
        }
        
    }

    async getDataBaseList(){        
        let res = await this._projectListManageService.getDataBaseList()
        this.dataBaseList = res 
        this.dataBaseDisplayLists = []
        this.dataBaseList.forEach(c=>{
            if (this.dataBaseDisplayLists.indexOf(c.databaseName) == -1){
                this.dataBaseDisplayLists.push(c.databaseName)
            }
        })
    }

    async loadDataBaseVersion({value}){
        this.myForm.controls.databaseVersion.setValue('')
        this.dataBaseVersions = []
        this.dataBaseList.forEach(c=>{
            if(c.databaseName == value){
                this.dataBaseVersions.push(c.databaseVersion)
            }
        })
    }
}