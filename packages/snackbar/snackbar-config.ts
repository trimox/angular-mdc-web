import { ViewContainerRef, InjectionToken } from '@angular/core';

/** Injection token that can be used to access the data that was passed in to a snackbar. */
export const MDC_SNACKBAR_DATA = new InjectionToken<any>('MdcSnackbarData');

export class MdcSnackbarConfig<D = any> {
  /** The view container to place the overlay for the snackbar into. */
  viewContainerRef?: ViewContainerRef;

  /** Data being injected into the child component. */
  data?: D | null = null;

  /** Add a CSS class or an array of classes */
  classes?: string | string[];

  /** Add a CSS class or an array of classes to the action button */
  actionClasses?: string | string[];

  /** Add a CSS class or an array of classes to the action icon */
  dismissClasses?: string | string[];

  /** Value must be between 4000 and 10000 or an error will be thrown. Defaults to 5000 (5 seconds). */
  timeoutMs?: number = 5000;

  /** Positions the action button/icon below the label instead of alongside it. */
  stacked?: boolean = false;

  /** Positions the snackbar on the leading edge of the screen */
  leading?: boolean = false;

  /** Positions the snackbar on the trailing edge of the screen */
  trailing?: boolean = false;

  /** The layout direction of the snackbar content */
  direction?: string = 'ltr';

  /** Show dismiss ("X") icon */
  dismiss?: boolean = false;

  /** Whether the snackbar closes when it is focused and the user presses the ESC key */
  closeOnEscape?: boolean = true;
}
