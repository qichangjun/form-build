import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
@Component({
    selector: 'update-name-dialog',
    templateUrl: 'updateName.dialog.html',
})
export class updateNameDialog {
    type = undefined
    canRepeat = undefined
    nullAble = undefined
    name = undefined
    constructor(
        public dialogRef: MatDialogRef<updateNameDialog>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.type = this.data.type
        this.canRepeat = this.data.canRepeat
        this.nullAble = this.data.required
        if (this.canRepeat == 'true' || this.canRepeat == true) this.canRepeat = true
        else this.canRepeat = false
        if (this.nullAble == 'true' || this.nullAble == true) this.nullAble = true
        else this.nullAble = false
        _.remove(this.data.brothersName,(c)=>{
            return c == this.data.name
        })
        this.name = this.data.name
    }

    update(){
       this.dialogRef.close({
           name : this.name,
           canRepeat : this.canRepeat,
           required : this.nullAble
       })
    }

}