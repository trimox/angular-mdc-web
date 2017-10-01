import {
  ComponentRef,
  Injectable,
  Injector,
  Optional,
  SkipSelf,
} from '@angular/core';
import { Overlay, OverlayRef } from '../cdk/overlay/index';
import { Portal, ComponentType, ComponentPortal, PortalInjector } from '../cdk/portal/index';

import { MdcSnackbarRef } from './snackbar-ref';
import { MdcSnackbarComponent } from './snackbar.component';
import { MdcSnackbarContainer } from './snackbar-container.component';
import { MDC_SNACK_BAR_DATA, MdcSnackbarConfig } from './snackbar-config';

@Injectable()
export class MdcSnackbar {
  private _snackBarRefAtThisLevel: MdcSnackbarRef<any> | null = null;

  /** Reference to the currently opened snackbar at *any* level. */
  get _openedSnackBarRef(): MdcSnackbarRef<any> | null {
    const parent = this._parentSnackBar;
    return parent ? parent._openedSnackBarRef : this._snackBarRefAtThisLevel;
  }

  set _openedSnackBarRef(value: MdcSnackbarRef<any> | null) {
    if (this._parentSnackBar) {
      this._parentSnackBar._openedSnackBarRef = value;
    } else {
      this._snackBarRefAtThisLevel = value;
    }
  }

  constructor(
    private overlay_: Overlay,
    private injector_: Injector,
    @Optional() @SkipSelf() private _parentSnackBar: MdcSnackbar) {
  }

  /**
     * Shows a snackbar with a message and an optional action.
     * @param message The message to show in the snackbar.
     * @param actionText The label for the snackbar action.
     * @param config Additional configuration options for the snackbar.
     */
  show(message: string, actionText = '', config?: MdcSnackbarConfig): MdcSnackbarRef<MdcSnackbarComponent> {
    const _config = _applyConfigDefaults(config);

    // Since the user doesn't have access to the component, we can
    // override the data to pass in our own message and action.
    _config.data = { message, actionText };

    if (this._openedSnackBarRef) {
      this._openedSnackBarRef.dismiss();
    }

    const snackBarRef = this._attach(MdcSnackbarComponent, _config);
    this._openedSnackBarRef = snackBarRef;

    return this._openedSnackBarRef;
  }

  /**
   * Dismisses the currently-visible snack bar.
   */
  dismiss(): void {
    if (this._openedSnackBarRef) {
      this._openedSnackBarRef.dismiss();
    }
  }

  /**
     * Attaches the snack bar container component to the overlay.
     */
  private _attachSnackBarContainer(overlayRef: OverlayRef,
    config: MdcSnackbarConfig): MdcSnackbarContainer {
    const containerPortal = new ComponentPortal(MdcSnackbarContainer, config.viewContainerRef);
    const containerRef: ComponentRef<MdcSnackbarContainer> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  /**
   * Places a new component as the content of the snack bar container.
   */
  private _attach<T>(component: ComponentType<T>, config: MdcSnackbarConfig): MdcSnackbarRef<T> {
    const overlayRef = this._createOverlay(config);
    const container = this._attachSnackBarContainer(overlayRef, config);
    const snackBarRef = new MdcSnackbarRef<T>(container, overlayRef);
    const injector = this._createInjector(config, snackBarRef);
    const portal = new ComponentPortal(component, undefined, injector);
    const contentRef = container.attachComponentPortal(portal);

    // We can't pass this via the injector, because the injector is created earlier.
    snackBarRef.componentInstance = contentRef.instance;

    return snackBarRef;
  }

  /**
     * Creates a new overlay and places it in the correct location.
     * @param config The user-specified snack bar config.
     */
  private _createOverlay(config: MdcSnackbarConfig): OverlayRef {
    return this.overlay_.create();
  }

  /**
     * Creates an injector to be used inside of a snack bar component.
     * @param config Config that was used to create the snack bar.
     * @param snackBarRef Reference to the snack bar.
     */
  private _createInjector<T>(
    config: MdcSnackbarConfig,
    snackBarRef: MdcSnackbarRef<T>): PortalInjector {

    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const injectionTokens = new WeakMap();

    injectionTokens.set(MdcSnackbarRef, snackBarRef);
    injectionTokens.set(MDC_SNACK_BAR_DATA, config.data);
    injectionTokens.set(MdcSnackbarConfig, config);

    return new PortalInjector(userInjector || this.injector_, injectionTokens);
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
