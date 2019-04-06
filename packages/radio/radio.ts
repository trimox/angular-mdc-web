import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { toBoolean, UniqueSelectionDispatcher } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcFormField, MdcFormFieldControl } from '@angular-mdc/web/form-field';
import { MDCComponent } from '@angular-mdc/web/base';

import { MDCRadioFoundation, MDCRadioAdapter } from '@material/radio';

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

/** Change event object emitted by MdcRadio. */
export class MdcRadioChange {
  constructor(
    /** The source MdcRadio of the event. */
    public source: MdcRadio,
    /** The value of the radio button. */
    public value: any) { }
}

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
  providers: [MDC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR]
})
export class MdcRadioGroup implements AfterContentInit, ControlValueAccessor {
  private _name: string = `mdc-radio-group-${nextUniqueId++}`;

  /** Selected value for the radio group. */
  private _value: any = null;

  /** Whether the `value` has been set to its initial value. */
  private _isInitialized: boolean = false;

  @ContentChildren(forwardRef(() => MdcRadio), { descendants: true }) _radios!: QueryList<MdcRadio>;

  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  @Input()
  get name(): string { return this._name; }
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
  get value(): any { return this._value; }
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
  get selected() { return this._selected; }
  set selected(selected: MdcRadio | null) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._checkSelectedRadioButton();
  }
  private _selected: MdcRadio | null = null;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = toBoolean(value);
    this._markRadiosForCheck();
  }
  private _required: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
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
  _controlValueAccessorChangeFn: (value: any) => void = () => { };

  /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
  onTouched: () => any = () => { };

  @Output() readonly change: EventEmitter<MdcRadioChange> =
    new EventEmitter<MdcRadioChange>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>) { }

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

