import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  Output,
  Self,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Platform} from '@angular/cdk/platform';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MDCComponent} from '@angular-mdc/web/base';
import {MdcRipple, MDCRippleCapableSurface} from '@angular-mdc/web/ripple';
import {MdcNotchedOutline} from '@angular-mdc/web/notched-outline';
import {MdcFloatingLabel} from '@angular-mdc/web/floating-label';
import {MdcMenu, MdcMenuSelectedEvent} from '@angular-mdc/web/menu';
import {MdcLineRipple} from '@angular-mdc/web/line-ripple';
import {
  MdcFormField,
  MdcFormFieldControl,
  ErrorStateMatcher,
  CanUpdateErrorState,
  CanUpdateErrorStateCtor,
  mixinErrorState
} from '@angular-mdc/web/form-field';

import {MdcSelectIcon} from './select-icon';
import {MDCSelectHelperText} from './select-helper-text';

import {MDCRippleFoundation, MDCRippleAdapter} from '@material/ripple';
import {
  strings,
  MDCSelectFoundation,
  MDCSelectAdapter,
  MDCSelectFoundationMap
} from '@material/select';

/**
 * Represents the default options for mdc-select that can be configured
 * using an `MDC_SELECT_DEFAULT_OPTIONS` injection token.
 */
export interface MdcSelectDefaultOptions {
  outlined?: boolean;
}

/**
 * Injection token that can be used to configure the default options for all
 * mdc-select usage within an app.
 */
export const MDC_SELECT_DEFAULT_OPTIONS =
  new InjectionToken<MdcSelectDefaultOptions>('MDC_SELECT_DEFAULT_OPTIONS');

class MdcSelectBase extends MDCComponent<MDCSelectFoundation> {
  constructor(
    public _elementRef: ElementRef<HTMLElement>,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl) {
    super(_elementRef);
  }
}

const _MdcSelectMixinBase: CanUpdateErrorStateCtor & typeof MdcSelectBase =
  mixinErrorState(MdcSelectBase);

export class MdcSelectChange {
  constructor(
    public source: MdcSelect,
    public index: number,
    public value: any) {}
}

let nextUniqueId = 0;

