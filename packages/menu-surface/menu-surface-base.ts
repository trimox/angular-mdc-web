import {
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  NgZone,
  Input,
  Optional,
  Output
} from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Platform, toBoolean } from '@angular-mdc/web/common';

import { getTransformPropertyName } from '@material/menu-surface/util';
import { Corner, strings } from '@material/menu-surface/constants';
import { MDCMenuSurfaceFoundation } from '@material/menu-surface/index';

export interface MdcMenuSurfaceOpenedEvent {
  detail: string;
}

export interface AnchorMargin {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export type AnchorCorner = 'bottomEnd' | 'bottomStart' | 'topEnd' | 'topStart';

const ANCHOR_CORNER_MAP = {
  bottomEnd: Corner.BOTTOM_END,
  bottomStart: Corner.BOTTOM_START,
  topEnd: Corner.TOP_END,
  topStart: Corner.TOP_START
};

export abstract class MdcMenuSurfaceBase {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _previousFocus: Element | null = null;
  private _firstFocusableElement: Element | null = null;
  private _lastFocusableElement: Element | null = null;

  @Input()
  get open(): boolean { return this._open; }
  set open(value: boolean) {
    this._open = toBoolean(value);
    this.setOpen();
  }
  private _open: boolean = false;

  @Input()
  get anchorElement(): Element | null { return this._anchorElement; }
  set anchorElement(element: Element | null) {
    this._anchorElement = element;
  }
  private _anchorElement: Element | null = null;

  @Input()
  get anchorCorner(): AnchorCorner { return this._anchorCorner; }
  set anchorCorner(value: AnchorCorner) {
    this._anchorCorner = value || 'topStart';
    this._foundation.setAnchorCorner([ANCHOR_CORNER_MAP[this._anchorCorner]]);
  }
  private _anchorCorner: AnchorCorner = 'topStart';

  @Input()
  get quickOpen(): boolean { return this._quickOpen; }
  set quickOpen(value: boolean) {
    this._quickOpen = toBoolean(value);
    this._foundation.setQuickOpen(this._quickOpen);
  }
  private _quickOpen: boolean = false;

  @Input()
  get fixed(): boolean { return this._fixed; }
  set fixed(value: boolean) {
    this._fixed = toBoolean(value);
    this._fixed ? this._getHostElement().classList.add('mdc-menu-surface--fixed') :
      this._getHostElement().classList.remove('mdc-menu-surface--fixed');
    this._foundation.setFixedPosition(this._fixed);
  }
  private _fixed: boolean = false;

  @Input()
  get coordinates(): Coordinates { return this._coordinates; }
  set coordinates(value: Coordinates) {
    this._coordinates = value;
    this._foundation.setAbsolutePosition(value.x, value.y);
  }
  private _coordinates: Coordinates = { x: 0, y: 0 };

  @Input()
  get anchorMargin(): AnchorMargin { return this._anchorMargin; }
  set anchorMargin(value: AnchorMargin) {
    this._anchorMargin = value;
    this._foundation.setAnchorMargin(this._anchorMargin);
  }
  private _anchorMargin: AnchorMargin = {};

  @Input()
  get hoistToBody(): boolean { return this._hoistToBody; }
  set hoistToBody(value: boolean) {
    this._hoistToBody = toBoolean(value);
    if (this._hoistToBody) {
      this.setHoistToBody();
    }
  }
  private _hoistToBody: boolean = false;

  /** Emits an event whenever the menu surface is opened. */
  @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();

  /** Emits an event whenever the menu surface is closed. */
  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  /** Subscription to interaction events in menu-surface. */
  private _windowClickSubscription: Subscription | null = null;

  protected _createSurfaceAdapter() {
    return Object.assign({
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      hasAnchor: () => !!this.anchorElement,
      notifyClose: () => {
        this.closed.emit();
        this._deregisterWindowClickListener();
      },
      notifyOpen: () => {
        this.opened.emit();
        this._registerWindowClickListener();
      },
      isElementInContainer: (el: Element) => this._getHostElement() === el || this._getHostElement().contains(el),
      isRtl: () => {
        if (!this.platform.isBrowser) { return; }

        return window.getComputedStyle(this._getHostElement()).getPropertyValue('direction') === 'rtl';
      },
      setTransformOrigin: (origin: string) => {
        if (!this.platform.isBrowser) { return; }

        this._getHostElement().style[`${getTransformPropertyName(window)}-origin` as any] = origin;
      }
    },
      this._getFocusAdaptermethods(),
      this._getDimensionAdapterMethods()
    );
  }

