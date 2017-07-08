import {
  Directive,
  ElementRef,
  HostBinding
} from '@angular/core';

@Directive({
  selector: 'mdc-snackbar-action-wrapper'
})
export class SnackbarActionWrapperDirective {
  @HostBinding('class.mdc-snackbar__action-wrapper') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
