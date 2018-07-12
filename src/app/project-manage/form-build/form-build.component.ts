import { Component, OnInit,ViewChild } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-form-build',
  templateUrl: './form-build.component.html',
  styleUrls: ['./form-build.component.scss']
})
export class FormBuildComponent implements OnInit {
  @ViewChild('container') container: any;
  editingTile = null;
  radioButtonArray = [];
  widhtLength : Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12]
  contentTypes = [
    {displayName:'标题',value:'label'},
    {displayName:'输入框',value:'input'},
    {displayName:'单选框',value:'radio-button'},
    {displayName:'多选框',value:'check-box'},
    {displayName:'文本框',value:'text-area'},
    {displayName:'下拉菜单',value:'select'}
  ]
  tiles: Tile[] = [
    {labelName: '标题', cols: 3, rows: 1,contentType:'label',style:{}}
  ];

  constructor() { }

  ngOnInit() {
  }

  /**
   * 修改元素类型
   * @param contentType 'label','input','radiobutton'
   * 根据类型初始化属性
   */
  changeContentType(contentType){
    if(contentType == 'label'){
      this.editingTile.labelName = '标题'
    }else if (contentType == 'input') {
      this.editingTile.attrName = 'attr1'
    }else if (contentType == 'radio-button'){
      this.editingTile.attrName = 'attr1'
      this.editingTile.radioBtnAttrs = []
    }else if (contentType == 'check-box'){
      this.editingTile.attrName = 'attr1'
      this.editingTile.checkBoxAttrs = []
    }else if (contentType == 'text-area'){
      this.editingTile.attrName = 'attr1'
    }else if (contentType == 'select'){
      this.editingTile.attrName = 'attr1'
      this.editingTile.selectAttrs = []
    }
  }

  /**
   * 添加元素
   */
  addElement({value,displayName}){
    let addEl = {labelName: displayName, cols: 3, rows: 1,contentType:value,style:{}}
    switch(value) {
      case 'radio-button': 
        addEl['radioBtnAttrs'] = []
        break;
      case 'check-box':
        addEl['checkBoxAttrs'] = []
      case 'select':
        addEl['selectAttrs'] = []
      default:
        break;        
    }
    this.tiles.push(addEl)    
  }

  onResizeEnd(event: ResizeEvent,tile:Tile):void{
    let containerWidth = this.container._element.nativeElement.offsetWidth
    let newCols = Math.round((event.rectangle.width/containerWidth)*12)
    tile.cols = newCols >= 12 ? 12 : newCols
    tile.rows = Math.round(event.rectangle.height / 50 )
  }
  
  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

}

export interface Tile {
  contentType : string;
  color?: string;
  cols: number;
  rows: number;
  text?: string;
  labelName?:string;
  attrName?:string;
  radioBtnAttrs?:Array<string>;
  style:any;
}
