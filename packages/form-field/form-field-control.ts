import { ElementRef } from '@angular/core';

import { MdcRipple } from '@angular-mdc/web/ripple';

export abstract class MdcFormFieldControl<T> {
  componentInstance: T;

  /** The element ID for this control. */
  readonly inputId: string;

  readonly elementRef: ElementRef;

  readonly ripple?: MdcRipple;
}
