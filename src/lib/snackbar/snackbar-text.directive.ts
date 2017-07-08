import {
  Directive,
  ElementRef,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[mdc-snackbar-text], mdc-snackbar-text'
})
export class SnackbarTextDirective {
  @HostBinding('class.mdc-snackbar__text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
