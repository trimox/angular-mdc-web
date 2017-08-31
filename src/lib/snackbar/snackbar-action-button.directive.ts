import {
  Directive,
  ElementRef,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[mdc-snackbar-action-button]'
})
export class MdcSnackbarActionButtonDirective {
  @HostBinding('class.mdc-snackbar__action-button') isHostClass = true;
  @HostBinding('class.mdc-button') isButtonClass = true;

  constructor(public elementRef: ElementRef) { }
}
