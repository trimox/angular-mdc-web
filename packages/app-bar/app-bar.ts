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
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { takeUntil, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { isBrowser, toBoolean } from '@angular-mdc/web/common';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcAppBar implements AfterContentInit, AfterViewInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _isFoundationInit: boolean;

  @Input()
  get fixed(): boolean { return this._fixed; }
  set fixed(value: boolean) {
    if (value !== this._fixed) {
      this.setFixed(value);
    }
  }
  private _fixed: boolean;

  @Input()
  get prominent(): boolean { return this._prominent; }
  set prominent(value: boolean) {
    if (value !== this._prominent) {
      this.setProminent(value);
    }
  }
  private _prominent: boolean;

  @Input()
  get short(): boolean { return this._short; }
  set short(value: boolean) {
    if (value !== this._short) {
      this.setShort(value);
    }
  }
  private _short: boolean;

  @Input()
  get shortCollapsed(): boolean { return this._shortCollapsed; }
  set shortCollapsed(value: boolean) {
    if (value !== this._shortCollapsed) {
      this.setShortCollapsed(value);
    }
  }
  private _shortCollapsed: boolean;

  @Input()
  get dense(): boolean { return this._dense; }
  set dense(value: boolean) {
    if (value !== this._dense) {
      this.setDense(value);
    }
  }
  private _dense: boolean;

  @Input()
  get fixedAdjustElement(): HTMLElement { return this._fixedAdjustElement; }
  set fixedAdjustElement(element: HTMLElement) {
    if (this._fixedAdjustElement !== element) {
      this.setFixedAdjustElement(element);
    }
  }
  private _fixedAdjustElement: HTMLElement;

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
      }
      this._getHostElement().classList.remove(className);
    },
    setStyle: (property: string, value: string) => this._getHostElement().style.setProperty(property, value),
    getTopAppBarHeight: () => this._getHostElement().clientHeight,
    notifyNavigationIconClicked: () => this.navigationSelected.emit({ source: this }),
    registerScrollHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      window.addEventListener('scroll', handler);
    },
    deregisterScrollHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      window.removeEventListener('scroll', handler);
    },
    registerResizeHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      window.addEventListener('resize', handler);
    },
    deregisterResizeHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      window.removeEventListener('resize', handler);
    },
    getViewportScrollY: () => {
      if (!isBrowser()) { return 0; }

      return window.pageYOffset;
    },
    getTotalActionItems: () => this.actions ? this.actions.length : 0
  };

  private _foundation: {
    init(): void,
    destroy(): void
  } = new MDCTopAppBarFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) { }

  ngAfterContentInit(): void {
    this.actions.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      if (this.short) {
        this.actions.length > 0 && this.short ? this._mdcAdapter.addClass('mdc-top-app-bar--short-has-action-item')
          : this._mdcAdapter.removeClass('mdc-top-app-bar--short-has-action-item');
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this._isFoundationInit) {
      this.initializeFoundation();
    }
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  setFixedAdjustElement(element: HTMLElement): void {
    this._fixedAdjustElement = element;
    this._initAppBar();
  }

  /** Sets the top app bar to fixed or not. */
  setFixed(fixed: boolean, isUserInput: boolean = true): void {
    this._fixed = toBoolean(fixed);

    if (this.fixed && this.short) {
      this.setShort(false, false);
    }

    if (isUserInput) {
      this.initializeFoundation();
    }
  }

  /** Sets the top app bar to prominent or not. */
  setProminent(prominent: boolean, isUserInput: boolean = true): void {
    this._prominent = toBoolean(prominent);

    if (this.prominent && this.short) {
      this.setShort(false, false);
    }

    if (isUserInput) {
      this.initializeFoundation();
    }
  }

  /** Sets the top app bar to dense variant. */
  setDense(dense: boolean, isUserInput: boolean = true): void {
    this._dense = toBoolean(dense);

    if (this.dense && this.short) {
      this.setShort(false, false);
    }

    if (isUserInput) {
      this.initializeFoundation();
    }
  }

  /** Sets the top app bar to short or not. */
  setShort(short: boolean, isUserInput: boolean = true): void {
    this._short = toBoolean(short);

    if (this.short) {
      this.setProminent(false, false);
      this.setDense(false, false);
      this.setFixed(false, false);
    } else {
      this.setShortCollapsed(false, false);
    }

    if (isUserInput) {
      this.initializeFoundation();
    }
  }

  /** Sets the top app bar to short-collapsed or not. */
  setShortCollapsed(shortCollapsed: boolean, isUserInput: boolean = true): void {
    this._shortCollapsed = toBoolean(shortCollapsed);

    if (this.shortCollapsed && !this.short) {
      this.setShort(true, false);
    }

    if (isUserInput) {
      this.initializeFoundation();
    }
  }

  isCollapsed(): boolean {
    return this._getHostElement().classList.contains('mdc-top-app-bar--short-collapsed') ||
      this._getHostElement().classList.contains('mdc-top-app-bar--short-collapsed');
  }

  initializeFoundation(): void {
    setTimeout(() => {
      this._foundation.destroy();

      this._getHostElement().style.top = '0px';
      this._resetFixedShort();

      if (this.short) {
        this._foundation = new MDCShortTopAppBarFoundation(this._mdcAdapter);
      } else if (this.fixed) {
        this._foundation = new MDCFixedTopAppBarFoundation(this._mdcAdapter);
      } else {
        this._foundation = new MDCTopAppBarFoundation(this._mdcAdapter);
      }

      this._foundation.init();
      this._isFoundationInit = true;

      this._initAppBar();

      this._changeDetectorRef.markForCheck();
    }, 20);
  }

  private _resetFixedShort(): void {
    this._getHostElement().classList.remove('mdc-top-app-bar--short-has-action-item');
    this._getHostElement().classList.remove('mdc-top-app-bar--short-collapsed');
    this._getHostElement().classList.remove('mdc-top-app-bar--fixed-scrolled');
  }

  private _initAppBar(): void {
    if (!this.fixed) {
      this._getHostElement().classList.remove('mdc-top-app-bar--fixed-scrolled');
    }

    if (this.fixed && this._getScrollOffset() > 0) {
      this._getHostElement().classList.add('mdc-top-app-bar--fixed-scrolled');
    }

    if (!this.short) {
      this._getHostElement().classList.remove('mdc-top-app-bar--short-has-action-item');
      this._getHostElement().classList.remove('mdc-top-app-bar--short-collapsed');
    }
    if (this.short && this._getScrollOffset() > 0) {
      this._getHostElement().classList.add('mdc-top-app-bar--short-collapsed');
    }

    if (this.shortCollapsed) {
      this._getHostElement().classList.add('mdc-top-app-bar--short-collapsed');
    }

    if (this.fixedAdjustElement) {
      this.fixedAdjustElement.classList.remove('mdc-top-app-bar--short-fixed-adjust');
      this.fixedAdjustElement.classList.remove('mdc-top-app-bar--fixed-adjust');
      this.fixedAdjustElement.classList.remove('mdc-top-app-bar--dense-fixed-adjust');
      this.fixedAdjustElement.classList.remove('mdc-top-app-bar--prominent-fixed-adjust');
      this.fixedAdjustElement.classList.remove('mdc-top-app-bar--dense-prominent-fixed-adjust');

      if (this._short) {
        this.fixedAdjustElement.classList.add('mdc-top-app-bar--short-fixed-adjust');
      } else if (this._dense && this._prominent) {
        this.fixedAdjustElement.classList.add('mdc-top-app-bar--dense-prominent-fixed-adjust');
      } else if (this._dense) {
        this.fixedAdjustElement.classList.add('mdc-top-app-bar--dense-fixed-adjust');
      } else if (this._prominent) {
        this.fixedAdjustElement.classList.add('mdc-top-app-bar--prominent-fixed-adjust');
      } else {
        this.fixedAdjustElement.classList.add('mdc-top-app-bar--fixed-adjust');
      }
    }
  }

  private _getScrollOffset(): number {
    return window.pageYOffset;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
