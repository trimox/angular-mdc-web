import {
  Directive,
  ElementRef,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[mdc-list-group], mdc-list-group'
})
export class MdcListGroupDirective {
  @HostBinding('class.mdc-list-group') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-list-group-subheader], mdc-list-group-subheader'
})
export class MdcListGroupSubheaderDirective {
  @HostBinding('class.mdc-list-group__subheader') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
