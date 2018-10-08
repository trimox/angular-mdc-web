import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean, UniqueSelectionDispatcher } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcFormFieldControl } from '@angular-mdc/web/form-field';

import { MDCRadioFoundation } from '@material/radio/index';

/**
 * Describes a parent MdcRadioGroup component.
 * Contains properties that MdcRadio can inherit.
 */
export interface MdcRadioGroupParentComponent {
  name: string;
  selected: MdcRadio | null;
  value: any;
  disabled: boolean;
  required: boolean;
  emitChangeEvent(): void;
  _controlValueAccessorChangeFn(value: any): void;
  _touch(): void;
}

/**
 * Injection token used to provide the parent MdcRadioGroup component to MdcRadio.
 */
export const MDC_RADIO_GROUP_PARENT_COMPONENT =
  new InjectionToken<MdcRadioGroupParentComponent>('MDC_RADIO_GROUP_PARENT_COMPONENT');

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
  moduleId: module.id,
  selector: 'mdc-radio',
  exportAs: 'mdcRadio',
  host: {
    '[id]': 'id',
    'class': 'mdc-radio',
    '(focus)': 'input.nativeElement.focus()',
    '[attr.tabindex]': 'null'
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
    [{ provide: MdcFormFieldControl, useExisting: MdcRadio }]
  ]
})
export class MdcRadio implements AfterViewInit, OnDestroy, MdcFormFieldControl<any> {
  private _uniqueId: string = `mdc-radio-${++nextUniqueId}`;

  /** The unique ID for the radio button. */
  @Input() id: string = this._uniqueId;

  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  @Input() name: string;

  @Input() tabIndex: number = 0;

  @Input('aria-label') ariaLabel: string;
  @Input('aria-labelledby') ariaLabelledby: string;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input('aria-describedby') ariaDescribedby: string;

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
  private _disabled: boolean;

  @Input()
  get required(): boolean { return this._required || (this.radioGroup && this.radioGroup.required); }
  set required(value: boolean) {
    this._required = toBoolean(value);
  }
  private _required: boolean;

  @Output() readonly change: EventEmitter<MdcRadioChange> = new EventEmitter<MdcRadioChange>();
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  /** Unregister function for _radioDispatcher */
  private _removeUniqueSelectionListener: () => void = () => { };

  createAdapter() {
    return {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      getNativeControl: () => this._getInputElement()
    };
  }

  private _foundation: {
    init(): void,
    destroy(): void,
    isChecked(): boolean,
    setChecked(checked: boolean): void,
    setDisabled(disabled: boolean): void,
    isDisabled(): boolean,
    getValue(): any,
    setValue(value: any): void
  } = new MDCRadioFoundation(this.createAdapter());

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>,
    public ripple: MdcRipple,
    private _radioDispatcher: UniqueSelectionDispatcher,
    @Optional() @Inject(MDC_RADIO_GROUP_PARENT_COMPONENT) public radioGroup: MdcRadioGroupParentComponent) {

    this._removeUniqueSelectionListener =
      _radioDispatcher.listen((id: string, name: string) => {
        if (id !== this.id && name === this.name) {
          this.checked = false;
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
      this.radioGroup._touch();
      if (groupValueChanged) {
        this.radioGroup.emitChangeEvent();
      }
    }
  }

  setChecked(checked: boolean): void {
    const newCheckedState = toBoolean(checked);

    if (this._checked !== newCheckedState) {
      this._checked = newCheckedState;
      this._foundation.setChecked(newCheckedState);
      if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
        this.radioGroup.selected = this;
      } else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {

        // When unchecking the selected radio button, update the selected radio
        // property on the group.
        this.radioGroup.selected = null;
      }

      if (newCheckedState) {
        // Notify all radio buttons with the same name to un-check.
        this._radioDispatcher.notify(this.id, this.name);
      }
      this._changeDetectorRef.markForCheck();
    }
  }

  setValue(value: any): void {
    if (this._value !== value) {
      this._value = value;
      this._foundation.setValue(value);
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
