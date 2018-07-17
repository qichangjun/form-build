import { Component, OnInit,AfterViewInit} from '@angular/core';
declare var $ : any;
@Component({
  selector: 'app-archive-manage',
  templateUrl: './archivesManagement.component.html',
  styleUrls: ['./archivesManagement.component.scss']
})
export class ArchiveManageComponent implements OnInit,AfterViewInit {

  constructor() { }

  ngOnInit() {
    $.fn.editable.defaults.mode = 'inline';
    
  }

  ngAfterViewInit(){
    $('#username').editable({
        type: 'text',
        title: '输入用户名'
    }).on('save',(e,params)=>{
        console.log(params)
    });
  }

}
