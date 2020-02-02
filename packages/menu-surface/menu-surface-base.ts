import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  Input,
  Optional,
  Output
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Platform} from '@angular/cdk/platform';
import {fromEvent, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MDCComponent} from '@angular-mdc/web/base';

import {MDCMenuSurfaceFoundation, MDCMenuSurfaceAdapter, Corner, util} from '@material/menu-surface';

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
  topEnd: Corner.TOP_END,
  topStart: Corner.TOP_START,
  bottomEnd: Corner.BOTTOM_END,
  bottomStart: Corner.BOTTOM_START
};

@Directive()
export abstract class MdcMenuSurfaceBase extends MDCComponent<MDCMenuSurfaceFoundation> {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _previousFocus?: Element;

  @Input()
  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._open) {
      this._open = coerceBooleanProperty(value);
      if (this._open) {
        this._foundation.open();
      } else {
        this._foundation.close();
      }
    }
  }
  private _open: boolean = false;

  @Input()
  get anchorElement(): HTMLElement | undefined {
    return this._anchorElement;
  }
  set anchorElement(element: HTMLElement | undefined) {
    this._anchorElement = element;
  }
  private _anchorElement?: HTMLElement;

  @Input()
  get anchorCorner(): AnchorCorner {
    return this._anchorCorner;
  }
  set anchorCorner(value: AnchorCorner) {
    this._anchorCorner = value ?? 'topStart';
    this._foundation.setAnchorCorner(ANCHOR_CORNER_MAP[this._anchorCorner]);
  }
  private _anchorCorner: AnchorCorner = 'topStart';

  @Input()
  get quickOpen(): boolean {
    return this._quickOpen;
  }
  set quickOpen(value: boolean) {
    this._quickOpen = coerceBooleanProperty(value);
    this._foundation.setQuickOpen(this._quickOpen);
  }
  private _quickOpen: boolean = false;

  @Input()
  get fixed(): boolean {
    return this._fixed;
  }
  set fixed(value: boolean) {
    this._fixed = coerceBooleanProperty(value);
    if (this._fixed) {
      this._getHostElement().classList.add('mdc-menu-surface--fixed');
    } else {
      this._getHostElement().classList.remove('mdc-menu-surface--fixed');
    }
    this._foundation.setFixedPosition(this._fixed);
  }
  private _fixed: boolean = false;

  @Input()
  get coordinates(): Coordinates {
    return this._coordinates;
  }
  set coordinates(value: Coordinates) {
    this._coordinates = value;
    this._foundation.setAbsolutePosition(value.x, value.y);
  }
  private _coordinates: Coordinates = {x: 0, y: 0};

  @Input()
  get anchorMargin(): AnchorMargin {
    return this._anchorMargin;
  }
  set anchorMargin(value: AnchorMargin) {
    this._anchorMargin = value;
    this._foundation.setAnchorMargin(this._anchorMargin);
  }
  private _anchorMargin: AnchorMargin = {};

  @Input()
  get hoistToBody(): boolean {
    return this._hoistToBody;
  }
  set hoistToBody(value: boolean) {
    this._hoistToBody = coerceBooleanProperty(value);
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

  getDefaultFoundation() {
    const adapter: MDCMenuSurfaceAdapter = {
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
      isRtl: () => this.platform.isBrowser ?
        window.getComputedStyle(this._getHostElement()).getPropertyValue('direction') === 'rtl' : false,
      setTransformOrigin: (origin: string) =>
        this.platform.isBrowser ?
          this._getHostElement().style[`${util.getTransformPropertyName(window)}-origin` as any] = origin : false,
      isFocused: () => document?.activeElement === this._getHostElement() ?? false,
      saveFocus: () => this._previousFocus = document?.activeElement ?? undefined,
      restoreFocus: () => {
        if (this.platform.isBrowser) {
          if (this._getHostElement().contains(document.activeElement)) {
            (<HTMLElement>this._previousFocus)?.focus();
          }
        }
      },
      getInnerDimensions: () =>
        ({width: this._getHostElement().offsetWidth, height: this._getHostElement().offsetHeight}),
      getAnchorDimensions: () =>
        this.platform.isBrowser || !this.anchorElement ?
          this._anchorElement!.getBoundingClientRect() : {top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0},
      getWindowDimensions: () => ({
        width: this.platform.isBrowser ? window.innerWidth : 0,
        height: this.platform.isBrowser ? window.innerHeight : 0
      }),
      getBodyDimensions: () => ({
        width: this.platform.isBrowser ? document.body!.clientWidth : 0,
        height: this.platform.isBrowser ? document.body!.clientHeight : 0
      }),
      getWindowScroll: () => ({
        x: this.platform.isBrowser ? window.pageXOffset : 0,
        y: this.platform.isBrowser ? window.pageYOffset : 0
      }),
      setPosition: (position: {left: number, right: number, top: number, bottom: number}) => {
        this._getHostElement().style.left = 'left' in position ? `${position.left}px` : '';
        this._getHostElement().style.right = 'right' in position ? `${position.right}px` : '';
        this._getHostElement().style.top = 'top' in position ? `${position.top}px` : '';
        this._getHostElement().style.bottom = 'bottom' in position ? `${position.bottom}px` : '';
      },
      setMaxHeight: (height: string) => this._getHostElement().style.maxHeight = height
    };
    return new MDCMenuSurfaceFoundation(adapter);
  }

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public platform: Platform,
    @Optional() private _ngZone: NgZone,
    public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  protected initMenuSurface(): void {
    this._foundation.init();
    this.anchorElement = this._getHostElement().parentElement ?? this.anchorElement;
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

  /**
   * Removes the menu-surface from it's current location and appends it to the
   * body to overcome any overflow:hidden issues.
   */
  protected setHoistToBody(): void {
    if (!this.platform.isBrowser) {
      return;
    }

    const parentEl = this._getHostElement().parentElement;
    if (parentEl) {
      document.body!.appendChild(parentEl.removeChild(this._getHostElement()));
      this._foundation.setIsHoisted(true);
    }
  }

  private _registerKeydownListener(): void {
    fromEvent<KeyboardEvent>(this._getHostElement(), 'keydown')
      .pipe(takeUntil(this._destroy))
      .subscribe(evt => {
        this._foundation.handleKeydown(evt);
        this._open = this._foundation.isOpen();
      });
  }

  private _registerWindowClickListener(): void {
    if (!this.platform.isBrowser) {
      return;
    }

    this._windowClickSubscription =
      this._ngZone.runOutsideAngular(() =>
        fromEvent<MouseEvent>(window, 'click')
          .subscribe(evt => this._ngZone.run(() => {
            this._foundation.handleBodyClick(evt);
            this._open = this._foundation.isOpen();
          })));
  }

  private _deregisterWindowClickListener(): void {
    this._windowClickSubscription?.unsubscribe();
  }

  /** Retrieves the DOM element of the component host. */
  protected _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
