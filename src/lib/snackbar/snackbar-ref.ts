import { OverlayRef } from '../cdk/overlay/overlay-ref';
import { MdcSnackbarContainer } from './snackbar-container.component';

/**
 * Reference to a snack bar dispatched from the snack bar service.
 */
export class MdcSnackbarRef<T> {
  componentInstance: T;
  containerInstance: MdcSnackbarContainer;

  constructor(containerInstance: MdcSnackbarContainer,
    private _overlayRef: OverlayRef) {
    this.containerInstance = containerInstance;
  }

  /** Dismisses the snack bar. */
  dismiss(): void {
    this._overlayRef.dispose();
  }
}
