import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { defer, merge, Observable, Subject } from 'rxjs';
import { startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { toBoolean } from '@angular-mdc/web/common';
import { MdcTabScroller, MdcTabScrollerAlignment } from '@angular-mdc/web/tab-scroller';
import { MdcTabIndicator } from '@angular-mdc/web/tab-indicator';
import { MdcTab, MdcTabInteractedEvent, MDC_TAB_BAR_PARENT_COMPONENT } from '@angular-mdc/web/tab';

import { MDCTabBarAdapter } from '@material/tab-bar/adapter';
import { MDCTabBarFoundation } from '@material/tab-bar';

export class MdcTabActivatedEvent {
  constructor(
    public source: MdcTabBar,
    public index: number,
    public tab: MdcTab) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdcTabBar], mdc-tab-bar',
  exportAs: 'MdcTabBar',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MDC_TAB_BAR_PARENT_COMPONENT, useExisting: MdcTabBar }]
})
export class MdcTabBar implements AfterContentInit, OnDestroy {
  @Input()
  get fade(): boolean { return this._fade; }
  set fade(value: boolean) {
    this.setFade(value);
  }
  private _fade: boolean;

  @Input()
  get stacked(): boolean { return this._stacked; }
  set stacked(value: boolean) {
    this.setStacked(value);
  }
  private _stacked: boolean;

  @Input()
  get fixed(): boolean { return this._fixed; }
  set fixed(value: boolean) {
    this.setFixed(value);
  }
  private _fixed: boolean;

  @Input()
  get align(): MdcTabScrollerAlignment { return this._align; }
  set align(value: MdcTabScrollerAlignment) {
    this.setAlign(value);
  }
  private _align: MdcTabScrollerAlignment;

  @Input()
  get iconIndicator(): string { return this._iconIndicator; }
  set iconIndicator(value: string) {
    this.setIconIndicator(value);
  }
  private _iconIndicator: string;

  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  @Output() readonly activated: EventEmitter<MdcTabActivatedEvent> =
    new EventEmitter<MdcTabActivatedEvent>();

  @HostBinding('class.mdc-tab-bar') isHostClass = true;
  @HostBinding('attr.role') role: string = 'tab';

  @HostListener('keydown', ['$event']) onkeydown(evt: KeyboardEvent) {
    this._foundation.handleKeyDown(evt);
  }

  @ContentChild(MdcTabScroller) tabScroller: MdcTabScroller;
  @ContentChildren(MdcTab, { descendants: true }) tabs: QueryList<MdcTab>;

  /** Combined stream of all of the tab interaction events. */
  readonly tabInteractions: Observable<MdcTabInteractedEvent> = defer(() => {
    if (this.tabs) {
      return merge(...this.tabs.map(tab => tab.interacted));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.tabInteractions));
  });

  private _mdcAdapter: MDCTabBarAdapter = {
    scrollTo: (scrollX: number) => this.tabScroller.scrollTo(scrollX),
    incrementScroll: (scrollXIncrement: number) => this.tabScroller.incrementScroll(scrollXIncrement),
    getScrollPosition: () => this.tabScroller.getScrollPosition(),
    getScrollContentWidth: () => this.tabScroller.getScrollContentWidth(),
    getOffsetWidth: () => this._getHostElement().offsetWidth,
    isRTL: () => window.getComputedStyle(this._getHostElement()).getPropertyValue('direction') === 'rtl',
    activateTabAtIndex: (index: number, clientRect: ClientRect) => this.tabs.toArray()[index].activate(clientRect),
    deactivateTabAtIndex: (index: number) => this.tabs.toArray()[index > -1 ? index : 0].deactivate(),
    getTabIndicatorClientRectAtIndex: (index: number) => this.tabs.toArray()[index > -1 ? index : 0].computeIndicatorClientRect(),
    getTabDimensionsAtIndex: (index: number) => this.tabs.toArray()[index].computeDimensions(),
    getActiveTabIndex: () => this.tabs.toArray().findIndex((_) => _.active),
    getIndexOfTab: (tabToFind: MdcTab) => this.tabs.toArray().indexOf(tabToFind),
    getTabListLength: () => this.tabs.length,
    notifyTabActivated: (index: number) => this.activated.emit({ source: this, index: index, tab: this.tabs.toArray()[index] })
  };

  private _foundation: {
    init(): void,
    activateTab(index: number): void,
    handleKeyDown(evt: KeyboardEvent): void,
    handleTabInteraction(evt: MdcTabInteractedEvent): void,
    scrollIntoView(index: number): void
  } = new MDCTabBarFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    public elementRef: ElementRef) { }

  ngAfterContentInit(): void {
    this.tabs.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._foundation.init();
      this._initializeSelection();
    });

    // Subscribe to changes in the amount of tabs, in order to be
    // able to re-render the content as new tabs are added or removed.
    this.tabInteractions.pipe(
      takeUntil(merge(this._destroy, this.tabs.changes))
    ).subscribe(event => {
      this.getActiveTab()!.tabIndicator.active = false;

      event.detail.tab.tabIndicator.active = true;
      this._foundation.handleTabInteraction(event);
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      if (!this.tabs.find((_) => _.active)) {
        this.activateTab(0);
      }
    });
  }

  setFade(fade: boolean): void {
    this._fade = toBoolean(fade);

    Promise.resolve().then(() => {
      this.tabs.forEach(tab => {
        tab.tabIndicator.fade = this.fade;
      });
    });
    this._changeDetectorRef.markForCheck();
  }

  setStacked(stacked: boolean): void {
    this._stacked = toBoolean(stacked);

    Promise.resolve().then(() => {
      this.tabs.forEach(tab => {
        tab.stacked = this.stacked;
      });
    });
    this._changeDetectorRef.markForCheck();
  }

  setFixed(fixed: boolean): void {
    this._fixed = toBoolean(fixed);

    Promise.resolve().then(() => {
      this.tabs.forEach(tab => {
        tab.fixed = this.fixed;
      });
    });
    this._changeDetectorRef.markForCheck();
  }

  setAlign(align: MdcTabScrollerAlignment): void {
    this._align = align || 'start';

    Promise.resolve().then(() => {
      this.tabScroller.align = this.align;
    });
    this._changeDetectorRef.markForCheck();
  }

  setIconIndicator(iconIndicator: string): void {
    this._iconIndicator = iconIndicator;

    Promise.resolve().then(() => {
      this.tabs.forEach(tab => {
        tab.tabIndicator.icon = this.iconIndicator;
      });
    });
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Activates the tab at the given index
   */
  activateTab(index: number): void {
    this._foundation.activateTab(index);
  }

  /**
   * Scrolls the tab at the given index into view
   */
  scrollIntoView(index: number): void {
    this._foundation.scrollIntoView(index);
  }

  getActiveTabIndex(): number {
    return this.tabs.toArray().findIndex((_) => _.active);
  }

  getActiveTab(): MdcTab | undefined {
    return this.tabs.toArray().find((_) => _.active);
  }

  /**
   * Returns an index for given tab
   */
  getTabIndex(tab: MdcTab): number {
    return this.tabs.toArray().indexOf(tab);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
