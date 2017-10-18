import {
  Directive,
  ElementRef,
  HostBinding
} from '@angular/core';

@Directive({
  selector: 'a[mdc-toolbar-icon-menu], span[mdc-toolbar-icon-menu], button[mdc-toolbar-icon-menu]'
})
export class MdcToolbarIconMenuDirective {
  @HostBinding('class.mdc-toolbar__icon--menu') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
