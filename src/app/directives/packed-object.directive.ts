import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPackedObject]'
})
export class PackedObjectDirective {

  @Input() packedObject: string;

  constructor() { }

}
