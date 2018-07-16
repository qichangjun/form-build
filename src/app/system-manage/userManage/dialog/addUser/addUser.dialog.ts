import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormErrorMessageService } from '../../../../core/services/formErrorMessage.service';
import * as _ from 'lodash';
import { UserManageService } from '../../userManage.service';
import { AuthenticationService } from '../../../../core/services/auth.service';
@Component({
    selector: 'add-user-dialog',
    templateUrl: 'addUser.dialog.html',
})
export class addUserDialog {
    loading : boolean = false;
    userInfo : any;
    myForm : FormGroup;
    deptGroupList : Array<any> = [];
    roleNameLists : Array<any> = [];
    constructor(
        private _userManageService : UserManageService,
        public dialogRef: MatDialogRef<addUserDialog>,
        private fb: FormBuilder,
        public _formErrorMessageService : FormErrorMessageService,
        public _authenticationService : AuthenticationService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
       this.createForm()
       this.getDept()

    }

    getUnitFonds(){
        let fonds = this._authenticationService.getUnitInfo().fonds        
        this.roleNameLists = [
            {value:`${fonds}_admin`,displayName:'单位管理员'},
            {value:`${this.userInfo.deptGroupName}_pst`,displayName:'单位兼职档案员'},
            {value:`${fonds}_ouser`,displayName:'普通用户'},
            {value:`${fonds}_ast`,displayName:'单位档案员'},
            {value:`${fonds}_auditor`,displayName:'单位审计员'}
        ]
    }

    async getDept(){
        this.deptGroupList = await this._userManageService.getDept()
    }

    createForm() {
        this.myForm = this.fb.group({
            userDisplayName: ['', [Validators.required]],
            userPassword : ['',[Validators.required,Validators.minLength(6)]],
            userAddress : ['',[Validators.email]],
            telphone : [''],
            deptGroupName : ['',[Validators.required]],
            roleName : ['',[Validators.required]],
            deptOfficer : [''],
            userCode : ['']    
        });
    }

    postDate(){
        console.log(this.myForm)
    }

}
