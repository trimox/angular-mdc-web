import {
  ElementRef,
  Injectable,
  OnDestroy,
  NgZone
} from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Platform, toBoolean } from '@angular-mdc/web/common';

import {
  applyPassive,
  getMatchesProperty,
  supportsCssVariables
} from '@material/ripple/util';
import { MDCRippleFoundation } from '@material/ripple/index';

export class MdcRippleConfig {
  surface: any;
  activator?: any;
  unbounded?: boolean;
  disabled?: boolean;
}

@Injectable()
export class MdcRipple implements OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _initialized: boolean;
  readonly initialized: boolean = this._initialized;

  private _rippleConfig: MdcRippleConfig;

  private _focusSubscription: Subscription | null;
  private _blurSubscription: Subscription | null;

  createAdapter() {
    return {
      browserSupportsCssVars: () => this._platform.isBrowser ? supportsCssVariables(window) : false,
      isUnbounded: () => this._rippleConfig.unbounded,
      isSurfaceActive: () => {
        if (!this._platform.isBrowser) { return false; }

        const MATCHES = getMatchesProperty(HTMLElement.prototype);
        return this._rippleConfig.activator ? this._rippleConfig.activator[MATCHES](':active') :
          this._rippleConfig.surface[MATCHES](':active');
      },
      isSurfaceDisabled: () => this._rippleConfig.disabled,
      addClass: (className: string) => this._rippleConfig.surface.classList.add(className),
      removeClass: (className: string) => this._rippleConfig.surface.classList.remove(className),
      containsEventTarget: (target: EventTarget) => this._rippleConfig.surface.contains(target),
      registerInteractionHandler: (evtType: string, handler: EventListener) =>
        this._rippleConfig.surface.addEventListener(evtType, handler, applyPassive()),
      deregisterInteractionHandler: (evtType: string, handler: EventListener) =>
        this._rippleConfig.surface.removeEventListener(evtType, handler, applyPassive()),
      registerDocumentInteractionHandler: (evtType: string, handler: EventListener) => {
        if (!this._platform.isBrowser) { return; }

        document.documentElement!.addEventListener(evtType, handler, applyPassive());
      },
      deregisterDocumentInteractionHandler: (evtType: string, handler: EventListener) => {
        if (!this._platform.isBrowser) { return; }

        document.documentElement!.removeEventListener(evtType, handler, applyPassive());
      },
      registerResizeHandler: (handler: EventListener) => {
        if (!this._platform.isBrowser) { return; }

        window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: (handler: EventListener) => {
        if (!this._platform.isBrowser) { return; }

        window.removeEventListener('resize', handler);
      },
      updateCssVariable: (varName: string, value: string) => this._rippleConfig.surface.style.setProperty(varName, value),
      computeBoundingRect: () => {
        if (!this._platform.isBrowser) { return {}; }

        return this._rippleConfig.surface.getBoundingClientRect();
      },
      getWindowPageOffset: () => ({
        x: this._platform.isBrowser ? window.pageXOffset : 0,
        y: this._platform.isBrowser ? window.pageYOffset : 0
      })
    };
  }

  protected _foundation: {
    init(): void,
    destroy(): void,
    activate(event?: Event): void,
    deactivate(event?: Event): void,
    handleFocus(): void,
    handleBlur(): void
  };

  constructor(
    private _ngZone: NgZone,
    private _platform: Platform,
    private _elementRef: ElementRef<HTMLElement>) { }

  init(config: MdcRippleConfig, adapter?: any) {
    if (!this._platform.isBrowser) { return; }

    this._rippleConfig = config;
    this._foundation = new MDCRippleFoundation(adapter || this.createAdapter());
    this._loadListeners();

    this._foundation.init();
    this._initialized = true;
  }

  destroy(): void {
    if (!this._platform.isBrowser) { return; }

    this._destroy.next();
    this._destroy.complete();

    this._unloadListeners();
    if (this._foundation) {
      this._foundation.destroy();
    }
    this._initialized = false;
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  activateRipple(event?: Event): void {
    this._foundation.activate(event);
  }

  deactivateRipple(event?: Event): void {
    this._foundation.deactivate(event);
  }

  handleFocus(): void {
    this._foundation.handleFocus();
  }

  handleBlur(): void {
    this._foundation.handleBlur();
  }

  private _loadListeners(): void {
    this._focusSubscription = this._ngZone.runOutsideAngular(() =>
      fromEvent<FocusEvent>(this._rippleConfig.activator ?
        this._rippleConfig.activator : this._rippleConfig.surface, 'focus').pipe(takeUntil(this._destroy))
        .subscribe(() => this._ngZone.run(() => this.handleFocus())));

    this._blurSubscription = this._ngZone.runOutsideAngular(() =>
      fromEvent<Event>(this._rippleConfig.activator ?
        this._rippleConfig.activator : this._rippleConfig.surface, 'blur').pipe(takeUntil(this._destroy))
        .subscribe(() => this._ngZone.run(() => this.handleBlur())));
  }

  private _unloadListeners(): void {
    if (this._focusSubscription) {
      this._focusSubscription.unsubscribe();
      this._focusSubscription = null;
    }
    if (this._blurSubscription) {
      this._blurSubscription.unsubscribe();
      this._blurSubscription = null;
    }
  }
}
