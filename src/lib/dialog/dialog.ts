import {
  ComponentRef,
  Injectable,
  InjectionToken,
  Injector,
  Optional,
  SkipSelf,
  TemplateRef,
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { startWith } from 'rxjs/operators/startWith';

import {
  ComponentPortal,
  ComponentType,
  Overlay,
  OverlayRef,
  PortalInjector,
  TemplatePortal,
} from '@angular-mdc/web/cdk';

import { MdcDialogRef } from './dialog-ref';
import { MdcDialogContainer } from './dialog-container';
import { MDC_DIALOG_DATA, MdcDialogConfig } from './dialog-config';

@Injectable()
export class MdcDialog {
  private _openDialogsAtThisLevel: MdcDialogRef<any>[] = [];
  private _afterAllClosedAtThisLevel = new Subject<void>();
  private _afterOpenAtThisLevel = new Subject<MdcDialogRef<any>>();

  /** Keeps track of the currently-open dialogs. */
  get openDialogs(): MdcDialogRef<any>[] {
    return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
  }

  /** Stream that emits when a dialog has been opened. */
  get afterOpen(): Subject<MdcDialogRef<any>> {
    return this._parentDialog ? this._parentDialog.afterOpen : this._afterOpenAtThisLevel;
  }

  get _afterAllClosed(): any {
    const parent = this._parentDialog;
    return parent ? parent._afterAllClosed : this._afterAllClosedAtThisLevel;
  }

  /**
   * Stream that emits when all open dialog have finished closing.
   * Will emit on subscribe if there are no open dialogs to begin with.
   */
  afterAllClosed: Observable<void> = defer<void>(() => this.openDialogs.length ?
    this._afterAllClosed :
    this._afterAllClosed.pipe(startWith(undefined)));

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    @Optional() @SkipSelf() private _parentDialog: MdcDialog) { }

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

    config = _applyConfigDefaults(config);

    if (config.id && this.getDialogById(config.id)) {
      throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
    }

    const overlayRef = this._createOverlay();
    const dialogContainer = this._attachDialogContainer(overlayRef, config);
    const dialogRef =
      this._attachDialogContent<T>(componentOrTemplateRef, dialogContainer, overlayRef, config);

    this.openDialogs.push(dialogRef);
    dialogRef.afterClosed().subscribe(() => this._removeOpenDialog(dialogRef));
    this.afterOpen.next(dialogRef);

    return dialogRef;
  }

  /** Closes all currently-open dialogs. */
  close(): void {
    let i = this.openDialogs.length;

    while (i--) {
      this.openDialogs[i].close();
    }
  }

  /**
     * Finds an open dialog by its id.
     * @param id ID to use when looking up the dialog.
     */
  getDialogById(id: string): MdcDialogRef<any> | undefined {
    return this.openDialogs.find(dialog => dialog.id === id);
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

  /** Creates a new overlay. */
  private _createOverlay(): OverlayRef {
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
    injectionTokens.set(MdcDialogContainer, dialogContainer);
    injectionTokens.set(MDC_DIALOG_DATA, config.data);
    injectionTokens.set(MdcDialogConfig, config);

    return new PortalInjector(userInjector || this._injector, injectionTokens);
  }

  /**
     * Removes a dialog from the array of open dialogs.
     * @param dialogRef Dialog to be removed.
     */
  private _removeOpenDialog(dialogRef: MdcDialogRef<any>) {
    const index = this.openDialogs.indexOf(dialogRef);

    if (index > -1) {
      this.openDialogs.splice(index, 1);

      // no open dialogs are left, call next on afterAllClosed Subject
      if (!this.openDialogs.length) {
        this._afterAllClosed.next();
      }
    }
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
