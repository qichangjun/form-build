import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UnitManageService } from './unit-manage.service';
import { Router,ActivatedRoute } from '@angular/router';
import { removeUnitDialog } from './dialog/removeUnit/removeUnit.dialog';
import { editUnitDialog } from './dialog/editUnit/editUnit.dialog';
import { addUnitDialog } from './dialog/addUnit/addUnit.dialog';
@Component({
  selector: 'app-unit-manage',
  templateUrl: './unit-manage.component.html',
  styleUrls: ['./unit-manage.component.css']
})
export class UnitManageComponent implements OnInit {
  gridStorageName : string = 'unitManager'
  totalElement : number = 1;
  parameter = {
    currentPage : 1    
  }
  gridOptions: GridOptions = {      
    suppressRowClickSelection: true,
    suppressCellSelection: true,
    enableColResize: true,
    context: {
      componentParent: this
    },
    columnDefs : [],
    rowData : [],
    overlayLoadingTemplate: '<span class="ag-overlay-loading-center">正在加载数据中...</span>',
    overlayNoRowsTemplate: '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">没有数据</span>',
    onGridReady : ()=>{
      this.gridOptions.api.showLoadingOverlay()
      this.gridOptions.api.sizeColumnsToFit();
    },
    onColumnResized:(e)=>{        
      let columnState = JSON.stringify(this.gridOptions.columnApi.getColumnState());        
      window.localStorage.setItem(this.gridStorageName,columnState)
    },
    onDragStopped:(e)=>{        
      let columnState = JSON.stringify(this.gridOptions.columnApi.getColumnState());
      window.localStorage.setItem(this.gridStorageName,columnState)
    }
  }
  routerSubscription : any;
  constructor(
    private route: ActivatedRoute,    
    private router: Router,
    public dialog: MatDialog,
    private _unitManageService : UnitManageService
  ) { 
    this.routerSubscription = this.route.queryParams.subscribe((data: any)=>{      
      this.parameter = Object.assign(this.parameter,data)
      this.getList()
    })
  }

  ngOnInit() {  
  }

  async getList(){
    if (this.gridOptions.api) {
      this.gridOptions.api.setRowData([]) 
      this.gridOptions.api.showLoadingOverlay()      
    } 
    try{
      let res = await this._unitManageService.getUnitLists();      
      let columnState = localStorage.getItem(this.gridStorageName)
      this.gridOptions.api.setColumnDefs(this._unitManageService.getUnitColumnDefs());  
      if (columnState) {
        columnState = JSON.parse(columnState);    
        this.gridOptions.columnApi.setColumnState(columnState)  
      } 
      this.gridOptions.api.setRowData(res.unitList)       
      this.totalElement = res.pageInfo.totalCount
      this.gridOptions.api.hideOverlay()
      this.gridOptions.api.sizeColumnsToFit();
      if(res.unitList.length == 0){
        this.gridOptions.api.showNoRowsOverlay()
      }
    }catch(err){
      console.error(err)
      this.gridOptions.api.setRowData([]) 
      this.gridOptions.api.setColumnDefs(this._unitManageService.getUnitColumnDefs());    
      this.gridOptions.api.hideOverlay()
    }    
  }

  editUnit(row){
    const dialogRef = this.dialog.open(editUnitDialog,{data:{unitGroupName:row.unitGroupName}});
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
      }      
    })
  }

  deleteUnit(row){    
    const dialogRef = this.dialog.open(removeUnitDialog,{data:{unitGroupName:row.unitGroupName}});
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
      }      
    })
  }

  addUnit(){
    const dialogRef = this.dialog.open(addUnitDialog);
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
      }      
    })
    
  }
}
