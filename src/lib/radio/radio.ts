import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { NG_VALUE_ACCESSOR, RadioControlValueAccessor } from '@angular/forms';
import { toBoolean, EventRegistry } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';

import { MDCRadioAdapter } from '@material/radio/adapter';
import { MDCRadioFoundation } from '@material/radio';

let nextUniqueId = 0;

export const MD_RADIO_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcRadio),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'mdc-radio',
  host: {
    '[id]': 'id',
  },
  template:
    `
  <input type="radio"
    #inputEl
    class="mdc-radio__native-control"
    [id]="inputId"
    [name]="name"
    [tabIndex]="tabIndex"
    [attr.aria-label]="ariaLabel"
    [attr.aria-labelledby]="ariaLabelledby"
    [disabled]="disabled"
    [checked]="checked"
    [value]="value"
    (change)="onChange($event)"
    (blur)="onBlur()" />
    <div class="mdc-radio__background">
      <div class="mdc-radio__outer-circle"></div>
      <div class="mdc-radio__inner-circle"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MD_RADIO_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
    EventRegistry,
  ]
})
export class MdcRadio implements AfterViewInit, OnDestroy {
  private _uniqueId: string = `mdc-radio-${++nextUniqueId}`;

  @Input() id: string = this._uniqueId;
  @Input() name: string | null = null;
  @Input() tabIndex: number = 0;
  @Input('aria-label') ariaLabel: string = '';
  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  get inputId(): string { return `${this.id || this._uniqueId}-input`; }

  @Input()
  get value(): boolean { return this._value; }
  set value(newValue: boolean) {
    this.setValue(newValue);
  }
  protected _value: any;

  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) {
    this.setChecked(value);
  }
  protected _checked: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  protected _disabled: boolean = false;

  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
  @HostBinding('class.mdc-radio') isHostClass = true;
  @ViewChild('inputEl') inputEl: ElementRef;

  private _mdcAdapter: MDCRadioAdapter = {
    addClass: (className: string) => this._renderer.addClass(this._getHostElement(), className),
    removeClass: (className: string) => this._renderer.removeClass(this._getHostElement(), className),
    getNativeControl: () => this.inputEl.nativeElement
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    isChecked(): boolean,
    setChecked(checked: boolean): void,
    setDisabled(disabled: boolean): void,
    isDisabled(): boolean,
    getValue(): string,
    setValue(value: string): void
  } = new MDCRadioFoundation(this._mdcAdapter);

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when radio has been touched */
  _onTouched = () => { };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    public ripple: MdcRipple) { }

  ngAfterViewInit(): void {
    this._foundation.init();
    this.ripple.attachTo(this._getHostElement(), true);

    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.ripple.destroy();
    this._foundation.destroy();
  }

  onChange(evt: Event): void {
    evt.stopPropagation();
    this._onChange((<any>evt.target).value);
    this.change.emit(evt);
  }

  onBlur(): void {
    this._onTouched();
    this._changeDetectorRef.markForCheck();
  }

  writeValue(value: any): void {
    if (this.value === value) {
      this.setChecked(value);
    }

    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this._foundation.setDisabled(disabled);
    this._disabled = disabled;
    this._changeDetectorRef.markForCheck();
  }

  setChecked(checked: boolean): void {
    this._checked = checked;
    this._foundation.setChecked(checked);
    this._changeDetectorRef.markForCheck();
  }

  getValue(): any {
    return this._foundation.getValue();
  }

  setValue(value: any): void {
    this._value = value;
    this._foundation.setValue(value);
    this._changeDetectorRef.markForCheck();
  }

  isChecked(): boolean {
    return this._foundation.isChecked();
  }

  focus(): void {
    this.inputEl.nativeElement.focus();
  }

  isDisabled(): boolean {
    return this._foundation.isDisabled();
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
