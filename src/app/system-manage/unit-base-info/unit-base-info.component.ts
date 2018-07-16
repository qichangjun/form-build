import { Component, OnInit } from '@angular/core';
import { UnitBaseInfoService } from './unit-base-info.service';
import { AuthenticationService } from '../../core/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { editUnitBaseInfoDialog } from './dialog/editUnitBase.dialog';
@Component({
  selector: 'app-unit-base-info',
  templateUrl: './unit-base-info.component.html',
  styleUrls: ['./unit-base-info.component.css']
})
export class UnitBaseInfoComponent implements OnInit {
  unitInfo : any = {}
  constructor(
    public dialog: MatDialog,
    private _AuthenticationService : AuthenticationService,
    private _unitBaseInfoService : UnitBaseInfoService
  ) { 
    this.getUnitInfo()
  }

  ngOnInit() {
  }

  async getUnitInfo(){
    let info = this._AuthenticationService.getUnitInfo()    
    this.unitInfo = await this._unitBaseInfoService.getDetailInfo(info.unitGroupName)
  }

  editBaseInfo(){
    const dialogRef = this.dialog.open(editUnitBaseInfoDialog,{data:{unitInfo:this.unitInfo}});
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getUnitInfo()
      }      
    })
  }
}
