import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Platform} from '@angular/cdk/platform';
import {fromEvent, Subject, Subscription} from 'rxjs';
import {takeUntil, startWith} from 'rxjs/operators';

import {MDCComponent} from '@angular-mdc/web/base';

import {
  MdcTopAppBarActionItem,
  MdcTopAppBarNavigationIcon,
} from './top-app-bar.directives';

import {
  cssClasses,
  MDCTopAppBarAdapter,
  MDCTopAppBarBaseFoundation,
  MDCTopAppBarFoundation,
  MDCShortTopAppBarFoundation,
  MDCFixedTopAppBarFoundation
} from '@material/top-app-bar';

/** Event object emitted by MdcTopAppBar navigation icon selected. */
export class MdcTopAppBarNavSelected {
  constructor(
    public source: MdcTopAppBar) { }
}

@Component({
  selector: 'mdc-top-app-bar, [mdc-top-app-bar]',
  exportAs: 'mdcTopAppBar',
  host: {
    'class': 'mdc-top-app-bar',
    '[class.mdc-top-app-bar--prominent]': 'prominent',
    '[class.mdc-top-app-bar--dense]': 'dense',
    '[class.mdc-top-app-bar--short]': 'short',
    '[class.mdc-top-app-bar--fixed]': 'fixed'
  },
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcTopAppBar extends MDCComponent<MDCTopAppBarBaseFoundation | MDCShortTopAppBarFoundation
| MDCFixedTopAppBarFoundation | any> implements AfterContentInit, AfterViewInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  @Input()
  get fixed(): boolean { return this._fixed; }
  set fixed(value: boolean) {
    if (value !== this._fixed) {
      this.setFixed(value);
    }
  }
  private _fixed: boolean = false;

  @Input()
  get prominent(): boolean { return this._prominent; }
  set prominent(value: boolean) {
    if (value !== this._prominent) {
      this.setProminent(value);
    }
  }
  private _prominent: boolean = false;

  @Input()
  get short(): boolean { return this._short; }
  set short(value: boolean) {
    if (value !== this._short) {
      this.setShort(value);
    }
  }
  private _short: boolean = false;

  @Input()
  get shortCollapsed(): boolean { return this._shortCollapsed; }
  set shortCollapsed(value: boolean) {
    if (value !== this._shortCollapsed) {
      this.setShortCollapsed(value);
    }
  }
  private _shortCollapsed: boolean = false;

  @Input()
  get dense(): boolean { return this._dense; }
  set dense(value: boolean) {
    if (value !== this._dense) {
      this.setDense(value);
    }
  }
  private _dense: boolean = false;

  @Input()
  get fixedAdjustElement(): HTMLElement | null { return this._fixedAdjustElement; }
  set fixedAdjustElement(element: HTMLElement | null) {
    if (this._fixedAdjustElement !== element) {
      this._fixedAdjustElement = element;
      this._initTopAppBar();
    }
  }
  private _fixedAdjustElement: HTMLElement | null = null;

  @Input()
  get scrollTarget(): any { return this._scrollTarget; }
  set scrollTarget(target: any) {
    if (target !== this._scrollTarget) {
      this._scrollTarget = target ? target : this._platform.isBrowser ? window : undefined;
      this._initScrollHandler();
    }
  }
  private _scrollTarget: any = this._platform.isBrowser ? this.scrollTarget || window : undefined;

  /** Event emitted when the navigation icon is selected. */
  @Output() readonly navigationSelected: EventEmitter<MdcTopAppBarNavSelected> =
    new EventEmitter<MdcTopAppBarNavSelected>();

  @ContentChild(MdcTopAppBarNavigationIcon, {static: false}) navigationIcon?: MdcTopAppBarNavigationIcon;
  @ContentChildren(MdcTopAppBarActionItem, { descendants: true }) actions!: QueryList<MdcTopAppBarActionItem>;

  private _scrollTargetSubscription: Subscription | null = null;

  getDefaultFoundation(): any {
    const adapter: MDCTopAppBarAdapter = {
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => {
        if (className === cssClasses.SHORT_COLLAPSED_CLASS && this.shortCollapsed) {
          return;
        }
        this._getHostElement().classList.remove(className);
      },
      setStyle: (property: string, value: string) => this._getHostElement().style.setProperty(property, value),
      getTopAppBarHeight: () => this._getHostElement().clientHeight,
      notifyNavigationIconClicked: () => this.navigationSelected.emit({ source: this }),
      getViewportScrollY: () => {
        if (!this._platform.isBrowser) { return 0; }

        return this._scrollTarget[this._scrollTarget === window ? 'pageYOffset' : 'scrollTop'];
      },
      getTotalActionItems: () => this.actions ? this.actions.length : 0
    };

    let foundation: MDCTopAppBarBaseFoundation;
    if (!this.elementRef) {
      return new MDCTopAppBarBaseFoundation(adapter);
    }

    if (this.short) {
      foundation = new MDCShortTopAppBarFoundation(adapter);
    } else if (this.fixed) {
      foundation = new MDCFixedTopAppBarFoundation(adapter);
    } else {
      foundation = new MDCTopAppBarFoundation(adapter);
    }
    return foundation;
  }

  constructor(
    private _ngZone: NgZone,
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) {

    super(elementRef);
  }

  ngAfterContentInit(): void {
    this.actions.changes.pipe(startWith(null), takeUntil(this._destroyed))
      .subscribe(() => {
        if (this.short && this.actions.length) {
          this._getHostElement().classList.toggle(cssClasses.SHORT_HAS_ACTION_ITEM_CLASS);
        }
      });
  }

  ngAfterViewInit(): void {
    this._initFoundation();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    if (this._scrollTargetSubscription) {
      this._scrollTargetSubscription.unsubscribe();
    }
    this._destroyFoundation();
  }

  /** Sets the top app bar to fixed or not. */
  setFixed(fixed: boolean, isUserInput: boolean = false): void {
    this._fixed = coerceBooleanProperty(fixed);

    if (this.fixed && this.short) {
      this.setShort(false);
    }

    if (isUserInput) {
      this._initFoundation();
    }
  }

  /** Sets the top app bar to prominent or not. */
  setProminent(prominent: boolean, isUserInput: boolean = false): void {
    this._prominent = coerceBooleanProperty(prominent);

    if (this.prominent && this.short) {
      this.setShort(false);
    }

    if (isUserInput) {
      this._initFoundation();
    }
  }

  /** Sets the top app bar to dense variant. */
  setDense(dense: boolean, isUserInput: boolean = false): void {
    this._dense = coerceBooleanProperty(dense);

    if (this.dense && this.short) {
      this.setShort(false);
    }

    if (isUserInput) {
      this._initFoundation();
    }
  }

  /** Sets the top app bar to short or not. */
  setShort(short: boolean, isUserInput: boolean = false): void {
    this._short = coerceBooleanProperty(short);

    if (this.short) {
      this.setProminent(false);
      this.setDense(false);
      this.setFixed(false);
    } else {
      this.setShortCollapsed(false);
    }

    if (isUserInput) {
      this._initFoundation();
    }
  }

  /** Sets the top app bar to short-collapsed or not. */
  setShortCollapsed(shortCollapsed: boolean, isUserInput: boolean = false): void {
    this._shortCollapsed = coerceBooleanProperty(shortCollapsed);

    if (this.shortCollapsed && !this.short) {
      this.setShort(true);
    }

    if (isUserInput) {
      this._initFoundation();
    }
  }

  isCollapsed(): boolean {
    return this._getHostElement().classList.contains(cssClasses.SHORT_COLLAPSED_CLASS);
  }

  private _initFoundation(): void {
    this._destroyFoundation();

    this._getHostElement().style.top = '0px';
    this._resetFixedShort();

    this._foundation = this.getDefaultFoundation();
    this._foundation.init();

    this._initTopAppBar();
    this._initScrollHandler();
    this._changeDetectorRef.markForCheck();
  }

  private _resetFixedShort(): void {
    this._getHostElement().classList.remove(cssClasses.SHORT_HAS_ACTION_ITEM_CLASS);
    this._getHostElement().classList.remove(cssClasses.SHORT_COLLAPSED_CLASS);
    this._getHostElement().classList.remove(cssClasses.FIXED_SCROLLED_CLASS);
  }

  private _initTopAppBar(): void {
    if (!this.fixed) {
      this._getHostElement().classList.remove(cssClasses.FIXED_SCROLLED_CLASS);
    }

    if (this.fixed && this._getScrollOffset() > 0) {
      this._getHostElement().classList.add(cssClasses.FIXED_SCROLLED_CLASS);
    }

    if (!this.short) {
      this._getHostElement().classList.remove(cssClasses.SHORT_HAS_ACTION_ITEM_CLASS);
      this._getHostElement().classList.remove(cssClasses.SHORT_COLLAPSED_CLASS);
    }
    if (this.short && this._getScrollOffset() > 0) {
      this._getHostElement().classList.add(cssClasses.SHORT_COLLAPSED_CLASS);
    }

    if (this.shortCollapsed) {
      this._getHostElement().classList.add(cssClasses.SHORT_COLLAPSED_CLASS);
    }

    if (this.fixedAdjustElement) {
      this._removeFixedAdjustClasses();
      this._addFixedAdjustClass();
    }
  }

  private _removeFixedAdjustClasses(): void {
    this.fixedAdjustElement!.classList.remove('mdc-top-app-bar--short-fixed-adjust');
    this.fixedAdjustElement!.classList.remove('mdc-top-app-bar--fixed-adjust');
    this.fixedAdjustElement!.classList.remove('mdc-top-app-bar--dense-fixed-adjust');
    this.fixedAdjustElement!.classList.remove('mdc-top-app-bar--prominent-fixed-adjust');
    this.fixedAdjustElement!.classList.remove('mdc-top-app-bar--dense-prominent-fixed-adjust');
  }

  private _addFixedAdjustClass(): void {
    if (this._short) {
      this.fixedAdjustElement!.classList.add('mdc-top-app-bar--short-fixed-adjust');
    } else if (this._dense && this._prominent) {
      this.fixedAdjustElement!.classList.add('mdc-top-app-bar--dense-prominent-fixed-adjust');
    } else if (this._dense) {
      this.fixedAdjustElement!.classList.add('mdc-top-app-bar--dense-fixed-adjust');
    } else if (this._prominent) {
      this.fixedAdjustElement!.classList.add('mdc-top-app-bar--prominent-fixed-adjust');
    } else {
      this.fixedAdjustElement!.classList.add('mdc-top-app-bar--fixed-adjust');
    }
  }

  private _destroyFoundation(): void {
    this._foundation?.destroy();
  }

  private _initScrollHandler(): void {
    if (this._scrollTargetSubscription) {
      this._scrollTargetSubscription.unsubscribe();
    }
    if (!this._platform.isBrowser) {
      return;
    }

    this._scrollTargetSubscription = this._ngZone.runOutsideAngular(() =>
      fromEvent<Event>(this.scrollTarget || window, 'scroll')
        .subscribe(() => this._ngZone.run(() => this._foundation.handleTargetScroll())));
  }

  private _getScrollOffset(): number {
    if (!this._platform.isBrowser) { return 0; }
    return this.scrollTarget ? this.scrollTarget.scrollTop : window.pageYOffset;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
