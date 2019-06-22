import {
  Injectable,
  OnDestroy,
  NgZone
} from '@angular/core';
import {fromEvent, Subject, Subscription, merge, Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Platform} from '@angular-mdc/web/common';

import {matches} from '@material/dom/ponyfill';
import {
  applyPassive,
  supportsCssVariables
} from '@material/ripple/util';
import {MDCRippleFoundation} from '@material/ripple';

// Activation events registered on the root element of each instance for activation
const ACTIVATION_EVENT_TYPES = ['touchstart', 'mousedown', 'keydown'];

// Deactivation events registered on documentElement when a pointer-related down event occurs
const POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup', 'keyup', 'contextmenu'];

/**
 * Time in milliseconds for which to ignore mouse events, after
 * receiving a touch event. Used to avoid doing double work for
 * touch devices where the browser fires fake mouse events, in
 * addition to touch events.
 */
const MOUSE_EVENT_IGNORE_TIME = 800;

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

  private _initialized: boolean = false;
  readonly initialized: boolean = this._initialized;

  private _rippleConfig!: MdcRippleConfig;

  /** Time in milliseconds when the last touchstart event happened. */
  private _lastTouchStartEvent: number = 0;

  private _focusSubscription: Subscription | null = null;
  private _blurSubscription: Subscription | null = null;

  private _activationEventsSubscription: Subscription | null = null;
  private _pointerDeactivationEventsSubscription: Subscription | null = null;

  /** Combined stream of all of the activation events. */
  get activationEvents(): Observable<any> {
    return merge(...ACTIVATION_EVENT_TYPES.map(evt =>
      fromEvent(this._rippleConfig.activator ? this._rippleConfig.activator :
        this._rippleConfig.surface, evt, applyPassive() as EventListenerOptions)));
  }

  /** Combined stream of all of the de-activation events. */
  get pointerDeactivationEvents(): Observable<any> {
    return merge(...POINTER_DEACTIVATION_EVENT_TYPES.map(evt =>
      fromEvent(this._rippleConfig.activator ? this._rippleConfig.activator :
        this._rippleConfig.surface, evt, applyPassive() as EventListenerOptions)));
  }

  createAdapter() {
    return {
      browserSupportsCssVars: () => this._platform.isBrowser ? supportsCssVariables(window) : false,
      isUnbounded: () => this._rippleConfig.unbounded,
      isSurfaceActive: () => matches(this._rippleConfig.surface, ':active'),
      isSurfaceDisabled: () => this._rippleConfig.disabled,
      addClass: (className: string) => this._rippleConfig.surface.classList.add(className),
      removeClass: (className: string) => this._rippleConfig.surface.classList.remove(className),
      containsEventTarget: (target: EventTarget) => this._rippleConfig.surface.contains(target),
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
      updateCssVariable: (varName: string, value: string) =>
        this._rippleConfig.surface.style.setProperty(varName, value),
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

  protected _foundation!: {
    init(): void,
    destroy(): void,
    activate(event?: Event): void,
    deactivate(event?: Event): void,
    handleFocus(): void,
    handleBlur(): void
  };

  constructor(
    private _ngZone: NgZone,
    private _platform: Platform) { }

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
    if (event) {
      if (event instanceof MouseEvent) {
        const isSyntheticEvent = this._lastTouchStartEvent &&
          Date.now() < this._lastTouchStartEvent + MOUSE_EVENT_IGNORE_TIME;

        if (isSyntheticEvent) {
          return;
        }
      } else {
        this._lastTouchStartEvent = Date.now();
      }
    }

    setTimeout(() => this._foundation.activate(event));
  }

  deactivateRipple(event?: Event): void {
    setTimeout(() => this._foundation.deactivate(event));
  }

  handleFocus(): void {
    this._foundation.handleFocus();
  }

  handleBlur(): void {
    this._foundation.handleBlur();
  }

  private _loadListeners(): void {
    this._activationEventsSubscription = this._ngZone.runOutsideAngular(() =>
      this.activationEvents.pipe(takeUntil(this._destroy))
        .subscribe(event => this._ngZone.run(() => this.activateRipple(event))));

    this._pointerDeactivationEventsSubscription = this._ngZone.runOutsideAngular(() =>
      this.pointerDeactivationEvents.pipe(takeUntil(this._destroy))
        .subscribe(event => this._ngZone.run(() => this.deactivateRipple(event))));

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
    if (this._activationEventsSubscription) {
      this._activationEventsSubscription.unsubscribe();
      this._activationEventsSubscription = null;
    }

    if (this._pointerDeactivationEventsSubscription) {
      this._pointerDeactivationEventsSubscription.unsubscribe();
      this._pointerDeactivationEventsSubscription = null;
    }
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
