import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { ArchiveManagementService } from '../../archivesManagement.service';
@Component({
    selector: 'remove-category-dialog',
    templateUrl: 'deleteCategory.dialog.html',
})
export class removeCategoryDialog {
    loading : boolean = false;
    constructor(
        private _archiveManagementService : ArchiveManagementService,
        public dialogRef: MatDialogRef<removeCategoryDialog>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
       
    }

    async removeCategory(){
        this.loading = true 
        await this._archiveManagementService.removeCategory(this.data.id)
        this.dialogRef.close(true)
    }

}