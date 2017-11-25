import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { isBrowser } from '../common';
import { EventRegistry } from '../common/event-registry';

import { MdcIcon } from '../icon/icon';

import { MDCTextFieldAdapter } from './adapter';
import { MdcTextFieldInput } from './text-field-input';
import { MDCTextFieldFoundation } from '@material/textfield';

export const MD_TEXTFIELD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcTextField),
  multi: true
};

// Invalid input type. Using one of these will throw an error.
const MD_INPUT_INVALID_TYPES = [
  'button',
  'checkbox',
  'color',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit'
];

let nextUniqueId = 0;

@Directive({
  selector: '[mdc-text-field-helper-text]'
})
export class MdcTextFieldHelperText {
  @Input() id: string;
  @Input() persistent: boolean = false;
  @Input() validation: boolean = false;
  @HostBinding('class.mdc-text-field-helptext') isHostClass = true;
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';
  @HostBinding('class.mdc-text-field-helptext--persistent') get classPersistent(): string {
    return this.persistent ? 'mdc-text-field-helptext--persistent' : '';
  }
  @HostBinding('class.mdc-text-field-helptext--validation-msg') get classValidation(): string {
    return this.validation ? 'mdc-text-field-helptext--validation-msg' : '';
  }

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-text-field-label], mdc-text-field-label'
})
export class MdcTextFieldLabel {
  @HostBinding('class.mdc-text-field__label') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-text-field-bottom-line], mdc-text-field-bottom-line'
})
export class MdcTextFieldBottomLine {
  @HostBinding('class.mdc-text-field__bottom-line') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-icon[leading]'
})
export class MdcTextFieldLeadingIcon {
  @Input() tabIndex: number = 0;
  @HostBinding('class.mdc-text-field__icon') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-icon[trailing]'
})
export class MdcTextFieldTrailingIcon {
  @Input() tabIndex: number = 0;
  @HostBinding('class.mdc-text-field__icon') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: 'mdc-text-field',
  template: `
  <input mdc-text-field-input
    [type]="type"
    [id]="id"
    [tabindex]="tabIndex"
    [disabled]="disabled"
    [placeholder]="placeholder"
    [attr.maxlength]="maxlength"
    [required]="required"
    (blur)="onBlur()"
    (input)="onInput($event)"
    (focus)="onFocus()" />
    <mdc-text-field-label [attr.for]="id" *ngIf="!placeholder">{{label}}</mdc-text-field-label>
    <mdc-text-field-bottom-line></mdc-text-field-bottom-line>
  `,
  providers: [
    MD_TEXTFIELD_CONTROL_VALUE_ACCESSOR,
    EventRegistry,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcTextField implements AfterViewInit, OnDestroy, ControlValueAccessor {
  private _mdcAdapter: MDCTextFieldAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRoot.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRoot.nativeElement, className);
    },
    addClassToLabel: (className: string) => {
      if (this.isTextarea()) { return; }

      if (this.inputLabel && this.label) {
        this._renderer.addClass(this.inputLabel.elementRef.nativeElement, className);
      }
    },
    removeClassFromLabel: (className: string) => {
      if (this.isTextarea()) { return; }

      if (this.inputLabel && this.label) {
        this._renderer.removeClass(this.inputLabel.elementRef.nativeElement, className);
      }
    },
    setIconAttr: (name: string, value: string) => {
      if (this.inputIcon) {
        this._renderer.setAttribute(this.inputIcon.elementRef.nativeElement, name, value);
      }
    },
    eventTargetHasClass: (target: HTMLElement, className: string) => {
      return target.classList.contains(className);
    },
    registerTextFieldInteractionHandler: (evtType: string, handler: EventListener) => {
      this._registry.listen(evtType, handler, this.elementRoot.nativeElement);
    },
    deregisterTextFieldInteractionHandler: (evtType: string, handler: EventListener) => {
      this._registry.unlisten(evtType, handler);
    },
    notifyIconAction: () => {
      this.iconAction.emit({
        source: this
      });
    },
    addClassToBottomLine: (className: string) => {
      if (this.bottomLine) {
        this._renderer.addClass(this.bottomLine.elementRef.nativeElement, className);
      }
    },
    removeClassFromBottomLine: (className: string) => {
      if (this.bottomLine) {
        this._renderer.removeClass(this.bottomLine.elementRef.nativeElement, className);
      }
    },
    addClassToHelptext: (className: string) => {
      if (this.inputHelpText) {
        this._renderer.addClass(this.inputHelpText.elementRef.nativeElement, className);
      }
    },
    removeClassFromHelptext: (className: string) => {
      if (this.inputHelpText) {
        this._renderer.removeClass(this.inputHelpText.elementRef.nativeElement, className);
      }
    },
    helptextHasClass: (className: string) => {
      return this.inputHelpText ? this.inputHelpText.elementRef.nativeElement.classList.contains(className) : false;
    },
    registerInputInteractionHandler: (evtType: string, handler: EventListener) => {
      this._registry.listen(evtType, handler, this.inputText.elementRef.nativeElement);
    },
    deregisterInputInteractionHandler: (evtType: string, handler: EventListener) => {
      this._registry.unlisten(evtType, handler);
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this.bottomLine) {
        this._registry.listen('transitionend', handler, this.bottomLine.elementRef.nativeElement);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      this._registry.unlisten('transitionend', handler);
    },
    setBottomLineAttr: (attr: string, value: string) => {
      if (this.bottomLine) {
        this._renderer.setAttribute(this.bottomLine.elementRef.nativeElement, attr, value);
      }
    },
    setHelptextAttr: (name: string, value: string) => {
      if (this.inputHelpText) {
        this._renderer.setAttribute(this.inputHelpText.elementRef.nativeElement, name, value);
      }
    },
    removeHelptextAttr: (name: string) => {
      if (this.inputHelpText) {
        this._renderer.removeAttribute(this.inputHelpText.elementRef.nativeElement, name);
      }
    },
    getNativeInput: () => {
      return {
        checkValidity: () => this.inputText.elementRef.nativeElement.validity.valid,
        value: this.value,
        disabled: this.disabled,
        badInput: this.isBadInput(),
      };
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    isDisabled: Function,
    setDisabled: Function,
    setValid: Function,
  } = new MDCTextFieldFoundation(this._mdcAdapter);

