import {
  ComponentRef,
  ElementRef,
  Inject,
  Injectable,
  Injector,
  Optional,
  SkipSelf
} from '@angular/core';
import { Subject } from 'rxjs';

import {
  MdcPortalService,
  ComponentType,
  ComponentPortal,
  PortalInjector
} from '@angular-mdc/web/portal';

import { MdcDialogRef } from './dialog-ref';
import { MdcDialogContainer } from './dialog-container';
import { MdcDialogConfig } from './dialog-config';

import {
  DIALOG_CONFIG,
  DIALOG_CONTAINER,
  DIALOG_DATA,
  DIALOG_REF
} from './dialog-injectors';

@Injectable()
export class MdcDialog {
  /** Stream that emits when a dialog is closed. */
  get afterClosed(): Subject<MdcDialogRef<any>> {
    return this._parentDialog ? this._parentDialog.afterClosed : this._afterClosed;
  }
  _afterClosed: Subject<MdcDialogRef<any>> = new Subject();

  /** Stream that emits when a dialog is opened. */
  get openDialogs(): MdcDialogRef<any>[] {
    return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogs;
  }
  _openDialogs: MdcDialogRef<any>[] = [];

  constructor(
    private _portalService: MdcPortalService,
    private injector: Injector,
    @Inject(DIALOG_REF) private dialogRefConstructor,
    @Optional() @SkipSelf() private _parentDialog: MdcDialog) { }

  /** Closes all open dialogs. */
  close(): void {
    this.openDialogs.forEach(ref => ref.close());
  }

  /**
   * Opens a dialog containing the given component.
   */
  open<T>(component: ComponentType<T>, config?: MdcDialogConfig): MdcDialogRef<any> | undefined {
    if (this.openDialogs.length) {
      return;
    }

    config = this._applyConfigDefaults(config);

    const dialogContainer = this._attachDialogContainer(config);
    const dialogRef = this._attachDialogContentForComponent(component, dialogContainer, config);
    this._registerDialogRef(dialogRef);

    dialogRef.componentInstance.config = config;

    return dialogRef;
  }

  protected _attachDialogContainer(config: MdcDialogConfig): MdcDialogContainer {
    const container = config.containerComponent || this.injector.get(DIALOG_CONTAINER);
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = new PortalInjector(userInjector || this.injector, new WeakMap([
      [MdcDialogConfig, config]
    ]));
    const containerPortal = new ComponentPortal(container, config.viewContainerRef, injector);
    const containerRef: ComponentRef<MdcDialogContainer> = this._portalService.createComponentRef(containerPortal.component);
    containerRef.instance.config = config;

    return containerRef.instance;
  }

  protected _attachDialogContentForComponent<T>(
    component: ComponentType<T>,
    dialogContainer: MdcDialogContainer,
    config: MdcDialogConfig): MdcDialogRef<any> {
    // Create a reference to the dialog we're creating in order to give the user a handle
    // to modify and close it.
    const dialogRef = new this.dialogRefConstructor(dialogContainer, config.id);

    const injector = this._createInjector<T>(config, dialogRef, dialogContainer);
    const contentRef = dialogContainer.attachComponentPortal(
      new ComponentPortal(component, undefined, injector));
    dialogRef.componentInstance = contentRef.instance;

    return dialogRef;
  }

  /**
     * Forwards emitting events for when dialogs are opened and all dialogs are closed.
     */
  private _registerDialogRef(dialogRef: MdcDialogRef<any>): void {
    this.openDialogs.push(dialogRef);

    const dialogCloseSub = dialogRef.afterClosed().subscribe(() => {
      const dialogIdx = this._openDialogs.indexOf(dialogRef);
      if (dialogIdx !== -1) { this._openDialogs.splice(dialogIdx, 1); }

      if (!this._openDialogs.length) {
        this.afterClosed.next();
        dialogCloseSub.unsubscribe();
      }
      this._portalService.dispose();
    });
  }

  private _createInjector<T>(
    config: MdcDialogConfig,
    dialogRef: MdcDialogRef<T>,
    dialogContainer: MdcDialogContainer): PortalInjector {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const injectionTokens = new WeakMap<any, any>([
      [this.injector.get(DIALOG_REF), dialogRef],
      [this.injector.get(DIALOG_CONTAINER), dialogContainer],
      [DIALOG_DATA, config.data]
    ]);

    return new PortalInjector(userInjector || this.injector, injectionTokens);
  }

  /**
   * Expands the provided configuration object to include the default values for properties which
   * are undefined.
   */
  private _applyConfigDefaults(config?: MdcDialogConfig): MdcDialogConfig {
    const dialogConfig = this.injector.get(DIALOG_CONFIG) as typeof MdcDialogConfig;
    return { ...new dialogConfig(), ...config };
  }
}
