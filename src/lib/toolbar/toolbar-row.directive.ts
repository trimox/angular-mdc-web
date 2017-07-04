import {
  Directive,
  ElementRef,
  HostBinding
} from '@angular/core';

@Directive({
  selector: 'mdc-toolbar-row'
})
export class ToolbarRowDirective {
  @HostBinding('class.mdc-toolbar__row') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
