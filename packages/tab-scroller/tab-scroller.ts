import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Platform } from '@angular-mdc/web/common';

import { MDCTabScrollerAdapter } from '@material/tab-scroller/adapter';
import { MDCTabScrollerFoundation, util } from '@material/tab-scroller';

/** Possible alignments for tab scroller content. */
export type MdcTabScrollerAlignment = 'start' | 'center' | 'end';

@Component({
  moduleId: module.id,
  selector: '[mdcTabScroller], mdc-tab-scroller',
  exportAs: 'MdcTabScroller',
  template: `
  <div #area class="mdc-tab-scroller__scroll-area">
    <div #content class="mdc-tab-scroller__scroll-content">
      <ng-content></ng-content>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcTabScroller implements AfterViewInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  @Input()
  get align(): MdcTabScrollerAlignment { return this._align; }
  set align(value: MdcTabScrollerAlignment) {
    this.setAlign(value);
  }
  private _align: MdcTabScrollerAlignment;

  @HostBinding('class.mdc-tab-scroller') isHostClass = true;

  @ViewChild('area') area: ElementRef;
  @ViewChild('content') content: ElementRef;

  private _mdcAdapter: MDCTabScrollerAdapter = {
    eventTargetMatchesSelector: (evtTarget: EventTarget, selector: string) => {
      const MATCHES = util.getMatchesProperty(HTMLElement.prototype);
      return evtTarget[MATCHES](selector);
    },
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    addScrollAreaClass: (className: string) => this.area.nativeElement.classList.add(className),
    setScrollAreaStyleProperty: (propName: string, value: string) => this.area.nativeElement.style.setProperty(propName, value),
    setScrollContentStyleProperty: (propName: string, value: string) => this.content.nativeElement.style.setProperty(propName, value),
    getScrollContentStyleValue: (propName: string) =>
      this._platform.isBrowser ? window.getComputedStyle(this.content.nativeElement).getPropertyValue(propName) : '',
    setScrollAreaScrollLeft: (scrollX: number) => this.area.nativeElement.scrollLeft = scrollX,
    getScrollAreaScrollLeft: () => this.area.nativeElement.scrollLeft,
    getScrollContentOffsetWidth: () => this.content.nativeElement.offsetWidth,
    getScrollAreaOffsetWidth: () => this.area.nativeElement.offsetWidth,
    computeScrollAreaClientRect: () => this.area.nativeElement.getBoundingClientRect(),
    computeScrollContentClientRect: () => this.content.nativeElement.getBoundingClientRect(),
    computeHorizontalScrollbarHeight: () => this._platform.isBrowser ? util.computeHorizontalScrollbarHeight(document) : 0
  };

  private _foundation: {
    init(): void,
    handleInteraction(): void,
    handleTransitionEnd(evt: Event): void,
    getScrollPosition(): number,
    offsetWidth(): number,
    incrementScroll(scrollXIncrement: number): void,
    scrollTo(scrollX: number): number
  } = new MDCTabScrollerFoundation(this._mdcAdapter);

  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this._foundation.init();

    this._loadListeners();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  setAlign(align: MdcTabScrollerAlignment): void {
    this._getHostElement().classList.remove(`mdc-tab-scroller--align-${this._align}`);

    this._align = align;
    if (align) {
      this._getHostElement().classList.add(`mdc-tab-scroller--align-${align}`);
    }

    this._changeDetectorRef.markForCheck();
  }

  /**
   * Returns the current visual scroll position
   */
  getScrollPosition(): number {
    return this._foundation.getScrollPosition();
  }

  /**
   * Returns the width of the scroll content
   */
  getScrollContentWidth(): number {
    return this.content.nativeElement.offsetWidth;
  }

  /**
   * Increments the scroll value by the given amount
   */
  incrementScroll(scrollXIncrement: number) {
    this._foundation.incrementScroll(scrollXIncrement);
  }

  /**
   * Scrolls to the given pixel position
   */
  scrollTo(scrollX: number): void {
    this._foundation.scrollTo(scrollX);
  }

  private _loadListeners() {
    fromEvent(this._getScrollArea(), 'wheel').pipe(takeUntil(this._destroy))
      .subscribe(() => this._foundation.handleInteraction());
    fromEvent(this._getScrollArea(), 'touchstart').pipe(takeUntil(this._destroy))
      .subscribe(() => this._foundation.handleInteraction());
    fromEvent(this._getScrollArea(), 'pointerdown').pipe(takeUntil(this._destroy))
      .subscribe(() => this._foundation.handleInteraction());
    fromEvent(this._getScrollArea(), 'mousedown').pipe(takeUntil(this._destroy))
      .subscribe(() => this._foundation.handleInteraction());
    fromEvent(this._getScrollArea(), 'keydown').pipe(takeUntil(this._destroy))
      .subscribe(() => this._foundation.handleInteraction());

    fromEvent(this._getScrollContent(), 'transitionend').pipe(takeUntil(this._destroy))
      .subscribe((evt) => this._foundation.handleTransitionEnd(evt));
  }

  private _getScrollArea(): HTMLElement {
    return this.area.nativeElement;
  }

  private _getScrollContent(): HTMLElement {
    return this.content.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
