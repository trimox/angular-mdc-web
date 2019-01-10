import { Observable, Subject } from 'rxjs';
import { OverlayRef } from '@angular-mdc/web/overlay';

import { MdcSnackbarContainer } from './snackbar-container';

/** Event that is emitted when a snackbar is dismissed. */
export interface MdcSnackbarDismissReason {
  /** Whether the snackbar was dismissed using the action button. */
  action?: boolean;

  /** Whether the snackbar was dismissed using the dismiss icon button. */
  dismiss?: boolean;
}

/**
 * Reference to a snackbar dispatched from the snackbar service.
 */
export class MdcSnackbarRef<T> {
  /** The instance of the component making up the content of the snackbar. */
  instance!: T;
  componentInstance: MdcSnackbarContainer;

  /** Whether the snackbar was dismissed using the action button. */
  private _dismissedReason?: MdcSnackbarDismissReason;

  /** Subject for notifying the user that the snackbar has been dismissed. */
  private readonly _afterDismiss = new Subject<MdcSnackbarDismissReason>();

  constructor(
    public containerInstance: MdcSnackbarContainer,
    private _overlayRef: OverlayRef) {

    this.componentInstance = containerInstance;
  }

  /** Gets an observable that is notified when the snackbar is finished closing. */
  afterDismiss(): Observable<MdcSnackbarDismissReason> {
    return this._afterDismiss.asObservable();
  }

  dismiss(reason?: MdcSnackbarDismissReason): void {
    if (!this._afterDismiss.closed) {
      this._dismissedReason = reason;
      this._finishDismiss();
    }
  }

  /** Cleans up the DOM after closing. */
  private _finishDismiss(): void {
    this._overlayRef.dispose();

    this._afterDismiss.next(this._dismissedReason);
    this._afterDismiss.complete();
  }
}
