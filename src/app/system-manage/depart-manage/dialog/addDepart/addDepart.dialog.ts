import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormErrorMessageService } from '../../../../core/services/formErrorMessage.service';
import * as _ from 'lodash';
import { DepartManageService } from '../../depart-manage.service';
@Component({
    selector: 'add-depart-dialog',
    templateUrl: 'addDepart.dialog.html',
})
export class addDepartDialog {
    loading : boolean = false;
    myForm : FormGroup;
    departInfo : any = {}
    userLists : Array<any> = []
    constructor(
        private _departManageService : DepartManageService,
        public dialogRef: MatDialogRef<addDepartDialog>,
        private fb: FormBuilder,
        public _formErrorMessageService : FormErrorMessageService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
       this.createForm()
    }

    createForm() {
        this.myForm = this.fb.group({
            deptDisplayName: ['', [Validators.required]],
            deptFax  : [''],
            deptEmail : ['',[Validators.email]],
            deptNOCode : ['']         
        });
    }

    postDate(){
        console.log(this.myForm)
    }

}
