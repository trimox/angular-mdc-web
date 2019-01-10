import {
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
  Optional,
  SkipSelf
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular-mdc/web/overlay';
import { ComponentPortal, ComponentType, PortalInjector } from '@angular-mdc/web/portal';

import { MdcSnackbarModule } from './snackbar-module';

import { MdcSnackbarRef } from './snackbar-ref';
import { MdcSnackbarComponent } from './snackbar.component';
import { MDC_SNACKBAR_DATA, MdcSnackbarConfig } from './snackbar-config';
import { MdcSnackbarContainer } from './snackbar-container';

/** Injection token that can be used to specify default snackbar. */
export const MDC_SNACKBAR_DEFAULT_OPTIONS =
  new InjectionToken<MdcSnackbarConfig>('mdc-snackbar-default-options', {
    providedIn: 'root',
    factory: MDC_SNACKBAR_DEFAULT_OPTIONS_FACTORY,
  });

/** @docs-private */
export function MDC_SNACKBAR_DEFAULT_OPTIONS_FACTORY(): MdcSnackbarConfig {
  return new MdcSnackbarConfig();
}

@Injectable({ providedIn: MdcSnackbarModule })
export class MdcSnackbar implements OnDestroy {
  /**
   * Reference to the current snackbar in the view *at this level* (in the Angular injector tree).
   * If there is a parent snack-bar service, all operations should delegate to that parent
   * via `_openedSnackBarRef`.
   */
  private _snackBarRefAtThisLevel: MdcSnackbarRef<any> | null = null;

  /** Reference to the currently opened snackbar at *any* level. */
  get _openedSnackbarRef(): MdcSnackbarRef<any> | null {
    const parent = this._parentSnackBar;
    return parent ? parent._openedSnackbarRef : this._snackBarRefAtThisLevel;
  }

  set _openedSnackbarRef(value: MdcSnackbarRef<any> | null) {
    if (this._parentSnackBar) {
      this._parentSnackBar._openedSnackbarRef = value;
    } else {
      this._snackBarRefAtThisLevel = value;
    }
  }

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    @Optional() @SkipSelf() private _parentSnackBar: MdcSnackbar,
    @Inject(MDC_SNACKBAR_DEFAULT_OPTIONS) private _defaultConfig: MdcSnackbarConfig) { }

  /**
   * Creates and dispatches a snackbar with a custom component for the content, removing any
   * currently opened snackbars.
   *
   * @param component Component to be instantiated.
   * @param config Extra configuration for the snackbar.
   */
  openFromComponent<T>(component: ComponentType<T>, config?: MdcSnackbarConfig):
    MdcSnackbarRef<T> {
    return this._attach(component, config) as MdcSnackbarRef<T>;
  }

  /**
   * Opens a snackbar with a message and an optional action.
   * @param message Message text.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar.
   */
  open(message: string, action: string = '', config?: MdcSnackbarConfig):
    MdcSnackbarRef<MdcSnackbarComponent> {
    const _config = { ...this._defaultConfig, ...config };

    // Since the user doesn't have access to the component, we can
    // override the data to pass in our own message and action.
    _config.data = { message, action };

    return this.openFromComponent(MdcSnackbarComponent, _config);
  }

  /**
   * Dismisses the currently-visible snackbar.
   */
  dismiss(): void {
    if (this._openedSnackbarRef) {
      this._openedSnackbarRef.dismiss();
    }
  }

  ngOnDestroy() {
    // Only dismiss the snackbar at the current level on destroy.
    if (this._snackBarRefAtThisLevel) {
      this._snackBarRefAtThisLevel.dismiss();
    }
  }

  /**
   * Attaches the snackbar container component to the overlay.
   */
  private _attachSnackbarContainer(overlayRef: OverlayRef,
    config: MdcSnackbarConfig): MdcSnackbarContainer {

    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = new PortalInjector(userInjector || this._injector, new WeakMap([
      [MdcSnackbarConfig, config]
    ]));

    const containerPortal =
      new ComponentPortal(MdcSnackbarContainer, config.viewContainerRef, injector);
    const containerRef: ComponentRef<MdcSnackbarContainer> = overlayRef.attach(containerPortal);
    containerRef.instance.snackbarConfig = config;
    return containerRef.instance;
  }

  /**
   * Places a new component or a template as the content of the snackbar container.
   */
  private _attach<T>(content: ComponentType<T>, userConfig?: MdcSnackbarConfig):
    MdcSnackbarRef<T | EmbeddedViewRef<any>> {

    const config = { ...new MdcSnackbarConfig(), ...this._defaultConfig, ...userConfig };
    const overlayRef = this._createOverlay();
    const container = this._attachSnackbarContainer(overlayRef, config);
    const snackbarRef = new MdcSnackbarRef<T | EmbeddedViewRef<any>>(container, overlayRef);

    const injector = this._createInjector(config, snackbarRef);
    const portal = new ComponentPortal(content, undefined, injector);
    const contentRef = container.attachComponentPortal<T>(portal);

    // We can't pass this via the injector, because the injector is created earlier.
    snackbarRef.instance = contentRef.instance;

    this._loadListeners(snackbarRef);
    this._openedSnackbarRef = snackbarRef;

    if (snackbarRef.instance instanceof MdcSnackbarComponent) {
      (<MdcSnackbarComponent>snackbarRef.instance).open();
    }
    return this._openedSnackbarRef;
  }

  private _loadListeners(snackbarRef: MdcSnackbarRef<any>): void {
    // When the snackbar is dismissed, clear the reference to it.
    snackbarRef.afterDismiss().subscribe(() => {
      // Clear the snackbar ref if it hasn't already been replaced by a newer snackbar.
      if (this._openedSnackbarRef === snackbarRef) {
        this._openedSnackbarRef = null;
      }
    });

    if (this._openedSnackbarRef) {
      this._openedSnackbarRef.dismiss();
    }
  }

  /**
   * Creates a new overlay and places it in the correct location.
   * @param config The user-specified snackbar config.
   */
  private _createOverlay(): OverlayRef {
    return this._overlay.create();
  }

  /**
   * Creates an injector to be used inside of a snackbar component.
   * @param config Config that was used to create the snackbar.
   * @param snackbarRef Reference to the snackbar.
   */
  private _createInjector<T>(
    config: MdcSnackbarConfig,
    snackbarRef: MdcSnackbarRef<T>): PortalInjector {

    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

    return new PortalInjector(userInjector || this._injector, new WeakMap<any, any>([
      [MdcSnackbarRef, snackbarRef],
      [MDC_SNACKBAR_DATA, config.data]
    ]));
  }
}
