import { OverlayRef } from '@angular-mdc/web/cdk';
import { MdcDialogContainer } from './dialog-container';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

let uniqueId = 0;

/**
 * Reference to a dialog dispatched from the MdcDialog service.
 */
export class MdcDialogRef<T, R = any> {
  componentInstance: T;

  /** Subject for notifying the user that the dialog has finished opening. */
  private _afterOpen = new Subject<void>();

  /** Subject for notifying the user that the dialog has finished closing. */
  private _afterClosed = new Subject<R | undefined>();

  /** Subject for notifying the user that the dialog has started closing. */
  private _beforeClose = new Subject<R | undefined>();

  /** Result to be passed to afterClosed. */
  private _result: R | undefined;

  constructor(
    private _overlayRef: OverlayRef,
    public _containerInstance: MdcDialogContainer,
    readonly id: string = `mdc-dialog-${uniqueId++}`) { }

  /** Closes the dialog. */
  close(dialogResult?: R): void {
    this._result = dialogResult;

    this._beforeClose.next(this._result);
    this._beforeClose.complete();
    this._overlayRef.dispose();
  }

  /**
   * Gets an observable that is notified when the dialog is finished opening.
   */
  afterOpen(): Observable<void> {
    return this._afterOpen.asObservable();
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<R | undefined> {
    return this._afterClosed.asObservable();
  }

  /**
   * Gets an observable that is notified when the dialog has started closing.
   */
  beforeClose(): Observable<R | undefined> {
    return this._beforeClose.asObservable();
  }
}
