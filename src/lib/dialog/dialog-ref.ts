import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MdcDialogContainer } from './dialog-container';
import { MdcDialogConfig } from './dialog-config';

/** Unique id for the created dialog. */
let uniqueId = 0;

/**
 * Reference to a dialog dispatched from the MdcDialog service.
 */
export class MdcDialogRef<T, R = any> {
  /** The instance of the component in the dialog. */
  componentInstance: T;

  /** Result to be passed to afterClosed. */
  private _result: R | undefined;

  constructor(
    protected _containerInstance: MdcDialogContainer,
    readonly id: string = `mdc-dialog-${uniqueId++}`) {

    this.afterClosed().subscribe(() => {
      this.componentInstance = null!;
    });
  }

  /**
   * Close the dialog.
   * @param dialogResult Optional result to return to the dialog opener.
   */
  close(dialogResult?: R): void {
    this._result = dialogResult;
    this._containerInstance.closed();
  }

  get config(): MdcDialogConfig {
    return this._containerInstance.config;
  }

  get data(): any {
    return this._containerInstance.config.data;
  }

  /** Gets an observable that is notified when the dialog is finished closing. */
  afterClosed(): Observable<R | undefined> {
    return this._containerInstance._afterExit.pipe(map(() => this._result));
  }
}
