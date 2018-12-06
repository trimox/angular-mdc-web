import { ElementRef } from '@angular/core';
import { MdcRipple } from '@angular-mdc/web/ripple';

export abstract class MdcFormFieldControl<T> {
  /** The value of the control. */
  value: T | null = null;

  /** The element ID for this control. */
  readonly id!: string;

  /** The element ID for this control's hidden input. */
  readonly inputId?: string;

  readonly elementRef!: ElementRef;

  readonly ripple?: MdcRipple;
}
