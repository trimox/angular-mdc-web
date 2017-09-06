import {
  Directive,
  ContentChildren,
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

import { MdcTabComponent } from '../tab/tab.component';

import { MDCTabBarAdapter } from './tab-bar-adapter';
import { MDCTabBarFoundation } from '@material/tabs';

@Directive({
  selector: '[mdc-tab-bar], mdc-tab-bar'
})
export class MdcTabBarDirective {
  private tabBarIndicator: HTMLElement;
  private tabEvents: Subscription[];

  @Input() primary: boolean;
  @Input() secondary: boolean;
  @Output() change: EventEmitter<{ activeTabIndex: number }> = new EventEmitter();
  @ContentChildren(MdcTabComponent, { descendants: false }) tabs: QueryList<MdcTabComponent>;
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
      this._renderer.addClass(this.root.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.root.nativeElement, className);
    },
    bindOnMDCTabSelectedEvent: () => this.listenTabSelect(),
    unbindOnMDCTabSelectedEvent: () => this.unlistenTabSelect(),
    registerResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen_(this._renderer, 'resize', handler, 'window');
      }
    },
    deregisterResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten_('resize', handler);
      }
    },
    getOffsetWidth: () => this.root.nativeElement.offsetWidth,
    setStyleForIndicator: (propertyName: string, value: string) => this._renderer.setStyle(this.tabBarIndicator, propertyName, value),
    getOffsetWidthForIndicator: () => this.tabBarIndicator.offsetWidth,
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
    public root: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit() {
    this.tabs.changes.subscribe(() => {
      if (this.tabEvents) {
        this.listenTabSelect();
      }
    });
    this.createTabBarIndicator();
    this._foundation.init();
  }

  ngOnDestroy() {
    this._foundation.destroy();
  }

  private createTabBarIndicator() {
    this.tabBarIndicator = this._renderer.createElement('span');
    this._renderer.addClass(this.tabBarIndicator, 'mdc-tab-bar__indicator');
    this._renderer.appendChild(this.root.nativeElement, this.tabBarIndicator);
  }

  private listenTabSelect() {
    if (this.tabEvents) {
      this.unlistenTabSelect();
    }
    this.tabEvents = new Array<Subscription>();
    this.tabs.forEach(_ => {
      this.tabEvents.push(_.select.subscribe(event => {
        this._foundation.switchToTabAtIndex(this.tabs.toArray().indexOf(event.tab), true);
      }));
    });
  }

  private unlistenTabSelect() {
    this.tabEvents.forEach(_ =>
      _.unsubscribe()
    );
    this.tabEvents = null;
  }
}
