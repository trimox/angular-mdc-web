import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { takeUntil, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { EventRegistry, isBrowser, toBoolean } from '@angular-mdc/web/common';

import {
  MdcAppBarActionItem,
  MdcAppBarNavigationIcon,
} from './app-bar.directives';
import { MDCTopAppBarAdapter } from '@material/top-app-bar/adapter';
import {
  MDCTopAppBarFoundation,
  MDCShortTopAppBarFoundation,
  MDCFixedTopAppBarFoundation
} from '@material/top-app-bar';

/** Event object emitted by MdcAppBar navigation icon selected. */
export class MdcAppBarNavSelected {
  constructor(
    public source: MdcAppBar) { }
}

@Component({
  selector: '[mdc-app-bar], mdc-app-bar',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcAppBar',
  providers: [EventRegistry],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcAppBar implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  @Input()
  get fixed(): boolean { return this._fixed; }
  set fixed(value: boolean) {
    this.setFixed(value);
  }
  protected _fixed: boolean = false;

  @Input()
  get prominent(): boolean { return this._prominent; }
  set prominent(value: boolean) {
    this.setProminent(value);
  }
  protected _prominent: boolean = false;

  @Input()
  get short(): boolean { return this._short; }
  set short(value: boolean) {
    this.setShort(value);
  }
  protected _short: boolean = false;

  @Input()
  get shortCollapsed(): boolean { return this._shortCollapsed; }
  set shortCollapsed(value: boolean) {
    this.setShortCollapsed(value);
  }
  protected _shortCollapsed: boolean = false;

  @Input()
  get dense(): boolean { return this._dense; }
  set dense(value: boolean) {
    this.setDense(value);
  }
  protected _dense: boolean = false;

  @Input()
  get fixedAdjustElement(): HTMLElement { return this._fixedAdjustElement; }
  set fixedAdjustElement(element: HTMLElement) {
    if (this._fixedAdjustElement !== element) {
      this.setFixedAdjustElement(element);
    }
  }
  protected _fixedAdjustElement: HTMLElement;

  @Input()
  get viewport(): HTMLElement { return this._viewport; }
  set viewport(element: HTMLElement) {
    if (this._viewport !== element) {
      this._viewport = element;
      this._getHostElement().style.position = 'absolute';
    }
  }
  protected _viewport: HTMLElement;

  /** Event emitted when the navigation icon is selected. */
  @Output() navigationSelected: EventEmitter<MdcAppBarNavSelected> = new EventEmitter<MdcAppBarNavSelected>();

  @HostBinding('class.mdc-top-app-bar') isHostClass = true;
  @HostBinding('class.mdc-top-app-bar--prominent') get classProminent(): string {
    return this.prominent ? 'mdc-top-app-bar--prominent' : '';
  }
  @HostBinding('class.mdc-top-app-bar--dense') get classDense(): string {
    return this.dense ? 'mdc-top-app-bar--dense' : '';
  }
  @HostBinding('class.mdc-top-app-bar--short') get classShort(): string {
    return this.short ? 'mdc-top-app-bar--short' : '';
  }
  @HostBinding('class.mdc-top-app-bar--short-collapsed') get classShortCollapsed(): string {
    return this.shortCollapsed ? 'mdc-top-app-bar--short-collapsed' : '';
  }
  @HostBinding('class.mdc-top-app-bar--fixed') get classFixed(): string {
    return this.fixed ? 'mdc-top-app-bar--fixed' : '';
  }

  @ContentChild(MdcAppBarNavigationIcon) navigationIcon: MdcAppBarNavigationIcon;
  @ContentChildren(MdcAppBarActionItem, { descendants: true }) actions: QueryList<MdcAppBarActionItem>;

  private _mdcAdapter: MDCTopAppBarAdapter = {
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => {
      if (className === 'mdc-top-app-bar--short-collapsed' && this.shortCollapsed) {
        return;
      } else {
        this._getHostElement().classList.remove(className);
      }
    },
    setStyle: (property: string, value: string) => this._getHostElement().style.setProperty(property, value),
    getTopAppBarHeight: () => this._getHostElement().clientHeight,
    notifyNavigationIconClicked: () => this.navigationSelected.emit({ source: this }),
    registerScrollHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      this._registry.listen('scroll', handler, this.viewport ? this.viewport : window);
    },
    deregisterScrollHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      this._registry.unlisten('scroll', handler);
    },
    registerResizeHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      this._registry.listen('resize', handler, this.viewport ? this.viewport : window);
    },
    deregisterResizeHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      this._registry.unlisten('resize', handler);
    },
    getViewportScrollY: () => {
      if (!isBrowser()) { return 0; }

      return this.viewport ? this.viewport.scrollTop : window.pageYOffset;
    },
    getTotalActionItems: () => this.actions ? this.actions.length : 0
  };

  private _foundation: {
    init(): void,
    destroy(): void
  };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterContentInit(): void {
    this.actions.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      if (this.short) {
        this.actions.length > 0 && this.short ? this._mdcAdapter.addClass('mdc-top-app-bar--short-has-action-item')
          : this._mdcAdapter.removeClass('mdc-top-app-bar--short-has-action-item');
      }
    });

    setTimeout(() => {
      this.initializeFoundation();
    }, 20);
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    this._foundation.destroy();
  }

  setFixedAdjustElement(element: HTMLElement): void {
    this._fixedAdjustElement = element;
    this._changeDetectorRef.markForCheck();
  }

  /** Sets the top app bar to fixed or not. */
  setFixed(fixed: boolean): void {
    this._fixed = toBoolean(fixed);
    this.fixed && this.short ? this.setShort(false) : this.initializeFoundation();
    this._changeDetectorRef.markForCheck();
  }

  /** Sets the top app bar to prominent or not. */
  setProminent(prominent: boolean): void {
    this._prominent = toBoolean(prominent);
    this.prominent && this.short ? this.setShort(false) : this.initializeFoundation();
  }

  /** Sets the top app bar to dense variant. */
  setDense(dense: boolean): void {
    this._dense = toBoolean(dense);
    this.dense && this.short ? this.setShort(false) : this.initializeFoundation();
  }

  /** Sets the top app bar to short or not. */
  setShort(short: boolean): void {
    this._short = toBoolean(short);
    if (this.short) {
      this.setProminent(false);
      this.setDense(false);
      this.setFixed(false);
    } else {
      this.setShortCollapsed(false);
    }

    this.initializeFoundation();
    this._changeDetectorRef.markForCheck();
  }

  /** Sets the top app bar to short-collapsed or not. */
  setShortCollapsed(shortCollapsed: boolean): void {
    this._shortCollapsed = toBoolean(shortCollapsed);
    if (this.shortCollapsed && !this.short) {
      this.setShort(true);
    }
  }

  initializeFoundation() {
    if (this._foundation) {
      this._foundation.destroy();
    }

    this._getHostElement().style.top = '0px';
    this._resetAppBar();

    if (this.short) {
      this._foundation = new MDCShortTopAppBarFoundation(this._mdcAdapter);
    } else if (this.fixed) {
      this._foundation = new MDCFixedTopAppBarFoundation(this._mdcAdapter);
    } else {
      this._foundation = new MDCTopAppBarFoundation(this._mdcAdapter);
    }

    this._foundation.init();
  }

  private _resetAppBar() {
    this._getHostElement().classList.remove('mdc-top-app-bar--short-has-action-item');
    this._getHostElement().classList.remove('mdc-top-app-bar--short-collapsed');
    this._getHostElement().classList.remove('mdc-top-app-bar--fixed-scrolled');

    if (this.fixed && this._getScrollOffset() > 0) {
      this._getHostElement().classList.add('mdc-top-app-bar--fixed-scrolled');
    }

    if (this.fixedAdjustElement) {
      this.fixedAdjustElement.classList.remove('mdc-top-app-bar--short-fixed-adjust');
      this.fixedAdjustElement.classList.remove('mdc-top-app-bar--fixed-adjust');
      this.fixedAdjustElement.classList.remove('mdc-top-app-bar--dense-fixed-adjust');
      this.fixedAdjustElement.classList.remove('mdc-top-app-bar--prominent-fixed-adjust');
      this.fixedAdjustElement.classList.remove('mdc-top-app-bar--dense-prominent-fixed-adjust');

      if (this.short) {
        this.fixedAdjustElement.classList.add('mdc-top-app-bar--short-fixed-adjust');
      } else if (this._dense) {
        this.fixedAdjustElement.classList.add('mdc-top-app-bar--dense-fixed-adjust');
      } else if (this._prominent) {
        this.fixedAdjustElement.classList.add('mdc-top-app-bar--prominent-fixed-adjust');
      } else if (this.dense && this.prominent) {
        this.fixedAdjustElement.classList.add('mdc-top-app-bar--dense-prominent-fixed-adjust');
      } else {
        this.fixedAdjustElement.classList.add('mdc-top-app-bar--fixed-adjust');
      }
    }
  }

  private _getViewport(): HTMLElement | Window {
    return this.viewport ? this.viewport : window;
  }

  private _getScrollOffset(): number {
    return this.viewport ? this.viewport.scrollTop : window.pageYOffset;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
