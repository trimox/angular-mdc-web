import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MDCComponent} from '@angular-mdc/web/base';
import {MdcRipple, MDCRippleCapableSurface} from '@angular-mdc/web/ripple';
import {MdcTabIndicator} from '@angular-mdc/web/tab-indicator';

import {MDCTabFoundation, MDCTabAdapter} from '@material/tab';
import {MDCRippleAdapter, MDCRippleFoundation} from '@material/ripple';

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
    tabId: string;
    tab: MdcTab;
  };
}

let nextUniqueId = 0;

@Directive({
  selector: 'mdc-tab-label, [mdcTabLabel]',
  host: {'class': 'mdc-tab__text-label'}
})
export class MdcTabLabel {
  constructor(public elementRef: ElementRef) {}
}

@Directive({
  selector: 'mdc-tab-icon, [mdcTabIcon]',
  host: {'class': 'mdc-tab__icon'}
})
export class MdcTabIcon {
  constructor(public elementRef: ElementRef) {}
}

@Component({
  selector: '[mdcTab], mdc-tab',
  exportAs: 'mdcTab',
  host: {
    '[id]': 'id',
    'role': 'tab',
    'class': 'mdc-tab',
    '[class.mdc-tab--stacked]': 'stacked',
    '[class.mdc-tab--min-width]': 'fixed',
    '[class.ngx-mdc-tab--disabled]': 'disabled'
  },
  template: `
  <div #content class="mdc-tab__content">
    <mdc-icon class="mdc-tab__icon" *ngIf="icon">{{icon}}</mdc-icon>
    <ng-content select="mdc-icon"></ng-content>
    <span class="mdc-tab__text-label" *ngIf="label">{{label}}</span>
    <ng-content></ng-content>
    <ng-container *ngIf="fixed">
      <ng-container *ngTemplateOutlet="indicator"></ng-container>
    </ng-container>
  </div>
  <ng-container *ngIf="!fixed">
    <ng-container *ngTemplateOutlet="indicator"></ng-container>
  </ng-container>
  <ng-template #indicator><mdc-tab-indicator></mdc-tab-indicator></ng-template>
  <div #ripplesurface class="mdc-tab__ripple"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [MdcRipple]
})
export class MdcTab extends MDCComponent<MDCTabFoundation> implements AfterViewInit, OnInit, OnDestroy,
  MDCRippleCapableSurface {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  _root!: Element;

  private _uniqueId: string = `mdc-tab-${++nextUniqueId}`;

  @Input() id: string = this._uniqueId;
  @Input() label?: string;
  @Input() icon?: string;

  @Input()
  get stacked(): boolean {
    return this._stacked;
  }
  set stacked(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._stacked) {
      this._stacked = newValue;
    }
  }
  private _stacked: boolean = false;

  @Input()
  get fixed(): boolean {
    return this._fixed;
  }
  set fixed(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._fixed) {
      this._fixed = newValue;
      this._changeDetectorRef.detectChanges();
    }
  }
  private _fixed: boolean = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled: boolean = false;

  @Input()
  get focusOnActivate(): boolean {
    return this._focusOnActivate;
  }
  set focusOnActivate(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._focusOnActivate) {
      this._focusOnActivate = newValue;
      this._foundation.setFocusOnActivate(this._focusOnActivate);
    }
  }
  private _focusOnActivate: boolean = true;

  @Output() readonly interacted: EventEmitter<MdcTabInteractedEvent> =
    new EventEmitter<MdcTabInteractedEvent>();

  @ViewChild('content', {static: false}) content!: ElementRef;
  @ViewChild('ripplesurface', {static: false}) rippleSurface!: ElementRef;
  @ViewChild(MdcTabIndicator, {static: false}) tabIndicator!: MdcTabIndicator;

  getDefaultFoundation() {
    const adapter: MDCTabAdapter = {
      setAttr: (attr: string, value: string) => this._getHostElement().setAttribute(attr, value),
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      activateIndicator: (previousIndicatorClientRect: ClientRect) =>
        this.tabIndicator.activate(previousIndicatorClientRect),
      deactivateIndicator: () => this.tabIndicator.deactivate(),
      notifyInteracted: () => this.interacted.emit({detail: {tabId: this.id, tab: this}}),
      getOffsetLeft: () => this._getHostElement().offsetLeft,
      getOffsetWidth: () => this._getHostElement().offsetWidth,
      getContentOffsetLeft: () => this.content.nativeElement.offsetLeft,
      getContentOffsetWidth: () => this.content.nativeElement.offsetWidth,
      focus: () => this._getHostElement().focus()
    };
    return new MDCTabFoundation(adapter);
  }

  constructor(
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ripple: MdcRipple,
    public elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MDC_TAB_BAR_PARENT_COMPONENT) private _parent: MdcTabBarParentComponent) {
    super(elementRef);
    this._root = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this._foundation.init();
    this._loadListeners();
  }

  ngAfterViewInit(): void {
    this._ripple = this._createRipple();
    this._ripple.init();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    this._ripple.destroy();
  }

  /** Getter for the active state of the tab */
  get active(): boolean {
    return this._foundation.isActive();
  }

  /** Activates the tab */
  activate(computeIndicatorClientRect?: ClientRect): void {
    this._foundation.activate(computeIndicatorClientRect);
  }

  /** Deactivates the tab */
  deactivate(): void {
    this._foundation.deactivate();
  }

  /** Returns the indicator's client rect */
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

  private _createRipple(): MdcRipple {
    const rippleSurface = this.rippleSurface.nativeElement as HTMLElement;

    const adapter: MDCRippleAdapter = {
      ...MdcRipple.createAdapter(this),
      addClass: (className: string) => rippleSurface.classList.add(className),
      removeClass: (className: string) => rippleSurface.classList.remove(className),
      updateCssVariable: (varName: string, value: string) => rippleSurface.style.setProperty(varName, value)
    };
    return new MdcRipple(this.elementRef, new MDCRippleFoundation(adapter));
  }

  private _loadListeners(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent<MouseEvent>(this._getHostElement(), 'click').pipe(takeUntil(this._destroy))
        .subscribe(() => this._ngZone.run(() => {
          if (!this.active && !this._disabled) {
            this._foundation.handleClick();
          }
        })));
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
