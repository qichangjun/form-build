import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormErrorMessageService } from '../../../../core/services/formErrorMessage.service';
import * as _ from 'lodash';
import { UnitManageService } from '../../unit-manage.service';
@Component({
    selector: 'add-unit-dialog',
    templateUrl: 'addUnit.dialog.html',
})
export class addUnitDialog {
    loading : boolean = false;
    unitInfo : any;
    myForm : FormGroup;
    cooperativeGroupLists : Array<string> = [
        '第一协作组','第二协作组','第三协作组','第四协作组','第五协作组','第六协作组','第七协作组','第八协作组','第九协作组','第十协作组','第十一协作组'
    ]
    unitStyleLists : Array<any> = [
        {displayName:'事业',value:'2'},
        {displayName:'机关',value:'1'},
        {displayName:'企业',value:'3'},
        {displayName:'团体',value:'4'},
        {displayName:'其他',value:'5'}
    ]
    constructor(
        private _unitManageService : UnitManageService,
        public dialogRef: MatDialogRef<addUnitDialog>,
        private fb: FormBuilder,
        public _formErrorMessageService : FormErrorMessageService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
       this.createForm()
    }

    createForm() {
        this.myForm = this.fb.group({
            cooperativeGroup: ['', [Validators.required]],
            unitCode : ['',[Validators.required]],
            unitDisplayName  : ['', [Validators.required]],
            fonds : ['',[Validators.required]],
            unitOfficer : ['',[Validators.required]],
            unitStyle : [''],
            unitAddress : [''],
            unitTel : [''],
            unitFax : [''],
            unitEmail : ['',[Validators.email]],
            postcode : ['']
        });
    }

    postDate(){
        console.log(this.myForm)
    }

}
