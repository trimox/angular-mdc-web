import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
  toBoolean,
  isBrowser,
  toNumber
} from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcFloatingLabel } from '@angular-mdc/web/floating-label';
import { MdcLineRipple } from '@angular-mdc/web/line-ripple';
import { MdcNotchedOutline } from '@angular-mdc/web/notched-outline';
import { MdcIcon } from '@angular-mdc/web/icon';

import { MdcTextFieldHelperText } from './helper-text';

import { MDCTextFieldIconAdapter } from '@material/textfield/icon/adapter';
import { MDCTextFieldIconFoundation } from '@material/textfield/icon';

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
  template: `
  <ng-content select="mdc-icon[leading]"></ng-content>
  <input #input class="mdc-text-field__input"
    [id]="id"
    [type]="type"
    [tabindex]="tabIndex"
    [disabled]="disabled"
    [attr.placeholder]="placeholder"
    [attr.maxlength]="maxlength"
    [required]="required"
    (focus)="onFocus()"
    (blur)="onBlur()"
    (input)="onInput($event.target.value)" />
    <ng-content></ng-content>
    <label mdcFloatingLabel [attr.for]="id" *ngIf="!placeholder">{{label}}</label>
    <mdc-line-ripple *ngIf="!outline"></mdc-line-ripple>
    <mdc-notched-outline *ngIf="outline"></mdc-notched-outline>
  `,
  providers: [
    MDC_TEXTFIELD_CONTROL_VALUE_ACCESSOR,
    MdcRipple
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcTextField implements AfterContentInit, OnDestroy, ControlValueAccessor {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _uid = `mdc-input-${nextUniqueId++}`;

  private _useCustomValidity: boolean;

  @Input() label: string;
  @Input() maxlength: number;
  @Input() placeholder: string;
  @Input() tabIndex: number = 0;
  @Input() direction: 'ltr' | 'rtl' = 'ltr';

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
    this.setDisabled(value);
  }
  private _disabled: boolean;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this.setRequired(value);
  }
  private _required: boolean;

  @Input()
  get focused(): boolean { return this._focused; }
  set focused(value: boolean) {
    this._focused = toBoolean(value);
  }
  private _focused: boolean;

  @Input()
  get fullwidth(): boolean { return this._fullwidth; }
  set fullwidth(value: boolean) {
    this.setFullwidth(value);
  }
  private _fullwidth: boolean;

  @Input()
  get dense(): boolean { return this._dense; }
  set dense(value: boolean) {
    this.setDense(value);
  }
  private _dense: boolean;

  @Input()
  get helperText(): MdcTextFieldHelperText { return this._helperText; }
  set helperText(helperText: MdcTextFieldHelperText) {
    this.setHelperText(helperText);
  }
  private _helperText: MdcTextFieldHelperText;

  /** The input element's value. */
  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    if (this._value !== newValue) {
      this.setValue(newValue);
    }
  }
  private _value: string;

  get valid(): boolean {
    return this._useCustomValidity ? this._foundation.isValid() :
      (this._getInputElement() as HTMLInputElement).validity.valid;
  }

  /** Whether the control is empty. */
  get empty(): boolean {
    return !this._getInputElement().value && !this.isBadInput();
  }

  @Output() iconAction = new EventEmitter<boolean>();
  @Output() change = new EventEmitter<string>();
  @Output() blur = new EventEmitter<string>();

  @HostBinding('class.mdc-text-field') isHostClass = true;
  @HostBinding('class.mdc-text-field--dense') get classDense(): string {
    return this.dense ? 'mdc-text-field--dense' : '';
  }
  @HostBinding('class.mdc-text-field--fullwidth') get classFullwidth(): string {
    return this.fullwidth ? 'mdc-text-field--fullwidth' : '';
  }
  @HostBinding('class.mdc-text-field--focused') get classFocused(): string {
    return this._focused ? 'mdc-text-field--focused' : '';
  }
  @HostBinding('class.mdc-text-field--outlined') get classOutlined(): string {
    return this.outlined ? 'mdc-text-field--outlined' : '';
  }

  @ViewChild('input') _input: ElementRef;
  @ViewChild(MdcFloatingLabel) _floatingLabel: MdcFloatingLabel;
  @ViewChild(MdcLineRipple) _lineRipple: MdcLineRipple;
  @ViewChild(MdcNotchedOutline) _notchedOutline: MdcNotchedOutline;
  @ContentChildren(MdcIcon) _icons: QueryList<MdcIcon>;

  private _mdcAdapter: MDCTextFieldAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    registerTextFieldInteractionHandler: (evtType: string, handler: EventListener) =>
      this._getHostElement().addEventListener(evtType, handler),
    deregisterTextFieldInteractionHandler: (evtType: string, handler: EventListener) =>
      this._getHostElement().removeEventListener(evtType, handler),
    registerInputInteractionHandler: (evtType: string, handler: EventListener) =>
      this._getInputElement().addEventListener(evtType, handler),
    deregisterInputInteractionHandler: (evtType: string, handler: EventListener) =>
      this._getInputElement().removeEventListener(evtType, handler),
    isFocused: () => this._focused,
    isRtl: () => this.direction === 'rtl',
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
    hasLabel: () => !!this._floatingLabel,
    getLabelWidth: () => this._floatingLabel.getWidth(),
    hasOutline: () => !!this._notchedOutline,
    notchOutline: (labelWidth: number, isRtl: boolean) => this._notchedOutline.notch(labelWidth, isRtl),
    closeOutline: () => this._notchedOutline.closeNotch(),
    registerValidationAttributeChangeHandler: (handler: (whitelist: Array<string>) => void) => {
      const getAttributesList = (mutationsList) => mutationsList.map((mutation) => mutation.attributeName);
      const observer = new MutationObserver((mutationsList) => handler(getAttributesList(mutationsList)));
      return observer.observe(this._getInputElement(), { attributes: true });
    },
    deregisterValidationAttributeChangeHandler: (observer: MutationObserver) => {
      if (observer) {
        observer.disconnect();
      }
    },
    getNativeInput: () => this._getInputElement()
  };

  /** Returns a map of all subcomponents to subfoundations. */
  private _getFoundationMap() {
    return {
      helperText: this._helperText ? this.helperText.foundation : undefined,
      icon: this._hasIcons() ? this._icons.first.foundation : undefined
    };
  }

  private _mdcIconAdapter: MDCTextFieldIconAdapter = {
    getAttr: (attr: string) => this._icons.first.elementRef.nativeElement.getAttribute(attr),
    setAttr: (attr: string, value: string) => this._icons.first.elementRef.nativeElement.setAttribute(attr, value),
    removeAttr: (attr: string) => this._icons.first.elementRef.nativeElement.removeAttribute(attr),
    setContent: (content: string) => this._icons.first.elementRef.nativeElement.textContent = content,
    registerInteractionHandler: (evtType: string, handler: EventListener) =>
      this._icons.first.elementRef.nativeElement.addEventListener(evtType, handler),
    deregisterInteractionHandler: (evtType: string, handler: EventListener) =>
      this._icons.first.elementRef.nativeElement.removeEventListener(evtType, handler),
    notifyIconAction: () => this.iconAction.emit(true)
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    isDisabled(): boolean,
    setDisabled(disabled: boolean): void,
    setValid(isValid: boolean): void,
    setValue(value: any): void,
    activateFocus(): void,
    deactivateFocus(): void,
    isValid(): boolean,
    setHelperTextContent(content: string): void,
    notchOutline(openNotch: boolean): void,
    getValue(): any,
    setIconAriaLabel(label: string): void,
    setIconContent(content: string): void
  } = new MDCTextFieldFoundation(this._mdcAdapter);

  private _iconFoundation: {
    init(): void,
    destroy(): void,
    setDisabled(disabled: boolean): void,
    handleInteraction(evt: any): void,
    setContent(content: string): void,
    setAriaLabel(label: string): void
  };

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when text field has been touched */
  _onTouched = () => { };

  constructor(
    protected _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    protected _ripple: MdcRipple) {

    // Force setter to be called in case id was not specified.
    this.id = this.id;
  }

  ngAfterContentInit(): void {
    this._foundation = new MDCTextFieldFoundation(this._mdcAdapter, this._getFoundationMap());
    this._foundation.init();

    this._icons.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      Promise.resolve().then(() => {
        this._icons.forEach(icon => {
          icon.elementRef.nativeElement.classList.add('mdc-text-field__icon');
          if (icon.leading || icon.trailing) {
            this._iconFoundation = new MDCTextFieldIconFoundation(this._mdcIconAdapter);
            icon.foundation = this._iconFoundation;
          }
        });

        this.updateIconState();
      });
    });
  }

  ngOnDestroy(): void {
    if (this._hasIcons()) {
      this._icons.forEach(icon => {
        icon.foundation.destroy();
      });
    }

    this._destroy.next();
    this._destroy.complete();

    this._ripple.destroy();
    this._foundation.destroy();
  }

  writeValue(value: any): void {
    this.setValue(value == null ? '' : value, false);
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  onInput(value: any): void {
    this.setValue(value);
  }

  onFocus(): void {
    this._focused = true;
  }

  onBlur(): void {
    this._focused = false;
    this._onTouched();
    this.blur.emit(this.value);

    this._changeDetectorRef.markForCheck();
  }

  setValue(value: any, isUserInput: boolean = true): void {
    this._value = this.type === 'number' ?
      (value === '' ? null : toNumber(value)) : value;

    setTimeout(() => {
      this._foundation.setValue(this._value);

      if (isUserInput) {
        this._onChange(this._value);
      }

      if (this.required && !this._value) {
        this.setRequired(false);
        setTimeout(() => this.setRequired(true));
      }
    }, 0);

    this._changeDetectorRef.markForCheck();
  }

  isDisabled(): boolean {
    return this._foundation.isDisabled();
  }

  isBadInput(): boolean {
    const validity = this._getInputElement().validity;
    return validity && validity.badInput;
  }

  focus(): void {
    if (!this.disabled) {
      this._focused = true;
      this._getInputElement().focus();
    }
  }

  setValid(isValid: boolean): void {
    this._useCustomValidity = true;
    this._foundation.setValid(isValid);
  }

  /** Determines if the component host is a textarea. */
  isTextarea(): boolean {
    return this._getHostElement().nodeName.toLowerCase() === 'mdc-textarea';
  }

  /** Sets the text-field required or not. */
  setRequired(required: boolean): void {
    this._required = toBoolean(required);
    this._changeDetectorRef.markForCheck();
  }

  /** Styles the text field as an outlined text field. */
  setOutlined(outline: boolean): void {
    this._outlined = toBoolean(outline);

    if (this.outlined && this.value) {
      setTimeout(() => {
        this._foundation.notchOutline(this.value);
      });
    }

    this._changeDetectorRef.markForCheck();
  }

  /** Styles the text field as a fullwidth text field. */
  setFullwidth(fullwidth: boolean): void {
    this._fullwidth = toBoolean(fullwidth);
    this.placeholder = this.fullwidth ? this.label : '';

    this._changeDetectorRef.markForCheck();
  }

  setDense(dense: boolean): void {
    this._dense = toBoolean(dense);
    this._changeDetectorRef.markForCheck();
  }

  setDisabled(disabled: boolean): void {
    this.setDisabledState(disabled);
  }

  setHelperText(helperText: MdcTextFieldHelperText): void {
    this._helperText = helperText;
    this._changeDetectorRef.markForCheck();
  }

  /** True if the Text Field is required. */
  isRequired(): boolean {
    return this.required;
  }

  selectAll(): void {
    (this._getInputElement() as HTMLInputElement).select();
  }

  /** The value of the input Element. */
  getValue(): string {
    return this._foundation.getValue();
  }

  /** Deactives the Text Field's focus state. */
  deactivateFocus(): void {
    this._foundation.deactivateFocus();
  }

  /** Activates the text field focus state. */
  activateFocus(): void {
    this._foundation.activateFocus();
  }

  /** Sets the content of the helper text. */
  setHelperTextContent(content: string): void {
    this._foundation.setHelperTextContent(content);
  }

  setIconAriaLabel(label: string): void {
    this._iconFoundation.setAriaLabel(label);
  }

  setIconContent(content: string): void {
    this._iconFoundation.setContent(content);
  }

  updateIconState(): void {
    if (this.getLeadingIcon()) {
      this._getHostElement().classList.add('mdc-text-field--with-leading-icon');
    } else if (this.getTrailingIcon()) {
      this._getHostElement().classList.add('mdc-text-field--with-trailing-icon');
    }
  }

  getLeadingIcon(): MdcIcon | undefined {
    return this._icons.find((_: MdcIcon) => _.leading);
  }

  getTrailingIcon(): MdcIcon | undefined {
    return this._icons.find((_: MdcIcon) => _.trailing);
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled: boolean) {
    this._disabled = toBoolean(isDisabled);

    setTimeout(() => this._foundation.setDisabled(this.disabled));

    if (this.focused) {
      this.focused = false;
    }
    if (this._hasIcons()) {
      // Reset the clickable state of mdc-icon
      this._icons.first.clickable = this._icons.first.clickable;
    }

    this._changeDetectorRef.markForCheck();
  }

  private _hasIcons(): boolean {
    return this._icons && this._icons.length > 0;
  }

  private _getInputElement(): HTMLInputElement {
    return this._input.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
