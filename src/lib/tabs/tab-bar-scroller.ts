import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { isBrowser, EventRegistry } from '@angular-mdc/web/common';
import { MdcIcon } from '@angular-mdc/web/icon';

import { MdcTab } from './tab';
import { MdcTabBar } from './tab-bar';

import { getCorrectPropertyName } from '@material/animation';
import { MDCTabBarScrollerAdapter } from './adapter';
import { MDCTabBarScrollerFoundation } from '@material/tabs';

@Directive({
  selector: '[mdc-tab-bar-scroll-back], mdc-tab-bar-scroll-back',
  exportAs: 'mdcTabBarScrollBack'
})
export class MdcTabBarScrollBack implements AfterContentInit {
  @HostBinding('class.mdc-tab-bar-scroller__indicator') isHostClass = true;
  @HostBinding('class.mdc-tab-bar-scroller__indicator--back') isBackClass = true;
  @ContentChild(MdcIcon) icon: MdcIcon;

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  ngAfterContentInit() {
    if (this.icon) {
      this._renderer.addClass(this.icon.elementRef.nativeElement, 'mdc-tab-bar-scroller__indicator__inner');
    }
  }
}

@Directive({
  selector: '[mdc-tab-bar-scroll-forward], mdc-tab-bar-scroll-forward',
  exportAs: 'mdcTabBarScrollForward'
})
export class MdcTabBarScrollForward implements AfterContentInit {
  @HostBinding('class.mdc-tab-bar-scroller__indicator') isHostClass = true;
  @HostBinding('class.mdc-tab-bar-scroller__indicator--forward') isForwardClass = true;
  @ContentChild(MdcIcon) icon: MdcIcon;

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  ngAfterContentInit() {
    if (this.icon) {
      this._renderer.addClass(this.icon.elementRef.nativeElement, 'mdc-tab-bar-scroller__indicator__inner');
    }
  }
}

@Directive({
  selector: '[mdc-tab-bar-scroll-frame], mdc-tab-bar-scroll-frame',
  exportAs: 'mdcTabBarScrollFrame'
})
export class MdcTabBarScrollFrame implements AfterContentInit {
  @HostBinding('class.mdc-tab-bar-scroller__scroll-frame') isHostClass = true;
  @ContentChild(MdcTabBar) tabBar: MdcTabBar;

  constructor(public elementRef: ElementRef) { }

  ngAfterContentInit(): void {
    if (this.tabBar) {
      this.tabBar.scrollFrameContent = true;
    }
  }

  findTab(index: number): MdcTab | null {
    if (this.tabBar) {
      const tabs = this.tabBar._tabs.toArray();
      if (index >= 0 && index < tabs.length) {
        return tabs[index];
      }
    }
    return null;
  }
}

@Component({
  moduleId: module.id,
  selector: '[mdc-tab-bar-scroller], mdc-tab-bar-scroller',
  exportAs: 'mdcTabBarScroller',
  template: '<ng-content></ng-content>',
  providers: [EventRegistry],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcTabBarScroller implements AfterViewInit, OnDestroy {
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @HostBinding('class.mdc-tab-bar-scroller') isHostClass = true;
  @ContentChild(MdcTabBarScrollFrame) scrollFrame: MdcTabBarScrollFrame;
  @ContentChild(MdcTabBarScrollBack) back: MdcTabBarScrollBack;
  @ContentChild(MdcTabBarScrollForward) forward: MdcTabBarScrollForward;

  private _mdcAdapter: MDCTabBarScrollerAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    eventTargetHasClass: (target: HTMLElement, className: string) => target.classList.contains(className),
    addClassToForwardIndicator: (className: string) => {
      if (this.scrollForward) {
        this._renderer.addClass(this.forward.elementRef.nativeElement, className);
      }
    },
    removeClassFromForwardIndicator: (className: string) => {
      if (this.scrollForward) {
        this._renderer.removeClass(this.forward.elementRef.nativeElement, className);
      }
    },
    addClassToBackIndicator: (className: string) => {
      if (this.scrollBack) {
        this._renderer.addClass(this.back.elementRef.nativeElement, className);
      }
    },
    removeClassFromBackIndicator: (className: string) => {
      if (this.scrollBack) {
        this._renderer.removeClass(this.back.elementRef.nativeElement, className);
      }
    },
    isRTL: () => this.direction === 'rtl',
    registerBackIndicatorClickHandler: (handler: EventListener) => {
      if (this.scrollBack) {
        this._registry.listen('click', handler, this.back.elementRef.nativeElement);
      }
    },
    deregisterBackIndicatorClickHandler: (handler: EventListener) => {
      if (this.scrollBack) {
        this._registry.unlisten('click', handler);
      }
    },
    registerForwardIndicatorClickHandler: (handler: EventListener) => {
      if (this.scrollForward) {
        this._registry.listen('click', handler, this.forward.elementRef.nativeElement);
      }
    },
    deregisterForwardIndicatorClickHandler: (handler: EventListener) => {
      if (this.scrollForward) {
        this._registry.unlisten('click', handler);
      }
    },
    registerCapturedInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.listen(evt, handler, this.elementRef.nativeElement);
    },
    deregisterCapturedInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerWindowResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen('resize', handler, window);
      }
    },
    deregisterWindowResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten('resize', handler);
      }
    },
    getNumberOfTabs: () => {
      return (this.scrollFrame && this.scrollFrame.tabBar) ? this.scrollFrame.tabBar._tabs.length : 0;
    },
    getComputedWidthForTabAtIndex: (index: number) => this.findTab(index).getComputedWidth(),
    getComputedLeftForTabAtIndex: (index: number) => this.findTab(index).getComputedLeft(),
    getOffsetWidthForScrollFrame: () => {
      return this.scrollFrame ? this.scrollFrame.elementRef.nativeElement.offsetWidth : 0;
    },
    getScrollLeftForScrollFrame: () => {
      return this.scrollFrame ? this.scrollFrame.elementRef.nativeElement.scrollLeft : 0;
    },
    setScrollLeftForScrollFrame: (scrollLeftAmount: number) => {
      if (this.scrollFrame) {
        this._renderer.setProperty(this.scrollFrame.elementRef.nativeElement, 'scrollLeft', scrollLeftAmount);
      }
    },
    getOffsetWidthForTabBar: () => {
      return (this.scrollFrame && this.scrollFrame.tabBar) ? this.scrollFrame.tabBar.elementRef.nativeElement.offsetWidth : 0;
    },
    setTransformStyleForTabBar: (value: string) => {
      if (this.scrollFrame && this.scrollFrame.tabBar) {
        this._renderer.setStyle(this.scrollFrame.tabBar.elementRef.nativeElement, getCorrectPropertyName(window, 'transform'), value);
      }
    },
    getOffsetLeftForEventTarget: (target: HTMLElement) => target.offsetLeft,
    getOffsetWidthForEventTarget: (target: HTMLElement) => target.offsetWidth
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    layout(): void,
    scrollForward(evt?: Event): void,
    scrollBack(evt?: Event): void,
    scrollToTabAtIndex(index: number): void,
  } = new MDCTabBarScrollerFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  scrollToTabAtIndex(index: number): void {
    this._foundation.scrollToTabAtIndex(index);
  }

  findTab(index: number): MdcTab | null {
    return this.scrollFrame ? this.scrollFrame.findTab(index) : null;
  }

  layout(): void {
    this._foundation.layout();
  }

  scrollBack(event?: Event): void {
    this._foundation.scrollBack(event);
  }

  scrollForward(event?: Event): void {
    this._foundation.scrollForward(event);
  }
}
