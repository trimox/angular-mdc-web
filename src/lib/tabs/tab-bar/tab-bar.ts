import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { isBrowser, toNumber, EventRegistry } from '@angular-mdc/web/common';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';

import { MdcTab, MdcTabChange } from '../tab/tab';

import { MDCTabBarAdapter } from './adapter';
import { MDCTabBarFoundation } from '@material/tabs';

@Directive({
  selector: '[mdc-tab-bar-indicator], mdc-tab-bar-indicator'
})
export class MdcTabBarIndicator {
  @HostBinding('class.mdc-tab-bar__indicator') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdc-tab-bar], mdc-tab-bar',
  template: `
  <ng-content></ng-content>
  <mdc-tab-bar-indicator></mdc-tab-bar-indicator>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EventRegistry],
  preserveWhitespaces: false,
})
export class MdcTabBar implements AfterViewInit, AfterContentChecked, OnDestroy {
  /** The tab index that should be selected after the content has been checked. */
  private _indexToSelect: number | null = 0;

  /** The index of the active tab. */
  @Input()
  set selectedIndex(value: number | null) {
    this._indexToSelect = toNumber(value, null);
  }
  get selectedIndex(): number | null { return this._selectedIndex; }
  private _selectedIndex: number | null = null;

  /** Subscription to tabs being added/removed. */
  private _tabsSubscription: Subscription = Subscription.EMPTY;

  @Input() primary: boolean = false;
  @Input() secondary: boolean = false;
  @Output() change: EventEmitter<MdcTabChange> = new EventEmitter();
  @ContentChildren(MdcTab) _tabs: QueryList<MdcTab>;
  @ViewChild(MdcTabBarIndicator) indicator: MdcTabBarIndicator;
  @HostBinding('class.mdc-tab-bar') isHostClass = true;
  @HostBinding('class.mdc-tab-bar-scroller__scroll-frame__tabs') scrollFrameContent = false;
  @HostBinding('attr.role') role: string = 'tablist';
  @HostBinding('class.mdc-tab-bar--indicator-primary') get classIndicatorPrimary() {
    return this.primary ? 'mdc-tab-bar--indicator-primary' : '';
  }
  @HostBinding('class.mdc-tab-bar--indicator-accent') get classIndicatorSecondary() {
    return this.secondary ? 'mdc-tab-bar--indicator-accent' : '';
  }
  @HostBinding('class.mdc-tab-bar--icon-tab-bar') get classTabIcon() {
    return this._tabs.length > 0
      && this._tabs.first.tabIcon != null
      && this._tabs.first.tabIconText == null;
  }
  @HostBinding('class.mdc-tab-bar--icons-with-text') get classTabIconText() {
    return this._tabs.length > 0
      && this._tabs.first.tabIcon != null
      && this._tabs.first.tabIconText != null;
  }

  private _mdcAdapter: MDCTabBarAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    bindOnMDCTabSelectedEvent: () => {
      this._tabsSubscription = this._tabs.changes.subscribe();
      this._tabsSubscription = merge(
        ...this._tabs.map(tab => tab.select)).subscribe((_: MdcTabChange) => {
          if (_.tab.disabled) { return; }
          const tabIndex = this._tabs.toArray().indexOf(_.tab);
          this.selectedIndex = tabIndex;
          this._foundation.switchToTabAtIndex(tabIndex, true);
        });
    },
    unbindOnMDCTabSelectedEvent: () => {
      if (this._tabsSubscription) {
        this._tabsSubscription.unsubscribe();
      }
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
      this.change.emit({ index: evtData.activeTabIndex, tab: this._tabs.find((_) => _.isActive()) });
    },
    getNumberOfTabs: () => this._tabs.length,
    isTabActiveAtIndex: (index: number) => this._tabs.toArray()[index].active,
    setTabActiveAtIndex: (index: number, isActive: boolean) => this._tabs.toArray()[index].active = isActive,
    isDefaultPreventedOnClickForTabAtIndex: (index: number) => !!this._tabs.toArray()[index].preventsDefaultOnClick,
    setPreventDefaultOnClickForTabAtIndex: (index: number, preventDefaultOnClick: boolean) =>
      this._tabs.toArray()[index].setPreventDefaultOnClick(preventDefaultOnClick),
    measureTabAtIndex: (index: number) => this._tabs.toArray()[index].measureSelf(),
    getComputedWidthForTabAtIndex: (index: number) => this._tabs.toArray()[index].getComputedWidth(),
    getComputedLeftForTabAtIndex: (index: number) => this._tabs.toArray()[index].getComputedLeft()
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    layout: Function,
    switchToTabAtIndex: Function,
    getActiveTabIndex: Function,
  } = new MDCTabBarFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._foundation.init();
  }

  ngAfterContentChecked(): void {
    const indexToSelect = this._indexToSelect =
      Math.min(this._tabs.length - 1, Math.max(this._indexToSelect || 0, 0));

    if (this._selectedIndex !== indexToSelect && this._selectedIndex != null) {
      this.setTabActiveAtIndex(indexToSelect);
    }

    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
    }
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  setTabActiveAtIndex(index: number): void {
    if (this._tabs.toArray()[index].disabled) { return; }

    this._foundation.switchToTabAtIndex(index, true);
    this._mdcAdapter.setTabActiveAtIndex(index, true);
  }

  getActiveTabIndex(): number {
    return this._foundation.getActiveTabIndex();
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
