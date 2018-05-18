import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
  Provider,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { MdcFormFieldControl } from '@angular-mdc/web/form-field';

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
  },
  template:
    `
  <input type="checkbox"
    #inputEl
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
  <div class="mdc-switch__background">
    <div class="mdc-switch__knob"></div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    MDC_SWITCH_CONTROL_VALUE_ACCESSOR,
    [{ provide: MdcFormFieldControl, useExisting: MdcSwitch }],
  ]
})
export class MdcSwitch implements MdcFormFieldControl<any> {
  private _uniqueId: string = `mdc-switch-${++nextUniqueId}`;

  readonly componentInstance = MdcSwitch;

  @Input() id: string = this._uniqueId;
  @Input() name: string | null = null;

  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) {
    this.setChecked(value);
  }
  private _checked: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  private _disabled: boolean = false;

  @Input() tabIndex: number = 0;
  @Output() readonly change: EventEmitter<MdcSwitchChange> = new EventEmitter<MdcSwitchChange>();
  @HostBinding('class.mdc-switch') isHostClass = true;
  @ViewChild('inputEl') inputEl: ElementRef;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when control has been touched */
  _onTouched = () => { };

  get inputId(): string { return `${this.id || this._uniqueId}-input`; }
  @HostBinding('class.mdc-switch--disabled') get classDisabled(): string {
    return this.disabled ? 'mdc-switch--disabled' : '';
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  onChange(evt: Event): void {
    evt.stopPropagation();

    this.setChecked(this.inputEl.nativeElement.checked);
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

    this._checked = checked;
    if (previousValue !== null || undefined) {
      this._onChange(this.checked);
      this.change.emit(new MdcSwitchChange(this, this.checked));
    }

    this._changeDetectorRef.markForCheck();
  }

  isChecked(): boolean {
    return this.checked;
  }

  isDisabled(): boolean {
    return this.disabled;
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = disabled;
    this._changeDetectorRef.markForCheck();
  }

  focus(): void {
    this.inputEl.nativeElement.focus();
  }
}
