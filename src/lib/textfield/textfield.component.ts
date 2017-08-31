import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
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

import { MDCTextfieldAdapter } from './textfield-adapter';
import { TextfieldInputDirective } from './textfield-input.directive';
import { MDCTextfieldFoundation } from '@material/textfield';

export const MD_TEXTFIELD_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextfieldComponent),
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
export class TextfieldHelptextDirective {
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
export class TextfieldLabelDirective {
  @HostBinding('class.mdc-textfield__label') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: 'mdc-textfield',
  template:
  `
  <input mdc-textfield-input
    [type]="type"
    [id]="id"
    [placeholder]="placeholder"
    [tabindex]="tabindex"
    [disabled]="disabled"
    [attr.maxlength]="maxlength"
    [required]="required"
    (blur)="onBlur()"
    (input)="onInput($event)"
    (focus)="onFocus()" />
    <mdc-textfield-label [attr.for]="id">{{label}}</mdc-textfield-label>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [MD_TEXTFIELD_CONTROL_VALUE_ACCESSOR],
})
export class TextfieldComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
  private type_ = 'text';
  private disabled_ = false;
  private required_ = false;
  private controlValueAccessorChangeFn_: (value: any) => void = (value) => { };
  onChange = (_: any) => { };
  onTouched = () => { };

  @Input() id: string = `mdc-input-${nextUniqueId++}`;
  @Input() fullwidth: boolean;
  @Input() dense: boolean;
  @Input() label: string;
  @Input() maxlength: number;
  @Input() placeholder: string = '';
  @Input() tabindex: number;
  @Input()
  get disabled() { return this.disabled_; }
  set disabled(value: any) {
    this.disabled_ = value != null && `${value}` !== 'false';
    this._foundation.setDisabled(value);
  }
  @Input()
  get required() { return this.required_; }
  set required(value: any) {
    this.required_ = value != null && `${value}` !== 'false';
  }
  @Input()
  get type() { return this.type_; }
  set type(value: string) {
    this.type_ = value || 'text';
    this.validateType_();

    if (!this.isTextarea_()) {
      this._renderer.setProperty(this.inputText.elementRef.nativeElement, 'type', this.type_);
    }
  }
  @Input()
  get value() { return this.inputText.elementRef.nativeElement.value; }
  set value(value: string) {
    if (value !== this.value) {
      this.inputText.elementRef.nativeElement.value = value;
    }
  }
  get valid(): boolean {
    return (this.inputText.elementRef.nativeElement as HTMLInputElement).validity.valid;
  }
  @HostBinding('class.mdc-textfield') isHostClass = true;
  @HostBinding('class.mdc-textfield--dense') get classDense(): string {
    return this.dense ? 'mdc-textfield--dense' : '';
  }
  @HostBinding('class.mdc-textfield--fullwidth') get classFullwidth(): string {
    return this.fullwidth ? 'mdc-textfield--fullwidth' : '';
  }
  @ViewChild(TextfieldInputDirective) inputText: TextfieldInputDirective;
  @ViewChild(TextfieldLabelDirective) inputLabel: TextfieldLabelDirective;
  @ViewChild(TextfieldHelptextDirective) inputHelpText: TextfieldHelptextDirective;

  private _mdcAdapter: MDCTextfieldAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this._root.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this._root.nativeElement, className);
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
    addClassToHelptext: (className: string) => {
      if (this.inputHelpText) {
        this._renderer.addClass(this.inputHelpText, className);
      }
    },
    removeClassFromHelptext: (className: string) => {
      if (this.inputHelpText) {
        this._renderer.removeClass(this.inputHelpText, className);
      }
    },
    registerInputFocusHandler: (handler: EventListener) => {
      this._registry.listen_(this._renderer, 'focus', handler, this.inputText.elementRef);
    },
    deregisterInputFocusHandler: (handler: EventListener) => {
      this._registry.unlisten_('focus', handler);
    },
    registerInputBlurHandler: (handler: EventListener) => {
      this._registry.listen_(this._renderer, 'blur', handler, this.inputText.elementRef);
    },
    deregisterInputBlurHandler: (handler: EventListener) => {
      this._registry.unlisten_('blur', handler);
    },
    registerInputInputHandler: (handler: EventListener) => {
      this._registry.listen_(this._renderer, 'input', handler, this.inputText.elementRef);
    },
    deregisterInputInputHandler: (handler: EventListener) => {
      this._registry.unlisten_('input', handler);
    },
    registerInputKeydownHandler: (handler: EventListener) => {
      this._registry.listen_(this._renderer, 'keydown', handler, this.inputText.elementRef);
    },
    deregisterInputKeydownHandler: (handler: EventListener) => {
      this._registry.unlisten_('keydown', handler);
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
    helptextHasClass: (className: string) => {
      return this.inputHelpText ? this.inputHelpText.elementRef.nativeElement.classList.contains(className) : false;
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
  } = new MDCTextfieldFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit() {
    this._foundation.init();
  }

  ngOnDestroy() {
    this._foundation.destroy();
  }

  writeValue(value: string) {
    this.value = value;
    if (value && value.length > 0) {
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

  isDisabled() {
    return this._foundation.isDisabled();
  }

  isBadInput() {
    return (this.inputText.elementRef.nativeElement as HTMLInputElement).validity.badInput;
  }

  focus() {
    this.inputText.focus();
  }

  updateErrorState(value?: boolean) {
    if (value || this.valid) {
      this._mdcAdapter.removeClass('mdc-textfield--invalid');
    } else {
      this._mdcAdapter.addClass('mdc-textfield--invalid');
    }
  }

  private isTextarea_() {
    let nativeElement = this._root.nativeElement;

    // In Universal, we don't have access to `nodeName`, but the same can be achieved with `name`.
    // Note that this shouldn't be necessary once Angular switches to an API that resembles the
    // DOM closer.
    let nodeName = isBrowser ? nativeElement.nodeName : nativeElement.name;
    return nodeName ? nodeName.toLowerCase() === 'textarea' : false;
  }

  private validateType_() {
    if (MD_INPUT_INVALID_TYPES.indexOf(this.type_) > -1) {
      throw Error(`Input type "${this.type_}" is not supported.`);
    }
  }
}
