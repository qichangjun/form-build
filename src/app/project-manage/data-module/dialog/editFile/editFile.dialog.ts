import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { UtilService } from '../../../../core/services/util.service';
@Component({
    selector: 'edit-file-dialog',
    templateUrl: 'editFile.dialog.html',
})
export class editFileDialog {
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
    fileLists = []
    currentFile = 0
    currentFileId = 0
    constructor(
        private _utilService : UtilService,
        public dialogRef: MatDialogRef<editFileDialog>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.fileLists = _.cloneDeep(this.data.fileLists)
        this.fileLists.forEach(c=>{
            if(c['-required']=='true' || c['-required'] == true) c['-required'] = true                
            else c['-required'] = false
            c.property = c.property || []
            if (!Array.isArray(c.property)) c.property = [c.property]                 
            c.sysAttr = c.property.filter(item=> item['-sys'] == 'true') || []
            c.sysAttr.forEach(sys=>{
                if (sys['-nullAble'] == 'true' || sys['-nullAble'] == true) sys['-nullAble'] = 'true'
                else sys['-nullAble'] = 'false'
            })
            c.customAttr = c.property.filter(item=>item['-sys'] == 'false') || []
        })
        this.currentFileId = 0        
    }

    save(){
        this.fileLists.forEach(c=>{
            let attrName_List = _.map(c.customAttr,'-name')            
            if (!this._utilService.isArrRepeat(attrName_List) || this._utilService.hasEmpty(attrName_List)){
                alert('不能有空。或重复的名字')
                return 
            }
            this.fileLists.forEach(c=>{
                c.property = _.concat(_.cloneDeep(c['sysAttr']),_.cloneDeep(c.customAttr))
                delete(c.sysAttr)
                delete(c.customAttr)
            })
            this.dialogRef.close(this.fileLists)
        })
    }
    changeFile(i){
        this.currentFile = i
    }

    addCustomData(){
        this.fileLists[this.currentFileId].customAttr.push(
            {
              '-type' : 'string',
              '-maxLength' : 255,
              '-name':'',
              '-title' : '',
              '-nullAble' : 'false',
              '-sys' : 'false'
            }
        )
    }

    deleteCustomdata(index){
        this.fileLists[this.currentFileId].customAttr.splice(index,1)
    }        

    deleteFile(){
        this.fileLists.splice(this.currentFileId,1)
        if (this.fileLists.length == 0) this.dialogRef.close(this.fileLists)
        else this.currentFileId = 0
    }
        
}