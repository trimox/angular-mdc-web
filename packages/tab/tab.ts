import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcTabIndicator } from '@angular-mdc/web/tab-indicator';

import { MDCTabAdapter } from '@material/tab/adapter';
import { MDCTabFoundation } from '@material/tab';

/**
 * Describes a parent MdcTabBar component.
 * Contains properties that MdcTab can inherit.
 */
export interface MdcTabBarParentComponent {
  activateTab(index: number): void;
  getTabIndex(tab: MdcTab): number;
}

/**
 * Injection token used to provide the parent MdcTabBar component to MdcTab.
 */
export const MDC_TAB_BAR_PARENT_COMPONENT =
  new InjectionToken<MdcTabBarParentComponent>('MDC_TAB_BAR_PARENT_COMPONENT');

export interface MdcTabInteractedEvent {
  detail: {
    tab: MdcTab;
  };
}

@Directive({
  selector: 'mdc-tab-label, [mdcTabLabel]'
})
export class MdcTabLabel {
  @HostBinding('class.mdc-tab__text-label') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-tab-icon, [mdcTabIcon]'
})
export class MdcTabIcon {
  @HostBinding('class.mdc-tab__icon') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdcTab], mdc-tab',
  exportAs: 'MdcTab',
  template: `
  <div #content class="mdc-tab__content">
    <mdc-icon class="mdc-tab__icon" *ngIf="icon">{{icon}}</mdc-icon>
    <ng-content select="mdc-icon"></ng-content>
    <span class="mdc-tab__text-label" *ngIf="label">{{label}}</span>
    <ng-content></ng-content>
  </div>
  <mdc-tab-indicator></mdc-tab-indicator>
  <div #ripplesurface class="mdc-tab__ripple"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [MdcRipple]
})
export class MdcTab implements AfterViewInit, OnDestroy {
  @Input() label: string;
  @Input() icon: string;

  @Input()
  get stacked(): boolean { return this._stacked; }
  set stacked(value: boolean) {
    this._stacked = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  private _stacked: boolean;

  @Input()
  get fixed(): boolean { return this._fixed; }
  set fixed(value: boolean) {
    this._fixed = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  private _fixed: boolean;

  @Output() readonly interacted: EventEmitter<MdcTabInteractedEvent> =
    new EventEmitter<MdcTabInteractedEvent>();

  @HostBinding('class.mdc-tab') isHostClass = true;
  @HostBinding('attr.role') role: string = 'tab';
  @HostBinding('class.mdc-tab--active') get classActive(): string {
    return this.active ? 'mdc-tab--active' : '';
  }
  @HostBinding('class.mdc-tab--stacked') get classStacked(): string {
    return this.stacked ? 'mdc-tab--stacked' : '';
  }
  @HostBinding('class.mdc-tab--min-width') get classFixed(): string {
    return this.fixed ? 'mdc-tab--min-width' : '';
  }

  @ViewChild(MdcTabIndicator) tabIndicator: MdcTabIndicator;
  @ViewChild('content') content: ElementRef;
  @ViewChild('ripplesurface') rippleSurface: ElementRef;

  private _mdcAdapter: MDCTabAdapter = {
    setAttr: (attr: string, value: string) => this._getHostElement().setAttribute(attr, value),
    registerEventHandler: (evtType: string, handler: EventListener) => this._getHostElement().addEventListener(evtType, handler),
    deregisterEventHandler: (evtType: string, handler: EventListener) => this._getHostElement().removeEventListener(evtType, handler),
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    activateIndicator: (previousIndicatorClientRect: ClientRect) => this.tabIndicator.activate(previousIndicatorClientRect),
    deactivateIndicator: () => this.tabIndicator.deactivate(),
    notifyInteracted: () => this.interacted.emit({ detail: { tab: this } }),
    getOffsetLeft: () => this._getHostElement().offsetLeft,
    getOffsetWidth: () => this._getHostElement().offsetWidth,
    getContentOffsetLeft: () => this.content.nativeElement.offsetLeft,
    getContentOffsetWidth: () => this.content.nativeElement.offsetWidth,
    focus: () => this._getHostElement().focus()
  };

  private _foundation: {
    init(): void,
    isActive(): boolean,
    activate(previousIndicatorClientRect: ClientRect): void,
    deactivate(): void,
    computeIndicatorClientRect(): ClientRect,
    computeDimensions(): void
  } = new MDCTabFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _ripple: MdcRipple,
    public elementRef: ElementRef,
    @Optional() @Inject(MDC_TAB_BAR_PARENT_COMPONENT) private _parent: MdcTabBarParentComponent) { }

  ngAfterViewInit(): void {
    this._foundation.init();
    this._ripple.attachTo(this.rippleSurface.nativeElement, false);
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }

  /**
   * Getter for the active state of the tab
   */
  get active(): boolean {
    return this._foundation.isActive();
  }

  /**
   * Activates the tab
   */
  activate(computeIndicatorClientRect: ClientRect): void {
    this._foundation.activate(computeIndicatorClientRect);
  }

  /**
   * Deactivates the tab
   */
  deactivate(): void {
    this._foundation.deactivate();
  }

  /**
   * Returns the indicator's client rect
   */
  computeIndicatorClientRect(): ClientRect {
    return this.tabIndicator.computeContentClientRect();
  }

  computeDimensions(): any {
    return this._foundation.computeDimensions();
  }

  getTabBarParent(): MdcTabBarParentComponent {
    return this._parent;
  }

  focus(): void {
    this._getHostElement().focus();
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