@Component({
  moduleId: module.id,
  selector: 'mdc-radio',
  exportAs: 'mdcRadio',
  host: {
    '[id]': 'id',
    'class': 'mdc-radio',
    '(focus)': 'input.nativeElement.focus()',
    '[attr.tabindex]': '-1',
    '[attr.name]': 'null'
  },
  template: `
  <input type="radio"
    #input
    class="mdc-radio__native-control"
    [id]="inputId"
    [attr.name]="name"
    [tabIndex]="tabIndex"
    [attr.aria-label]="ariaLabel"
    [attr.aria-labelledby]="ariaLabelledby"
    [attr.aria-describedby]="ariaDescribedby"
    [disabled]="disabled"
    [required]="required"
    [checked]="checked"
    (click)="onInputClick($event)"
    (change)="onInputChange($event)" />
    <div class="mdc-radio__background">
      <div class="mdc-radio__outer-circle"></div>
      <div class="mdc-radio__inner-circle"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MdcRipple,
    { provide: MdcFormFieldControl, useExisting: MdcRadio }
  ]
})
export class MdcRadio extends MDCComponent<any> implements AfterViewInit, OnDestroy, MdcFormFieldControl<any> {
  private _uniqueId: string = `mdc-radio-${++nextUniqueId}`;

  /** The parent radio group. May or may not be present. */
  radioGroup: MdcRadioGroup;

  /** The unique ID for the radio button. */
  @Input() id: string = this._uniqueId;

  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  @Input() name!: string;

  @Input() tabIndex: number = 0;

  @Input('aria-label') ariaLabel?: string;
  @Input('aria-labelledby') ariaLabelledby?: string;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input('aria-describedby') ariaDescribedby?: string;

  get inputId(): string { return `${this.id || this._uniqueId}-input`; }

  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    this.setValue(newValue);
  }
  private _value: any;

  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) {
    this.setChecked(value);
  }
  private _checked: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled || (this.radioGroup !== null && this.radioGroup.disabled); }
  set disabled(value: boolean) {
    const newDisabledState = toBoolean(value);
    if (this._disabled !== newDisabledState) {
      this._disabled = newDisabledState;
      this._foundation.setDisabled(this._disabled);
      this._changeDetectorRef.markForCheck();
    }
  }
  private _disabled: boolean = false;

  @Input()
  get required(): boolean { return this._required || (this.radioGroup && this.radioGroup.required); }
  set required(value: boolean) {
    this._required = toBoolean(value);
  }
  private _required: boolean = false;

  @Output() readonly change: EventEmitter<MdcRadioChange> = new EventEmitter<MdcRadioChange>();
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  /** Unregister function for _radioDispatcher */
  private _removeUniqueSelectionListener: () => void = () => { };

  getDefaultFoundation() {
    const adapter: MDCRadioAdapter = {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      setNativeControlDisabled: (disabled: boolean) => this.disabled = disabled
    };
    return new MDCRadioFoundation(adapter);
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>,
    public ripple: MdcRipple,
    private _radioDispatcher: UniqueSelectionDispatcher,
    @Optional() radioGroup: MdcRadioGroup,
    @Optional() private _parentFormField: MdcFormField) {
    super(elementRef);

    this.radioGroup = radioGroup;

    if (this._parentFormField) {
      _parentFormField.elementRef.nativeElement.classList.add('mdc-form-field');
    }

    this._removeUniqueSelectionListener =
      _radioDispatcher.listen((id: string, name: string) => {
        if (id !== this.id && name === this.name) {
          // Get the checked state from native radio button. The native radio buttons with the same
          // name have separate unique selection in different form containers.
          this.checked = this._getInputElement().checked;
        }
      });
  }

  ngAfterViewInit(): void {
    this._foundation.init();
    this._initRipple();

    if (this.radioGroup) {
      Promise.resolve().then(() => {
        // If the radio is inside a radio group, determine if it should be checked
        this.checked = this.radioGroup.value === this._value;
        // Copy name from parent radio group
        this.name = this.radioGroup.name;
        this._changeDetectorRef.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this._removeUniqueSelectionListener();

    this.ripple.destroy();
    this._foundation.destroy();
  }

  onInputClick(event: Event) {
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
  }

  onInputChange(event: Event): void {
    event.stopPropagation();

    const groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
    this.checked = true;
    this._emitChangeEvent();

    if (this.radioGroup) {
      this.radioGroup._controlValueAccessorChangeFn(this.value);
      if (groupValueChanged) {
        this.radioGroup.emitChangeEvent();
      }
    }
  }

  setChecked(checked: boolean): void {
    const newCheckedState = toBoolean(checked);

    if (this._checked !== newCheckedState) {
      this._checked = newCheckedState;
      this._getInputElement().checked = newCheckedState;

      if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
        this.radioGroup.selected = this;
      } else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {

        // When unchecking the selected radio button, update the selected radio
        // property on the group.
        this.radioGroup.selected = null;
      }

      this._changeDetectorRef.markForCheck();

      if (newCheckedState) {
        // Notify all radio buttons with the same name to un-check.
        this._radioDispatcher.notify(this.id, this.name);
      }
    }
  }

  setValue(value: any): void {
    if (this._value !== value) {
      this._value = value;
      this._getInputElement().value = this._value;

      if (this.radioGroup !== null) {
        if (!this.checked) {
          // Update checked when the value changed to match the radio group's value
          this.checked = this.radioGroup.value === value;
        }
        if (this.checked) {
          this.radioGroup.selected = this;
        }
      }
    }
  }

  focus(): void {
    this._getInputElement().focus();
  }

  markForCheck(): void {
    this._changeDetectorRef.markForCheck();
  }

  private _initRipple(): void {
    this.ripple.init({
      surface: this._getHostElement(),
      activator: this._getInputElement()
    }, Object.assign(this.ripple.createAdapter(), {
      isUnbounded: () => true,
      isSurfaceActive: () => false,
      isSurfaceDisabled: () => this._disabled
    }));
  }

  /** Dispatch change event with current value. */
  private _emitChangeEvent(): void {
    this.change.emit(new MdcRadioChange(this, this._value));
  }

  /** Retrieves the DOM element of the component input. */
  private _getInputElement(): HTMLInputElement {
    return this.input.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
