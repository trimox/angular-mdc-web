import { OverlayRef } from '@angular-mdc/web/overlay';
import { MdcSnackbarContainer } from './snackbar-container';

/**
 * Reference to a snackbar dispatched from the snackbar service.
 */
export class MdcSnackbarRef<T> {
  componentInstance: T;
  containerInstance: MdcSnackbarContainer;

  constructor(
    private _containerInstance: MdcSnackbarContainer,
    private _overlayRef: OverlayRef) {
    this.containerInstance = _containerInstance;
  }

  /** Dismisses the snack bar. */
  dismiss(): void {
    this._overlayRef.dispose();
  }
}
