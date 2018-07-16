import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { UserManageService } from '../../userManage.service';
@Component({
    selector: 'frozen-user-dialog',
    templateUrl: 'frozenUser.dialog.html',
})
export class frozenUserDialog {
    loading : boolean = false;
    constructor(
        private _userManageService : UserManageService,
        public dialogRef: MatDialogRef<frozenUserDialog>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
       
    }

    async freezeUser(){
        this.loading = true 
        await this._userManageService.changeState(this.data.row)
        this.dialogRef.close(true)
    }

}