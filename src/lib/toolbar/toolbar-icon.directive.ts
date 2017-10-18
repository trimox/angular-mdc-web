import {
  Directive,
  ElementRef,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[mdc-toolbar-icon]'
})
export class MdcToolbarIcon {
  @HostBinding('class.mdc-toolbar__icon') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
