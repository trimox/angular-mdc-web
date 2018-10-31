import {
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
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcTabIndicator } from '@angular-mdc/web/tab-indicator';

import { MDCTabFoundation } from '@material/tab/index';

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
  selector: 'mdc-tab-label, [mdcTabLabel]',
  host: { 'class': 'mdc-tab__text-label' }
})
export class MdcTabLabel {
  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-tab-icon, [mdcTabIcon]',
  host: { 'class': 'mdc-tab__icon' }
})
export class MdcTabIcon {
  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdcTab], mdc-tab',
  exportAs: 'mdcTab',
  host: {
    'role': 'tab',
    'class': 'mdc-tab',
    '[class.mdc-tab--active]': 'active',
    '[class.mdc-tab--stacked]': 'stacked',
    '[class.mdc-tab--min-width]': 'fixed',
    '[class.ng-mdc-tab--disabled]': 'disabled'
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
export class MdcTab implements OnInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  @Input() label: string;
  @Input() icon: string;

  @Input()
  get stacked(): boolean { return this._stacked; }
  set stacked(value: boolean) {
    const newValue = toBoolean(value);
    if (newValue !== this._stacked) {
      this._stacked = newValue;
    }
  }
  private _stacked: boolean = false;

  @Input()
  get fixed(): boolean { return this._fixed; }
  set fixed(value: boolean) {
    const newValue = toBoolean(value);
    if (newValue !== this._fixed) {
      this._fixed = newValue;
      this._changeDetectorRef.detectChanges();
    }
  }
  private _fixed: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
  }
  private _disabled: boolean;

  @Input()
  get focusOnActivate(): boolean { return this._focusOnActivate; }
  set focusOnActivate(value: boolean) {
    this._focusOnActivate = toBoolean(value);
  }
  private _focusOnActivate: boolean;

  @Output() readonly interacted: EventEmitter<MdcTabInteractedEvent> =
    new EventEmitter<MdcTabInteractedEvent>();

  @ViewChild('content') content: ElementRef;
  @ViewChild('ripplesurface') rippleSurface: ElementRef;
  @ViewChild(MdcTabIndicator) tabIndicator: MdcTabIndicator;

  private _createAdapter() {
    return {
      setAttr: (attr: string, value: string) => this._getHostElement().setAttribute(attr, value),
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      activateIndicator: (previousIndicatorClientRect: ClientRect) =>
        this.tabIndicator.activate(previousIndicatorClientRect),
      deactivateIndicator: () => this.tabIndicator.deactivate(),
      notifyInteracted: () => this.interacted.emit({ detail: { tab: this } }),
      getOffsetLeft: () => this._getHostElement().offsetLeft,
      getOffsetWidth: () => this._getHostElement().offsetWidth,
      getContentOffsetLeft: () => this.content.nativeElement.offsetLeft,
      getContentOffsetWidth: () => this.content.nativeElement.offsetWidth,
      focus: () => this._getHostElement().focus()
    };
  }

  private _foundation: {
    init(): void,
    isActive(): boolean,
    activate(previousIndicatorClientRect: ClientRect): void,
    deactivate(): void,
    computeDimensions(): any,
    handleClick(): void,
    focusOnActivate(focusOnActivate: boolean): void
  } = new MDCTabFoundation(this._createAdapter());

  constructor(
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ripple: MdcRipple,
    public elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MDC_TAB_BAR_PARENT_COMPONENT) private _parent: MdcTabBarParentComponent) { }

  ngOnInit(): void {
    this._foundation.init();
    this._initRipple();
    this._loadListeners();
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
  activate(computeIndicatorClientRect: ClientRect): void {
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

  private _initRipple(): void {
    this._ripple.init({
      surface: this._getHostElement()
    }, Object.assign(this._ripple.createAdapter(), {
      addClass: (className: string) => this.rippleSurface.nativeElement.classList.add(className),
      removeClass: (className: string) => this.rippleSurface.nativeElement.classList.remove(className),
      updateCssVariable: (varName: string, value: string) =>
        this.rippleSurface.nativeElement.style.setProperty(varName, value),
    }));
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
