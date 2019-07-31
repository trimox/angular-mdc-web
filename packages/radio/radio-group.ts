import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {toBoolean} from '@angular-mdc/web/common';
import {
  MdcRadio,
  MdcRadioChange,
  MDC_RADIO_GROUP_PARENT_COMPONENT
} from './radio';

/**
 * Provider Expression that allows mdc-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */
export const MDC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcRadioGroup),
  multi: true
};

let nextUniqueId = 0;

@Component({
  selector: 'mdc-radio-group, [mdcRadioGroup]',
  exportAs: 'mdcRadioGroup',
  host: {
    'role': 'radiogroup',
    '[attr.name]': 'null'
  },
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [MDC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR,
    {provide: MDC_RADIO_GROUP_PARENT_COMPONENT, useExisting: MdcRadioGroup}
  ]
})
export class MdcRadioGroup implements AfterContentInit, ControlValueAccessor {
  private _name: string = `mdc-radio-group-${nextUniqueId++}`;

  /** Selected value for the radio group. */
  private _value: any = null;

  /** Whether the `value` has been set to its initial value. */
  private _isInitialized: boolean = false;

  @ContentChildren(forwardRef(() => MdcRadio), {descendants: true}) _radios!: QueryList<MdcRadio>;

  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  @Input()
  get name(): string {return this._name; }
  set name(value: string) {
    this._name = value;
    this._updateRadioButtonNames();
  }

  /**
   * Value for the radio-group. Should equal the value of the selected radio button if there is
   * a corresponding radio button with a matching value. If there is not such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
   */
  @Input()
  get value(): any {return this._value; }
  set value(newValue: any) {
    if (this._value !== newValue) {
      // Set this before proceeding to ensure no circular loop occurs with selection.
      this._value = newValue;

      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }
  }

  /**
   * The currently selected radio button. If set to a new radio button, the radio group value
   * will be updated to match the new selected button.
   */
  @Input()
  get selected() {return this._selected; }
  set selected(selected: MdcRadio | null) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._checkSelectedRadioButton();
  }
  private _selected: MdcRadio | null = null;

  @Input()
  get required(): boolean {return this._required; }
  set required(value: boolean) {
    this._required = toBoolean(value);
    this._markRadiosForCheck();
  }
  private _required: boolean = false;

  @Input()
  get disabled(): boolean {return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
    this._updateDisableRadioState(this._disabled);
    this._markRadiosForCheck();
  }
  private _disabled: boolean = false;

  _checkSelectedRadioButton() {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }

  /** The method to be called in order to update ngModel */
  _controlValueAccessorChangeFn: (value: any) => void = () => {};

  /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
  onTouched: () => any = () => {};

  @Output() readonly change: EventEmitter<MdcRadioChange> =
    new EventEmitter<MdcRadioChange>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    this._isInitialized = true;
  }

  _touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  private _updateRadioButtonNames(): void {
    if (this._radios) {
      this._radios.forEach(radio => {
        radio.name = this.name;
        radio.markForCheck();
      });
    }
  }

  /** Updates the `selected` radio button from the internal _value state. */
  private _updateSelectedRadioFromValue(): void {
    // If the value already matches the selected radio, do nothing.
    const isAlreadySelected = this._selected !== null && this._selected.value === this._value;

    if (this._radios && !isAlreadySelected) {
      this._selected = null;
      this._radios.forEach(radio => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }

  private _markRadiosForCheck() {
    if (this._radios) {
      this._radios.forEach(radio => radio.markForCheck());
    }
  }

  private _updateDisableRadioState(disabled: boolean) {
    if (this._radios) {
      this._radios.forEach(radio => radio.disabled = disabled);
    }
  }

  /** Sets the model value. Implemented as part of ControlValueAccessor. */
  writeValue(value: any) {
    this.value = value;
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  /**
   * Registers a callback to be triggered when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled: boolean) {
    this.disabled = toBoolean(isDisabled);
    this._changeDetectorRef.markForCheck();
  }

  /** Dispatch change event with current selection and group value. */
  emitChangeEvent(): void {
    if (this._isInitialized) {
      this.change.emit(new MdcRadioChange(this._selected!, this._value));
    }
  }
}
