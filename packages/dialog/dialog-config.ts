import { ViewContainerRef } from '@angular/core';

export class MdcDialogConfig<D = any> {
  viewContainerRef?: ViewContainerRef;

  /** ID for the dialog. If omitted, a unique one will be generated. */
  id?: string;

  /** ID of the element that describes the dialog.  */
  ariaDescribedBy?: string | null = null;

  /** Aria label to assign to the dialog element */
  ariaLabel?: string | null = null;

  /** Whether the user can use escape key to close the dialog */
  escapeToClose?: boolean = true;

  /** Whether the user can click outside to close the dialog */
  clickOutsideToClose?: boolean = true;

  /** Applied automatically when the dialog has overflowing content to warrant scrolling. */
  scrollable?: boolean = true;

  /** Applied automatically when the dialog's action buttons can't fit on a single line and must be stacked. */
  buttonsStacked?: boolean = true;

  /** Data to be injected into the dialog content. */
  data?: D | null = null;
}
