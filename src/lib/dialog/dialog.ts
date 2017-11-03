import {
  ComponentRef,
  Injectable,
  InjectionToken,
  Injector,
  Optional,
  SkipSelf,
  TemplateRef,
} from '@angular/core';
import { Overlay, OverlayRef } from '../cdk/overlay/index';
import { ComponentType, ComponentPortal, PortalInjector, TemplatePortal } from '../cdk/portal/index';

import { MdcDialogRef } from './dialog-ref';
import { MdcDialogContainer } from './dialog-container';
import { MDC_DIALOG_DATA, MdcDialogConfig } from './dialog-config';

@Injectable()
export class MdcDialog {
  private _openedDialogRef: MdcDialogRef<any> | null = null;

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    @Optional() @SkipSelf() private _parentDialog: MdcDialog) {
  }

  /**
     * Shows a dialog with a message and an optional action.
     * @param componentOrTemplateRef Type of the component to load into the dialog,
     *     or a TemplateRef to instantiate as the dialog content.
     * @param config Additional configuration options for the dialog.
     * @returns Reference to the newly-opened dialog.
     */
  open<T, D = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: MdcDialogConfig<D>): MdcDialogRef<T> {
    const _config = _applyConfigDefaults(config);

    if (this._openedDialogRef) {
      this._openedDialogRef.close();
    }

    config = _applyConfigDefaults(config);

    const overlayRef = this._createOverlay(config);
    const dialogContainer = this._attachDialogContainer(overlayRef, config);
    const dialogRef =
      this._attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
    this._openedDialogRef = dialogRef;

    return dialogRef;
  }

  /**
   * Close the currently-visible dialog.
   */
  close(): void {
    if (this._openedDialogRef) {
      this._openedDialogRef.close();
    }
  }

  /**
     * Attaches the dialog container component to the overlay.
     */
  private _attachDialogContainer(overlay: OverlayRef, config: MdcDialogConfig): MdcDialogContainer {
    const containerPortal = new ComponentPortal(MdcDialogContainer, config.viewContainerRef);
    const containerRef: ComponentRef<MdcDialogContainer> = overlay.attach(containerPortal);
    containerRef.instance._config = config;

    return containerRef.instance;
  }

  /**
     * Creates a new overlay and places it in the correct location.
     * @param config The user-specified snack bar config.
     */
  private _createOverlay(config: MdcDialogConfig): OverlayRef {
    return this._overlay.create();
  }

  /**
     * Attaches the user-provided component to the already-created MdcDialogContainer.
     * @param componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param dialogContainer Reference to the wrapping MdcDialogContainer.
     * @param overlayRef Reference to the overlay in which the dialog resides.
     * @param config The dialog configuration.
     * @returns A promise resolving to the MdcDialogRef that should be returned to the user.
     */
  private _attachDialogContent<T>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    dialogContainer: MdcDialogContainer,
    overlayRef: OverlayRef,
    config: MdcDialogConfig): MdcDialogRef<T> {

    // Create a reference to the dialog we're creating in order to give the user a handle
    // to modify and close it.
    const dialogRef = new MdcDialogRef<T>(overlayRef, dialogContainer, config.id);

    if (componentOrTemplateRef instanceof TemplateRef) {
      dialogContainer.attachTemplatePortal(
        new TemplatePortal<T>(componentOrTemplateRef, null!,
          <any>{ $implicit: config.data, dialogRef }));
    } else {
      const injector = this._createInjector<T>(config, dialogRef, dialogContainer);
      const contentRef = dialogContainer.attachComponentPortal(
        new ComponentPortal(componentOrTemplateRef, undefined, injector));
      dialogRef.componentInstance = contentRef.instance;
    }

    return dialogRef;
  }

  /**
   * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
   * of a dialog to close itself and, optionally, to return a value.
   * @param config Config object that is used to construct the dialog.
   * @param dialogRef Reference to the dialog.
   * @param container Dialog container element that wraps all of the contents.
   * @returns The custom injector that can be used inside the dialog.
   */
  private _createInjector<T>(
    config: MdcDialogConfig,
    dialogRef: MdcDialogRef<T>,
    dialogContainer: MdcDialogContainer): PortalInjector {

    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const injectionTokens = new WeakMap();

    injectionTokens.set(MdcDialogRef, dialogRef);
    // The MdcDialogContainer is injected in the portal as the MdcDialogContainer and the dialog's
    // content are created out of the same ViewContainerRef and as such, are siblings for injector
    // purposes.  To allow the hierarchy that is expected, the MdcDialogContainer is explicitly
    // added to the injection tokens.
    injectionTokens.set(MdcDialogContainer, dialogContainer);
    injectionTokens.set(MDC_DIALOG_DATA, config.data);
    injectionTokens.set(MdcDialogConfig, config);

    return new PortalInjector(userInjector || this._injector, injectionTokens);
  }
}

/**
 * Applies default options to the dialog config.
 * @param config The configuration to which the defaults will be applied.
 * @returns The new configuration object with defaults applied.
 */
function _applyConfigDefaults(config?: MdcDialogConfig): MdcDialogConfig {
  return { ...new MdcDialogConfig(), ...config };
}
