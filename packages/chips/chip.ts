import {
  AfterContentInit,
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Platform} from '@angular/cdk/platform';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MDCRippleFoundation, MDCRippleAdapter} from '@material/ripple';

import {MDCComponent} from '@angular-mdc/web/base';
import {MdcRipple, MDCRippleCapableSurface} from '@angular-mdc/web/ripple';
import {
  MdcIcon,
  MdcIconLocation,
  MDC_ICON_LOCATION,
  MdcIconRegistry
} from '@angular-mdc/web/icon';

import {
  chipCssClasses,
  MDCChipAdapter,
  MDCChipFoundation
} from '@material/chips';

export interface MdcChipInteractionEvent {
  detail: {
    chipId: string
  };
}

export interface MdcChipSelectionEvent extends MdcChipInteractionEvent {
  isUserInput?: boolean;
  detail: {
    chipId: string,
    selected: boolean,
    value: any
  };
}

export interface MdcChipRemovedEvent extends MdcChipInteractionEvent {
  detail: {
    chipId: string,
    root: MdcChip
  };
}

/**
 * Describes a parent MdcChipSet component.
 * Contains properties that MdcChip can inherit.
 */
export interface MdcChipSetParentComponent {
  input: boolean;
  filter: boolean;
  choice: boolean;
}

/**
 * Injection token used to provide the parent MdcChipSet component to MdcChip.
 */
export const MDC_CHIPSET_PARENT_COMPONENT =
  new InjectionToken<MdcChipSetParentComponent>('MDC_CHIPSET_PARENT_COMPONENT');

let nextUniqueId = 0;

