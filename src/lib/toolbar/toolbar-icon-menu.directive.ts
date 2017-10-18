import {
  Directive,
  ElementRef,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[mdc-toolbar-menu-icon]'
})
export class MdcToolbarIconMenu {
  @HostBinding('class.mdc-toolbar__menu-icon') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
