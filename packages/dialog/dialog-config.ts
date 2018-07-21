import { ViewContainerRef } from '@angular/core';

import { ComponentType } from '@angular-mdc/web/portal';
import { MdcDialogContainer } from './dialog-container';

export class MdcDialogConfig<D = any> {
  /** Component to use as the container for the dialog. */
  containerComponent?: ComponentType<MdcDialogContainer>;

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

  /** Whether the dialog has a backdrop. */
  backdrop?: boolean = true;

  /** Data to be injected into the dialog content. */
  data?: D | null = null;
}