@Component({
  moduleId: module.id,
  selector: 'mdc-chip-checkmark',
  exportAs: 'mdcChipCheckmark',
  template: `
  <div class="mdc-chip__checkmark">
    <svg
      class="mdc-chip__checkmark-svg"
      viewBox="-2 -3 30 30"
      focusable="false">
      <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
    </svg>
  </div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcChipCheckmark {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Directive({
  selector: 'mdc-chip-text, [mdcChipText]',
  host: {'class': 'mdc-chip__text'}
})
export class MdcChipText {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Component({
  moduleId: module.id,
  selector: 'mdc-chip',
  exportAs: 'mdcChip',
  host: {
    '[id]': 'id',
    '[attr.tabindex]': 'disabled ? null : 0',
    'class': 'mdc-chip',
    '[class.ngx-mdc-chip--primary]': 'primary',
    '[class.ngx-mdc-chip--secondary]': 'secondary',
    '(click)': '_handleInteraction($event)',
    '(keydown)': '_handleInteraction($event)'
  },
  template: `
  <ng-content select="mdc-chip-icon[leading]"></ng-content>
  <mdc-chip-checkmark *ngIf="filter"></mdc-chip-checkmark>
  <div class="mdc-chip__text" *ngIf="label">{{label}}</div>
  <ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MdcRipple]
})
export class MdcChip extends MDCComponent<MDCChipFoundation> implements AfterViewInit, OnDestroy,
  MDCRippleCapableSurface {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  _root!: Element;

  private _id = `mdc-chip-${nextUniqueId++}`;

  /** The unique ID of the chip. */
  get id(): string {
    return this._id;
  }

  get leadingIcon(): MdcChipIcon | undefined {
    return this._icons.find((_: MdcChipIcon) => _.leading);
  }

  @Input() label?: string;

  @Input()
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    this._selected = newValue;
    this._foundation.setSelected(newValue);

    if (this.filter && this.leadingIcon) {
      this.leadingIcon.elementRef.nativeElement.classList.remove(chipCssClasses.HIDDEN_LEADING_ICON);
    }
  }
  private _selected: boolean = false;

  @Input()
  get filter(): boolean {
    return this._filter;
  }
  set filter(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._filter) {
      this._filter = newValue;
    }
  }
  private _filter: boolean = false;

  @Input()
  get choice(): boolean {
    return this._choice;
  }
  set choice(value: boolean) {
    this._choice = coerceBooleanProperty(value);
  }
  private _choice: boolean = false;

  @Input()
  get input(): boolean {
    return this._input;
  }
  set input(value: boolean) {
    this._input = coerceBooleanProperty(value);
  }
  private _input: boolean = false;

  @Input()
  get primary(): boolean {
    return this._primary;
  }
  set primary(value: boolean) {
    this._primary = coerceBooleanProperty(value);
  }
  private _primary: boolean = false;

  @Input()
  get secondary(): boolean {
    return this._secondary;
  }
  set secondary(value: boolean) {
    this._secondary = coerceBooleanProperty(value);
  }
  private _secondary: boolean = false;

  /** Determines whether or not the chip displays the remove styling and emits (removed) events. */
  @Input()
  get removable(): boolean {
    return this._removable;
  }
  set removable(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._removable) {
      this._removable = value;
      this._foundation.setShouldRemoveOnTrailingIconClick(this._removable);
    }
  }
  private _removable: boolean = true;

  /** Whether the chip is disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled: boolean = false;

  /** Whether the chip ripple is disabled. */
  @Input()
  get disableRipple(): boolean {
    return this._disableRipple;
  }
  set disableRipple(value: boolean) {
    this._disableRipple = coerceBooleanProperty(value);
  }
  private _disableRipple: boolean = false;

  /** The value of the chip. Defaults to the content inside `<mdc-chip>` tags. */
  @Input()
  get value(): any {
    return this._value !== undefined
      ? this._value
      : this.elementRef.nativeElement.textContent;
  }
  set value(value: any) {
    this._value = value;
  }
  protected _value: any;

  /** Emitted when the chip is selected or deselected. */
  @Output() readonly selectionChange: EventEmitter<MdcChipSelectionEvent> =
    new EventEmitter<MdcChipSelectionEvent>();

  /** Emitted when the chip icon is interacted with. */
  @Output() readonly trailingIconInteraction: EventEmitter<MdcChipInteractionEvent> =
    new EventEmitter<MdcChipInteractionEvent>();

  /** Emitted when a chip is to be removed. */
  @Output() readonly removed: EventEmitter<MdcChipRemovedEvent> =
    new EventEmitter<MdcChipRemovedEvent>();

  @ContentChild(MdcChipCheckmark, {static: false}) _checkmark?: MdcChipCheckmark;
  @ContentChildren(forwardRef(() => MdcChipIcon), {descendants: true}) _icons!: QueryList<MdcChipIcon>;

  getDefaultFoundation() {
    const adapter: MDCChipAdapter = {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      addClassToLeadingIcon: (className: string) => {
        if (this.leadingIcon) {
          this.leadingIcon.elementRef.nativeElement.classList.add(className);
        }
      },
      removeClassFromLeadingIcon: (className: string) => {
        if (this.leadingIcon) {
          this.leadingIcon.elementRef.nativeElement.classList.remove(className);
        }
      },
      eventTargetHasClass: (target: HTMLElement, className: string) => target.classList.contains(className),
      notifyInteraction: () => this._emitSelectionChangeEvent(true),
      notifySelection: () => {},
      notifyTrailingIconInteraction: () => this.trailingIconInteraction.emit({detail: {chipId: this.id}}),
      notifyRemoval: () => this.removed.emit({detail: {chipId: this.id, root: this}}),
      getComputedStyleValue: (propertyName: string) => {
        if (!this._platform.isBrowser) {
          return '';
        }
        return window.getComputedStyle(this._getHostElement()).getPropertyValue(propertyName);
      },
      setStyleProperty: (propertyName: string, value: string) =>
        this._getHostElement().style.setProperty(propertyName, value),
      hasLeadingIcon: () => !!this.leadingIcon,
      setAttr: (name: string, value: string) => this._elementRef.nativeElement.setAttribute(name, value),
      getRootBoundingClientRect: () => this._getHostElement().getBoundingClientRect(),
      getCheckmarkBoundingClientRect: () => this._checkmark ?
        this._checkmark.elementRef.nativeElement.getBoundingClientRect() : null
    };
    return new MDCChipFoundation(adapter);
  }

  constructor(
    private _platform: Platform,
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ripple: MdcRipple,
    public elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MDC_CHIPSET_PARENT_COMPONENT) private _parent: MdcChipSetParentComponent) {
    super(elementRef);
    this._root = this.elementRef.nativeElement;
    this._ripple = this._createRipple();
    this._ripple.init();
  }

  ngAfterViewInit(): void {
    this._foundation.init();
    this._setVariantFromChipSet();
    this._loadListeners();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    this._ripple.destroy();
    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  /** Selects the chip. */
  select(): void {
    if (!this._selected) {
      this._selected = true;
      this._emitSelectionChangeEvent();
    }
  }

  /** Deselects the chip. */
  deselect(): void {
    if (this._selected) {
      this._selected = false;
      this._emitSelectionChangeEvent();
    }
  }

  /** Select this chip and emit selected event */
  selectViaInteraction(): void {
    if (!this._selected) {
      this._selected = true;
      this._emitSelectionChangeEvent(true);
    }
  }

  /** Allows for programmatic focusing of the chip. */
  focus(): void {
    this._getHostElement().focus();
  }

  _handleInteraction(evt: KeyboardEvent | MouseEvent): void {
    this._selected = !this._selected;
    this._foundation.handleInteraction(evt);
  }

  _handleTrailingIconInteraction(evt: KeyboardEvent | MouseEvent): void {
    this._foundation.handleTrailingIconInteraction(evt);
  }

  private _createRipple(): MdcRipple {
    const adapter: MDCRippleAdapter = {
      ...MdcRipple.createAdapter(this),
      computeBoundingRect: () => this._foundation.getDimensions()
    };
    return new MdcRipple(this.elementRef, new MDCRippleFoundation(adapter));
  }

  private _setVariantFromChipSet(): void {
    if (this._parent) {
      this.input = this._parent.input;
      this.filter = this._parent.filter;
      this.choice = this._parent.choice;

      this._changeDetectorRef.detectChanges();
    }
  }

  private _loadListeners(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent<TransitionEvent>(this._getHostElement(), 'transitionend')
        .pipe(takeUntil(this._destroyed))
        .subscribe(evt => this._ngZone.run(() => this._foundation.handleTransitionEnd(evt))));
  }

  /** Emits the removed event. */
  _emitRemovedEvent(): void {
    this.removed.emit({detail: {chipId: this.id, root: this}});
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(isUserInput?: boolean): void {
    this.selectionChange.emit({
      isUserInput: isUserInput,
      detail: {chipId: this.id, selected: this._selected, value: this._value}
    });
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-chip-icon, [mdcChipIcon]',
  exportAs: 'mdcChipIcon',
  host: {
    'class': 'mdc-chip__icon ngx-mdc-icon',
    '[attr.role]': 'role',
    '[attr.tabindex]': 'tabIndex',
    '[class.ngx-mdc-icon--clickable]': 'clickable',
    '[class.ngx-mdc-icon--inline]': 'inline',
    '[class.mdc-chip__icon--leading]': 'leading',
    '[class.mdc-chip__icon--trailing]': 'trailing',
    '(click)': '_onIconInteraction($event)',
    '(keydown)': '_onIconInteraction($event)'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcChipIcon extends MdcIcon implements AfterContentInit {
  @Input()
  get leading(): boolean {
    return this._leading;
  }
  set leading(value: boolean) {
    this._leading = coerceBooleanProperty(value);
  }
  private _leading: boolean = false;

  @Input()
  get trailing(): boolean {
    return this._trailing;
  }
  set trailing(value: boolean) {
    this._trailing = coerceBooleanProperty(value);
  }
  private _trailing: boolean = false;

  constructor(
    private _parentChip: MdcChip,
    elementRef: ElementRef<HTMLElement>,
    iconRegistry: MdcIconRegistry,
    @Attribute('aria-hidden') ariaHidden: string,
    @Inject(MDC_ICON_LOCATION) location?: MdcIconLocation) {

    super(elementRef, iconRegistry, ariaHidden, location);
  }

  ngAfterContentInit(): void {
    if (this.trailing) {
      this.tabIndex = 0;
      this.role = 'button';
    }
  }

  _onIconInteraction(evt: KeyboardEvent | MouseEvent): void {
    if (this.trailing) {
      this._parentChip._handleTrailingIconInteraction(evt);
      if (this._parentChip.removable && this._parentChip.input) {
        this._parentChip._emitRemovedEvent();
      }
    }
  }
}
