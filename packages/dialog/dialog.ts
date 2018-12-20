import {
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
  Optional,
  SkipSelf,
  TemplateRef
} from '@angular/core';
import { Observable, Subject, defer } from 'rxjs';
import { startWith } from 'rxjs/operators';
import {
  Overlay,
  OverlayRef
} from '@angular-mdc/web/overlay';
import {
  ComponentPortal,
  ComponentType,
  PortalInjector,
  TemplatePortal
} from '@angular-mdc/web/portal';

import { MdcDialogRef } from './dialog-ref';
import { MdcDialogPortal } from './dialog-portal';
import { MdcDialogConfig } from './dialog-config';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const MDC_DIALOG_DATA = new InjectionToken<any>('MdcDialogData');

/** Injection token that can be used to specify default dialog options. */
export const MDC_DIALOG_DEFAULT_OPTIONS =
  new InjectionToken<MdcDialogConfig>('mdc-dialog-default-options');

@Injectable()
export class MdcDialog implements OnDestroy {
  private _openDialogsAtThisLevel: MdcDialogRef<any>[] = [];
  private readonly _afterAllClosedAtThisLevel = new Subject<void>();
  private readonly _afterOpenedAtThisLevel = new Subject<MdcDialogRef<any>>();
  private _ariaHiddenElements = new Map<Element, string | null>();

  /** Keeps track of the currently-open dialogs. */
  get openDialogs(): MdcDialogRef<any>[] {
    return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
  }

  /** Stream that emits when a dialog has been opened. */
  get afterOpened(): Subject<MdcDialogRef<any>> {
    return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpenedAtThisLevel;
  }

  get _afterAllClosed(): Subject<void> {
    const parent = this._parentDialog;
    return parent ? parent._afterAllClosed : this._afterAllClosedAtThisLevel;
  }

  /**
   * Stream that emits when all open dialog have finished closing.
   * Will emit on subscribe if there are no open dialogs to begin with.
   */
  readonly afterAllClosed: Observable<void> = defer<void>(() => this.openDialogs.length ?
    this._afterAllClosed :
    this._afterAllClosed.pipe(startWith(undefined)));

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    @Optional() @Inject(MDC_DIALOG_DEFAULT_OPTIONS) private _defaultOptions: MdcDialogConfig,
    @Optional() @SkipSelf() private _parentDialog: MdcDialog) { }

  /**
   * Opens a modal dialog containing the given template.
   * @param componentOrTemplateRef Type of the component to load into the dialog,
   *     or a TemplateRef to instantiate as the dialog content.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  open<T, D = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: MdcDialogConfig<D>): MdcDialogRef<T, {}> {

    config = _applyConfigDefaults(config, this._defaultOptions || new MdcDialogConfig());

    if (config.id && this.getDialogById(config.id)) {
      throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
    }

    const overlayRef = this._createOverlay();
    const dialogContainer = this._attachDialogContainer(overlayRef, config);
    const dialogRef = this._attachDialogContent<T>(componentOrTemplateRef,
      dialogContainer,
      overlayRef,
      config);

    this.openDialogs.push(dialogRef);
    dialogRef.afterClosed().subscribe(() => this._removeOpenDialog(dialogRef));
    this.afterOpened.next(dialogRef);

    return dialogRef;
  }

  /** Closes all of the currently-open dialogs. */
  closeAll(): void {
    this._closeDialogs(this.openDialogs);
  }

  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById(id: string): MdcDialogRef<any> | undefined {
    return this.openDialogs.find(dialog => dialog.id === id);
  }

  ngOnDestroy(): void {
    // Only close the dialogs at this level on destroy
    // since the parent service may still be active.
    this._closeDialogs(this._openDialogsAtThisLevel);
    this._afterAllClosedAtThisLevel.complete();
    this._afterOpenedAtThisLevel.complete();
  }

  /**
   * Creates the overlay into which the dialog will be loaded.
   * @returns A promise resolving to the OverlayRef for the created overlay.
   */
  private _createOverlay(): OverlayRef {
    return this._overlay.create();
  }

  /**
   * Attaches an MdcDialogPortal to a dialog's already-created overlay.
   * @param overlay Reference to the dialog's underlying overlay.
   * @param config The dialog configuration.
   * @returns A promise resolving to a ComponentRef for the attached container.
   */
  private _attachDialogContainer(overlay: OverlayRef, config: MdcDialogConfig): MdcDialogPortal {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = new PortalInjector(userInjector || this._injector, new WeakMap([
      [MdcDialogConfig, config]
    ]));
    const containerPortal =
      new ComponentPortal(MdcDialogPortal, config.viewContainerRef, injector);
    const containerRef = overlay.attach<MdcDialogPortal>(containerPortal);

    return containerRef.instance;
  }

  /**
   * Attaches the user-provided component to the already-created MdcDialogPortal.
   * @param componentOrTemplateRef The type of component being loaded into the dialog,
   *     or a TemplateRef to instantiate as the content.
   * @param dialogContainer Reference to the wrapping MdcDialogPortal.
   * @param overlayRef Reference to the overlay in which the dialog resides.
   * @param config The dialog configuration.
   * @returns A promise resolving to the MdcDialogRef that should be returned to the user.
   */
  private _attachDialogContent<T>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    dialogContainer: MdcDialogPortal,
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
      const contentRef = dialogContainer.attachComponentPortal<T>(
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
    portalContainer: MdcDialogPortal): PortalInjector {

    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

    // The MdcDialogPortal is injected in the portal as the MdcDialogPortal and the dialog's
    // content are created out of the same ViewContainerRef and as such, are siblings for injector
    // purposes. To allow the hierarchy that is expected, the MdcDialogPortal is explicitly
    // added to the injection tokens.
    const injectionTokens = new WeakMap<any, any>([
      [MdcDialogPortal, portalContainer],
      [MDC_DIALOG_DATA, config.data],
      [MdcDialogRef, dialogRef]
    ]);

    return new PortalInjector(userInjector || this._injector, injectionTokens);
  }

  /**
   * Removes a dialog from the array of open dialogs.
   * @param dialogRef Dialog to be removed.
   */
  private _removeOpenDialog(dialogRef: MdcDialogRef<any>): void {
    const index = this.openDialogs.indexOf(dialogRef);

    if (index > -1) {
      this.openDialogs.splice(index, 1);

      // If all the dialogs were closed, remove/restore the `aria-hidden`
      // to a the siblings and emit to the `afterAllClosed` stream.
      if (!this.openDialogs.length) {
        this._ariaHiddenElements.forEach((previousValue, element) => {
          if (previousValue) {
            element.setAttribute('aria-hidden', previousValue);
          } else {
            element.removeAttribute('aria-hidden');
          }
        });

        this._ariaHiddenElements.clear();
        this._afterAllClosed.next();
      }
    }
  }

  /** Closes all of the dialogs in an array. */
  private _closeDialogs(dialogs: MdcDialogRef<any>[]): void {
    let i = dialogs.length;

    while (i--) {
      // The `_openDialogs` property isn't updated after close until the rxjs subscription
      // runs on the next microtask, in addition to modifying the array as we're going
      // through it. We loop through all of them and call close without assuming that
      // they'll be removed from the list instantaneously.
      dialogs[i].close();
    }
  }
}

/**
 * Applies default options to the dialog config.
 * @param config Config to be modified.
 * @param defaultOptions Default options provided.
 * @returns The new configuration object.
 */
function _applyConfigDefaults(
  config?: MdcDialogConfig, defaultOptions?: MdcDialogConfig): MdcDialogConfig {
  return { ...defaultOptions, ...config };
}
