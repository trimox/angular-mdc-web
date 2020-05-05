import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  DoCheck,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  Self,
  SimpleChanges,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';
import {Platform} from '@angular/cdk/platform';

import {MdcRipple} from '@angular-mdc/web/ripple';
import {MDCComponent} from '@angular-mdc/web/base';
import {MdcFloatingLabel} from '@angular-mdc/web/floating-label';
import {MdcLineRipple} from '@angular-mdc/web/line-ripple';
import {MdcNotchedOutline} from '@angular-mdc/web/notched-outline';
import {
  ErrorStateMatcher,
  CanUpdateErrorState,
  CanUpdateErrorStateCtor,
  MdcFormField,
  MdcFormFieldControl,
  mixinErrorState
} from '@angular-mdc/web/form-field';

import {MdcTextFieldIcon} from './text-field-icon';
import {MdcTextFieldHelperTextFoundation} from './helper-text';
import {MdcTextFieldCharacterCounterFoundation} from './character-counter';

import {EventType, SpecificEventListener} from '@material/base/types';
import {
  MDCTextFieldAdapter,
  MDCTextFieldFoundation,
  MDCTextFieldFoundationMap,
  MDCTextFieldInputAdapter,
  MDCTextFieldOutlineAdapter,
  MDCTextFieldLabelAdapter,
  MDCTextFieldLineRippleAdapter
} from '@material/textfield';

/**
 * Represents the default options for mdc-text-field that can be configured
 * using an `MDC_TEXT_FIELD_DEFAULT_OPTIONS` injection token.
 */
export interface MdcTextFieldDefaultOptions {
  outlined?: boolean;
}

/**
 * Injection token that can be used to configure the default options for all
 * mdc-text-field usage within an app.
 */
export const MDC_TEXT_FIELD_DEFAULT_OPTIONS =
  new InjectionToken<MdcTextFieldDefaultOptions>('MDC_TEXT_FIELD_DEFAULT_OPTIONS');

/** An enumerated typeof HTMLInputElement.type */
export type TextFieldType = 'text' | 'search' | 'tel' | 'url' | 'email' | 'password' |
  'date' | 'month' | 'week' | 'time' | 'datetime-local' | 'number' | 'color';

/** An enumerated typeof HTMLInputElement.inputMode */
export type TextFieldInputMode =
  'verbatim' | 'latin' | 'latin-name' | 'latin-prose' | 'full-width-latin' | 'kana' |
  'kana-name' | 'katakana' | 'numeric' | 'tel' | 'email' | 'url';

class MdcTextFieldBase extends MDCComponent<MDCTextFieldFoundation> {
  constructor(
    public _elementRef: ElementRef<HTMLElement>,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl) {
    super(_elementRef);
  }
}

const _MdcTextFieldMixinBase: CanUpdateErrorStateCtor & typeof MdcTextFieldBase =
  mixinErrorState(MdcTextFieldBase);

let nextUniqueId = 0;

/**
 * Time in milliseconds for which to ignore mouse events, after
 * receiving a touch event. Used to avoid doing double work for
 * touch devices where the browser fires fake mouse events, in
 * addition to touch events.
 */
const MOUSE_EVENT_IGNORE_TIME = 800;

