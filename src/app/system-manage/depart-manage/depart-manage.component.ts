import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DepartManageService } from './depart-manage.service';
import { editDepartDialog } from './dialog/editDepart/editDepart.dialog';
import { addDepartDialog } from './dialog/addDepart/addDepart.dialog';

@Component({
  selector: 'app-depart-manage',
  templateUrl: './depart-manage.component.html',
  styleUrls: ['./depart-manage.component.css']
})
export class DepartManageComponent implements OnInit {
  gridStorageName : string = 'departManage'
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
  parameter = {
    currentPage : 1    
  }
  constructor(
    private _departManageService : DepartManageService,
    public dialog: MatDialog,
  ) {
    this.getList()
  }

  ngOnInit() {
  }

  async getList(){
    if (this.gridOptions.api) {
      this.gridOptions.api.setRowData([]) 
      this.gridOptions.api.showLoadingOverlay()      
    }    
    try{
      let res = await this._departManageService.getDepartLists();
      let columnState = localStorage.getItem(this.gridStorageName)
      this.gridOptions.api.setColumnDefs(this._departManageService.getDepartColumnDefs());  
      if (columnState) {
        columnState = JSON.parse(columnState);    
        this.gridOptions.columnApi.setColumnState(columnState)  
      } 
      this.gridOptions.api.setRowData(res)       
      this.gridOptions.api.hideOverlay()
      if(res.length == 0){
        this.gridOptions.api.showNoRowsOverlay()
      }
    }catch(err){
      console.error(err)
      this.gridOptions.api.setRowData([]) 
      this.gridOptions.api.setColumnDefs(this._departManageService.getDepartColumnDefs());    
      this.gridOptions.api.hideOverlay()
    } 
  }

  addDepart(){
    const dialogRef = this.dialog.open(addDepartDialog);
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
      }      
    })
  }

  editDepart(row){
    const dialogRef = this.dialog.open(editDepartDialog,{data:{departInfo:row}});
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
      }      
    })
  }

  removeDepart(row){        
  }
}
