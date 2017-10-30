import {
  Directive,
  ElementRef,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: 'input[mdc-textfield-input], textarea[mdc-textfield-input]',
})
export class MdcTextfieldInput {
  focused: boolean = false;

  @HostBinding('class.mdc-textfield__input') isHostClass = true;

  constructor(public elementRef: ElementRef) { }

  focus(): void {
    this.focused = true;
    this.elementRef.nativeElement.focus();
  }
}
