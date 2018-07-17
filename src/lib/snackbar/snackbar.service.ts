import { ComponentRef, Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MdcPortalService } from '@angular-mdc/web/portal';

import { MdcSnackbarRef } from './snackbar-ref';
import { MdcSnackbarComponent } from './snackbar.component';
import { MdcSnackbarConfig } from './snackbar-config';

@Injectable()
export class MdcSnackbar implements OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _openedSnackbarRef: MdcSnackbarRef<any> | null = null;

  /** Subscription to snackbar. */
  private _snackbarSubscription: Subscription | null;

  constructor(private _portalService: MdcPortalService) { }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    this.dismiss();
  }

  /**
     * Shows a snackbar with a message and an optional action.
     * @param message The message to show in the snackbar.
     * @param actionText The label for the snackbar action.
     * @param config Additional configuration options for the snackbar.
     */
  show(message: string, actionText = '', config?: MdcSnackbarConfig): MdcSnackbarRef<MdcSnackbarComponent> {
    if (this.isShowing()) {
      this.dismiss();
    }

    this._openedSnackbarRef
      = new MdcSnackbarRef<MdcSnackbarComponent>(this._portalService.createComponentRef(MdcSnackbarComponent).instance);

    this._openedSnackbarRef.componentInstance.data = { message, actionText };
    this._openedSnackbarRef.componentInstance.config = _applyConfigDefaults(config);

    this._snackbarSubscription = this._openedSnackbarRef.componentInstance.dismissed
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.dismiss();
      });

    return this._openedSnackbarRef;
  }

  isShowing(): boolean {
    return !!this._openedSnackbarRef;
  }

  /**
   * Dismisses the currently-visible snack bar.
   */
  dismiss(): void {
    if (this._openedSnackbarRef) {
      this._openedSnackbarRef.dismiss();
      this._portalService.dispose();
      this._openedSnackbarRef = null;
    }
  }
}

/**
 * Applies default options to the snackbar config.
 * @param config The configuration to which the defaults will be applied.
 * @returns The new configuration object with defaults applied.
 */
function _applyConfigDefaults(config?: MdcSnackbarConfig): MdcSnackbarConfig {
  return { ...new MdcSnackbarConfig(), ...config };
}
