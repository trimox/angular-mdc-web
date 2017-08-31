import {
  AfterViewInit,
  Component,
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
import { toBoolean } from '../common';
import { EventRegistry } from '../common/event-registry';
import { MdcRipple } from '../ripple/ripple.directive';

import { MDCCheckboxAdapter } from './checkbox-adapter';
import { MDCCheckboxFoundation } from '@material/checkbox';

let nextElId_ = 0;

export const MD_CHECKBOX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcCheckboxComponent),
  multi: true
};

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
    MD_CHECKBOX_CONTROL_VALUE_ACCESSOR,
    MdcRipple
  ]
})

export class MdcCheckboxComponent implements AfterViewInit, OnDestroy {
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
  }
  @Input()
  get indeterminate() { return this._foundation.isIndeterminate(); }
  set indeterminate(value) {
    this._foundation.setIndeterminate(value);
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
  @HostBinding('class.mdc-checkbox') isHostClass = true;
  @ViewChild('nativeCb') inputEl: ElementRef;

  onTouched: () => any = () => { };

  private _controlValueAccessorChangeFn: (value: any) => void = () => { };

  private _mdcAdapter: MDCCheckboxAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.root.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.root.nativeElement, className);
    },
    registerAnimationEndHandler: (handler: EventListener) => {
      if (this.root) {
        this._registry.listen_(this._renderer, 'animationend', handler, this.root);
      }
    },
    deregisterAnimationEndHandler: (handler: EventListener) => {
      this._registry.unlisten_('animationend', handler);
    },
    registerChangeHandler: (handler: EventListener) => {
      if (this.root) {
        this._registry.listen_(this._renderer, 'change', handler, this.inputEl);
      }
    },
    deregisterChangeHandler: (handler: EventListener) => {
      this._registry.unlisten_('change', handler);
    },
    getNativeControl: () => {
      return this.inputEl.nativeElement;
    },
    forceLayout: () => {
      if (this.root) {
        return this.root.nativeElement.offsetWidth;
      }
    },
    isAttachedToDOM: () => !!this.root
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
    public root: ElementRef,
    public ripple: MdcRipple,
    private _registry: EventRegistry) { }

  ngAfterViewInit() {
    this._foundation.init();
    this.ripple.init(true);
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
}
