import { Component, OnInit,OnDestroy } from '@angular/core';
import { GridOptions } from "ag-grid";
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileSelectDirective, FileDropDirective, FileUploader, FileUploaderOptions } from 'ng2-file-upload/ng2-file-upload';
import { ConfigService } from '../core/services/config.service';
import { ApiUrlService } from '../core/services/api.service';
import { AuthenticationService } from '../core/services/auth.service';
import { EventService } from '../core/services/event.service';
import { FileManageService } from './file-manage.service';
import { defaultUrlMatcher } from '@angular/router/src/shared';
import { Options as zTreeOption } from '../share/component/z-tree/option.class';
@Component({
  selector: 'app-file-manage',
  templateUrl: './file-manage.component.html',
  styleUrls: ['./file-manage.component.css']
})
export class FileManageComponent implements OnInit,OnDestroy {
  gridStorageName : string = 'fileManage'
  totalElement : number = 1;
  routerSubscription : any;
  ids : Array<any>;
  zTreeOption : zTreeOption
  parameter = {
    currentPage : 1,
    ids : '0',
    objectType : 'dw_class',
    currentFileType : 'dw_class'
  }
  public uploader: FileUploader;
  gridOptions: GridOptions = {      
    suppressRowClickSelection: true,
    suppressCellSelection: true,
    rowSelection: 'multiple',
    enableColResize: true,
    enableServerSideSorting : true,      
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
      window.localStorage.setItem(this.parameter.objectType + this.gridStorageName,columnState)
    },
    onDragStopped:(e)=>{        
      let columnState = JSON.stringify(this.gridOptions.columnApi.getColumnState());
      window.localStorage.setItem(this.parameter.objectType + this.gridStorageName,columnState)
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
    },
    onRowDoubleClicked:(event)=>{      
      this.clickName(event.data)
    }
  }
  breadCrumbLists : Array<any> = [];
  constructor(
    public dialog: MatDialog,    
    private route: ActivatedRoute,    
    private router: Router,
    private _configService : ConfigService,
    private _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    private _EventService : EventService,
    private _fileManageService : FileManageService
  ) {
    this.zTreeOption  = {
      treeId : 'fileManageTree',
      async : {
        dataType:"jsonp",
        url : 'http://122.227.101.16/ermsapi/category/tree',
        otherParam : {
          accessToken : this._authenticationService.getCurrentUser().accessToken,
          accessUser : this._authenticationService.getCurrentUser().accessUser,
          showFile: false          
        },
        autoParam:["id=parentId"]
      }   
    }
    this.routerSubscription = this.route.queryParams.subscribe((params: any)=>{      
      this.ids = params.ids ? params.ids.split('.') : [this._authenticationService.getArchiveFileInfo().objectId]   
      this.parameter = Object.assign(this.parameter,params)   
      this.parameter.ids = this.ids.join('.')
      this.getList()
      this.getBreadCrumb()
    })
  }
  ngOnDestroy(){
    this.routerSubscription.unsubscribe()
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
    let res = await this._fileManageService.getFileLists(this.parameter,this.ids[this.ids.length - 1]);       
    this.loadColumnDefs() 
    this.gridOptions.api.setRowData(res.resultSet) 
    this.gridOptions.api.hideOverlay()
    if(res.resultSet.length == 0){
      this.gridOptions.api.showNoRowsOverlay()
    }
  }

  async getBreadCrumb(){
    let res = await this._fileManageService.getBreadCrumb(this.parameter.ids)
    this.breadCrumbLists = res.resultSet
  }

  loadColumnDefs(){
    switch(this.parameter.objectType){
      case 'dw_class':
        this.gridOptions.api.setColumnDefs(this._fileManageService.getCategoryColumnDefs());
        break;
      default :
        this.gridOptions.api.setColumnDefs(this._fileManageService.getCategoryColumnDefs());
        break;
    }   
    let columnState = localStorage.getItem(this.parameter.objectType + this.gridStorageName)
    if (columnState) {
      columnState = JSON.parse(columnState);    
      this.gridOptions.columnApi.setColumnState(columnState)  
      return 
    }  
    this.gridOptions.api.sizeColumnsToFit();
  }

  clickName(data){
    this.parameter.objectType = data.objectType
    this.parameter.ids = this.parameter.ids + '.' + data.objectId
    this.router.navigate([],{queryParams:this.parameter})        
  }

  clickTreeEvent(event){      
    event.ids.unshift(this._authenticationService.getArchiveFileInfo().objectId)
    let strIds = event.ids.join('.')
    this.parameter.objectType = event.node.objectType    
    this.parameter.ids = strIds
    this.router.navigate([], { queryParams: this.parameter});    
  }

  clickTreeOrBreadCrumb({ids,node}){    
    let strIds = ids.join('.')
    this.parameter.objectType = node.objectType    
    this.parameter.ids = strIds
    this.router.navigate([], { queryParams: this.parameter});  
  }
}
