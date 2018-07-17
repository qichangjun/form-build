import { Component, HostBinding,AfterViewInit,OnInit,ChangeDetectorRef,OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router,ActivatedRoute }                 from '@angular/router';
import { EventService } from '../core/services/event.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material';
export const slidFromBottomAnimation =
  trigger('routeAnimation',[
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
      style({
        transform: 'translateX(-100%)'
      }),
      animate('0.5s ease-in')
    ])
]);

@Component({
  templateUrl: './uploadFile.component.html',
  styleUrls : ['./uploadFile.component.scss'],
  animations: [ slidFromBottomAnimation ]
})
export class UploadFileComponent implements AfterViewInit,OnInit,OnDestroy{
  uploader : any = {};
  selectTotal : number = 0;
  selectSuccessTotal : number = 0;
  docbase : string;
  parameter : any = {}
  routeSub : any;
  eventSub : any;
  querySub : any;
  saveFiles : Array<any> = [];
  showUploadContainer : boolean;
  parentId : string;
  constructor(
    public snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private _EventService : EventService,
  ) {}

  ngOnInit(){
    this.querySub = this.route.queryParams.subscribe(params => {
      this.parameter = Object.assign({},params)
    })
    this.eventSub = this._EventService.toggleEvent$.subscribe(uploader => {
      //if there is no uploader Object,just return
      if (!uploader){
          return 
      }
      // type of select upload
      if (uploader.type == 'select'){
        // make sure this is the first time to init `this.uploader`
        if (this.uploader != uploader.value){
          //init onSuccessItem & onBeforeUploadItem method of uploader          
          this.uploader = uploader.value;          
        }
        //init `selectTotal` with uploader's files's length
        this.selectTotal = this.uploader.queue.length;
        this.selectSuccessTotal = 0;
        //we have to handle each file's path and init `selectSuccessTotal` first        
        for (let i = 0;i < this.uploader.queue.length;i++){          
          //for there is some files has finished upload before this render
          if (this.uploader.queue[i].isSuccess){
            this.selectSuccessTotal++
          }
        }
      }
    });
  }

  closePopup() {
    this.router.navigate([{ outlets: { uploadFile: null }}],{preserveQueryParams: true});
  }

  ngAfterViewInit(){
  
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe()
    this.eventSub.unsubscribe()
    this.querySub.unsubscribe()
  }

  removeAllFiles(){
    if (this.uploader && this.uploader.queue && this.uploader.queue.length > 0){
      this.uploader.clearQueue()
    }
    this.selectTotal = 0;
  }

  toggleWindow(){
    this.showUploadContainer = !this.showUploadContainer
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }
}

