import { Observable, Subject } from 'rxjs';
import { OverlayRef } from '@angular-mdc/web/overlay';

import { MdcSnackbarContainer } from './snackbar-container';

/** Event that is emitted when a snackbar is dismissed. */
export interface MdcSnackbarDismiss {
  /** Whether the snackbar was dismissed using the action button. */
  dismissedByAction: boolean;
}

/**
 * Reference to a snackbar dispatched from the snackbar service.
 */
export class MdcSnackbarRef<T> {
  /** The instance of the component making up the content of the snackbar. */
  instance!: T;
  componentInstance: MdcSnackbarContainer;

  /** Whether the snackbar was dismissed using the action button. */
  private _dismissedByAction = false;

  /** Subject for notifying the user that the snackbar action was called. */
  private readonly _onAction = new Subject<void>();

  /** Subject for notifying the user that the snackbar has been dismissed. */
  private readonly _afterDismiss = new Subject<MdcSnackbarDismiss>();

  constructor(
    public containerInstance: MdcSnackbarContainer,
    private _overlayRef: OverlayRef) {

    this.componentInstance = containerInstance;

    // Dismiss snackbar on action.
    this.onAction().subscribe(() => this.dismiss());
  }

  /** Marks the snackbar action clicked. */
  dismissWithAction(): void {
    if (!this._onAction.closed) {
      this._dismissedByAction = true;
      this._onAction.next();
      this._onAction.complete();
    }
  }

  /** Gets an observable that is notified when the snackbar is finished closing. */
  afterDismiss(): Observable<MdcSnackbarDismiss> {
    return this._afterDismiss.asObservable();
  }

  dismiss(): void {
    if (!this._afterDismiss.closed) {
      this._finishDismiss();
    }
  }

  /** Gets an observable that is notified when the snackbar action is called. */
  onAction(): Observable<void> {
    return this._onAction.asObservable();
  }

  /** Cleans up the DOM after closing. */
  private _finishDismiss(): void {
    this._overlayRef.dispose();

    if (!this._onAction.closed) {
      this._onAction.complete();
    }

    this._afterDismiss.next({ dismissedByAction: this._dismissedByAction });
    this._afterDismiss.complete();
    this._dismissedByAction = false;
  }
}