  private _getFocusAdaptermethods() {
    return {
      isFocused: () => this.platform.isBrowser ? document.activeElement! === this._getHostElement() : false,
      saveFocus: () => {
        if (!this.platform.isBrowser) { return; }
        this._previousFocus = document.activeElement!;
      },
      restoreFocus: () => {
        if (!this.platform.isBrowser) { return; }

        if (this._getHostElement().contains(document.activeElement!)) {
          if (this._previousFocus && (<any>this._previousFocus).focus) {
            (<any>this._previousFocus).focus();
          }
        }
      },
      isFirstElementFocused: () => {
        if (!this.platform.isBrowser) { return false; }
        return this._firstFocusableElement && this._firstFocusableElement === document.activeElement!;
      },
      isLastElementFocused: () => {
        if (!this.platform.isBrowser) { return false; }
        return this._lastFocusableElement && this._lastFocusableElement === document.activeElement!;
      },
      focusFirstElement: () => {
        if (!this.platform.isBrowser) { return; }

        if (this._firstFocusableElement) {
          (<any>this._firstFocusableElement).focus();
        }
      },
      focusLastElement: () => {
        if (!this.platform.isBrowser) { return; }

        if (this._lastFocusableElement) {
          (<any>this._lastFocusableElement).focus();
        }
      }
    };
  }

  private _getDimensionAdapterMethods() {
    return {
      getInnerDimensions: () => {
        return { width: this._getHostElement().offsetWidth, height: this._getHostElement().offsetHeight };
      },
      getAnchorDimensions: () => {
        if (!this.platform.isBrowser) { return; }

        return this._anchorElement && this._anchorElement.getBoundingClientRect();
      },
      getWindowDimensions: () => {
        return {
          width: this.platform.isBrowser ? window.innerWidth : 0,
          height: this.platform.isBrowser ? window.innerHeight : 0
        };
      },
      getBodyDimensions: () => {
        return {
          width: this.platform.isBrowser ? document.body!.clientWidth : 0,
          height: this.platform.isBrowser ? document.body!.clientHeight : 0
        };
      },
      getWindowScroll: () => {
        return {
          x: this.platform.isBrowser ? window.pageXOffset : 0,
          y: this.platform.isBrowser ? window.pageYOffset : 0
        };
      },
      setPosition: (position: { left: string, right: string, top: string, bottom: string }) => {
        this._getHostElement().style.left = 'left' in position ? position.left : null;
        this._getHostElement().style.right = 'right' in position ? position.right : null;
        this._getHostElement().style.top = 'top' in position ? position.top : null;
        this._getHostElement().style.bottom = 'bottom' in position ? position.bottom : null;
      },
      setMaxHeight: (height: string) => this._getHostElement().style.maxHeight = height
    };
  }

  private _foundation: {
    init(): void,
    destroy(): void,
    open(): void,
    close(): void,
    isOpen(): boolean,
    setAnchorCorner(corner: any): void,
    setAnchorMargin(margin: AnchorMargin): void,
    setIsHoisted(isHoisted: boolean): void,
    setFixedPosition(isFixedPosition: boolean): void,
    setAbsolutePosition(x: number, y: number): void,
    setQuickOpen(quickOpen: boolean): void,
    handleBodyClick(evt: MouseEvent): void,
    handleKeydown(evt: KeyboardEvent): void
  } = new MDCMenuSurfaceFoundation(this._createSurfaceAdapter());

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public platform: Platform,
    @Optional() private _ngZone: NgZone,
    public elementRef: ElementRef<HTMLElement>) { }

  protected initMenuSurface(): void {
    this._foundation.init();
    this._registerKeydownListener();
  }

  protected destroyMenuSurface(): void {
    this._destroy.next();
    this._destroy.complete();

    this._deregisterWindowClickListener();

    // add platform check due to use of cancelAnimationFrame inside destroy()
    if (this.platform.isBrowser) {
      this._foundation.destroy();
    }

    if (this.hoistToBody) {
      document.body!.removeChild(this._getHostElement());
    }
  }

  protected setOpen(): void {
    if (this._open) {
      const focusableElements = this._getHostElement().querySelectorAll(strings.FOCUSABLE_ELEMENTS);
      this._firstFocusableElement = focusableElements.length > 0 ? focusableElements[0] : null;
      this._lastFocusableElement = focusableElements.length > 0 ?
        focusableElements[focusableElements.length - 1] : null;

      this._foundation.open();
    } else {
      this._foundation.close();
    }
  }

  /**
   * Removes the menu-surface from it's current location and appends it to the
   * body to overcome any overflow:hidden issues.
   */
  protected setHoistToBody(): void {
    if (!this.platform.isBrowser) { return; }

    const parentEl = this._getHostElement().parentElement;
    if (parentEl) {
      document.body!.appendChild(parentEl.removeChild(this._getHostElement()));
      this._foundation.setIsHoisted(true);
    }
  }

  private _registerKeydownListener(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent<KeyboardEvent>(this._getHostElement(), 'keydown').pipe(takeUntil(this._destroy))
        .subscribe(evt => this._ngZone.run(() => this._foundation.handleKeydown(evt))));
  }

  private _registerWindowClickListener(): void {
    if (!this.platform.isBrowser) { return; }

    this._windowClickSubscription =
      this._ngZone.runOutsideAngular(() =>
        fromEvent<MouseEvent>(window, 'click')
          .subscribe(evt => this._ngZone.run(() => {
            this._foundation.handleBodyClick(evt);
            this._open = this._foundation.isOpen();
          })));
  }

  private _deregisterWindowClickListener(): void {
    if (this._windowClickSubscription) {
      this._windowClickSubscription.unsubscribe();
    }
  }

  /** Retrieves the DOM element of the component host. */
  protected _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
