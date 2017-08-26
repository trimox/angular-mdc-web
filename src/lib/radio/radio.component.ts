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
import { toBoolean } from '../common';
import { Ripple } from '../ripple/ripple.directive';

import { MDCRadioAdapter } from './radio-adapter';
import { MDCRadioFoundation } from '@material/radio';

let nextElId_ = 0;

export const MD_RADIO_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioComponent),
  multi: true
};

@Component({
  selector: 'mdc-radio',
  template:
  `
  <input type="radio"
    #inputEl
    class="mdc-radio__native-control"
    [id]="inputId"
    [name]="name"
    [attr.aria-label]="ariaLabel"
    [attr.aria-labelledby]="ariaLabelledby"
    [disabled]="disabled"
    [checked]="checked"
    [value]="value"
    (change)="onChange($event)"
    (blur)="onTouched()" />
    <div class="mdc-radio__background">
      <div class="mdc-radio__outer-circle"></div>
      <div class="mdc-radio__inner-circle"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [
    MD_RADIO_CONTROL_VALUE_ACCESSOR,
    Ripple
  ]
})

export class RadioComponent implements AfterViewInit, OnDestroy {
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
  @Input()
  get disableRipple() { return this.ripple.disabled; }
  set disableRipple(value) {
    this.ripple.disabled = toBoolean(value);
  }
  @Input() tabindex: number = 0;
  @Input('aria-label') ariaLabel: string;
  @Input('aria-labelledby') ariaLabelledby: string;
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
  @HostBinding('class.mdc-radio') isHostClass = true;
  @ViewChild('inputEl') inputEl: ElementRef;

  onTouched: () => any = () => { };

  private _controlValueAccessorChangeFn: (value: any) => void = () => { };

  private _mdcAdapter: MDCRadioAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.root.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.root.nativeElement, className);
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
    public root: ElementRef,
    public ripple: Ripple) {
    this.ripple.init(true);
  }

  ngAfterViewInit() {
    this._foundation.init();
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
  }
}
