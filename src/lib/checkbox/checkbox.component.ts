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
import { MDCCheckboxAdapter } from './checkbox-adapter';
import { Ripple } from '.././ripple/ripple.directive';

const { MDCFormField } = require('@material/form-field');
const { MDCCheckboxFoundation } = require('@material/checkbox');

let formField_ = null;
let nextElId_ = 0;

export const MD_CHECKBOX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

type UnlistenerMap = WeakMap<EventListener, Function>;

@Component({
  selector: 'mdc-checkbox',
  template:
  `
  <input type="checkbox"
    #nativeCb    
    class="mdc-checkbox__native-control"
    [id]="inputId"
    [name]="name"
    [tabindex]="tabindex"
    [attr.aria-label]="ariaLabel"
    [attr.aria-labelledby]="ariaLabelledby"
    [disabled]="disabled"
    [checked]="checked"
    [value]="value"
    [indeterminate]="indeterminate"
    (change)="onChange($event)"/>
  <div class="mdc-checkbox__background">
    <svg class="mdc-checkbox__checkmark"
      viewBox="0 0 24 24">
      <path class="mdc-checkbox__checkmark__path"
            fill="none"
            stroke="white"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
    </svg>
    <div class="mdc-checkbox__mixedmark"></div>
  </div>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [
    MD_CHECKBOX_CONTROL_VALUE_ACCESSOR
  ]
})

export class CheckboxComponent implements AfterViewInit, OnDestroy {
  ripple: Ripple;

  @Input() id: string = `mdc-checkbox-${++nextElId_}`;
  @Input() name: string;
  get inputId(): string {
    return `input-${this.id}`;
  }
  @Input()
  get checked() { return this._foundation.isChecked(); }
  set checked(value) {
    this._foundation.setChecked(value);
  }
  @Input()
  get value() { return this._foundation.getValue(); }
  set value(value) {
    this._foundation.setValue(value);
  }
  @Input()
  get disabled() { return this._foundation.isDisabled(); }
  set disabled(value) {
    this._foundation.setDisabled(value);
    if (this._renderer.parentNode(this._root.nativeElement).classList.contains('mdc-form-field')) {
      formField_.input = value === true ? null : this;
    }
  }
  @Input()
  get indeterminate() { return this._foundation.isIndeterminate(); }
  set indeterminate(value) {
    this._foundation.setIndeterminate(value);
  }
  @Input() tabindex: number = 0;
  @Input('aria-label') ariaLabel: string;
  @Input('aria-labelledby') ariaLabelledby: string;
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
  @HostBinding('class.mdc-checkbox') className: string = 'mdc-checkbox';
  @ViewChild('nativeCb') inputEl: ElementRef;

  onTouched: () => any = () => { };

  private _controlValueAccessorChangeFn: (value: any) => void = () => { };
  private _unlisteners: Map<string, UnlistenerMap> = new Map<string, UnlistenerMap>();

  private _mdcAdapter: MDCCheckboxAdapter = {
    addClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.addClass(root.nativeElement, className);
    },
    removeClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.removeClass(root.nativeElement, className);
    },
    registerAnimationEndHandler: (handler: EventListener) => {
      if (this._root) {
        this.listen_('animationend', handler);
      }
    },
    deregisterAnimationEndHandler: (handler: EventListener) => {
      this.unlisten_('animationend', handler);
    },
    registerChangeHandler: (handler: EventListener) => {
      if (this._root) {
        this.listen_('change', handler, this.inputEl);
      }
    },
    deregisterChangeHandler: (handler: EventListener) => {
      this.unlisten_('change', handler);
    },
    getNativeControl: () => {
      return this.inputEl.nativeElement;
    },
    forceLayout: () => {
      if (this._root) {
        return this._root.nativeElement.offsetWidth;
      }
    },
    isAttachedToDOM: () => Boolean(this._root)
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    isChecked: Function,
    setChecked: Function,
    setDisabled: Function,
    isDisabled: Function,
    getValue: Function,
    setValue: Function,
    isIndeterminate: Function,
    setIndeterminate: Function
  } = new MDCCheckboxFoundation(this._mdcAdapter);

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
    this._controlValueAccessorChangeFn((<any>evt.target).checked);
    this.change.emit(evt);
  }

  writeValue(value: any) {
    this.checked = !!value;
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