import { ViewContainerRef, InjectionToken } from '@angular/core';

/** Injection token that can be used to access the data that was passed in to a snackbar. */
export const MDC_SNACKBAR_DATA = new InjectionToken<any>('MdcSnackbarData');

export class MdcSnackbarConfig<D = any> {
  /** The view container to place the overlay for the snackbar into. */
  viewContainerRef?: ViewContainerRef;

  /** Data being injected into the child component. */
  data?: D | null = null;

  timeout?: number = 2750;
  actionHandler?: Function;
  multiline?: boolean = false;
  actionOnBottom?: boolean = false;
  align?: string = 'center';
  dismissOnAction?: boolean = true;
  focusAction?: boolean = false;
}
