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
import { EventRegistry } from '@angular-mdc/web/common';

import { MDCTabScrollerAdapter } from '@material/tab-scroller/adapter';
import { MDCTabScrollerFoundation, util } from '@material/tab-scroller';

/** Possible alignments for tab scroller content. */
export type MdcTabScrollerAlignment = 'start' | 'center' | 'end';

@Component({
  moduleId: module.id,
  selector: '[mdcTabScroller], mdc-tab-scroller',
  template: `
  <div #area class="mdc-tab-scroller__scroll-area">
    <div #content class="mdc-tab-scroller__scroll-content">
      <ng-content></ng-content>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [EventRegistry]
})
export class MdcTabScroller implements AfterViewInit, OnDestroy {
  @Input()
  get icon(): MdcTabScrollerAlignment { return this._align; }
  set align(value: MdcTabScrollerAlignment) {
    this.setAlign(value);
  }
  private _align: MdcTabScrollerAlignment = 'start';

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
    getScrollContentStyleValue: (propName: string) => window.getComputedStyle(this.content.nativeElement).getPropertyValue(propName),
    setScrollAreaScrollLeft: (scrollX: number) => this.area.nativeElement.scrollLeft = scrollX,
    getScrollAreaScrollLeft: () => this.area.nativeElement.scrollLeft,
    getScrollContentOffsetWidth: () => this.content.nativeElement.offsetWidth,
    getScrollAreaOffsetWidth: () => this.area.nativeElement.offsetWidth,
    computeScrollAreaClientRect: () => this.area.nativeElement.getBoundingClientRect(),
    computeScrollContentClientRect: () => this.content.nativeElement.getBoundingClientRect(),
    computeHorizontalScrollbarHeight: () => util.computeHorizontalScrollbarHeight(document)
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
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._foundation.init();

    this._registry.listen('wheel', this._foundation.handleInteraction, this.area.nativeElement);
    this._registry.listen('touchstart', this._foundation.handleInteraction, this.area.nativeElement);
    this._registry.listen('pointerdown', this._foundation.handleInteraction, this.area.nativeElement);
    this._registry.listen('mousedown', this._foundation.handleInteraction, this.area.nativeElement);
    this._registry.listen('keydown', this._foundation.handleInteraction, this.area.nativeElement);
    this._registry.listen('transitionend', this._foundation.handleTransitionEnd, this.content.nativeElement);
  }

  ngOnDestroy(): void {
    this._registry.unlisten('wheel', this._foundation.handleInteraction);
    this._registry.unlisten('touchstart', this._foundation.handleInteraction);
    this._registry.unlisten('pointerdown', this._foundation.handleInteraction);
    this._registry.unlisten('mousedown', this._foundation.handleInteraction);
    this._registry.unlisten('keydown', this._foundation.handleInteraction);
    this._registry.unlisten('transitionend', this._foundation.handleTransitionEnd);
  }

  setAlign(align: MdcTabScrollerAlignment): void {
    this.content.nativeElement.classList.remove(`mdc-tab-scroller--align-${this._align}`);
    this._align = align;
    if (align) {
      this.content.nativeElement.classList.add(`mdc-tab-scroller--align-${align}`);
    }

    this._changeDetectorRef.markForCheck();
  }

  /**
   * Returns the current visual scroll position
   * @return {number}
   */
  getScrollPosition(): number {
    return this._foundation.getScrollPosition();
  }

  /**
   * Returns the width of the scroll content
   * @return {number}
   */
  getScrollContentWidth(): number {
    return this.content.nativeElement.offsetWidth;
  }

  /**
   * Increments the scroll value by the given amount
   * @param {number} scrollXIncrement The pixel value by which to increment the scroll value
   */
  incrementScroll(scrollXIncrement: number) {
    this._foundation.incrementScroll(scrollXIncrement);
  }

  /**
   * Scrolls to the given pixel position
   * @param {number} scrollX The pixel value to scroll to
   */
  scrollTo(scrollX: number) {
    this._foundation.scrollTo(scrollX);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
