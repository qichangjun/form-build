import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UtilService } from '../../../../core/services/util.service';
import * as _ from 'lodash';
@Component({
    selector: 'edit-custom-data-dialog',
    templateUrl: 'editCustomData.dialog.html',
})
export class editCustomDataDialog {
    typeLists = [
        {
          value : 'date',
          name : '日期型'
        },{
          value : 'string',
          name : '字符串'
        },{
          value : 'int',
          name : '整数'
        },{
          value : 'boolean',
          name : '布尔型'
    }]
    entity = []
    containerId = undefined
    systemAttrs = []
    constructor(
        private _utilService : UtilService,
        public dialogRef: MatDialogRef<editCustomDataDialog>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.entity = _.cloneDeep(this.data.noSysattrRules)
        this.containerId = this.data.containerId
        this.systemAttrs = this.data.sysattrRules
        this.systemAttrs.forEach((c)=>{
            if (c['-nullAble'] == 'true' || c['-nullAble'] == true) c['-nullAble'] = 'true'
            else c['-nullAble'] = 'false'
        })
        this.systemAttrs.sort(this._utilService.sortArrBy("-title"))
    }

    save(){
        let attrName_List = _.map(this.entity,'-name')  
        if (this._utilService.isArrRepeat(attrName_List) && !this._utilService.hasEmpty(attrName_List)){
            this.dialogRef.close({
                sysattrRules:this.data.sysattrRules,noSysattrRules:this.entity
            })
        }else{
            alert('不能为空或重复')
        }
    }

    addCustomData(){
        this.entity.push(
            {
              '-type' : 'string',
              '-title' : '',
              '-name':'',
              '-maxLength' : 1,
              '-nullAble' : 'false',
              '-sys' : "false"
            }
        )
    }

    deleteCustomdata(index){
        this.entity.splice(index,1)
    }        

}