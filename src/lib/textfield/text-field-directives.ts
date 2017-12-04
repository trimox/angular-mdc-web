import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: '[mdc-text-field-label], mdc-text-field-label'
})
export class MdcTextFieldLabel {
  @HostBinding('class.mdc-text-field__label') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-icon[leading]'
})
export class MdcTextFieldLeadingIcon {
  @Input() tabIndex: number = 0;
  @HostBinding('class.mdc-text-field__icon') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-icon[trailing]'
})
export class MdcTextFieldTrailingIcon {
  @Input() tabIndex: number = 0;
  @HostBinding('class.mdc-text-field__icon') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
