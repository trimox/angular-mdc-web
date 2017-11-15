import {
  Directive,
  ElementRef,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: 'input[mdc-text-field-input], textarea[mdc-text-field-input]',
})
export class MdcTextFieldInput {
  focused: boolean = false;

  @HostBinding('class.mdc-text-field__input') isHostClass = true;

  constructor(public elementRef: ElementRef) { }

  focus(): void {
    this.focused = true;
    this.elementRef.nativeElement.focus();
  }
}
