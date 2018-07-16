import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";
import { UserManageService } from './userManage.service';
import { Router,ActivatedRoute } from '@angular/router';
import { editUserDialog } from './dialog/editUser/editUser.dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { frozenUserDialog } from './dialog/frozenUser/frozenUser.dialog';
import { addUserDialog } from './dialog/addUser/addUser.dialog';
import { FileSelectDirective, FileDropDirective, FileUploader, FileUploaderOptions } from 'ng2-file-upload/ng2-file-upload';
import { ConfigService } from '../../core/services/config.service';
import { ApiUrlService } from '../../core/services/api.service';
import { AuthenticationService } from '../../core/services/auth.service';
import { EventService } from '../../core/services/event.service';
@Component({
  selector: 'user-manage',
  templateUrl: './userManage.component.html',
  styleUrls: ['./userManage.component.scss'],
  providers:[UserManageService]
})
export class UserManageComponent implements OnInit {
  gridStorageName : string = 'userManager'
  totalElement : number = 1;
  routerSubscription : any;
  parameter = {
    currentPage : 1,
    userState : 0
  }
  public uploader: FileUploader;
  gridOptions: GridOptions = {      
    suppressRowClickSelection: true,
    suppressCellSelection: true,
    // rowSelection: 'multiple',
    enableColResize: true,
    // enableServerSideSorting : true,      
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
    }, 
    onSortChanged:(e)=>{        
      console.log(this.gridOptions.api.getSortModel())
    },
    onRowClicked: (event)=>{
      if(event.node.isSelected()){
        event.node.setSelected(false, false);
      } else {
        event.node.setSelected(true);
      }
    }
  }
  constructor(
    public dialog: MatDialog,
    private _userManageService : UserManageService,
    private route: ActivatedRoute,    
    private router: Router,
    private _configService : ConfigService,
    private _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    private _EventService : EventService
  ) { 
    this.routerSubscription = this.route.queryParams.subscribe((data: any)=>{      
      this.parameter = Object.assign(this.parameter,data)
      this.getList()
    })
  }

  ngOnInit() {   
    this.initUpload() 
  }

  initUpload(){
    function openUploadWindow() {
      let navigationExtras: any = { outlets: { uploadFile: 'uploadFile' } };
      this.router.navigate([navigationExtras], { preserveQueryParams: true });
    }
    this.uploader = new FileUploader({
      autoUpload: true,
      url: this._configService.ermsApiUrl() + this._apiUrlService['upload'],
      additionalParameter: {
        accessToken: this._authenticationService.getCurrentUser().accessToken,
        accessUser: this._authenticationService.getCurrentUser().accessUser
      }
    });
    this.uploader.onAfterAddingAll = (files) => {
      openUploadWindow.call(this)
      this._EventService.toggleEvent({ type: 'select', value: this.uploader })
    }
    this.uploader.onCompleteAll = ()=> {
      this.getList()
    }
    this.uploader.onSuccessItem = async (item,res)=>{ 
      if (res){
        let data = JSON.parse(res)
        if (data.code == 1){
              await this._userManageService.importUser(data.storagePath)
              return        
        }
      }
      item.isSuccess = false
        item.isError = true
    }
  }

  async getList(){
    if (this.gridOptions.api) {
      this.gridOptions.api.setRowData([]) 
      this.gridOptions.api.showLoadingOverlay()      
    }    
    try{
      let res = await this._userManageService.getUserLists(this.parameter);
      let columnState = localStorage.getItem(this.gridStorageName)
      this.gridOptions.api.setColumnDefs(this._userManageService.getUserColumnDefs());  
      if (columnState) {
        columnState = JSON.parse(columnState);    
        this.gridOptions.columnApi.setColumnState(columnState)  
      } 
      this.gridOptions.api.setRowData(res.resultSet)       
      this.totalElement = res.pageInfo.totalCount
      this.gridOptions.api.hideOverlay()
      if(res.resultSet.length == 0){
        this.gridOptions.api.showNoRowsOverlay()
      }
    }catch(err){
      this.gridOptions.api.setRowData([]) 
      this.gridOptions.api.setColumnDefs(this._userManageService.getUserColumnDefs());    
      this.gridOptions.api.hideOverlay()
    }    
  }

  editUser(row){    
    const dialogRef = this.dialog.open(editUserDialog,{
      data:{
        row : row 
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
      }      
    })
  }

  frozenUser(row){
    const dialogRef = this.dialog.open(frozenUserDialog,{
      data:{
        row : row,
        type : 'freezeUser'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
      }      
    })
  }

  addUser(){
    const dialogRef = this.dialog.open(addUserDialog);
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
      }      
    })
  }
  
  changePage(e){
    this.router.navigate([],{queryParams:{currentPage:e}})    
  }
}
