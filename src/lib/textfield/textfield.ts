import {
  AfterContentInit,
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
  Provider,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { isBrowser } from '../common';
import { EventRegistry } from '../common/event-registry';

import { MdcIcon } from '../icon/icon';

import { MDCTextfieldAdapter } from './adapter';
import { MdcTextfieldInput } from './textfield-input';
import { MDCTextfieldFoundation } from '@material/textfield';

export const MD_TEXTFIELD_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcTextfield),
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
  selector: '[mdc-textfield-helptext]'
})
export class MdcTextfieldHelptext {
  @Input() id: string;
  @Input() persistent: boolean;
  @Input() validation: boolean;
  @HostBinding('class.mdc-textfield-helptext') isHostClass = true;
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';
  @HostBinding('class.mdc-textfield-helptext--persistent') get classPersistent(): string {
    return this.persistent ? 'mdc-textfield-helptext--persistent' : '';
  }
  @HostBinding('class.mdc-textfield-helptext--validation-msg') get classValidation(): string {
    return this.validation ? 'mdc-textfield-helptext--validation-msg' : '';
  }

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-textfield-label], mdc-textfield-label'
})
export class MdcTextfieldLabel {
  @HostBinding('class.mdc-textfield__label') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-textfield-bottom-line], mdc-textfield-bottom-line'
})
export class MdcTextfieldBottomLine {
  @HostBinding('class.mdc-textfield__bottom-line') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-icon[leading]'
})
export class MdcTextfieldLeadingIcon {
  @Input() tabIndex: number = 0;
  @HostBinding('class.mdc-textfield__icon') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-icon[trailing]'
})
export class MdcTextfieldTrailingIcon {
  @Input() tabIndex: number = 0;
  @HostBinding('class.mdc-textfield__icon') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: 'mdc-textfield',
  template:
  `
  <input mdc-textfield-input
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
    <mdc-textfield-label [attr.for]="id" *ngIf="!placeholder">{{label}}</mdc-textfield-label>
    <mdc-textfield-bottom-line></mdc-textfield-bottom-line>
  `,
  providers: [
    MD_TEXTFIELD_CONTROL_VALUE_ACCESSOR,
    EventRegistry,
  ],
})
export class MdcTextfield implements AfterContentInit, OnDestroy, ControlValueAccessor {
  private _type = 'text';
  private _disabled: boolean = false;
  private _required: boolean = false;
  private controlValueAccessorChangeFn_: (value: any) => void = (value) => { };
  onChange = (_: any) => { };
  onTouched = () => { };

  @Input() id: string = `mdc-input-${nextUniqueId++}`;
  @Input() fullwidth: boolean = false;
  @Input() dense: boolean = false;
  @Input() label: string;
  @Input() maxlength: number;
  @Input() placeholder: string = '';
  @Input() tabIndex: number = 0;
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: any) {
    this._disabled = value != null && `${value}` !== 'false';
    this._foundation.setDisabled(value);
  }
  @Input()
  get required() { return this._required; }
  set required(value: any) {
    this._required = value != null && `${value}` !== 'false';
  }
  @Input()
  get type(): string { return this._type; }
  set type(value: string) {
    this._type = value || 'text';
    this.validateType_();

    if (!this.isTextarea_()) {
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
  @Output() iconAction = new EventEmitter<any>();
  @HostBinding('class.mdc-textfield') isHostClass = true;
  @HostBinding('class.mdc-textfield--dense') get classDense(): string {
    return this.dense ? 'mdc-textfield--dense' : '';
  }
  @HostBinding('class.mdc-textfield--fullwidth') get classFullwidth(): string {
    this.placeholder = this.fullwidth ? this.label : '';
    return this.fullwidth ? 'mdc-textfield--fullwidth' : '';
  }
  @ViewChild(MdcTextfieldInput) inputText: MdcTextfieldInput;
  @ViewChild(MdcTextfieldLabel) inputLabel: MdcTextfieldLabel;
  @ViewChild(MdcTextfieldHelptext) inputHelpText: MdcTextfieldHelptext;
  @ViewChild(MdcTextfieldBottomLine) bottomLine: MdcTextfieldBottomLine;
  @ContentChild(MdcIcon) inputIcon: MdcIcon;

  private _mdcAdapter: MDCTextfieldAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRoot.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRoot.nativeElement, className);
    },
    addClassToLabel: (className: string) => {
      if (this.isTextarea_()) { return; }

      if (this.inputLabel && this.label) {
        this._renderer.addClass(this.inputLabel.elementRef.nativeElement, className);
      }
    },
    removeClassFromLabel: (className: string) => {
      if (this.isTextarea_()) { return; }

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
      this._registry.listen_(this._renderer, evtType, handler, this.elementRoot);
    },
    deregisterTextFieldInteractionHandler: (evtType: string, handler: EventListener) => {
      this._registry.unlisten_(evtType, handler);
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
      this._registry.listen_(this._renderer, evtType, handler, this.inputText.elementRef);
    },
    deregisterInputInteractionHandler: (evtType: string, handler: EventListener) => {
      this._registry.unlisten_(evtType, handler);
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this.bottomLine) {
        this._registry.listen_(this._renderer, 'transitionend', handler, this.bottomLine.elementRef);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      this._registry.unlisten_('transitionend', handler);
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
  } = new MDCTextfieldFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRoot: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterContentInit() {
    this._foundation.init();
    this.updateIconState();
  }

  ngOnDestroy() {
    this._foundation.destroy();
  }

  writeValue(value: string) {
    this.value = value == null ? '' : value;
    if (this.value.length > 0) {
      this._mdcAdapter.addClassToLabel('mdc-textfield__label--float-above');
    } else {
      this._mdcAdapter.removeClassFromLabel('mdc-textfield__label--float-above');
    }
    this.onChange(value);
  }

  registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }

  onFocus() {
    this.inputText.focused = true;
  }

  onInput(evt: Event) {
    this.onChange((<any>evt.target).value);
  }

  onBlur() {
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
      this._mdcAdapter.addClass('mdc-textfield--with-leading-icon');
    } else if (this.hasTrailingIcon()) {
      this._mdcAdapter.addClass('mdc-textfield--with-trailing-icon');
    }
  }

  private isTextarea_() {
    let nativeElement = this.elementRoot.nativeElement;
    let nodeName = isBrowser ? nativeElement.nodeName : nativeElement.name;
    return nodeName ? nodeName.toLowerCase() === 'textarea' : false;
  }

  private validateType_() {
    if (MD_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
      throw Error(`Input type "${this._type}" is not supported.`);
    }
  }
}
