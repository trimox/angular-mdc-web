import { OverlayRef } from '../cdk/overlay/overlay-ref';
import { MdcDialogContainer } from './dialog-container';

let uniqueId = 0;

/**
 * Reference to a dialog dispatched from the MdcDialog service.
 */
export class MdcDialogRef<T> {
  componentInstance: T;

  constructor(
    private _overlayRef: OverlayRef,
    public _containerInstance: MdcDialogContainer,
    readonly id: string = `mdc-dialog-${uniqueId++}`) { }

  /** Closes the dialog. */
  close(): void {
    this._overlayRef.dispose();
  }
}
