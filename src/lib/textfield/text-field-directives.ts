import {
  Directive,
  ElementRef,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[mdc-text-field-label], mdc-text-field-label'
})
export class MdcTextFieldLabel {
  @HostBinding('class.mdc-text-field__label') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
