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
  NgZone,
  OnDestroy,
  Optional,
  Output,
  Self,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

import {
  Platform,
  toBoolean,
  toNumber
} from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcFloatingLabel } from '@angular-mdc/web/floating-label';
import { MdcLineRipple } from '@angular-mdc/web/line-ripple';
import { MdcNotchedOutline } from '@angular-mdc/web/notched-outline';
import { MdcFormField, MdcFormFieldControl } from '@angular-mdc/web/form-field';

import { MdcTextFieldIcon } from './text-field-icon';
import { MdcTextFieldHelperText } from './helper-text';

import { MDCTextFieldFoundation } from '@material/textfield/index';

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
    [formControl]="inputFormControl"
    [tabindex]="tabIndex"
    [attr.autocomplete]="autocomplete"
    [attr.pattern]="pattern"
    [attr.placeholder]="placeholder"
    [attr.maxlength]="maxlength"
    [attr.minlength]="minlength"
    [attr.max]="max"
    [attr.min]="min"
    [attr.size]="size"
    [attr.step]="step"
    [required]="required"
    (mousedown)="onInputInteraction($event)"
    (touchstart)="onInputInteraction($event)"
    (focus)="onFocus()"
    (change)="onChange($event)"
    (blur)="onBlur()" />
    <ng-content></ng-content>
    <label mdcFloatingLabel [for]="id" *ngIf="!this.placeholder">{{label}}</label>
    <mdc-line-ripple *ngIf="useLineRipple"></mdc-line-ripple>
    <mdc-notched-outline *ngIf="outlined"></mdc-notched-outline>
  `,
  providers: [
    MdcRipple,
    { provide: MdcFormFieldControl, useExisting: MdcTextField },
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcTextField implements AfterContentInit, OnDestroy, ControlValueAccessor {
  private _uid = `mdc-input-${nextUniqueId++}`;
  private _initialized: boolean = false;

  readonly stateChanges: Subject<void> = new Subject<void>();

  @Input() label: string;
  @Input() maxlength: number;
  @Input() minlength: number;
  @Input() pattern: string;
  @Input() autocomplete: string;
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
    const newValue = toBoolean(value);

    if (newValue !== this._outlined) {
      this._outlined = toBoolean(newValue);
      this._reinitialize();
      this.layout();
    }
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
    this._handleValidationAttributeChange();
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
    this.layout();
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
    this._foundation.setUseNativeValidation(this._useNativeValidation);
  }
  private _useNativeValidation: boolean = true;

  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    this.setValue(newValue);
  }
  private _value: any = null;

  /** Sets the Text Field valid or invalid. */
  @Input()
  get valid(): boolean { return this._valid; }
  set valid(value: boolean) {
    this._valid = toBoolean(value);
    this._foundation.setValid(this._valid);
  }
  private _valid: boolean;

  @Output() readonly change = new EventEmitter<any>();
  @Output() readonly blur = new EventEmitter<any>();

  inputFormControl = new FormControl();

  @ViewChild('input') _input: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  @ViewChild(MdcFloatingLabel) _floatingLabel: MdcFloatingLabel;
  @ViewChild(MdcLineRipple) _lineRipple: MdcLineRipple;
  @ViewChild(MdcNotchedOutline) _notchedOutline: MdcNotchedOutline;
  @ContentChildren(MdcTextFieldIcon, { descendants: true }) _icons: QueryList<MdcTextFieldIcon>;

  /** Determines if the component host is a textarea. */
  get textarea(): boolean { return this._getHostElement().nodeName.toLowerCase() === 'mdc-textarea'; }

  get focused(): boolean { return this._platform.isBrowser ? document.activeElement! === this._getInputElement() : false; }

  get leadingIcon(): MdcTextFieldIcon | undefined { return this._icons.find(icon => icon.leading); }

  get trailingIcon(): MdcTextFieldIcon | undefined { return this._icons.find(icon => icon.trailing); }

  get useLineRipple(): boolean { return !this._outlined && !this.textarea; }

  private _createAdapter() {
    return Object.assign({
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      isFocused: () => this._platform.isBrowser ? document.activeElement! === this._getInputElement() : false,
      isRtl: () =>
        this._platform.isBrowser ? window.getComputedStyle(this._getHostElement()).getPropertyValue('direction') === 'rtl' : false
    },
      this._getInputAdapterMethods(),
      this._getLabelAdapterMethods(),
      this._getLineRippleAdapterMethods(),
      this._getOutlineAdapterMethods()
    );
  }

  private _getInputAdapterMethods() {
    return {
      getNativeInput: () => this._input.nativeElement
    };
  }

  private _getLabelAdapterMethods() {
    return {
      shakeLabel: (shouldShake: boolean) => this._floatingLabel.shake(shouldShake),
      floatLabel: (shouldFloat: boolean) => this._floatingLabel.float(shouldFloat),
      hasLabel: () => this._floatingLabel,
      getLabelWidth: () => this._floatingLabel ? this._floatingLabel.getWidth() : 0
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
      notchOutline: (labelWidth: number, isRtl: boolean) => this._notchedOutline.notch(labelWidth, isRtl),
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
    getValue(): any,
    isValid(): boolean,
    readonly shouldFloat: boolean,
    notchOutline(openNotch: boolean): void,
    setUseNativeValidation(useNativeValidation: boolean): void,
    setTransformOrigin(evt: Event): void,
    handleTextFieldInteraction(): void,
    activateFocus(): void,
    deactivateFocus(): void,
    handleValidationAttributeChange(attributesList?: string[]): void,
    autoCompleteFocus(): void
  } = new MDCTextFieldFoundation();

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when text field has been touched */
  _onTouched = () => { };

  constructor(
    @Optional() private _parentFormField: MdcFormField,
    @Self() @Optional() public ngControl: NgControl,
    private _ngZone: NgZone,
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>,
    @Optional() private _ripple: MdcRipple) {

    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    // Force setter to be called in case id was not specified.
    this.id = this.id;
  }

  ngAfterContentInit(): void {
    this.init();

    if (this.ngControl) {
      this.ngControl.valueChanges!.subscribe(value => {
        this.setValue(value);
      });

      this.ngControl.statusChanges!.subscribe(() => {
        if (this.ngControl.invalid && this.ngControl.touched) {
          this._foundation.autoCompleteFocus();
          this._foundation.setValid(false);
        } else {
          this._foundation.deactivateFocus();
          this._foundation.setValid(true);
        }
      });
    }

    this.inputFormControl.valueChanges.subscribe(value => {
      this.setValue(value);
    });
    this.inputFormControl.statusChanges.subscribe(() => {
      this._handleValidationAttributeChange();
    });
  }

  ngOnDestroy(): void {
    this._destroyTextField();
  }

  init(): void {
    this._foundation = new MDCTextFieldFoundation(this._createAdapter(), this._getFoundationMap());

    this._initRipple();
    this._foundation.init();
    this._initialized = true;

    this._changeDetectorRef.markForCheck();
  }

  onTextFieldInteraction(): void {
    if (this._initialized) {
      this._foundation.handleTextFieldInteraction();
    }
  }

  onInputInteraction(evt: MouseEvent | TouchEvent): void {
    this._foundation.setTransformOrigin(evt);
  }

  onFocus(): void {
    if (this._initialized) {
      this._foundation.activateFocus();
    }
  }

  onChange(evt: Event): void {
    const value = (<any>evt.target).value;
    this.change.emit(value);

    this._onChange(value);
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

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
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

  setValue(value: any): void {
    const newValue = this.type === 'number' ? toNumber(value, null) : value;
    if (this._value === newValue) { return; }

    this._value = newValue ? newValue : null;
    this._foundation.setValue(this._value);
    this.inputFormControl.setValue(this.value);

    this._changeDetectorRef.markForCheck();
  }

  /** Implemented as part of ControlValueAccessor. */
  setDisabledState(isDisabled: boolean) {
    const newValue = toBoolean(isDisabled);

    if (newValue !== this._disabled) {
      this._disabled = toBoolean(isDisabled);
      this._foundation.setDisabled(this._disabled);
    }
    this._changeDetectorRef.markForCheck();
  }

  /** Recomputes the outline SVG path for the outline element. */
  layout(): void {
    Promise.resolve().then(() => {
      setTimeout(() => {
        if (this._notchedOutline) {
          this._foundation.notchOutline(this._foundation.shouldFloat);
        }

        if (this._floatingLabel) {
          this._floatingLabel.float(this._foundation.shouldFloat);
        }
      }, 5);
    });
  }

  private _handleValidationAttributeChange(): void {
    this._foundation.handleValidationAttributeChange(this._getInputElement().getAttributeNames());
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

  private _destroyTextField(): void {
    if (this._lineRipple) {
      this._lineRipple.destroy();
    }
    if (this._ripple) {
      this._ripple.destroy();
    }
    this._foundation.destroy();
  }

  private _reinitialize(): void {
    if (this._initialized) {
      this._destroyTextField();
      this.init();
    }
  }

  private _getInputElement(): HTMLInputElement | HTMLTextAreaElement {
    return this._input.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
