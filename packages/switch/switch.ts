import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  Provider,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';

import { MdcFormFieldControl } from '@angular-mdc/web/form-field';

import { MDCSwitchAdapter } from '@material/switch/adapter';
import { MDCSwitchFoundation } from '@material/switch';

export const MDC_SWITCH_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcSwitch),
  multi: true
};

/** Change event object emitted by MdcSwitch. */
export class MdcSwitchChange {
  constructor(
    /** The source MdcSwitch of the event. */
    public source: MdcSwitch,
    /** The new `checked` value of the switch. */
    public checked: boolean) { }
}

let nextUniqueId = 0;

@Component({
  moduleId: module.id,
  selector: 'mdc-switch',
  host: {
    '[id]': 'id',
    '[tabIndex]': 'tabIndex',
    'class': 'mdc-switch',
    '[class.mdc-switch--checked]': 'checked',
    '[class.mdc-switch--disabled]': 'disabled'
  },
  template: `
  <div class="mdc-switch__track"></div>
  <div class="mdc-switch__thumb-underlay">
    <div class="mdc-switch__thumb">
      <input type="checkbox"
        #input
        role="switch"
        class="mdc-switch__native-control"
        [id]="inputId"
        [name]="name"
        [tabIndex]="tabIndex"
        [disabled]="disabled"
        [checked]="checked"
        (click)="onInputClick($event)"
        (blur)="onBlur()"
        (change)="onChange($event)"/>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    MDC_SWITCH_CONTROL_VALUE_ACCESSOR,
    [{ provide: MdcFormFieldControl, useExisting: MdcSwitch }],
    MdcRipple
  ]
})
export class MdcSwitch implements MdcFormFieldControl<any>, AfterViewInit, OnDestroy {
  private _uniqueId: string = `mdc-switch-${++nextUniqueId}`;

  readonly componentInstance = MdcSwitch;

  @Input() id: string = this._uniqueId;
  @Input() name: string | null = null;

  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) {
    this.setChecked(value);
  }
  private _checked: boolean;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  private _disabled: boolean;

  @Input() tabIndex: number = 0;
  @Output() readonly change: EventEmitter<MdcSwitchChange> = new EventEmitter<MdcSwitchChange>();

  @ViewChild('input') inputElement: ElementRef;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when control has been touched */
  _onTouched = () => { };

  get inputId(): string { return `${this.id || this._uniqueId}-input`; }

  private _mdcAdapter: MDCSwitchAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    setNativeControlChecked: (checked: boolean) => this._getInputElement().checked = checked,
    setNativeControlDisabled: (disabled: boolean) => this._getInputElement().disabled = disabled
  };

  private _foundation: {
    init(): void,
    setChecked(checked: boolean): void,
    setDisabled(disabled: boolean): void,
    handleChange(evt: Event): void
  } = new MDCSwitchFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _ripple: MdcRipple,
    public elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this._foundation.init();
    this._ripple.attachTo(this._getHostElement(), true, this._getInputElement());
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }

  onChange(evt: Event): void {
    evt.stopPropagation();

    this._foundation.handleChange(evt);
    this.setChecked(this._getInputElement().checked);
  }

  onInputClick(evt: Event): void {
    evt.stopPropagation();
  }

  onBlur(): void {
    this._onTouched();
  }

  writeValue(value: any): void {
    this.setChecked(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabled(disabled: boolean): void {
    this.setDisabledState(disabled);
  }

  setChecked(checked: boolean): void {
    if (this.disabled) { return; }

    const previousValue = this.checked;

    this._checked = toBoolean(checked);
    this._foundation.setChecked(checked);

    if (previousValue !== null || undefined) {
      this._onChange(this.checked);
      this.change.emit(new MdcSwitchChange(this, this.checked));
    }

    this._changeDetectorRef.markForCheck();
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = toBoolean(disabled);
    this._foundation.setDisabled(disabled);

    this._changeDetectorRef.markForCheck();
  }

  focus(): void {
    this.inputElement.nativeElement.focus();
  }

  /** Retrieves the DOM element of the component input. */
  private _getInputElement(): HTMLInputElement {
    return this.inputElement.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
