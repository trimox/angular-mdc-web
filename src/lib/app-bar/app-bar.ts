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
  Renderer2,
  ViewEncapsulation,
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
  get fixedAdjustElement(): any { return this._fixedAdjustElement; }
  set fixedAdjustElement(element: any) {
    if (this._fixedAdjustElement !== element) {
      this.setFixedAdjustElement(element);
    }
  }
  protected _fixedAdjustElement: any;

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
    addClass: (className: string) => this._renderer.addClass(this._getHostElement(), className),
    removeClass: (className: string) => this._renderer.removeClass(this._getHostElement(), className),
    setStyle: (property: string, value: string) => this._renderer.setStyle(this._getHostElement(), property, value),
    getTopAppBarHeight: () => this._getHostElement().clientHeight,
    registerNavigationIconInteractionHandler: (type: string, handler: EventListener) => {
      if (this.navigationIcon) {
        this._registry.listen(type, handler, this.navigationIcon.getHostElement());
      }
    },
    deregisterNavigationIconInteractionHandler: (type: string, handler: EventListener) => {
      if (this.navigationIcon) {
        this._registry.unlisten(type, handler);
      }
    },
    notifyNavigationIconClicked: () => this.navigationSelected.emit({ source: this }),
    registerScrollHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      const element = this.fixedAdjustElement ? this.fixedAdjustElement : window;
      this._registry.listen('scroll', handler, element);
    },
    deregisterScrollHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      this._registry.unlisten('scroll', handler);
    },
    registerResizeHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      this._registry.listen('resize', handler, window);
    },
    deregisterResizeHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      this._registry.unlisten('resize', handler);
    },
    getViewportScrollY: () => {
      if (!isBrowser()) { return 0; }

      return this.fixedAdjustElement ? this.fixedAdjustElement.scrollTop : window.pageYOffset;
    },
    getTotalActionItems: () => this.actions ? this.actions.length : 0
  };

  private _topAppBarFoundation: {
    init(): void,
    destroy(): void
  };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterContentInit(): void {
    this.actions.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      if (this.short) {
        this.actions.length > 0 ? this._mdcAdapter.addClass('mdc-top-app-bar--short-has-action-item')
          : this._mdcAdapter.removeClass('mdc-top-app-bar--short-has-action-item');
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._topAppBarFoundation) {
      this._topAppBarFoundation.destroy();
    }
  }

  /** Sets the fixed adjust element for scrolling, if needed. */
  setFixedAdjustElement(element: any): void {
    this._fixedAdjustElement = element;
    this.refreshAppBar();

    this._changeDetectorRef.markForCheck();
  }

  /** Sets the top app bar to fixed or not. */
  setFixed(fixed: boolean): void {
    this._fixed = toBoolean(fixed);
    if (this.fixed) {
      this.setShort(false);
    }

    this.refreshAppBar();

    this._changeDetectorRef.markForCheck();
  }

  /** Sets the top app bar to prominent or not. */
  setProminent(prominent: boolean): void {
    this._prominent = toBoolean(prominent);
    if (this.prominent) {
      this.setShort(false);
    }

    this.refreshAppBar();

    this._changeDetectorRef.markForCheck();
  }

  /** Sets the top app bar to dense variant. */
  setDense(dense: boolean): void {
    this._dense = toBoolean(dense);
    if (this.dense) {
      this.setShort(false);
    }

    this.refreshAppBar();

    this._changeDetectorRef.markForCheck();
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
    this.refreshAppBar();

    this._changeDetectorRef.markForCheck();
  }

  /** Sets the top app bar to short-collapsed or not. */
  setShortCollapsed(shortCollapsed: boolean): void {
    this._shortCollapsed = toBoolean(shortCollapsed);
    if (this.shortCollapsed) {
      this.setShort(true);
    }
    this.refreshAppBar();

    this._changeDetectorRef.markForCheck();
  }

  refreshAppBar() {
    setTimeout(() => {
      if (this._topAppBarFoundation) {
        this._topAppBarFoundation.destroy();
      }

      if (this.short) {
        this._topAppBarFoundation = new MDCShortTopAppBarFoundation(this._mdcAdapter);
      } else if (this.fixed) {
        this._topAppBarFoundation = new MDCFixedTopAppBarFoundation(this._mdcAdapter);
        this._removeShortVariant();
      } else {
        this._topAppBarFoundation = new MDCTopAppBarFoundation(this._mdcAdapter);
        this._removeShortVariant();
      }

      this._topAppBarFoundation.init();
    }, 10);
  }

  private _removeShortVariant(): void {
    this._renderer.removeClass(this._getHostElement(), 'mdc-top-app-bar--short-has-action-item');
    this._renderer.removeClass(this._getHostElement(), 'mdc-top-app-bar--short-collapsed');
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
