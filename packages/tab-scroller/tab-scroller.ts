import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { merge, fromEvent, Subject, Subscription, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MDCComponent } from '@angular-mdc/web/base';
import { Platform } from '@angular-mdc/web/common';

import { matches } from '@material/dom/ponyfill';
import { MDCTabScrollerFoundation, MDCTabScrollerAdapter, util } from '@material/tab-scroller';

/** Possible alignments for tab scroller content. */
export type MdcTabScrollerAlignment = 'start' | 'center' | 'end' | null;

const SCROLLER_EVENTS = [
  'keydown',
  'mousedown',
  'pointerdown',
  'touchstart',
  'wheel'
];

@Component({
  moduleId: module.id,
  selector: '[mdcTabScroller], mdc-tab-scroller',
  exportAs: 'mdcTabScroller',
  host: {
    'class': 'mdc-tab-scroller'
  },
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
export class MdcTabScroller extends MDCComponent<any> implements AfterViewInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  @Input()
  get align(): MdcTabScrollerAlignment { return this._align; }
  set align(value: MdcTabScrollerAlignment) {
    this.setAlign(value);
  }
  private _align: MdcTabScrollerAlignment | null = null;

  @ViewChild('area') area!: ElementRef;
  @ViewChild('content') content!: ElementRef;

  private _scrollAreaEventsSubscription: Subscription | null = null;

  /** Combined stream of all of the scroll area events. */
  get scrollAreaEvents(): Observable<any> {
    return merge(...SCROLLER_EVENTS.map(evt => fromEvent(this._getScrollArea(), evt)));
  }

  getDefaultFoundation() {
    const adapter: MDCTabScrollerAdapter = {
      eventTargetMatchesSelector: (evtTarget: Element, selector: string) => matches(evtTarget, selector),
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      addScrollAreaClass: (className: string) => this.area.nativeElement.classList.add(className),
      setScrollAreaStyleProperty: (propName: string, value: string) =>
        this.area.nativeElement.style.setProperty(propName, value),
      setScrollContentStyleProperty: (propName: string, value: string) =>
        this.content.nativeElement.style.setProperty(propName, value),
      getScrollContentStyleValue: (propName: string) =>
        this._platform.isBrowser ? window.getComputedStyle(this.content.nativeElement).getPropertyValue(propName) : '',
      setScrollAreaScrollLeft: (scrollX: number) => this.area.nativeElement.scrollLeft = scrollX,
      getScrollAreaScrollLeft: () => this.area.nativeElement.scrollLeft,
      getScrollContentOffsetWidth: () => this.content.nativeElement.offsetWidth,
      getScrollAreaOffsetWidth: () => this.area.nativeElement.offsetWidth,
      computeScrollAreaClientRect: () =>
        this._platform.isBrowser ? this.area.nativeElement.getBoundingClientRect() : {},
      computeScrollContentClientRect: () =>
        this._platform.isBrowser ? this.content.nativeElement.getBoundingClientRect() : {},
      computeHorizontalScrollbarHeight: () =>
        this._platform.isBrowser ? util.computeHorizontalScrollbarHeight(document) : 0
    };
    return new MDCTabScrollerFoundation(adapter);
  }

  constructor(
    private _ngZone: NgZone,
    private _platform: Platform,
    public elementRef: ElementRef<HTMLElement>) {

    super(elementRef);
  }

  ngAfterViewInit(): void {
    this._foundation.init();

    this._loadListeners();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._scrollAreaEventsSubscription) {
      this._scrollAreaEventsSubscription.unsubscribe();
    }
  }

  setAlign(align: MdcTabScrollerAlignment): void {
    this._getHostElement().classList.remove(`mdc-tab-scroller--align-${this._align}`);

    this._align = align;
    if (align) {
      this._getHostElement().classList.add(`mdc-tab-scroller--align-${align}`);
    }
  }

  /** Returns the current visual scroll position */
  getScrollPosition(): number {
    if (!this._platform.isBrowser) { return -1; }

    return this._foundation.getScrollPosition();
  }

  /** Returns the width of the scroll content */
  getScrollContentWidth(): number {
    return this.content.nativeElement.offsetWidth;
  }

  /** Increments the scroll value by the given amount */
  incrementScroll(scrollXIncrement: number) {
    if (!this._platform.isBrowser) { return -1; }

    this._foundation.incrementScroll(scrollXIncrement);
  }

  /** Scrolls to the given pixel position */
  scrollTo(scrollX: number): void {
    this._foundation.scrollTo(scrollX);
  }

  private _loadListeners(): void {
    this._scrollAreaEventsSubscription = this.scrollAreaEvents.pipe()
      .subscribe(() => this._foundation.handleInteraction());

    this._ngZone.runOutsideAngular(() =>
      fromEvent<TransitionEvent>(this._getScrollContent(), 'transitionend')
        .pipe(takeUntil(this._destroy), filter((e: TransitionEvent) =>
          e.target === this._getScrollContent()))
        .subscribe(evt => this._ngZone.run(() => this._foundation.handleTransitionEnd(evt))));
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
