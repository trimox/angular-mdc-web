import {
  Directive,
  ElementRef,
  HostBinding
} from '@angular/core';

@Directive({
  selector: 'a[mdc-toolbar-icon], span[mdc-toolbar-icon], button[mdc-toolbar-icon]'
})
export class MdcToolbarIconDirective {
  @HostBinding('class.mdc-toolbar__icon') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
