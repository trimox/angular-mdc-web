import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Optional,
  OnDestroy,
  Output,
  Provider,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { MDCComponent } from '@angular-mdc/web/base';
import { toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';

import { MdcFormField, MdcFormFieldControl } from '@angular-mdc/web/form-field';

import { MDCSwitchFoundation, MDCSwitchAdapter } from '@material/switch';

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
    'class': 'mdc-switch',
    '[class.mdc-switch--checked]': 'checked',
    '[class.mdc-switch--disabled]': 'disabled',
    '(focus)': '_inputElement.nativeElement.focus()'
  },
  template: `
  <div class="mdc-switch__track"></div>
  <div #thumbUnderlay class="mdc-switch__thumb-underlay">
    <div class="mdc-switch__thumb">
      <input type="checkbox"
        #input
        role="switch"
        class="mdc-switch__native-control"
        [id]="inputId"
        [attr.name]="name"
        [attr.aria-label]="ariaLabel"
        [attr.aria-labelledby]="ariaLabelledby"
        [tabIndex]="tabIndex"
        [disabled]="disabled"
        [required]="required"
        [checked]="checked"
        (blur)="onBlur()"
        (click)="onInputClick($event)"
        (change)="onChange($event)"/>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    MDC_SWITCH_CONTROL_VALUE_ACCESSOR,
    { provide: MdcFormFieldControl, useExisting: MdcSwitch },
    MdcRipple
  ]
})
export class MdcSwitch extends MDCComponent<MDCSwitchFoundation> implements MdcFormFieldControl<any>,
  AfterViewInit, ControlValueAccessor, OnDestroy {
  private _uniqueId: string = `mdc-switch-${++nextUniqueId}`;

  @Input() id: string = this._uniqueId;
  @Input() name: string | null = null;
  @Input() tabIndex: number = 0;

  /** The value attribute of the native input element */
  @Input() value: string | null = null;

  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) {
    if (this.disabled) { return; }

    this._checked = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  private _checked: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  private _disabled: boolean = false;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = toBoolean(value);
  }
  private _required: boolean = false;

  /** Used to set the aria-label attribute on the underlying input element. */
  @Input('aria-label') ariaLabel: string | null = null;

  /** Used to set the aria-labelledby attribute on the underlying input element. */
  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  @Output() readonly change: EventEmitter<MdcSwitchChange> = new EventEmitter<MdcSwitchChange>();

  @ViewChild('input', {static: true}) _inputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('thumbUnderlay', {static: false}) thumbUnderlay!: ElementRef<HTMLElement>;

  /** View to model callback called when value changes */
  private _onChange = (_: any) => { };

  /** View to model callback called when control has been touched */
  private _onTouched = () => { };

  get inputId(): string { return `${this.id || this._uniqueId}-input`; }

  getDefaultFoundation() {
    const adapter: MDCSwitchAdapter = {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      setNativeControlChecked: (checked: boolean) => this._getInputElement().checked = checked,
      setNativeControlDisabled: (disabled: boolean) => this._getInputElement().disabled = disabled
    };
    return new MDCSwitchFoundation(adapter);
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public ripple: MdcRipple,
    public elementRef: ElementRef<HTMLElement>,
    @Optional() private _parentFormField: MdcFormField) {
    super(elementRef);

    if (this._parentFormField) {
      _parentFormField.elementRef.nativeElement.classList.add('mdc-form-field');
    }
  }

  ngAfterViewInit(): void {
    this._foundation.init();
    this._initRipple();
  }

  ngOnDestroy(): void {
    this.ripple.destroy();
  }

  onChange(evt: Event): void {
    evt.stopPropagation();

    if (this.disabled) { return; }

    this._foundation.handleChange(evt);
    this._checked = this._inputElement.nativeElement.checked;
    this._foundation.setChecked(this._checked);

    this._emitChangeEvent();
    this._changeDetectorRef.markForCheck();
  }

  onInputClick(evt: Event): void {
    evt.stopPropagation();
  }

  onBlur(): void {
    this._onTouched();
  }

  writeValue(value: any): void {
    this.checked = !!value;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  /** Toggles the checked state of the switch. */
  toggle(): void {
    this.checked = !this.checked;
    this._onChange(this.checked);
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = toBoolean(disabled);
    this._foundation.setDisabled(this._disabled);
    this._changeDetectorRef.markForCheck();
  }

  focus(): void {
    this._inputElement.nativeElement.focus();
  }

  private _initRipple(): void {
    this.ripple.init({
      surface: this.thumbUnderlay.nativeElement,
      activator: this._inputElement.nativeElement
    }, Object.assign(this.ripple.createAdapter(), {
      isUnbounded: () => true,
      isSurfaceDisabled: () => this._disabled
    }));
  }

  /**
   * Emits a change event on the `change` output. Also notifies the FormControl about the change.
   */
  private _emitChangeEvent(): void {
    this._onChange(this.checked);
    this.change.emit(new MdcSwitchChange(this, this.checked));
  }

  /** Retrieves the DOM element of the component input. */
  private _getInputElement(): HTMLInputElement {
    return this._inputElement.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
