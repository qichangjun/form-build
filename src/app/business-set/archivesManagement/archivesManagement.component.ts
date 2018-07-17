import { Component, OnInit} from '@angular/core';
import { Options as zTreeOption } from '../../share/component/z-tree/option.class';
import { AuthenticationService } from '../../core/services/auth.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ArchiveManagementService } from './archivesManagement.service';
import { addCategoryDialog } from './dialog/addCategory/addCategory.dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventService } from '../../core/services/event.service';
import { removeCategoryDialog } from './dialog/deleteCategory/deleteCategory.dialog';
declare var $ : any;
@Component({
  selector: 'app-archive-manage',
  templateUrl: './archivesManagement.component.html',
  styleUrls: ['./archivesManagement.component.scss']
})
export class ArchiveManageComponent implements OnInit {
  loading : boolean = false;
  zTreeOption : zTreeOption
  ids : Array<any>;
  parameter : {
    ids : string;
  }
  queryParamsSubscription : any;
  nodeInfo : any
  policyList : Array<any> = []
  retentionPeriodList : Array<any> = []
  formInput = [{
    displayName:'类目编号',
    value : 'classId',
    type : 'text'
  },{
    displayName:'类目名称',
    value : 'className',
    type : 'text'
  },{
    displayName:'保管期限',
    value : 'retentionPeriod',
    type : 'select'
  },
  {
    displayName:'保管策略',
    value : 'retentionPolicyName',
    type : 'select'
  },{
    displayName:'类目说明',
    value : 'description',
    type : 'textarea'
  }]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _authenticationService : AuthenticationService,
    private _archiveManagementService : ArchiveManagementService,
    public dialog: MatDialog,
    public _EventService : EventService
  ) {
    this.zTreeOption  = {
      treeId : 'archiveTree',
      async : {
        dataType:"jsonp",
        url : 'http://122.227.101.16/ermsapi/category/tree',
        otherParam : {
          accessToken : this._authenticationService.getCurrentUser().accessToken,
          accessUser : this._authenticationService.getCurrentUser().accessUser,
          showFile: false          
        },
        autoParam:["id=parentId"]
      },
      view : {
        addHoverDom: this.addHoverDom.bind(this),
        removeHoverDom : this.removeHoverDom
      }        
    }
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.ids = params.ids ? params.ids.split('.') : [this._authenticationService.getArchiveFileInfo().objectId]      
      this.parameter = {ids:this.ids.join('.')}  
      if(this.ids.length > 1){
        this.getCategoryInfo(this.ids[this.ids.length - 1])
      }      
    })
   }

  ngOnInit() { 
  }

  clickTreeEvent(event){      
    event.ids.unshift(this._authenticationService.getArchiveFileInfo().objectId)
    let strIds = event.ids.join('.')
    this.parameter.ids = strIds
    this.router.navigate([], { queryParams: this.parameter});    
  }

  async getCategoryInfo(id){
    this.loading = true
    try{
      let policyLists = await this._archiveManagementService.getPolicy()    
      policyLists.customList = policyLists.customList || []
      policyLists.systemList = policyLists.systemList || []
      this.policyList = policyLists.customList.concat(policyLists.systemList)
      let res = await this._archiveManagementService.getNodeInfo(id)
      this.nodeInfo = res.categoryInfo
      let retentionPeriodList = await this._archiveManagementService.getRetentionPeriod(this.nodeInfo.collectionWay)
      this.retentionPeriodList = []
      retentionPeriodList.forEach(c => {
        if(c.overAll == false && c.fondsId == this._authenticationService.getUnitInfo().fonds){
          this.retentionPeriodList.push(c)
        }
      });
      var addReta = true 
      for (let i = 0; i < this.retentionPeriodList.length;i++){
        if (this.retentionPeriodList[i].retentionPeriodCode == this.nodeInfo.retentionPeriod){
          addReta = false
          break
        }else{
          addReta = true 
        }
      }
      if (addReta){
        this.retentionPeriodList.push({retentionPeriodCode:this.nodeInfo.retentionPeriod,retentionPeriodName:this.nodeInfo.retentionPeriodName})
      }
      this.initForm()
      this.loading = false
    }catch(err){
      this.loading = false
    }    
  }

  initForm(){
    $.fn.editable.defaults.mode = 'inline';
    $.fn.editable.defaults.emptytext = '无';
    let _self = this
    for (let i = 0; i < this.formInput.length;i++){
      let option = {
        type : this.formInput[i].type   
      }
      if (this.formInput[i].value == 'retentionPolicyName'){
        let source = []
        this.policyList.forEach(c=>{
          source.push({'text':c.renPolicyName,'value':c.renPolicyName})
        })
        option['source'] = source
      }
      if (this.formInput[i].value == 'retentionPeriod'){
        let source = []
        this.retentionPeriodList.forEach(c=>{
          source.push({'text':c.retentionPeriodName,'value':c.retentionPeriodCode})
        })
        option['source'] = source
      }
      $('#' + this.formInput[i].value).editable(option).on('save',function(e,params){                
        _self.nodeInfo[this.id] = params.newValue
        _self.updateCategory.call(_self)        
      })
      $('#' + this.formInput[i].value).editable('setValue', this.nodeInfo[this.formInput[i].value])
    }
  }

  addCategory(id?){
    let parentId = this.ids[this.ids.length - 1]
    if (id){
      parentId = id
    }
    const dialogRef = this.dialog.open(addCategoryDialog,{data:{id:parentId}});
    dialogRef.afterClosed().subscribe(res => {
      if (res){        
        this.zTreeOption = Object.assign({},this.zTreeOption)
      }      
    })
  }

  addHoverDom(treeId,treeNode){
    if (treeNode.dataSync !== true){
      let aObj = $("#" + treeNode.tId + "_a");
      if($("#diyBtn_"+treeNode.id).length > 0){
        return 
      }
      let editStr ="<span style=''  id='diyBtn_" + treeNode.id + "' title='"+treeNode.name+"' onfocus='this.blur();'  ></span>"+
              "<span style='color:red;' id='diyBtn3_" + treeNode.id + "' title='删除' onfocus='this.blur();' class='button archives--management-delete--icon' ></span>"+
              "<span style='color:green;' id='diyBtn2_" + treeNode.id + "' title='新建' onfocus='this.blur();'  class='button archives--management-add--icon' ></span>";
      aObj.append(editStr)
      let add = $("#diyBtn2_" + treeNode.id)
      if (add){
        add.bind("click",(e)=>{   
          e.stopPropagation()       
          this.addCategory(treeNode.id)
        })
      }
      let deletes = $("#diyBtn3_" + treeNode.id)
      if (deletes){
        deletes.bind("click",(e)=>{
          e.stopPropagation()
          const dialogRef = this.dialog.open(removeCategoryDialog,{data:{id:treeNode.id}});
          dialogRef.afterClosed().subscribe(res => {
            if (res){        
              let index = this.ids.indexOf(treeNode.id)
              if (index !== -1){
                this.ids = this.ids.slice(0,index)
                this.parameter.ids = this.ids.join('.')
                this.router.navigate([], { queryParams: this.parameter});
              }                             
              this._EventService.toggleEvent({ type: 'ztree:refreshNode', value: {id:treeNode.id} })
            }      
          })
        })
      }
    }
  }

  removeHoverDom(treeId,treeNode){
    $("#diyBtn_"+treeNode.id).unbind().remove();
    $("#diyBtn2_"+treeNode.id).unbind().remove();
    $("#diyBtn3_"+treeNode.id).unbind().remove();
    $("#diyBtn_space_" +treeNode.id).unbind().remove();
  }

  async updateCategory(){
    try{
      let res = await this._archiveManagementService.updateCategory(this.nodeInfo)
      this.zTreeOption = Object.assign({},this.zTreeOption)
    }catch(err){
      this.getCategoryInfo(this.nodeInfo.objectId)
    }    
  }
}
