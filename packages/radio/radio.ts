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
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {UniqueSelectionDispatcher} from '@angular/cdk/collections';
import {supportsPassiveEventListeners} from '@angular/cdk/platform';

import {MDCRippleFoundation, MDCRippleAdapter} from '@material/ripple';
import {MDCRadioFoundation, MDCRadioAdapter} from '@material/radio';

import {MdcRipple, MDCRippleCapableSurface} from '@angular-mdc/web/ripple';
import {MdcFormField, MdcFormFieldControl} from '@angular-mdc/web/form-field';
import {MDCComponent} from '@angular-mdc/web/base';

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

/** Change event object emitted by MdcRadio. */
export class MdcRadioChange {
  constructor(
    /** The source MdcRadio of the event. */
    public source: MdcRadio,
    /** The value of the radio button. */
    public value: any) {}
}

let nextUniqueId = 0;

@Component({
  selector: 'mdc-radio',
  exportAs: 'mdcRadio',
  host: {
    '[id]': 'id',
    'class': 'mdc-radio',
    '(focus)': 'input.nativeElement.focus()',
    '[attr.tabindex]': '-1',
    '[attr.name]': 'null',
    '[class.mdc-radio--touch]': 'touch',
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
    <div class="mdc-radio__ripple"></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MdcRipple,
    {provide: MdcFormFieldControl, useExisting: MdcRadio}
  ]
})
export class MdcRadio extends MDCComponent<MDCRadioFoundation>
  implements AfterViewInit, OnDestroy, MdcFormFieldControl<any>, MDCRippleCapableSurface {
  private _uniqueId: string = `mdc-radio-${++nextUniqueId}`;

  private _initialized: boolean = false;

  _root!: Element;

  /** The unique ID for the radio button. */
  @Input() id: string = this._uniqueId;

  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  @Input() name!: string;

  @Input() tabIndex: number = 0;

  @Input('aria-label') ariaLabel?: string;
  @Input('aria-labelledby') ariaLabelledby?: string;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input('aria-describedby') ariaDescribedby?: string;

  get inputId(): string {
    return `${this.id || this._uniqueId}-input`;
  }

  @Input()
  get touch(): boolean {
    return this._touch;
  }
  set touch(value: boolean) {
    this._touch = coerceBooleanProperty(value);
  }
  private _touch: boolean = false;

  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    this.setValue(newValue);
  }
  private _value: any;

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    this.setChecked(value);
  }
  private _checked: boolean = false;

  @Input()
  get disabled(): boolean {
    return this._disabled || (this.radioGroup !== null && this.radioGroup.disabled);
  }
  set disabled(value: boolean) {
    const newDisabledState = coerceBooleanProperty(value);
    if (this._disabled !== newDisabledState) {
      this._disabled = newDisabledState;
      this._foundation.setDisabled(this._disabled);
      this._changeDetectorRef.markForCheck();
    }
  }
  private _disabled: boolean = false;

  @Input()
  get required(): boolean {
    return this._required || (this.radioGroup && this.radioGroup.required);
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }
  private _required: boolean = false;

  @Output() readonly change: EventEmitter<MdcRadioChange> = new EventEmitter<MdcRadioChange>();
  @ViewChild('input', {static: true}) input!: ElementRef<HTMLInputElement>;

  /** Unregister function for _radioDispatcher */
  private _removeUniqueSelectionListener: () => void = () => {};

  getDefaultFoundation() {
    const adapter: MDCRadioAdapter = {
      addClass: (className: string) => this._root.classList.add(className),
      removeClass: (className: string) => this._root.classList.remove(className),
      setNativeControlDisabled: (disabled: boolean) => this.disabled = disabled
    };
    return new MDCRadioFoundation(adapter);
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>,
    public ripple: MdcRipple,
    private _radioDispatcher: UniqueSelectionDispatcher,
    @Optional() @Inject(MDC_RADIO_GROUP_PARENT_COMPONENT) public radioGroup: MdcRadioGroupParentComponent,
    @Optional() private _parentFormField: MdcFormField) {
    super(elementRef);

    if (this._parentFormField) {
      _parentFormField.elementRef.nativeElement.classList.add('mdc-form-field');
    }

    this._root = elementRef.nativeElement;
    this.ripple = this._createRipple();

    this._removeUniqueSelectionListener =
      _radioDispatcher.listen((id: string, name: string) => {
        if (id !== this.id && name === this.name) {
          // Get the checked state from native radio button. The native radio buttons with the same
          // name have separate unique selection in different form containers.
          this.checked = this.input.nativeElement.checked;
        }
      });
  }

  ngAfterViewInit(): void {
    this._initialized = true;
    this._foundation.init();

    if (this.radioGroup) {
      Promise.resolve().then(() => {
        // If the radio is inside a radio group, determine if it should be checked
        this.checked = this.radioGroup.value === this._value;
        // Copy name from parent radio group
        this.name = this.radioGroup.name;

        this.setChecked(this.checked);
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
    this.ripple.init();
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
    if (!this._initialized) {
      return;
    }

    const newCheckedState = coerceBooleanProperty(checked);

    if (this._checked !== newCheckedState) {
      this._checked = newCheckedState;
      this.input.nativeElement.checked = newCheckedState;

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
    this._value = value;
    this.input.nativeElement.value = this._value;

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

  focus(): void {
    this.input.nativeElement.focus();
  }

  markForCheck(): void {
    this._changeDetectorRef.markForCheck();
  }

  private _createRipple(): MdcRipple {
    const adapter: MDCRippleAdapter = {
      ...MdcRipple.createAdapter(this),
      isSurfaceActive: () => false,
      isUnbounded: () => true,
      deregisterInteractionHandler: (evtType: any, handler: any) =>
        this.input.nativeElement.removeEventListener(evtType, handler, supportsPassiveEventListeners()),
      registerInteractionHandler: (evtType: any, handler: any) =>
        this.input.nativeElement.addEventListener(evtType, handler, supportsPassiveEventListeners()),
    };
    return new MdcRipple(this.elementRef, new MDCRippleFoundation(adapter));
  }

  /** Dispatch change event with current value. */
  private _emitChangeEvent(): void {
    this.change.emit(new MdcRadioChange(this, this._value));
  }
}
