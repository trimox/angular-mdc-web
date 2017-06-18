import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  Provider,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MDCRadioAdapter } from './radio-adapter';
import { Ripple } from '.././ripple/ripple.directive';

const { MDCFormField } = require('@material/form-field');
const { MDCRadioFoundation } = require('@material/radio');
const MDC_RADIO_STYLES = require('@material/radio/mdc-radio.scss');

let formField_ = null;
let nextElId_ = 0;

export const MD_RADIO_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioComponent),
  multi: true
};

type UnlistenerMap = WeakMap<EventListener, Function>;

@Component({
  selector: 'mdc-radio',
  templateUrl: './radio.component.html',
  styles: [String(MDC_RADIO_STYLES)],
  encapsulation: ViewEncapsulation.None,
  providers: [
    MD_RADIO_CONTROL_VALUE_ACCESSOR
  ]
})

export class RadioComponent implements AfterViewInit, OnDestroy {
  ripple: Ripple;

  @Input() id: string = `mdc-radio-${++nextElId_}`;
  get inputId(): string {
    return `input-${this.id}`;
  }
  @Input() checked: boolean;
  @Input() name: string;
  @Input() value: any;
  @Input() disabled: boolean;
  @Input() tabindex: number = 0;
  @Input('aria-label') ariaLabel: string;
  @Input('aria-labelledby') ariaLabelledby: string;
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
  @HostBinding('class') className: string = 'mdc-radio';
  @HostBinding('class.mdc-radio--disabled') get classDisabled(): string {
    if (this.disabled) {
      if (formField_) {
        formField_.input = null;
      }
    } else {
      if (formField_) {
        formField_.input = this;
      }
    }
    return this.disabled ? 'mdc-radio--disabled' : '';
  }
  @ViewChild('inputEl') inputEl: ElementRef;

  onTouched: () => any = () => { };

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };
  private _unlisteners: Map<string, UnlistenerMap> = new Map<string, UnlistenerMap>();

  private _mdcAdapter: MDCRadioAdapter = {
    addClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.addClass(root.nativeElement, className);
    },
    removeClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.removeClass(root.nativeElement, className);
    },
    getNativeControl: () => {
      return {
        checked: this.inputEl.nativeElement.checked,
        disabled: this.inputEl.nativeElement.disabled,
        value: this.inputEl.nativeElement.value
      };
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    isChecked: Function,
    setChecked: Function,
    setDisabled: Function,
    getValue: Function,
    setValue: Function
  } = new MDCRadioFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef) {
    this.ripple = new Ripple(this._renderer, this._root);
  }

  ngAfterViewInit() {
    this._foundation.init();
    this.ripple.unbounded = true;

    formField_ = new MDCFormField(this._root.nativeElement.parentElement)
    formField_.input = this;
    this._renderer.setAttribute(formField_.label_, 'for', this.inputId)
  }
  ngOnDestroy() {
    this._foundation.destroy();
  }

  handleChange(evt: Event) {
    evt.stopPropagation();
    this._controlValueAccessorChangeFn(this.value);
    this.change.emit(evt);
  }

  writeValue(value: any) {
    this._foundation.setValue(value);
  }

  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  listen_(type: string, listener: EventListener, ref: ElementRef = this._root) {
    if (!this._unlisteners.has(type)) {
      this._unlisteners.set(type, new WeakMap<EventListener, Function>());
    }
    const unlistener = this._renderer.listen(ref.nativeElement, type, listener);
    this._unlisteners.get(type).set(listener, unlistener);
  }

  unlisten_(type: string, listener: EventListener) {
    if (!this._unlisteners.has(type)) {
      return;
    }
    const unlisteners = this._unlisteners.get(type);
    if (!unlisteners.has(listener)) {
      return;
    }
    unlisteners.get(listener)();
    unlisteners.delete(listener);
  }
}