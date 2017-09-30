import { ViewContainerRef, InjectionToken } from '@angular/core';

export const MDC_SNACK_BAR_DATA = new InjectionToken<any>('MdcSnackbarData');

export class MdcSnackbarConfig {
  timeout?: number = 2750;
  actionHandler?: Function;
  multiline?: boolean = false;
  actionOnBottom?: boolean = false;
  align?: string = 'center';
  dismissOnAction?: boolean = true;
  focusAction?: boolean = false;

  /** Data being injected into the child component. */
  data?: any = null;

  /** The view container to place snack bar into. */
  viewContainerRef?: ViewContainerRef;
}
