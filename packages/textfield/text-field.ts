import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  DoCheck,
  Input,
  OnDestroy,
  Optional,
  Output,
  Self,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';

import { Platform, toBoolean, toNumber } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcFloatingLabel } from '@angular-mdc/web/floating-label';
import { MdcLineRipple } from '@angular-mdc/web/line-ripple';
import { MdcNotchedOutline } from '@angular-mdc/web/notched-outline';
import {
  MdcFormField,
  MdcFormFieldControl,
  MdcHelperText,
  ErrorStateMatcher,
  CanUpdateErrorState,
  CanUpdateErrorStateCtor,
  mixinErrorState
} from '@angular-mdc/web/form-field';

import { MdcTextFieldIcon } from './text-field-icon';

import { MDCTextFieldHelperTextFoundation } from '@material/textfield/helper-text/index';
import { MDCTextFieldFoundation } from '@material/textfield/index';

export class MdcTextFieldBase {
  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl) { }
}

export const _MdcTextFieldMixinBase: CanUpdateErrorStateCtor & typeof MdcTextFieldBase =
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
  moduleId: module.id,
  selector: 'mdc-text-field',
  exportAs: 'mdcTextField',
  host: {
    'class': 'mdc-text-field',
    '[class.mdc-text-field--disabled]': 'disabled',
    '[class.mdc-text-field--outlined]': 'outlined',
    '[class.mdc-text-field--dense]': 'dense',
    '[class.mdc-text-field--fullwidth]': 'fullwidth',
    '[class.mdc-text-field--with-leading-icon]': 'leadingIcon',
    '[class.mdc-text-field--with-trailing-icon]': 'trailingIcon',
    '[class.mdc-text-field--invalid]': 'errorState',
    '(click)': 'onTextFieldInteraction()',
    '(keydown)': 'onTextFieldInteraction()'
  },
  template: `
  <ng-content *ngIf="leadingIcon"></ng-content>
  <input #input class="mdc-text-field__input"
    [id]="id"
    [type]="type"
    [tabindex]="tabIndex"
    [attr.aria-invalid]="errorState"
    [attr.autocomplete]="autocomplete"
    [attr.pattern]="pattern"
    [attr.placeholder]="placeholder"
    [attr.maxlength]="maxlength"
    [attr.minlength]="minlength"
    [attr.max]="max"
    [attr.min]="min"
    [attr.size]="size"
    [attr.step]="step"
    [readonly]="readonly"
    [required]="required"
    (mousedown)="onInputInteraction($event)"
    (touchstart)="onInputInteraction($event)"
    (focus)="onFocus()"
    (input)="onInput($event.target.value)"
    (change)="onChange($event)"
    (blur)="onBlur()" />
    <ng-content></ng-content>
    <label mdcFloatingLabel [for]="id" *ngIf="!this.placeholder && !outlined">{{label}}</label>
    <mdc-line-ripple *ngIf="!this.outlined && !this.textarea"></mdc-line-ripple>
    <mdc-notched-outline *ngIf="outlined" [label]="label" [for]="id"></mdc-notched-outline>
  `,
  providers: [
    MdcRipple,
    { provide: MdcFormFieldControl, useExisting: MdcTextField }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcTextField extends _MdcTextFieldMixinBase implements AfterViewInit, DoCheck,
  OnDestroy, ControlValueAccessor, MdcFormFieldControl<any>, CanUpdateErrorState {
  private _uid = `mdc-input-${nextUniqueId++}`;
  private _initialized: boolean = false;

  /** Time in milliseconds when the last touchstart event happened. */
  private _lastTouchStartEvent: number = 0;

  controlType: string = 'mdc-text-field';

  @Input() label: string | null = null;
  @Input() maxlength?: number;
  @Input() minlength?: number;
  @Input() pattern?: string;
  @Input() autocomplete?: string;
  @Input() max?: number;
  @Input() min?: number;
  @Input() size?: number;
  @Input() step?: number;
  @Input() placeholder: string | null = null;
  @Input() tabIndex: number = 0;

  @Input()
  get id(): string { return this._id; }
  set id(value: string) { this._id = value || this._uid; }
  private _id = '';

  /** Input type of the element. */
  @Input()
  get type(): string { return this._type; }
  set type(value: string) {
    this._type = value || 'text';
  }
  private _type = 'text';

  @Input()
  get outlined(): boolean { return this._outlined; }
  set outlined(value: boolean) {
    const newValue = toBoolean(value);
    if (newValue !== this._outlined) {
      this._outlined = toBoolean(newValue);
      this.layout();
    }
  }
  private _outlined: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  private _disabled: boolean = false;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = toBoolean(value);

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
  private _required: boolean = false;

  @Input()
  get readonly(): boolean { return this._readonly; }
  set readonly(value: boolean) {
    this._readonly = toBoolean(value);
  }
  private _readonly: boolean = false;

  @Input()
  get fullwidth(): boolean { return this._fullwidth; }
  set fullwidth(value: boolean) {
    this._fullwidth = toBoolean(value);
    this.placeholder = this.fullwidth ? this.label : '';
  }
  private _fullwidth: boolean = false;

  @Input()
  get dense(): boolean { return this._dense; }
  set dense(value: boolean) {
    this._dense = toBoolean(value);
  }
  private _dense: boolean = false;

  @Input()
  get helperText(): MdcHelperText | null { return this._helperText; }
  set helperText(helperText: MdcHelperText | null) {
    this._helperText = helperText;
    if (this._helperText) {
      this._initHelperText();
    }
  }
  private _helperText: MdcHelperText | null = null;

  /** Sets the Text Field valid or invalid. */
  @Input()
  get valid(): boolean | undefined { return this._valid; }
  set valid(value: boolean | undefined) {
    this._valid = toBoolean(value);
    this._foundation.setValid(this._valid);
  }
  private _valid: boolean | undefined;

  /** Enables or disables the use of native validation. Use this for custom validation. */
  @Input()
  get useNativeValidation(): boolean { return this._useNativeValidation; }
  set useNativeValidation(value: boolean) {
    this._useNativeValidation = toBoolean(value);
    this._foundation.setUseNativeValidation(this._useNativeValidation);
  }
  private _useNativeValidation: boolean = true;

  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    if (!this._initialized) {
      this._initializeValue();
    } else {
      this.setValue(newValue, true);
    }
  }
  private _value: any;

  /** An object used to control when error messages are shown. */
  @Input() errorStateMatcher?: ErrorStateMatcher;

  @Output() readonly change = new EventEmitter<any>();
  @Output() readonly blur = new EventEmitter<any>();

  @ViewChild('input') _input!: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  @ViewChild(MdcLineRipple) _lineRipple!: MdcLineRipple;
  @ViewChild(MdcNotchedOutline) _notchedOutline!: MdcNotchedOutline;
  @ViewChild(MdcFloatingLabel) _floatingLabel!: MdcFloatingLabel;
  @ContentChildren(MdcTextFieldIcon, { descendants: true }) _icons!: QueryList<MdcTextFieldIcon>;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when text field has been touched */
  _onTouched = () => { };

  get textarea(): boolean { return this._getHostElement().nodeName.toLowerCase() === 'mdc-textarea'; }
  get focused(): boolean {
    return this._platform.isBrowser ?
      document.activeElement! === this._getInputElement() : false;
  }
  get leadingIcon(): MdcTextFieldIcon | undefined { return this._icons.find(icon => icon.leading); }
  get trailingIcon(): MdcTextFieldIcon | undefined { return this._icons.find(icon => icon.trailing); }

  private _createAdapter() {
    return Object.assign({
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      isFocused: () => this._platform.isBrowser ? document.activeElement! === this._getInputElement() : false
    },
      this._getInputAdapterMethods(),
      this._getLabelAdapterMethods(),
      this._getLineRippleAdapterMethods(),
      this._getOutlineAdapterMethods()
    );
  }

  private _getInputAdapterMethods() {
    return {
      getNativeInput: () => {
        return {
          type: this._type,
          value: this._value,
          disabled: this._disabled,
          validity: {
            valid: this._hasErrorState(),
            badInput: this._platform.isBrowser ? this._input.nativeElement.validity.badInput : false
          }
        };
      }
    };
  }

  private _getLabelAdapterMethods() {
    return {
      shakeLabel: (shouldShake: boolean) => this._getFloatingLabel().shake(shouldShake),
      floatLabel: (shouldFloat: boolean) => this._getFloatingLabel().float(shouldFloat),
      hasLabel: () => this._hasFloatingLabel(),
      getLabelWidth: () => this._hasFloatingLabel() ? this._getFloatingLabel().getWidth() : 0
    };
  }

  private _getLineRippleAdapterMethods() {
    return {
      activateLineRipple: () => {
        if (this._lineRipple) {
          this._lineRipple.activate();
        }
      },
      deactivateLineRipple: () => {
        if (this._lineRipple) {
          this._lineRipple.deactivate();
        }
      },
      setLineRippleTransformOrigin: (normalizedX: number) => {
        if (this._lineRipple) {
          this._lineRipple.setRippleCenter(normalizedX);
        }
      }
    };
  }

  private _getOutlineAdapterMethods() {
    return {
      hasOutline: () => this._notchedOutline,
      notchOutline: (labelWidth: number) => this._notchedOutline.notch(labelWidth),
      closeOutline: () => this._notchedOutline.closeNotch()
    };
  }

  /** Returns a map of all subcomponents to subfoundations.*/
  private _getFoundationMap() {
    return {
      helperText: this._helperText || undefined
    };
  }

  private _foundation: {
    init(): void,
    destroy(): void,
    setDisabled(disabled: boolean): void,
    setValid(isValid: boolean): void,
    setValue(value: any): void,
    readonly shouldFloat: boolean,
    notchOutline(openNotch: boolean): void,
    setUseNativeValidation(useNativeValidation: boolean): void,
    setTransformOrigin(evt: Event | TouchEvent): void,
    handleTextFieldInteraction(): void,
    activateFocus(): void,
    deactivateFocus(): void,
    handleValidationAttributeChange(attributesList?: string[]): void
  } = new MDCTextFieldFoundation(this._createAdapter());

  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() private _parentFormField: MdcFormField,
    @Optional() private _ripple: MdcRipple,
    @Self() @Optional() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective) {

    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);

    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    // Force setter to be called in case id was not specified.
    this.id = this.id;
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this._destroy();
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
    this._foundation = new MDCTextFieldFoundation(this._createAdapter(), this._getFoundationMap());

    this._initRipple();
    this._foundation.init();
    this._checkCustomValidity();

    this._initialized = true;
  }

  onTextFieldInteraction(): void {
    if (this._initialized) {
      this._foundation.handleTextFieldInteraction();
    }
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

  onInput(value: any): void {
    this.setValue(value, true);
  }

  onFocus(): void {
    if (this._initialized) {
      this._foundation.activateFocus();
    }
  }

  onChange(evt: Event): void {
    this.setValue((<any>evt.target).value);
    evt.stopPropagation();
  }

  onBlur(): void {
    this._onTouched();
    this._foundation.deactivateFocus();
    this.blur.emit(this.value);
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

  private _initializeValue(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      this.setValue(this.ngControl ? this.ngControl.value : this._value);
    });
  }

  setValue(value: any, isUserInput?: boolean): void {
    const newValue = this.type === 'number' ? toNumber(value, null) : value;
    if (this._value === newValue) {
      // Reset validity for numeric form inputs
      if (newValue === null) {
        this.valid = true;
      }
      return;
    }

    this._value = newValue ? newValue : null;
    if (this._getInputElement().value !== this._value) {
      this._getInputElement().value = this._value;
    }

    this._foundation.setValue(this._value);

    if (isUserInput) {
      // Call _onChange before emitting change event
      this._onChange(this._value);
      this.change.emit(this._value);
    }

    // need to run valiation attribute check if input reset
    this._changeDetectorRef.markForCheck();
  }

  isBadInput(): boolean {
    const validity = this._getInputElement().validity;
    return validity && validity.badInput;
  }

  focus(): void {
    if (!this.disabled) {
      this._getInputElement().focus();
    }
  }

  /** Initializes Text Field's internal state based on the environment state */
  private layout(): void {
    this._destroy();
    this.init();
    this._changeDetectorRef.markForCheck();

    setTimeout(() => {
      if (this._outlined) {
        this._foundation.notchOutline(this._foundation.shouldFloat);
      }
      if (this._hasFloatingLabel()) {
        this._getFloatingLabel().float(this._foundation.shouldFloat);
      }
    });
  }

  /** Implemented as part of ControlValueAccessor. */
  setDisabledState(isDisabled: boolean) {
    const newValue = toBoolean(isDisabled);

    if (newValue !== this._disabled) {
      this._disabled = newValue;
      this._foundation.setDisabled(this._disabled);
    }
    this._changeDetectorRef.markForCheck();
  }

  private _checkCustomValidity(): void {
    Promise.resolve().then(() => {
      if (this._valid !== undefined) {
        this._foundation.setValid(this._valid);
      }
    });
  }

  private _initHelperText(): void {
    const helper = this.helperText;
    if (helper) {
      helper.addHelperTextClass(this.controlType);
      helper.initFoundation(MDCTextFieldHelperTextFoundation);
    }
  }

  private _initRipple(): void {
    if (!this._ripple || this._ripple.initialized) { return; }

    if (!this.fullwidth && !this.outlined && !this.textarea) {
      this._ripple.init({
        surface: this.elementRef.nativeElement,
        activator: this._getInputElement()
      });
    } else {
      this._ripple.destroy();
    }
  }

  private _destroy(): void {
    if (this._lineRipple) {
      this._lineRipple.destroy();
    }
    if (this._ripple) {
      this._ripple.destroy();
    }
    this._foundation.destroy();
  }

  private _hasErrorState(): boolean {
    if (this.ngControl) {
      return !this.errorState;
    }

    return this._valid ? this._valid : this._platform.isBrowser ?
      this._input.nativeElement.validity.valid : true;
  }

  private _hasFloatingLabel(): boolean {
    return this.label && (this._floatingLabel || this._notchedOutline) ? true : false;
  }

  private _getFloatingLabel(): MdcFloatingLabel {
    return this._floatingLabel || this._notchedOutline.floatingLabel;
  }

  private _getInputElement(): HTMLInputElement | HTMLTextAreaElement {
    return this._input.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
