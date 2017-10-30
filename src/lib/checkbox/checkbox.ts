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
import { MdcRipple } from '../core/ripple/ripple.service';

import { MDCCheckboxAdapter } from './adapter';
import { MDCCheckboxFoundation } from '@material/checkbox';

let nextUniqueId = 0;

export const MD_CHECKBOX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcCheckbox),
  multi: true
};

@Component({
  selector: 'mdc-checkbox',
  host: {
    '[id]': 'id',
  },
  template:
  `
  <input type="checkbox"
    #nativeCb    
    class="mdc-checkbox__native-control"
    [id]="inputId"
    [name]="name"
    [tabIndex]="tabIndex"
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
  providers: [
    MD_CHECKBOX_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
    EventRegistry,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MdcCheckbox implements AfterViewInit, OnDestroy {
  private _uniqueId: string = `mdc-checkbox-${++nextUniqueId}`;

  @Input() id: string = this._uniqueId;
  get inputId(): string { return `${this.id || this._uniqueId}-input`; }
  @Input() name: string | null = null;
  @Input()
  get checked(): boolean { return this._foundation.isChecked(); }
  set checked(value: boolean) {
    this._foundation.setChecked(value);
  }
  @Input()
  get value(): any { return this._foundation.getValue(); }
  set value(value: any) {
    this._foundation.setValue(value);
  }
  @Input()
  get disabled(): boolean { return this._foundation.isDisabled(); }
  set disabled(value: boolean) {
    this._foundation.setDisabled(value);
  }
  @Input()
  get indeterminate(): boolean { return this._foundation.isIndeterminate(); }
  set indeterminate(value: boolean) {
    this._foundation.setIndeterminate(value);
  }
  @Input()
  get disableRipple(): boolean { return this.ripple.disabled; }
  set disableRipple(value: boolean) {
    this.ripple.disabled = toBoolean(value);
  }
  @Input() tabIndex: number = 0;
  @Input('aria-label') ariaLabel: string = '';
  @Input('aria-labelledby') ariaLabelledby: string | null = null;
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
  @HostBinding('class.mdc-checkbox') isHostClass = true;
  @ViewChild('nativeCb') inputEl: ElementRef;

  onTouched: () => any = () => { };

  private _controlValueAccessorChangeFn: (value: any) => void = () => { };

  private _mdcAdapter: MDCCheckboxAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    registerAnimationEndHandler: (handler: EventListener) => {
      this._registry.listen(this._renderer, 'animationend', handler, this.elementRef.nativeElement);
    },
    deregisterAnimationEndHandler: (handler: EventListener) => {
      this._registry.unlisten('animationend', handler);
    },
    registerChangeHandler: (handler: EventListener) => {
      this._registry.listen(this._renderer, 'change', handler, this.inputEl.nativeElement);
    },
    deregisterChangeHandler: (handler: EventListener) => {
      this._registry.unlisten('change', handler);
    },
    getNativeControl: () => {
      return this.inputEl.nativeElement;
    },
    forceLayout: () => {
      return this.elementRef.nativeElement.offsetWidth;
    },
    isAttachedToDOM: () => !!this.elementRef
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
    public elementRef: ElementRef,
    public ripple: MdcRipple,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._foundation.init();
    this.ripple.init(true);
  }
  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  onChange(evt: Event): void {
    evt.stopPropagation();
    this._controlValueAccessorChangeFn((<any>evt.target).checked);
    this.change.emit(evt);
  }

  writeValue(value: any): void {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  focus(): void {
    this.inputEl.nativeElement.focus();
  }
}
