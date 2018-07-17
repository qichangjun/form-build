import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormErrorMessageService } from '../../../../core/services/formErrorMessage.service';
import * as _ from 'lodash';
import { ArchiveManagementService } from '../../archivesManagement.service';
import { AuthenticationService } from '../../../../core/services/auth.service';
@Component({
    selector: 'add-category-dialog',
    templateUrl: 'addCategory.dialog.html',
})
export class addCategoryDialog {
    loading : boolean = false;
    unitInfo : any;
    myForm : FormGroup;
    policyList : Array<any> = []
    retentionPeriodList : Array<any> = []
    constructor(
        private _archiveManagementService : ArchiveManagementService,
        public dialogRef: MatDialogRef<addCategoryDialog>,
        private fb: FormBuilder,
        public _formErrorMessageService : FormErrorMessageService,
        private _authenticationService : AuthenticationService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
       this.createForm()
       this.getRetentionPeriod('individually')
       this.getPolicyList()
    }

    async getRetentionPeriod(collectionWay){
        let retentionPeriodList = await this._archiveManagementService.getRetentionPeriod(collectionWay)
        this.retentionPeriodList = []
        retentionPeriodList.forEach(c => {
            if(c.overAll == false && c.fondsId == this._authenticationService.getUnitInfo().fonds){
                this.retentionPeriodList.push(c)
            }
        });
    }

    async getPolicyList(){
        let policyLists = await this._archiveManagementService.getPolicy()    
        policyLists.customList = policyLists.customList || []
        policyLists.systemList = policyLists.systemList || []
        this.policyList = policyLists.customList.concat(policyLists.systemList) 
    }

    createForm() {
        this.myForm = this.fb.group({
            classId: ['', [Validators.required]],
            className : ['',[Validators.required]],
            collectionWay  : ['individually', [Validators.required]],
            retentionPeriod : ['',[Validators.required]],
            retentionPolicyName : ['',[Validators.required]],
            description : ['']
        });
    }

    postDate(){
        console.log(this.myForm)
        this.dialogRef.close(true)
    }

}
