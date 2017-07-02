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
import { NG_VALUE_ACCESSOR, RadioControlValueAccessor } from '@angular/forms';
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
  @Input()
  get checked() { return this._foundation.isChecked(); }
  set checked(value) {
    this._foundation.setChecked(value);
  }
  @Input() name: string;
  @Input()
  get value() { return this._foundation.getValue(); }
  set value(value) {
    this._foundation.setValue(value);
  }
  @Input()
  get disabled() { return this._foundation.isDisabled(); }
  set disabled(value) {
    this.setDisabledState(value);
  }
  @Input() tabindex: number = 0;
  @Input('aria-label') ariaLabel: string;
  @Input('aria-labelledby') ariaLabelledby: string;
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
  @HostBinding('class.mdc-radio') className: string = 'mdc-radio';
  @ViewChild('inputEl') inputEl: ElementRef;

  onTouched: () => any = () => { };

  private _controlValueAccessorChangeFn: (value: any) => void = () => { };

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
      return this.inputEl.nativeElement;
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    isChecked: Function,
    setChecked: Function,
    setDisabled: Function,
    isDisabled: Function,
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

    if (this._renderer.parentNode(this._root.nativeElement).classList.contains('mdc-form-field')
      && !this.disabled) {
      formField_ = new MDCFormField(this._root.nativeElement.parentElement);
      formField_.input = this;
      this._renderer.setAttribute(formField_.label_, 'for', this.inputId);
    }
  }

  ngOnDestroy() {
    this._foundation.destroy();
  }

  onChange(evt: Event) {
    evt.stopPropagation();
    this._controlValueAccessorChangeFn((<any>evt.target).value);
    this.change.emit(evt);
  }

  writeValue(value: any) {
    if (this.value === value) {
      this.checked = true;
    }
  }

  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this._foundation.setDisabled(isDisabled);
    if (this._renderer.parentNode(this._root.nativeElement).classList.contains('mdc-form-field')) {
      formField_.input = isDisabled === true ? null : this;
    }
  }
}