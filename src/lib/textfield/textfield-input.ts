import {
  Directive,
  ElementRef,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: 'input[mdc-textfield-input], textarea[mdc-textfield-input]',
})
export class MdcTextfieldInput {
  focused = false;

  @HostBinding('class.mdc-textfield__input') isHostClass = true;

  constructor(public elementRef: ElementRef) { }

  focus() {
    this.focused = true;
    this.elementRef.nativeElement.focus();
  }
}
