import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormErrorMessageService } from '../../../../core/services/formErrorMessage.service';
import * as _ from 'lodash';
import { DepartManageService } from '../../depart-manage.service';
@Component({
    selector: 'edit-depart-dialog',
    templateUrl: 'editDepart.dialog.html',
})
export class editDepartDialog {
    loading : boolean = false;
    myForm : FormGroup;
    departInfo : any = {}
    userLists : Array<any> = []
    constructor(
        private _departManageService : DepartManageService,
        public dialogRef: MatDialogRef<editDepartDialog>,
        private fb: FormBuilder,
        public _formErrorMessageService : FormErrorMessageService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
       this.createForm()
       this.getUnitDetailInfo()
       this.getUserList()
    }

    async getUnitDetailInfo(){
        this.loading = true
        this.departInfo = this.data.departInfo 
        for( let key in this.myForm.controls){     
            this.myForm.controls[key].setValue(this.departInfo[key])
        }    
        this.loading = false
    }

    createForm() {
        this.myForm = this.fb.group({
            deptDisplayName: ['', [Validators.required]],
            deptOfficer : [''],
            deptFax  : [''],
            deptEmail : ['',[Validators.email]],
            deptNOCode : ['']         
        });
    }

    async getUserList(){
        this.userLists = await this._departManageService.getUserList(this.departInfo.deptGroupName)
    }

    postDate(){
        console.log(this.myForm)
    }

}
