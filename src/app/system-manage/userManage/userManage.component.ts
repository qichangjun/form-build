import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";
import { UserManageService } from './userManage.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'user-manage',
  templateUrl: './userManage.component.html',
  styleUrls: ['./userManage.component.scss'],
  providers:[UserManageService]
})
export class UserManageComponent implements OnInit {
  gridStorageName : string = 'fileBase'
  totalElement : number = 1;
  routerSubscription : any;
  parameter = {
    currentPage : 1
  }
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
    private _userManageService : UserManageService,
    private route: ActivatedRoute,    
    private router: Router
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
      let res = await this._userManageService.getUserLists();
      let columnState = localStorage.getItem(this.gridStorageName)
      this.gridOptions.api.setColumnDefs(this._userManageService.getUserColumnDefs());  
      if (columnState) {
        columnState = JSON.parse(columnState);    
        this.gridOptions.columnApi.setColumnState(columnState)  
      } 
      this.gridOptions.api.setRowData(res.content) 
      this.totalElement = res.totalElements
      this.gridOptions.api.hideOverlay()
    }catch(err){
      this.gridOptions.api.setColumnDefs(this._userManageService.getUserColumnDefs());    
      this.gridOptions.api.hideOverlay()
    }    
  }

  clickName(row){
    console.log(row)
  }
  changePage(e){
    this.router.navigate([],{queryParams:{currentPage:e}})    
  }
}
