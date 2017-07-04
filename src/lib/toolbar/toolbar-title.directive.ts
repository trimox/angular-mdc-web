import {
  Directive,
  ElementRef,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[mdc-toolbar-title], mdc-toolbar-title'
})
export class ToolbarTitleDirective {
  @HostBinding('class.mdc-toolbar__title') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
