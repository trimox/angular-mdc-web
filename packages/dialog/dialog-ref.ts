import { Observable, Subject } from 'rxjs';
import { OverlayRef } from '@angular-mdc/web/overlay';

import { MdcDialogPortal } from './dialog-portal';

/** Unique id for the created dialog. */
let uniqueId = 0;

/**  Reference to a dialog dispatched from the MdcDialog service. */
export class MdcDialogRef<T, R = any> {
  /** The instance of the component in the dialog. */
  componentInstance!: T;

  /** Subject for notifying the user that the dialog has finished opening. */
  private readonly _afterOpened = new Subject<void>();

  /** Subject for notifying the user that the dialog has started closing. */
  private readonly _beforeClosed = new Subject<R | undefined>();

  /** Subject for notifying the user that the dialog has finished closing. */
  private readonly _afterClosed = new Subject<R | undefined>();

  /** Result to be passed to afterClosed. */
  private _result: R | undefined;

  constructor(
    private _overlayRef: OverlayRef,
    public _portalInstance: MdcDialogPortal,
    readonly id: string = `mdc-dialog-${uniqueId++}`) {

    // Pass the id along to the portal.
    _portalInstance._id = id;

    _overlayRef.detachments().subscribe(() => {
      this._beforeClosed.next(this._result);
      this._beforeClosed.complete();
      this._afterClosed.next(this._result);
      this._afterClosed.complete();
      this.componentInstance = null!;
      this._overlayRef.dispose();
    });
  }

  /**
   * Close the dialog.
   * @param dialogResult Optional result to return to the dialog opener.
   */
  close(dialogResult?: R): void {
    this._result = dialogResult;
    this._overlayRef.dispose();
  }

  /** Marks the dialog as opened. */
  opened(): void {
    if (!this._afterOpened.closed) {
      this._afterOpened.next();
      this._afterOpened.complete();
    }
  }

  /** Gets an observable that is notified when the dialog is finished opening. */
  afterOpened(): Observable<void> {
    return this._afterOpened.asObservable();
  }

  /** Gets an observable that is notified when the dialog has started closing. */
  beforeClosed(): Observable<R | undefined> {
    return this._beforeClosed.asObservable();
  }

  /** Gets an observable that is notified when the dialog is finished closing. */
  afterClosed(): Observable<R | undefined> {
    return this._afterClosed.asObservable();
  }
}
