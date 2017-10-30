import {
  AfterContentInit,
  AfterViewInit,
  ContentChild,
  ContentChildren,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  QueryList,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean, isBrowser } from '../../common';
import { EventRegistry } from '../../common/event-registry';

import { getCorrectPropertyName } from '@material/animation';
import { MdcTab } from '../tab/tab';
import { MdcTabBar } from '../tab-bar/tab-bar';

import { MDCTabBarScrollerAdapter } from './adapter';
import { MDCTabBarScrollerFoundation } from '@material/tabs';

@Directive({
  selector: '[mdc-tab-bar-scroll-button], mdc-tab-bar-scroll-button'
})
export class MdcTabBarScrollIndicatorInner {
  @HostBinding('class.mdc-tab-bar-scroller__indicator__inner') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-tab-bar-scroll-back], mdc-tab-bar-scroll-back'
})
export class MdcTabBarScrollBack {
  @HostBinding('class.mdc-tab-bar-scroller__indicator') isHostClass = true;
  @HostBinding('class.mdc-tab-bar-scroller__indicator--back') isBackClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-tab-bar-scroll-forward], mdc-tab-bar-scroll-forward'
})
export class MdcTabBarScrollForward {
  @HostBinding('class.mdc-tab-bar-scroller__indicator') isHostClass = true;
  @HostBinding('class.mdc-tab-bar-scroller__indicator--forward') isFowardClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-tab-bar-scroll-frame], mdc-tab-bar-scroll-frame'
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
      let tabs = this.tabBar.tabs.toArray();
      if (index >= 0 && index < tabs.length) {
        return tabs[index];
      }
    }
    return null;
  }
}

@Component({
  selector: '[mdc-tab-bar-scroller], mdc-tab-bar-scroller',
  template: '<ng-content></ng-content>',
  providers: [EventRegistry],
  encapsulation: ViewEncapsulation.None,
})
export class MdcTabBarScroller implements AfterViewInit, OnDestroy {
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @HostBinding('class.mdc-tab-bar-scroller') isHostClass = true;
  @ContentChild(MdcTabBarScrollFrame) scrollFrame: MdcTabBarScrollFrame;
  @ContentChild(MdcTabBarScrollBack) scrollBack: MdcTabBarScrollBack;
  @ContentChild(MdcTabBarScrollForward) scrollForward: MdcTabBarScrollForward;

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
        this._renderer.addClass(this.scrollForward.elementRef.nativeElement, className);
      }
    },
    removeClassFromForwardIndicator: (className: string) => {
      if (this.scrollForward) {
        this._renderer.removeClass(this.scrollForward.elementRef.nativeElement, className);
      }
    },
    addClassToBackIndicator: (className: string) => {
      if (this.scrollBack) {
        this._renderer.addClass(this.scrollBack.elementRef.nativeElement, className);
      }
    },
    removeClassFromBackIndicator: (className: string) => {
      if (this.scrollBack) {
        this._renderer.removeClass(this.scrollBack.elementRef.nativeElement, className);
      }
    },
    isRTL: () => this.direction === 'rtl',
    registerBackIndicatorClickHandler: (handler: EventListener) => {
      if (this.scrollBack) {
        this._registry.listen(this._renderer, 'click', handler, this.scrollBack.elementRef.nativeElement);
      }
    },
    deregisterBackIndicatorClickHandler: (handler: EventListener) => {
      if (this.scrollBack) {
        this._registry.unlisten('click', handler);
      }
    },
    registerForwardIndicatorClickHandler: (handler: EventListener) => {
      if (this.scrollForward) {
        this._registry.listen(this._renderer, 'click', handler, this.scrollForward.elementRef.nativeElement);
      }
    },
    deregisterForwardIndicatorClickHandler: (handler: EventListener) => {
      if (this.scrollForward) {
        this._registry.unlisten('click', handler);
      }
    },
    registerCapturedInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.listen(this._renderer, evt, handler, this.elementRef.nativeElement);
    },
    deregisterCapturedInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerWindowResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen(this._renderer, 'resize', handler, window);
      }
    },
    deregisterWindowResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten('resize', handler);
      }
    },
    getNumberOfTabs: () => {
      return (this.scrollFrame && this.scrollFrame.tabBar) ? this.scrollFrame.tabBar.tabs.length : 0;
    },
    getComputedWidthForTabAtIndex: (index: number) => this.findTab(index).foundation.getComputedWidth(),
    getComputedLeftForTabAtIndex: (index: number) => this.findTab(index).foundation.getComputedLeft(),
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
    init: Function,
    destroy: Function,
    layout: Function,
    scrollForward: Function,
    scrollBack: Function,
    scrollToTabAtIndex: Function,
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
}
