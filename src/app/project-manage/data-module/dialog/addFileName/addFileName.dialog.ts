import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
    selector: 'add-file-name-dialog',
    templateUrl: 'addFileName.dialog.html',
})
export class addFileNameDialog {
    fileName : string = '';
    constructor(
        public dialogRef: MatDialogRef<addFileNameDialog>,
        @Inject(MAT_DIALOG_DATA) public data) { }

    

}