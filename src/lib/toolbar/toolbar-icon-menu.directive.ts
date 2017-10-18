import {
  Directive,
  ElementRef,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[mdc-toolbar-icon-menu]'
})
export class MdcToolbarIconMenuDirective {
  @HostBinding('class.toolbar__icon--menu') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
