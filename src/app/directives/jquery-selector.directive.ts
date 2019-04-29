import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appJquerySelector]'
})
export class JquerySelectorDirective {

  @Input() selectorString: string;

  constructor() { }

}
