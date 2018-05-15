import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { isBrowser, toNumber, EventRegistry, toBoolean } from '@angular-mdc/web/common';
import { defer,  merge,  Observable,  Subject } from 'rxjs';
import { startWith,  switchMap,  take,  takeUntil } from 'rxjs/operators';

import { MdcTab, MdcTabSelected } from './tab';

import { MDCTabBarAdapter } from './adapter';
import { MDCTabBarFoundation } from '@material/tabs';

/** A simple change event emitted selection changes. */
export class MdcTabChangeEvent {
  constructor(
    /** Index of the currently-selected tab. */
    public index: number,
    /** Reference to the currently-selected tab. */
    public tab: MdcTab) { }
}

@Directive({
  selector: '[mdc-tab-bar-indicator], mdc-tab-bar-indicator',
  exportAs: 'mdcTabBarIndicator'
})
export class MdcTabBarIndicator {
  @HostBinding('class.mdc-tab-bar__indicator') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdc-tab-bar], mdc-tab-bar',
  exportAs: 'mdcTabBar',
  template: `
  <ng-content></ng-content>
  <mdc-tab-bar-indicator></mdc-tab-bar-indicator>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EventRegistry],
  preserveWhitespaces: false,
})
export class MdcTabBar implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _disableRipple: boolean = false;
  private _primary: boolean = false;
  private _secondary: boolean = false;

  /** The tab index that should be selected after the content has been checked. */
  private _indexToSelect: number | null = 0;

  /** The index of the active tab. */
  @Input()
  set selectedIndex(value: number | null) {
    this._indexToSelect = toNumber(value, null);
  }
  get selectedIndex(): number | null { return this._selectedIndex; }
  private _selectedIndex: number | null = null;

  @Input()
  get primary(): boolean { return this._primary; }
  set primary(value: boolean) {
    this._primary = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  @Input()
  get secondary(): boolean { return this._secondary; }
  set secondary(value: boolean) {
    this._secondary = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  @Input()
  get disableRipple(): boolean { return this._disableRipple; }
  set disableRipple(value: boolean) {
    this.setDisableRipple(value);
    this._changeDetectorRef.markForCheck();
  }

  /** Event emitted when the tab selection has changed. */
  @Output() readonly selectedTabChange: EventEmitter<MdcTabChangeEvent> =
    new EventEmitter<MdcTabChangeEvent>(true);

  /** Event emitted when tabs are added or removed. */
  @Output() readonly tabsChangeEvent: EventEmitter<void> = new EventEmitter<void>();

  @ContentChildren(MdcTab) tabs: QueryList<MdcTab>;
  @ViewChild(MdcTabBarIndicator) indicator: MdcTabBarIndicator;

  @HostBinding('class.mdc-tab-bar') isHostClass = true;
  @HostBinding('class.mdc-tab-bar-scroller__scroll-frame__tabs') scrollFrameContent = false;
  @HostBinding('attr.role') role: string = 'tablist';
  @HostBinding('class.mdc-tab-bar--icon-tab-bar') get classTabIcon(): string {
    return this.tabs.length > 0
      && this.tabs.first.tabIcon != null
      && this.tabs.first.tabIconText == null ? 'mdc-tab-bar--icon-tab-bar' : '';
  }
  @HostBinding('class.mdc-tab-bar--icons-with-text') get classTabIconText(): string {
    return this.tabs.length > 0
      && this.tabs.first.tabIcon != null
      && this.tabs.first.tabIconText != null ? 'mdc-tab-bar--icons-with-text' : '';
  }
  @HostBinding('class.ng-mdc-tab--primary') get classPrimary(): string {
    return this.primary ? 'ng-mdc-tab--primary' : '';
  }
  @HostBinding('class.ng-mdc-tab--secondary') get classSecondary(): string {
    return this.secondary ? 'ng-mdc-tab--secondary' : '';
  }

  /** Combined stream of all of the tab change events. */
  readonly optionSelectionChanges: Observable<MdcTabSelected> = defer(() => {
    if (this.tabs) {
      return merge(...this.tabs.map(option => option.selected));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.optionSelectionChanges));
  });

  private _mdcAdapter: MDCTabBarAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    bindOnMDCTabSelectedEvent: () => {
      const changedOrDestroyed = merge(this.tabs.changes, this._destroy);

      this.optionSelectionChanges
        .pipe(takeUntil(changedOrDestroyed)).subscribe(event => {
          if (event.tab.disabled) { return; }

          this.setActiveTab(event.tab, true);
          this._foundation.switchToTabAtIndex(this.getActiveTabIndex(), true);
          this.selectedTabChange.emit(new MdcTabChangeEvent(this.getActiveTabIndex(), event.tab));
        });
    },
    unbindOnMDCTabSelectedEvent: () => {
      /* not needed */
    },
    registerResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen('resize', handler, window);
      }
    },
    deregisterResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten('resize', handler);
      }
    },
    getOffsetWidth: () => this.elementRef.nativeElement.offsetWidth,
    setStyleForIndicator: (propertyName: string, value: string) =>
      this._renderer.setStyle(this.indicator.elementRef.nativeElement, propertyName, value),
    getOffsetWidthForIndicator: () => this.indicator.elementRef.nativeElement.offsetWidth,
    notifyChange: (evtData: { activeTabIndex: number }) => {
      this.selectedTabChange.emit(new MdcTabChangeEvent(evtData.activeTabIndex, this.getActiveTab()));
    },
    getNumberOfTabs: () => this.tabs.length,
    isTabActiveAtIndex: (index: number) => this.tabs.toArray()[index].isActive(),
    setTabActiveAtIndex: (index: number, isActive: boolean) => this.tabs.toArray()[index].setActive(isActive),
    isDefaultPreventedOnClickForTabAtIndex: (index: number) => !!this.tabs.toArray()[index].getPreventDefaultOnClick(),
    setPreventDefaultOnClickForTabAtIndex: (index: number, preventDefaultOnClick: boolean) =>
      this.tabs.toArray()[index].setPreventDefaultOnClick(preventDefaultOnClick),
    measureTabAtIndex: (index: number) => this.tabs.toArray()[index].measureSelf(),
    getComputedWidthForTabAtIndex: (index: number) => {
      return this.tabs.length ? this.tabs.toArray()[index].getComputedWidth() : -1;
    },
    getComputedLeftForTabAtIndex: (index: number) => {
      return this.tabs.length ? this.tabs.toArray()[index].getComputedLeft() : -1;
    }
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    layout(): void,
    switchToTabAtIndex(index: number, shouldNotify: boolean): void,
    getActiveTabIndex(): number
  } = new MDCTabBarFoundation(this._mdcAdapter);

  constructor(
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterContentInit(): void {
    // Subscribe to changes in the amount of tabs, in order to be
    // able to re-render the content as new tabs are added or removed.
    this.tabs.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._foundation.init();

      this._initializeSelection();
      this.setDisableRipple(this.disableRipple);
      this._foundation.layout();

      this.tabsChangeEvent.emit();
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    this._foundation.destroy();
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      if (this.getActiveTabIndex() < 0 && this.tabs.first) {
        this.tabs.first.setActive(true);
      }
    });
  }

  setDisableRipple(disabled: boolean): void {
    if (!this.tabs) { return; }

    if (this._disableRipple !== disabled) {
      this._disableRipple = disabled;
    }

    this.tabs.forEach(tab => {
      disabled ? tab.ripple.destroy() : tab.ripple.attachTo(tab.elementRef.nativeElement);
    });
  }

  setTabActiveAtIndex(index: number): void {
    if (this.tabs.toArray()[index].disabled) { return; }

    this._foundation.switchToTabAtIndex(index, true);
    this._mdcAdapter.setTabActiveAtIndex(index, true);
  }

  getActiveTabIndex(): number {
    return this._foundation.getActiveTabIndex();
  }

  getActiveTab(): MdcTab | null {
    const tab = this.tabs.find(_ => _.isActive());

    return tab ? tab[0] : null;
  }

  setActiveTab(tab: MdcTab, active: boolean): void {
    this.tabs.forEach(_ => {
      _.setActive(false);
    });
    this.tabs.find(_ => _ === tab)!.setActive(active);
  }

  layout(): void {
    this._foundation.layout();
  }

  getNumberOfTabs(): number {
    return this._mdcAdapter.getNumberOfTabs();
  }

  getComputedWidth(): number {
    return this._mdcAdapter.getOffsetWidth();
  }

  setPreventDefaultOnClickForTabAtIndex(index: number, preventDefaultOnClick: boolean): void {
    this._mdcAdapter.setPreventDefaultOnClickForTabAtIndex(index, preventDefaultOnClick);
  }

  isDefaultPreventedOnClickForTabAtIndex(index: number): boolean {
    return this._mdcAdapter.isDefaultPreventedOnClickForTabAtIndex(index);
  }
}
