import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { UnitBaseInfoService } from '../unit-base-info.service';
import { FormErrorMessageService } from '../../../core/services/formErrorMessage.service';
@Component({
    selector: 'edit-unit-base-info-dialog',
    templateUrl: 'editUnitBase.dialog.html',
})
export class editUnitBaseInfoDialog {
    loading : boolean = false;
    unitInfo : any;
    myForm : FormGroup;
    unitStyleLists : Array<any> = [
        {displayName:'事业',value:'2'},
        {displayName:'机关',value:'1'},
        {displayName:'企业',value:'3'},
        {displayName:'团体',value:'4'},
        {displayName:'其他',value:'5'}
    ]
    constructor(
        private _unitBaseInfoService : UnitBaseInfoService,
        public dialogRef: MatDialogRef<editUnitBaseInfoDialog>,
        private fb: FormBuilder,
        public _formErrorMessageService : FormErrorMessageService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
       this.createForm()
       this.getUnitDetailInfo()
    }

    getUnitDetailInfo(){
        this.loading = true
        this.unitInfo = this.data.unitInfo
        for( let key in this.myForm.controls){     
            this.myForm.controls[key].setValue(this.unitInfo[key])
        }   
        this.loading = false
    }

    createForm() {
        this.myForm = this.fb.group({
            unitCode : ['',[Validators.required]],
            unitDisplayName  : ['', [Validators.required]],
            fonds : ['',[Validators.required]],
            unitOfficer : ['',[Validators.required]],
            unitStyle : [''],
            unitAddress : [''],
            unitTel : [''],
            unitFax : [''],
            unitEmail : ['',[Validators.email]],
            postcode : [''],
            unitUrl : ['']
        });
    }

    postDate(){
        console.log(this.myForm)
    }

}
