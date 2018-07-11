import { Directive,ElementRef,AfterViewInit  } from '@angular/core';

@Directive({
  selector: '[colorPicker]'
})
export class ColorPickerDirective implements AfterViewInit{
    constructor(private el: ElementRef) {
        // el.nativeElement.style.backgroundColor = 'yellow';
        
        
    }
    ngAfterViewInit(){
      
    }
}