@Component({
  selector: 'mdc-text-field',
  exportAs: 'mdcTextField',
  host: {
    'class': 'mdc-text-field',
    '[class.mdc-text-field--filled]': '!outlined',
    '[class.mdc-text-field--disabled]': 'disabled',
    '[class.mdc-text-field--outlined]': 'outlined',
    '[class.mdc-text-field--fullwidth]': 'fullwidth',
    '[class.mdc-text-field--end-aligned]': 'endAligned',
    '[class.mdc-text-field--ltr-text]': 'ltrText',
    '[class.mdc-text-field--with-leading-icon]': 'leadingIcon',
    '[class.mdc-text-field--with-trailing-icon]': 'trailingIcon',
    '[class.mdc-text-field--no-label]': '!label || label && fullwidth',
    '[class.mdc-text-field--invalid]': 'errorState',
  },
  templateUrl: 'text-field.html',
  providers: [
    MdcRipple,
    {provide: MdcFormFieldControl, useExisting: MdcTextField}
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcTextField extends _MdcTextFieldMixinBase implements AfterViewInit, DoCheck,
  OnChanges, OnDestroy, ControlValueAccessor, MdcFormFieldControl<any>, CanUpdateErrorState {
  private _uid = `mdc-input-${nextUniqueId++}`;
  private _initialized: boolean = false;

  /** Time in milliseconds when the last touchstart event happened. */
  private _lastTouchStartEvent: number = 0;

  controlType: string = 'mdc-text-field';

  _foundationHelper?: MdcTextFieldHelperTextFoundation;
  _foundationCharCounter?: MdcTextFieldCharacterCounterFoundation;

  @Input() name?: string;
  @Input() label: string | undefined = undefined;
  @Input() maxlength?: number;
  @Input() minlength?: number;
  @Input() pattern?: string;
  @Input() autocomplete?: string;
  @Input() max?: number;
  @Input() min?: number;
  @Input() size?: number;
  @Input() step?: number;
  @Input() placeholder: string | undefined = undefined;
  @Input() tabIndex: number = 0;
  @Input() prefix: string | undefined = undefined;
  @Input() suffix: string | undefined = undefined;
  @Input() inputmode?: TextFieldInputMode;
  @Input() helper?: string;
  @Input() validationMessage?: string;

  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value || this._uid;
  }
  private _id = '';

  /** Input type of the element. */
  @Input()
  get type(): TextFieldType {
    return this._type;
  }
  set type(value: TextFieldType) {
    this._type = value || 'text';
  }
  private _type: TextFieldType = 'text';

  @Input()
  get outlined(): boolean {
    return this._outlined;
  }
  set outlined(value: boolean) {
    this._outlined = coerceBooleanProperty(value);
    if (this._initialized) {
      this._layout();
    }
  }
  private _outlined = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  private _disabled = false;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._required) {
      this._required = newValue;

      if (this._initialized) {
        if (!this.valid) {
          this._foundation.setValid(true);
          this._changeDetectorRef.markForCheck();
        }

        if (this.ngControl) {
          this._required ? this._getInputElement().setAttribute('required', '') :
            this._getInputElement().removeAttribute('required');
        }
      }
    }
  }
  private _required: boolean = false;

  @Input()
  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
  }
  private _readonly = false;

  @Input()
  get fullwidth(): boolean {
    return this._fullwidth;
  }
  set fullwidth(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._fullwidth) {
      this._fullwidth = newValue;
      this.placeholder = this.fullwidth ? this.label : '';
    }
  }
  private _fullwidth = false;

  @Input()
  get helperPersistent(): boolean {
    return this._helperPersistent;
  }
  set helperPersistent(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._helperPersistent) {
      this._helperPersistent = newValue;
    }
  }
  private _helperPersistent = false;

  /** Sets the Text Field valid or invalid. */
  @Input()
  get valid(): boolean | undefined {
    return this._valid;
  }
  set valid(value: boolean | undefined) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._valid) {
      this._valid = value;
      this._foundation.setValid(newValue);
    }
  }
  private _valid: boolean | undefined;

  /** Enables or disables the use of native validation. Use this for custom validation. */
  @Input()
  get useNativeValidation(): boolean {
    return this._useNativeValidation;
  }
  set useNativeValidation(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._useNativeValidation) {
      this._useNativeValidation = newValue;
      this._foundation.setUseNativeValidation(this._useNativeValidation);
    }
  }
  private _useNativeValidation = true;

  @Input()
  get charCounter(): boolean {
    return this._charCounter;
  }
  set charCounter(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._charCounter) {
      this._charCounter = newValue;
    }
  }
  private _charCounter = false;

  @Input()
  get endAligned(): boolean {
    return this._endAligned;
  }
  set endAligned(value: boolean) {
    this._endAligned = coerceBooleanProperty(value);
  }
  private _endAligned = false;

  @Input()
  get ltrText(): boolean {
    return this._ltrText;
  }
  set ltrText(value: boolean) {
    this._ltrText = coerceBooleanProperty(value);
  }
  private _ltrText = false;

  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    if (!this._initialized) {
      this.ngControl ? this._initializeValue() : this._initializeValue(newValue);
    } else {
      this.setValue(newValue, true);
    }
  }
  private _value: any;

  /** An object used to control when error messages are shown. */
  @Input() errorStateMatcher?: ErrorStateMatcher;

  @Output() readonly change = new EventEmitter<any>();
  @Output() readonly input = new EventEmitter<any>();
  @Output() readonly blur = new EventEmitter<any>();
  @Output('focus') readonly _onFocus = new EventEmitter<boolean>();

  @ViewChild('inputElement', {static: true}) _input!: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  @ViewChild(MdcLineRipple, {static: false}) _lineRipple?: MdcLineRipple;
  @ViewChild(MdcNotchedOutline, {static: false}) _notchedOutline?: MdcNotchedOutline;
  @ViewChild(MdcFloatingLabel, {static: false}) _floatingLabel?: MdcFloatingLabel;
  @ContentChildren(MdcTextFieldIcon, {descendants: true}) _icons!: QueryList<MdcTextFieldIcon>;

  /** View to model callback called when value changes */
  _onChange: (value: any) => void = () => {};

  /** View to model callback called when text field has been touched */
  _onTouched = () => {};

  get textarea(): boolean {
    return this._getHostElement().nodeName.toLowerCase() === 'mdc-textarea';
  }
  get leadingIcon(): MdcTextFieldIcon | undefined {
    return this._icons?.find(icon => icon.leading);
  }
  get trailingIcon(): MdcTextFieldIcon | undefined {
    return this._icons?.find(icon => icon.trailing);
  }

  getDefaultFoundation() {
    const adapter: MDCTextFieldAdapter = {
      ...this._getRootAdapterMethods(),
      ...this._getInputAdapterMethods(),
      ...this._getLabelAdapterMethods(),
      ...this._getLineRippleAdapterMethods(),
      ...this._getOutlineAdapterMethods()
    };
    return new MDCTextFieldFoundation(adapter, this._getFoundationMap());
  }

  private _getRootAdapterMethods(): any {
    return {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      registerTextFieldInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        (<HTMLElement>this._getHostElement()).addEventListener(evtType, handler),
      deregisterTextFieldInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        (<HTMLElement>this._getHostElement()).removeEventListener(evtType, handler),
    };
  }

  private _getInputAdapterMethods(): MDCTextFieldInputAdapter {
    return {
      getNativeInput: () => {
        return {
          maxLength: this.maxlength ?? 0,
          type: this.type,
          value: this._platform.isBrowser ? this._input.nativeElement.value : this._value,
          disabled: this._disabled,
          validity: {
            valid: this._isValid(),
            badInput: this._platform.isBrowser ? this._input.nativeElement.validity.badInput : false
          }
        };
      },
      isFocused: () => this._platform.isBrowser ? document.activeElement === this._getInputElement() : false,
      registerInputInteractionHandler: () => {},
      deregisterInputInteractionHandler: () => {}
    };
  }

  private _getLabelAdapterMethods(): MDCTextFieldLabelAdapter {
    return {
      shakeLabel: (shouldShake: boolean) => this._getFloatingLabel()?.shake(shouldShake),
      floatLabel: (shouldFloat: boolean) => this._getFloatingLabel()?.float(shouldFloat),
      hasLabel: () => this._hasFloatingLabel(),
      getLabelWidth: () => this._getFloatingLabel()?.getWidth() ?? 0
    };
  }

  private _getLineRippleAdapterMethods(): MDCTextFieldLineRippleAdapter {
    return {
      activateLineRipple: () => this._lineRipple?.activate(),
      deactivateLineRipple: () => this._lineRipple?.deactivate(),
      setLineRippleTransformOrigin: (normalizedX: number) => this._lineRipple?.setRippleCenter(normalizedX)
    };
  }

  private _getOutlineAdapterMethods(): MDCTextFieldOutlineAdapter {
    return {
      hasOutline: () => !!this._notchedOutline,
      notchOutline: (labelWidth: number) => this._notchedOutline!.notch(labelWidth),
      closeOutline: () => this._notchedOutline!.closeNotch()
    };
  }

  /** Returns a map of all subcomponents to subfoundations.*/
  private _getFoundationMap(): Partial<MDCTextFieldFoundationMap> {
    return {
      helperText: this._foundationHelper?.foundation,
      characterCounter: this._foundationCharCounter?.foundation,
      leadingIcon: this.leadingIcon?.foundation,
      trailingIcon: this.trailingIcon?.foundation
    };
  }

  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    @Inject(DOCUMENT) private _document: any,
    @Optional() private _parentFormField: MdcFormField,
    @Optional() private _ripple: MdcRipple,
    @Self() @Optional() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Optional() @Inject(MDC_TEXT_FIELD_DEFAULT_OPTIONS) private _defaults: MdcTextFieldDefaultOptions) {
    super(elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);

    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    if (this._parentFormField) {
      _parentFormField.elementRef.nativeElement.classList.add('ngx-form-field-text-field');
    }

    // Force setter to be called in case id was not specified.
    this.id = this.id;

    this._setDefaultGlobalOptions();
  }

  async _asyncBuildFoundation(): Promise<void> {
    this._foundation = this.getDefaultFoundation();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['helper'] || changes['helperPersistent'] || changes['validationMessage']) {
      this._syncHelper();
    }

    if (changes['charCounter']) {
      this._syncCharacterCounter();
    }
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.destroy();
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

  init(): void {
    this._initialized = true;

    this._asyncBuildFoundation()
      .then(() => {
        this._foundation.init();

        if (!this.fullwidth && !this.outlined && !this.textarea) {
          this._ripple = new MdcRipple(this.elementRef);
          this._ripple.init();
        } else {
          this._ripple?.destroy();
        }

        this._checkCustomValidity();
        this.leadingIcon?.foundation?.init();
        this.trailingIcon?.foundation?.init();
        this.disabled = this._input.nativeElement.disabled;
      });
  }

  onInputInteraction(evt: MouseEvent | TouchEvent): void {
    if (evt instanceof MouseEvent) {
      const isSyntheticEvent = this._lastTouchStartEvent &&
        Date.now() < this._lastTouchStartEvent + MOUSE_EVENT_IGNORE_TIME;

      if (isSyntheticEvent) {
        return;
      }
    } else {
      this._lastTouchStartEvent = Date.now();
    }

    this._foundation.setTransformOrigin(evt);
  }

  onInput(evt: Event): void {
    const value = (<any>evt.target).value;
    this.setValue(value, true);
    this._foundation.handleInput();
    this.input.emit(value);
    evt.stopPropagation();
  }

  onFocus(): void {
    if (this._initialized) {
      this._foundation.activateFocus();
      this._onFocus.emit(true);
    }
  }

  onChange(evt: Event): void {
    const value = (<any>evt.target).value;
    this.setValue(value, true);
    this.change.emit(value);
    evt.stopPropagation();
  }

  onBlur(): void {
    this._onTouched();
    this._foundation.deactivateFocus();
    this.blur.emit(this.value);
    this._onFocus.emit(false);
  }

  writeValue(value: any): void {
    this.setValue(value);
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  private _initializeValue(value?: any): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      this.setValue(this.ngControl ? this.ngControl.value : value);
    });
  }

  setValue(value: any, isUserInput?: boolean): void {
    const newValue = this.type === 'number' ? coerceNumberProperty(value, null) : value;
    if (this._value === newValue) {
      // Reset validity for numeric form inputs
      if (newValue === null) {
        this.valid = true;
      }
      return;
    }

    this._value = newValue !== undefined ? newValue : null;
    if (this._getInputElement().value !== this._value) {
      this._getInputElement().value = this._value;
    }

    this._foundation.setValue(this._value || '');

    if (isUserInput) {
      this._onChange(this._value);
    }
    this._changeDetectorRef.markForCheck();
  }

  isBadInput(): boolean {
    const validity = this._getInputElement().validity;
    return validity && validity.badInput;
  }

  focus(): void {
    this._getInputElement()?.focus();
  }

  /** Initializes Text Field's internal state based on the environment state */
  private _layout(): void {
    this.destroy();

    this.init();
    this._changeDetectorRef.markForCheck();

    setTimeout(() => {
      if (this._outlined) {
        this._foundation.notchOutline(this._foundation.shouldFloat);
      }
      this._getFloatingLabel()?.float(this._foundation.shouldFloat);
    });
  }

  /** Implemented as part of ControlValueAccessor. */
  setDisabledState(isDisabled: boolean) {
    const newValue = coerceBooleanProperty(isDisabled);
    if (newValue !== this._disabled) {
      this._disabled = newValue;
      if (this._initialized) {
        this._foundation.setDisabled(newValue);
      }
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Set the default options here. */
  private _setDefaultGlobalOptions(): void {
    if (this._defaults && this._defaults.outlined) {
      this._outlined = this._defaults.outlined;
    }
  }

  private _checkCustomValidity(): void {
    Promise.resolve().then(() => {
      if (this._valid !== undefined) {
        this._foundation.setValid(this._valid);
      }
    });
  }

  /** Override MdcTextFieldBase destroy method */
  destroy(): void {
    this._initialized = false;

    this._lineRipple?.destroy();
    this._ripple?.destroy();
  }

  private _isValid(): boolean {
    const isValid = this._valid ? this._valid : this._platform.isBrowser ?
      this._input.nativeElement.validity.valid : true;

    const showValidationMessage = !!this.validationMessage && !isValid || this.errorState;

    if (this._shouldRenderHelperText()) {
      this._foundationHelper?.setContent(showValidationMessage ?
        this.validationMessage ?? '' : this.helper ?? '');

      if (showValidationMessage) {
        this._foundationHelper?.setValidation(showValidationMessage);
      }
    }

    if (this.ngControl) {
      return !this.errorState;
    }

    return isValid;
  }

  private _hasFloatingLabel(): boolean {
    return this.label && (this._floatingLabel || this._notchedOutline) ? true : false;
  }

  private _getFloatingLabel(): MdcFloatingLabel | undefined {
    return this._floatingLabel || this._notchedOutline?.floatingLabel;
  }

  private _syncCharacterCounter(): void {
    if (!this.charCounter) {
      this._foundationCharCounter?.destroy();
      return;
    }

    if (this._shouldRenderHelperText()) {
      this._initHelperFoundation();
    }

    if (!this._foundationCharCounter) {
      this._foundationCharCounter = new MdcTextFieldCharacterCounterFoundation(this._elementRef,
        this.textarea ? this.elementRef.nativeElement : this._foundationHelper!._helperLineElement!, this._document);
      this._foundationCharCounter.init();
    }
  }

  private _syncHelper(): void {
    if (this._shouldRenderHelperText()) {
      this._initHelperFoundation();
    }

    this._foundationHelper!.setPersistent(this._helperPersistent);
  }

  private _initHelperFoundation(): void {
    if (!this._foundationHelper) {
      this._foundationHelper = new MdcTextFieldHelperTextFoundation(this._elementRef, this._document);
      this._foundationHelper.init();
    }
  }

  private _charCounterVisible(): boolean {
    return this.charCounter && this.maxlength !== -1;
  }

  private _shouldRenderHelperText(): boolean {
    return !!this.helper || !!this.validationMessage || this._charCounterVisible();
  }

  private _getInputElement(): HTMLInputElement | HTMLTextAreaElement {
    return this._input.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