@Component({
  selector: 'mdc-select',
  exportAs: 'mdcSelect',
  host: {
    '[id]': 'id',
    'class': 'mdc-select',
    '[class.mdc-select--disabled]': 'disabled',
    '[class.mdc-select--outlined]': 'outlined',
    '[class.mdc-select--required]': 'required',
    '[class.mdc-select--no-label]': '!_hasPlaceholder',
    '[class.mdc-select--with-leading-icon]': 'leadingIcon',
    '[class.mdc-select--invalid]': 'errorState'
  },
  templateUrl: 'select.html',
  providers: [
    MdcRipple,
    {provide: MdcFormFieldControl, useExisting: MdcSelect}
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcSelect extends _MdcSelectMixinBase implements AfterViewInit, DoCheck,
  OnDestroy, ControlValueAccessor, CanUpdateErrorState, MDCRippleCapableSurface {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  private _uniqueId: string = `mdc-select-${++nextUniqueId}`;
  private _initialized = false;

  _selectedText?: string = '';

  _root!: Element;

  @Input() id: string = this._uniqueId;
  @Input() name?: string;

  /** Placeholder to be shown if no value has been selected. */
  @Input() placeholder?: string;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  private _disabled = false;

  @Input()
  get outlined(): boolean {
    return this._outlined;
  }
  set outlined(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    this._outlined = newValue;
    this.layout();
  }
  private _outlined = false;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._required) {
      this._required = newValue;
      if (this._initialized && !this._required) {
        this.valid = true;
        this._changeDetectorRef.markForCheck();
      }
    }
  }
  private _required = false;

  @Input()
  get valid(): boolean | undefined {
    return this._valid;
  }
  set valid(value: boolean | undefined) {
    const newValue = coerceBooleanProperty(value);
    this._valid = newValue;
    this._foundation?.setValid(this._valid);
  }
  private _valid?: boolean;

  @Input() compareWith: (o1: any, o2: any) => boolean = (a1, a2) => a1 === a2;

  /** Value of the select */
  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    if (newValue !== this._value) {
      this.setSelectionByValue(newValue);
    }
  }
  private _value: any;

  @Input()
  get helperText(): MDCSelectHelperText | undefined {
    return this._helperText;
  }
  set helperText(helperText: MDCSelectHelperText | undefined) {
    this._helperText = helperText;
    this.helperText?.init();
  }
  private _helperText?: MDCSelectHelperText;

  get _hasPlaceholder(): boolean {
    return this.placeholder ? this.placeholder.length > 0 : false;
  }

  /** An object used to control when error messages are shown. */
  @Input() errorStateMatcher?: ErrorStateMatcher;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<MdcSelectChange> =
    new EventEmitter<MdcSelectChange>();

  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   */
  @Output() readonly valueChange: EventEmitter<{index: number, value: any}> = new EventEmitter<any>();
  @Output() readonly blur = new EventEmitter<any>();
  @Output('focus') readonly _onFocus = new EventEmitter<boolean>();

  @ViewChild(MdcFloatingLabel, {static: false}) _floatingLabel?: MdcFloatingLabel;
  @ViewChild(MdcLineRipple, {static: false}) _lineRipple?: MdcLineRipple;
  @ViewChild(MdcNotchedOutline, {static: false}) _notchedOutline?: MdcNotchedOutline;
  @ViewChild('selectAnchor', {static: false}) _selectAnchor!: ElementRef<HTMLInputElement>;
  @ViewChild('selectSelectedText', {static: false}) _selectSelectedText!: HTMLInputElement;
  @ContentChild(MdcMenu, {static: false}) _menu!: MdcMenu;
  @ContentChild(MdcSelectIcon, {static: false}) leadingIcon?: MdcSelectIcon;

  /** View to model callback called when value changes */
  _onChange: (value: any) => void = () => {};

  /** View to model callback called when select has been touched */
  _onTouched = () => {};

  getDefaultFoundation(): any {
    // Do not initialize foundation until ngAfterViewInit runs
    if (!this._initialized) {
      return undefined;
    }

    const adapter: MDCSelectAdapter = {
      ...this._getSelectAdapterMethods(),
      ...this._getCommonAdapterMethods(),
      ...this._getOutlineAdapterMethods(),
      ...this._getLabelAdapterMethods()
    };
    return new MDCSelectFoundation(adapter, this._getFoundationMap());
  }

  private _getSelectAdapterMethods() {
    return {
      getSelectedMenuItem: () =>
        this._menu!.elementRef.nativeElement.querySelector(strings.SELECTED_ITEM_SELECTOR),
      getMenuItemAttr: (menuItem: Element, attr: string) => menuItem.getAttribute(attr),
      setSelectedText: (text: string) => this._selectedText = text,
      isSelectAnchorFocused: () => this._platform.isBrowser ?
        document.activeElement === this._selectAnchor.nativeElement : false,
      getSelectAnchorAttr: (attr: string) => this._selectAnchor.nativeElement.getAttribute(attr),
      setSelectAnchorAttr: (attr: string, value: string) => this._selectAnchor.nativeElement.setAttribute(attr, value),
      openMenu: () => this._menu.open = true,
      closeMenu: () => this._menu.open = false,
      getAnchorElement: () => this._selectAnchor.nativeElement,
      setMenuAnchorElement: (anchorEl: HTMLElement) => this._menu.anchorElement = anchorEl,
      setMenuAnchorCorner: (anchorCorner: any) => this._menu.anchorCorner = anchorCorner,
      setMenuWrapFocus: (wrapFocus: boolean) => this._menu.wrapFocus = wrapFocus,
      setAttributeAtIndex: (index: number, attributeName: string, attributeValue: string) =>
        this._menu._list!.items.toArray()[index].getListItemElement().setAttribute(attributeName, attributeValue),
      removeAttributeAtIndex: (index: number, attributeName: string) =>
        this._menu._list!.items.toArray()[index].getListItemElement().removeAttribute(attributeName),
      focusMenuItemAtIndex: (index: number) => this._menu._list!.items.toArray()[index].focus(),
      getMenuItemCount: () => this._menu._list!.items.length,
      getMenuItemValues: () => this._menu._list!.items.map(el =>
        el.getListItemElement().getAttribute(strings.VALUE_ATTR) || '') ?? [],
      getMenuItemTextAtIndex: (index: number) =>
        this._menu._list!.items.toArray()[index].getListItemElement().textContent ?? '',
      addClassAtIndex: (index: number, className: string) =>
        this._menu._list!.items.toArray()[index].getListItemElement().classList.add(className),
      removeClassAtIndex: (index: number, className: string) =>
        this._menu._list!.items.toArray()[index].getListItemElement().classList.remove(className)
    };
  }

  private _getCommonAdapterMethods() {
    return {
      addClass: (className: string) => this._root.classList.add(className),
      removeClass: (className: string) => this._root.classList.remove(className),
      hasClass: (className: string) => this._root.classList.contains(className),
      setRippleCenter: (normalizedX: number) => this._lineRipple?.setRippleCenter(normalizedX),
      activateBottomLine: () => this._lineRipple?.activate(),
      deactivateBottomLine: () => this._lineRipple?.deactivate(),
      notifyChange: () => {}
    };
  }

  private _getOutlineAdapterMethods() {
    return {
      hasOutline: () => !!this._notchedOutline,
      notchOutline: (labelWidth: number) => this._notchedOutline?.notch(labelWidth),
      closeOutline: () => this._notchedOutline?.closeNotch()
    };
  }

  private _getLabelAdapterMethods() {
    return {
      hasLabel: () => this._hasPlaceholder,
      floatLabel: (shouldFloat: boolean) => this._getFloatingLabel()?.float(shouldFloat),
      getLabelWidth: () => this._getFloatingLabel()?.getWidth() ?? 0
    };
  }

  /** Returns a map of all subcomponents to subfoundations.*/
  private _getFoundationMap(): Partial<MDCSelectFoundationMap> {
    return {
      helperText: this._helperText?.foundation
    };
  }

  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() private _parentFormField: MdcFormField,
    @Optional() private _ripple: MdcRipple,
    @Self() @Optional() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Optional() @Inject(MDC_SELECT_DEFAULT_OPTIONS) private _defaults?: MdcSelectDefaultOptions) {
    super(elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);

    this._root = this.elementRef.nativeElement;

    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    if (this._parentFormField) {
      _parentFormField.elementRef.nativeElement.classList.add('ngx-form-field-select');
    }

    // Force setter to be called in case id was not specified.
    this.id = this.id;

    this._setDefaultGlobalOptions();
  }

  ngAfterViewInit(): void {
    this._initialized = true;
    this._asyncBuildFoundation()
      .then(() => {
        this._selectBuilder();
      });
    this._initializeSelection();
    this._subscribeToMenuEvents();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  /** Override MdcSelectBase destroy method */
  destroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    this._lineRipple?.destroy();
    this._ripple.destroy();
    this._foundation.destroy();
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }
  }

  writeValue(value: any): void {
    if (this._initialized) {
      this.setSelectionByValue(value, false);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  onFocus(): void {
    if (!this.disabled) {
      this._foundation.handleFocus();
      this._onFocus.emit(true);
    }
  }

  onBlur(): void {
    this._foundation.handleBlur();
  }

  onClick(evt: MouseEvent | TouchEvent): void {
    this._foundation.handleClick(this._getNormalizedXCoordinate(evt));
  }

  onKeydown(evt: KeyboardEvent): void {
    this._foundation.handleKeydown(evt);
  }

  getSelectedIndex(): number {
    return this._foundation?.getSelectedIndex() ?? -1;
  }

  focus(): void {
    this._selectAnchor.nativeElement.focus();
  }

  setSelectedIndex(index: number): void {
    this.setSelectionByValue(this._menu._list?.getListItemByIndex(index)?.value, true, index);
  }

  setSelectionByValue(value: any, isUserInput = true, index?: number): void {
    if (!this._value && !value) {
      return;
    }

    if (!index) {
      index = this._menu._list?.getListItemIndexByValue(value);
    }

    this._value = value;
    this._foundation.setSelectedIndex(index ?? -1, this._menu.closeSurfaceOnSelection);

    if (isUserInput) {
      this._onChange(this._value);
      this.selectionChange.emit(new MdcSelectChange(this, this.getSelectedIndex(), value));
    }

    this.valueChange.emit({
      index: this.getSelectedIndex(),
      value: this._value
    });

    this._foundation.handleChange();
    this._changeDetectorRef.markForCheck();
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(disabled: boolean): void {
    this._disabled = coerceBooleanProperty(disabled);
    this._foundation?.setDisabled(this._disabled);
    this._changeDetectorRef.markForCheck();
  }

  get _hasValue(): boolean {
    return this._value?.length > 0;
  }

  /** Initialize Select internal state based on the environment state */
  private layout(): void {
    if (this._initialized) {
      this._asyncBuildFoundation().then(() => {
        this._selectBuilder();
        this._foundation.layout();
      });
    }
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      const value = this.ngControl?.value ?? this._value;
      if (value) {
        this.setSelectionByValue(value, false);
      }
    });
  }

  /** Set the default options. */
  private _setDefaultGlobalOptions(): void {
    if (this._defaults) {
      if (this._defaults.outlined != null) {
        this.outlined = this._defaults.outlined;
      }
    }
  }

  async _asyncBuildFoundation(): Promise<void> {
    this._foundation = this.getDefaultFoundation();
  }

  async _asyncInitFoundation(): Promise<void> {
    this._foundation.init();
  }

  private _selectBuilder(): void {
    this._changeDetectorRef.detectChanges();

    // initialize after running a detectChanges()
    this._asyncInitFoundation()
      .then(() => {
        if (!this.outlined) {
          this._ripple = this._createRipple();
          this._ripple.init();
        }

        this._menu.wrapFocus = false;
        this._menu.elementRef.nativeElement.setAttribute('role', 'listbox');
        this._menu.elementRef.nativeElement.classList.add('mdc-select__menu');

        if (this._menu._list) {
          this._menu._list.useSelectedClass = true;
          this._menu._list.singleSelection = true;
        }
      });
  }

  private _subscribeToMenuEvents(): void {
    // When the list items change, re-subscribe
    this._menu._list!.items.changes.pipe(takeUntil(this._destroyed))
      .subscribe(() => this._initializeSelection());

    // Subscribe to menu opened event
    this._menu.opened.pipe(takeUntil(this._destroyed))
      .subscribe(() => this._foundation.handleMenuOpened());

    // Subscribe to menu closed event
    this._menu.closed.pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        this._foundation.handleMenuClosed();
        this._blur();
      });

    // Subscribe to list-item action event
    this._menu.selected.pipe(takeUntil(this._destroyed))
      .subscribe((evt: MdcMenuSelectedEvent) => this.setSelectedIndex(evt.index));
  }

  private _blur(): void {
    this._onTouched();
    this.blur.emit(this.value);
    this._onFocus.emit(false);
  }

  private _getFloatingLabel(): MdcFloatingLabel | undefined {
    return this._floatingLabel ?? this._notchedOutline?.floatingLabel;
  }

  /**
   * Calculates where the line ripple should start based on the x coordinate within the component.
   */
  private _getNormalizedXCoordinate(evt: MouseEvent | TouchEvent): number {
    const targetClientRect = (<Element>evt.target).getBoundingClientRect();
    if (evt instanceof MouseEvent) {
      return evt.clientX - targetClientRect.left;
    }
    const clientX = evt.touches[0] && evt.touches[0].clientX;
    return clientX - targetClientRect.left;
  }

  private _createRipple(): MdcRipple {
    const adapter: MDCRippleAdapter = {
      ...MdcRipple.createAdapter({_root: this._selectAnchor.nativeElement}),
      registerInteractionHandler: (evtType: any, handler: any) =>
        this._selectAnchor.nativeElement.addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType: any, handler: any) =>
        this._selectAnchor.nativeElement.removeEventListener(evtType, handler)
    };
    return new MdcRipple(this._selectAnchor, new MDCRippleFoundation(adapter));
  }
}