  @Input() id: string = `mdc-input-${nextUniqueId++}`;
  @Input() fullwidth: boolean = false;
  @Input() dense: boolean = false;
  @Input() label: string;
  @Input() maxlength: number;
  @Input() placeholder: string = '';
  @Input() tabIndex: number = 0;
  @Output() iconAction = new EventEmitter<any>();
  @HostBinding('class.mdc-text-field') isHostClass = true;
  @ViewChild(MdcTextFieldInput) inputText: MdcTextFieldInput;
  @ViewChild(MdcTextFieldLabel) inputLabel: MdcTextFieldLabel;
  @ViewChild(MdcTextFieldHelperText) inputHelpText: MdcTextFieldHelperText;
  @ViewChild(MdcTextFieldBottomLine) bottomLine: MdcTextFieldBottomLine;
  @ContentChild(MdcIcon) inputIcon: MdcIcon;

  private _type = 'text';
  private _disabled: boolean = false;
  private _required: boolean = false;
  private _controlValueAccessorChangeFn: (value: any) => void = () => { };
  onTouched: () => any = () => { };

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = value != null && `${value}` !== 'false';
    this._foundation.setDisabled(value);
  }
  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = value != null && `${value}` !== 'false';
  }
  @Input()
  get type(): string { return this._type; }
  set type(value: string) {
    this._type = value || 'text';
    this._validateType();

    if (!this.isTextarea()) {
      this._renderer.setProperty(this.inputText.elementRef.nativeElement, 'type', this._type);
    }
  }
  @Input()
  get value(): string { return this.inputText.elementRef.nativeElement.value; }
  set value(value: string) {
    if (value !== this.value) {
      this.inputText.elementRef.nativeElement.value = value;
    }
  }
  get valid(): boolean {
    return (this.inputText.elementRef.nativeElement as HTMLInputElement).validity.valid;
  }
  @HostBinding('class.mdc-text-field--dense') get classDense(): string {
    return this.dense ? 'mdc-text-field--dense' : '';
  }
  @HostBinding('class.mdc-text-field--fullwidth') get classFullwidth(): string {
    this.placeholder = this.fullwidth ? this.label : '';
    return this.fullwidth ? 'mdc-text-field--fullwidth' : '';
  }

  constructor(
    private _renderer: Renderer2,
    public elementRoot: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._foundation.init();
    this.updateIconState();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  writeValue(value: string): void {
    this.value = value == null ? '' : value;
    if (this.value.length > 0) {
      this._mdcAdapter.addClassToLabel('mdc-text-field__label--float-above');
    } else {
      this._mdcAdapter.removeClassFromLabel('mdc-text-field__label--float-above');
    }
  }

  registerOnChange(fn: (value: any) => any): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }

  onFocus(): void {
    this.inputText.focused = true;
  }

  onInput(evt: Event): void {
    this._controlValueAccessorChangeFn = (<any>evt.target).value;
  }

  onBlur(): void {
    this.inputText.focused = false;
    this.onTouched();
  }

  isDisabled(): boolean {
    return this._foundation.isDisabled();
  }

  isBadInput(): boolean {
    return (this.inputText.elementRef.nativeElement as HTMLInputElement).validity.badInput;
  }

  focus(): void {
    this.inputText.focus();
  }

  setValid(value?: boolean): void {
    this._foundation.setValid(value ? value : this.valid);
  }

  hasLeadingIcon(): boolean {
    return this.inputIcon ? this.inputIcon.elementRef.nativeElement.hasAttribute('leading') : false;
  }

  hasTrailingIcon(): boolean {
    return this.inputIcon ? this.inputIcon.elementRef.nativeElement.hasAttribute('trailing') : false;
  }

  updateIconState(): void {
    if (this.hasLeadingIcon()) {
      this._mdcAdapter.addClass('mdc-text-field--with-leading-icon');
    } else if (this.hasTrailingIcon()) {
      this._mdcAdapter.addClass('mdc-text-field--with-trailing-icon');
    }
  }

  isTextarea(): boolean {
    const nativeElement = this.elementRoot.nativeElement;
    const nodeName = isBrowser ? nativeElement.nodeName : nativeElement.name;
    return nodeName ? nodeName.toLowerCase() === 'textarea' : false;
  }

  selectAll(): void {
    this.inputText.elementRef.nativeElement.select();
  }

  private _validateType() {
    if (MD_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
      throw Error(`Input type "${this._type}" is not supported.`);
    }
  }
}
