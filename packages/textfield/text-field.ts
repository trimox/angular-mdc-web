import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import {
  Platform,
  toBoolean,
  toNumber
} from '@angular-mdc/web/common';
import { MdcRipple, MATCHES } from '@angular-mdc/web/ripple';
import { MdcFloatingLabel } from '@angular-mdc/web/floating-label';
import { MdcLineRipple } from '@angular-mdc/web/line-ripple';
import { MdcNotchedOutline } from '@angular-mdc/web/notched-outline';

import { MdcTextFieldIcon } from './text-field-icon';
import { MdcTextFieldHelperText } from './helper-text';

import { MDCTextFieldAdapter } from '@material/textfield/adapter';
import { MDCTextFieldFoundation } from '@material/textfield';

export const MDC_TEXTFIELD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcTextField),
  multi: true
};

let nextUniqueId = 0;

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
    '(click)': 'onTextFieldInteraction()',
    '(keydown)': 'onTextFieldInteraction()'
  },
  template: `
  <ng-content *ngIf="leadingIcon"></ng-content>
  <input #input class="mdc-text-field__input"
    [id]="id"
    [type]="type"
    [tabindex]="tabIndex"
    [disabled]="disabled"
    [attr.pattern]="pattern ? pattern : null"
    [attr.placeholder]="placeholder"
    [attr.maxlength]="maxlength"
    [attr.minlength]="minlength"
    [attr.max]="max"
    [attr.min]="min"
    [attr.size]="size"
    [attr.step]="step"
    [required]="required"
    [value]="value"
    (mousedown)="onInputInteraction($event)"
    (touchstart)="onInputInteraction($event)"
    (focus)="onFocus()"
    (change)="onChange($event)"
    (blur)="onBlur()"
    (input)="onInput($event.target.value)" />
    <ng-content></ng-content>
    <label mdcFloatingLabel [for]="id" *ngIf="!this.placeholder">{{label}}</label>
    <mdc-line-ripple *ngIf="useLineRipple"></mdc-line-ripple>
    <mdc-notched-outline *ngIf="outlined"></mdc-notched-outline>
  `,
  providers: [
    MDC_TEXTFIELD_CONTROL_VALUE_ACCESSOR,
    MdcRipple
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcTextField implements AfterContentInit, OnDestroy, ControlValueAccessor {
  private _uid = `mdc-input-${nextUniqueId++}`;
  private _initialized: boolean = false;

  @Input() label: string;
  @Input() maxlength: number;
  @Input() minlength: number;
  @Input() pattern: string;
  @Input() max: number;
  @Input() min: number;
  @Input() size: number;
  @Input() step: number;
  @Input() placeholder: string | null = null;
  @Input() tabIndex: number = 0;

  @Input()
  get id(): string { return this._id; }
  set id(value: string) { this._id = value || this._uid; }
  private _id: string;

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
    this.setOutlined(value);
  }
  private _outlined: boolean;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  private _disabled: boolean;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  private _required: boolean;

  @Input()
  get fullwidth(): boolean { return this._fullwidth; }
  set fullwidth(value: boolean) {
    this._fullwidth = toBoolean(value);
    this.placeholder = this.fullwidth ? this.label : '';
  }
  private _fullwidth: boolean;

  @Input()
  get dense(): boolean { return this._dense; }
  set dense(value: boolean) {
    this._dense = toBoolean(value);
  }
  private _dense: boolean;

  @Input()
  get helperText(): MdcTextFieldHelperText { return this._helperText; }
  set helperText(helperText: MdcTextFieldHelperText) {
    this._helperText = helperText;
  }
  private _helperText: MdcTextFieldHelperText;

  /** Enables or disables the use of native validation. Use this for custom validation. */
  @Input()
  get useNativeValidation(): boolean { return this._useNativeValidation; }
  set useNativeValidation(value: boolean) {
    this._useNativeValidation = toBoolean(value);
    if (this._foundation) {
      this._foundation.setUseNativeValidation(this._useNativeValidation);
    }
  }
  private _useNativeValidation: boolean = true;

  @Input()
  get value(): any { return this._input.nativeElement.value; }
  set value(newValue: any) {
    if (newValue !== this.value) {
      this.setValue(newValue);
    }
  }

  /** Sets the Text Field valid or invalid. */
  @Input()
  get valid(): boolean { return this._valid; }
  set valid(value: boolean) {
    this._valid = toBoolean(value);
    if (this._foundation) {
      this._foundation.setValid(this._valid);
    }
  }
  private _valid: boolean;

  @Output() readonly change = new EventEmitter<any>();
  @Output() readonly blur = new EventEmitter<any>();

  @ViewChild('input') _input: ElementRef<HTMLInputElement>;
  @ViewChild(MdcFloatingLabel) _floatingLabel: MdcFloatingLabel;
  @ViewChild(MdcLineRipple) _lineRipple: MdcLineRipple;
  @ViewChild(MdcNotchedOutline) _notchedOutline: MdcNotchedOutline;
  @ContentChildren(MdcTextFieldIcon, { descendants: true }) _icons: QueryList<MdcTextFieldIcon>;

  /** Determines if the component host is a textarea. */
  get textarea(): boolean { return this._getHostElement().nodeName.toLowerCase() === 'mdc-textarea'; }

  get focused(): boolean { return this._platform.isBrowser ? document.activeElement === this._getInputElement() : false; }

  get leadingIcon(): MdcTextFieldIcon | undefined { return this._icons.find(icon => icon.leading); }

  get trailingIcon(): MdcTextFieldIcon | undefined { return this._icons.find(icon => icon.trailing); }

  get useLineRipple(): boolean { return !this._outlined && !this.textarea; }

  private _mdcAdapter: MDCTextFieldAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    isFocused: () => this._platform.isBrowser ? document.activeElement === this._getInputElement() : false,
    isRtl: () =>
      this._platform.isBrowser ? window.getComputedStyle(this._getHostElement()).getPropertyValue('direction') === 'rtl' : false,
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
    },
    shakeLabel: (shouldShake: boolean) => this._floatingLabel.shake(shouldShake),
    floatLabel: (shouldFloat: boolean) => this._floatingLabel.float(shouldFloat),
    hasLabel: () => this._floatingLabel,
    getLabelWidth: () => this._floatingLabel ? this._floatingLabel.getWidth() : 0,
    hasOutline: () => this._notchedOutline,
    notchOutline: (labelWidth: number, isRtl: boolean) => this._notchedOutline.notch(labelWidth, isRtl),
    closeOutline: () => this._notchedOutline.closeNotch(),
    registerValidationAttributeChangeHandler: (handler: (whitelist: Array<string>) => void) => {
      const getAttributesList = (mutationsList) => mutationsList.map((mutation) => mutation.attributeName);
      const observer = new MutationObserver((mutationsList) => handler(getAttributesList(mutationsList)));
      observer.observe(this._getInputElement(), { attributes: true });
      return observer;
    },
    deregisterValidationAttributeChangeHandler: (observer: MutationObserver) => {
      if (observer) {
        observer.disconnect();
      }
    },
    getNativeInput: () => this._getInputElement()
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    setDisabled(disabled: boolean): void,
    setValid(isValid: boolean): void,
    setValue(value: any): void,
    isValid(): boolean,
    readonly shouldFloat: boolean,
    notchOutline(openNotch: boolean): void,
    setUseNativeValidation(useNativeValidation: boolean): void,
    setTransformOrigin(evt: Event): void,
    handleTextFieldInteraction(): void,
    activateFocus(): void,
    deactivateFocus(): void,
    autoCompleteFocus(): void
  };

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when text field has been touched */
  _onTouched = () => { };

  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>,
    @Optional() private _ripple: MdcRipple) {

    // Force setter to be called in case id was not specified.
    this.id = this.id;
  }

  ngAfterContentInit(): void {
    this.init();
    this._initializeSelection();
  }

  ngOnDestroy(): void {
    this._destroyTextField();
  }

  init(): void {
    Promise.resolve().then(() => {
      this._initFoundationVariants();

      this._foundation = new MDCTextFieldFoundation(this._mdcAdapter, {
        helperText: this._helperText ? this.helperText.helperTextFoundation : undefined,
        icon: this._icons && this._icons.length > 0 ? this._icons.first.iconTextFoundation : undefined
      });
      this._foundation.init();

      if (this._icons) {
        this._icons.forEach(icon => icon.init());
      }

      if (this._floatingLabel) {
        setTimeout(() => this._floatingLabel.float(this._foundation.shouldFloat));
      }
      this._initialized = true;
    });
  }

  private _destroyTextField(): void {
    if (this._lineRipple) {
      this._lineRipple.destroy();
    }
    if (this._ripple) {
      this._ripple.destroy();
    }
    if (this._icons) {
      this._icons.forEach(icon => icon.destroy());
    }

    this._foundation.destroy();
  }

  private _reinitialize(): void {
    if (this._initialized) {
      this._destroyTextField();
      this.init();
    }
  }

  private _initFoundationVariants(): void {
    if (!this.fullwidth && !this.textarea) {
      this._initRipple();
    }
    if (!this.textarea && !this._outlined) {
      setTimeout(() => this._lineRipple.init());
    }

    this._changeDetectorRef.markForCheck();
  }

  private _initializeSelection(): void {
    // Defer setting these values in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      if (this._valid) {
        this._foundation.setValid(this._valid);
      }
      this._foundation.setUseNativeValidation(this._useNativeValidation);
      this._foundation.setDisabled(this._disabled);
    });
  }

  onChange(evt: Event): void {
    const value = (<any>evt.target).value;

    this.change.emit(value);
    this._foundation.autoCompleteFocus();
    this._onChange(value);
    evt.stopPropagation();
  }

  onTextFieldInteraction(): void {
    if (this._initialized) {
      this._foundation.handleTextFieldInteraction();
    }
  }

  onInputInteraction(evt: MouseEvent | TouchEvent): void {
    this._foundation.setTransformOrigin(evt);
  }

  onInput(value: any): void {
    this.setValue(value);
    this._onChange(value);
  }

  onFocus(): void {
    if (this._initialized) {
      this._foundation.activateFocus();
    }
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

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  private _valueIsDefined(value: any): boolean {
    return value !== null && value !== undefined && value.toString().length !== 0;
  }

  setValue(value: any): void {
    const newValue = this.type === 'number' ? (value === '' ? null : toNumber(value, null)) : value;

    setTimeout(() => {
      this._foundation.setValue(newValue ? newValue : null);

      if (this.required && !this.value) {
        this.required = false;
        setTimeout(() => this.required = true);
      }
    });
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

  /** Styles the text field as an outlined text field. */
  setOutlined(outlined: boolean): void {
    const newValue = toBoolean(outlined);

    if (newValue !== this._outlined) {
      this._outlined = toBoolean(outlined);
      this._reinitialize();
      setTimeout(() => this._foundation.notchOutline(this._foundation.shouldFloat));
    }
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled: boolean) {
    const newValue = toBoolean(isDisabled);

    if (newValue !== this._disabled) {
      this._disabled = toBoolean(isDisabled);
      if (this._foundation) {
        this._foundation.setDisabled(this._disabled);
      }
    }
    this._changeDetectorRef.markForCheck();
  }

  private _initRipple(): void {
    if (!this._ripple.initialized && !this.outlined && !this.textarea) {
      const rippleAdapter = Object.assign(this._ripple.createAdapter({
        surface: this.elementRef.nativeElement,
        activator: this._getInputElement()
      }), { isSurfaceActive: () => this._getInputElement()[MATCHES](':active') });

      this._ripple.init({
        surface: this.elementRef.nativeElement,
        activator: this._getInputElement()
      }, rippleAdapter);
    } else {
      this._ripple.destroy();
    }
  }

  private _getInputElement(): HTMLInputElement {
    return this._input.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
