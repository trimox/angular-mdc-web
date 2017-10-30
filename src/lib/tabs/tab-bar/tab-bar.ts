import {
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  Renderer2,
} from '@angular/core';
import { isBrowser } from '../../common';
import { EventRegistry } from '../../common/event-registry';
import { Subscription } from 'rxjs';

import { MdcTab } from '../tab/tab';

import { MDCTabBarAdapter } from './adapter';
import { MDCTabBarFoundation } from '@material/tabs';

@Directive({
  selector: '[mdc-tab-bar], mdc-tab-bar',
  providers: [EventRegistry],
})
export class MdcTabBar {
  private _tabBarIndicator: HTMLElement;
  private _tabEvents: Subscription[];

  @Input() primary: boolean = false;
  @Input() secondary: boolean = false;
  @Output() change: EventEmitter<{ activeTabIndex: number }> = new EventEmitter();
  @ContentChildren(MdcTab, { descendants: false }) tabs: QueryList<MdcTab>;
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
    return this.tabs.length > 0
      && this.tabs.first.tabIcon != null
      && this.tabs.first.tabIconText == null;
  }
  @HostBinding('class.mdc-tab-bar--icons-with-text') get classTabIconText() {
    return this.tabs.length > 0
      && this.tabs.first.tabIcon != null
      && this.tabs.first.tabIconText != null;
  }

  private _mdcAdapter: MDCTabBarAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    bindOnMDCTabSelectedEvent: () => this._listenTabSelect(),
    unbindOnMDCTabSelectedEvent: () => this._unlistenTabSelect(),
    registerResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen(this._renderer, 'resize', handler, window);
      }
    },
    deregisterResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten('resize', handler);
      }
    },
    getOffsetWidth: () => this.elementRef.nativeElement.offsetWidth,
    setStyleForIndicator: (propertyName: string, value: string) => this._renderer.setStyle(this._tabBarIndicator, propertyName, value),
    getOffsetWidthForIndicator: () => this._tabBarIndicator.offsetWidth,
    notifyChange: (evtData: { activeTabIndex: number }) => this.change.emit(evtData),
    getNumberOfTabs: () => this.tabs.length,
    isTabActiveAtIndex: (index: number) => index >= 0 ? this.tabs.toArray()[index].active : false,
    setTabActiveAtIndex: (index: number, isActive: true) => this.tabs.toArray()[index].active = isActive,
    isDefaultPreventedOnClickForTabAtIndex: (index: number) => !!this.tabs.toArray()[index].foundation.preventsDefaultOnClick,
    setPreventDefaultOnClickForTabAtIndex: (index: number, preventDefaultOnClick: boolean) =>
      this.tabs.toArray()[index].foundation.setPreventDefaultOnClick(preventDefaultOnClick),
    measureTabAtIndex: (index: number) => this.tabs.toArray()[index].foundation.measureSelf(),
    getComputedWidthForTabAtIndex: (index: number) => this.tabs.toArray()[index].foundation.getComputedWidth(),
    getComputedLeftForTabAtIndex: (index: number) => this.tabs.toArray()[index].foundation.getComputedLeft()
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
    this.tabs.changes.subscribe(() => {
      if (this._tabEvents) {
        this._listenTabSelect();
      }
    });
    this._createTabBarIndicator();
    this._foundation.init();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  private _createTabBarIndicator(): void {
    this._tabBarIndicator = this._renderer.createElement('span');
    this._renderer.addClass(this._tabBarIndicator, 'mdc-tab-bar__indicator');
    this._renderer.appendChild(this.elementRef.nativeElement, this._tabBarIndicator);
  }

  private _listenTabSelect(): void {
    if (this._tabEvents) {
      this._unlistenTabSelect();
    }
    this._tabEvents = new Array<Subscription>();
    this.tabs.forEach(tab => {
      this._tabEvents.push(tab.select.subscribe((event: any) => {
        this._foundation.switchToTabAtIndex(this.tabs.toArray().indexOf(event.tab), true);
      }));
    });
  }

  private _unlistenTabSelect(): void {
    this._tabEvents.forEach(_ => _.unsubscribe());
    this._tabEvents = null;
  }
}
