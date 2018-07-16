import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { UnitManageService } from '../../unit-manage.service';
@Component({
    selector: 'remove-unit-dialog',
    templateUrl: 'removeUnit.dialog.html',
})
export class removeUnitDialog {
    loading : boolean = false;
    constructor(
        private _unitManageService : UnitManageService,
        public dialogRef: MatDialogRef<removeUnitDialog>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
       
    }

    async removeUnit(){
        this.loading = true 
        await this._unitManageService.deleteUnit(this.data.unitGroupName)
        this.dialogRef.close(true)
    }

}