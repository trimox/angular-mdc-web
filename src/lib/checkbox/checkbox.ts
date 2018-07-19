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
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { isBrowser, EventRegistry, toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcFormFieldControl } from '@angular-mdc/web/form-field';

import { getCorrectEventName } from '@material/animation';

import { MDCCheckboxAdapter } from '@material/checkbox/adapter';
import { MDCCheckboxFoundation } from '@material/checkbox';

let nextUniqueId = 0;

/** Change event object emitted by MdcCheckbox. */
export class MdcCheckboxChange {
  constructor(
    /** The source MdcCheckbox of the event. */
    public source: MdcCheckbox,
    /** The new `checked` value of the checkbox. */
    public checked: boolean) { }
}

export interface MdcIndeterminateChange {
  source: MdcCheckbox;
  indeterminate: boolean;
}

export const MDC_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcCheckbox),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'mdc-checkbox',
  exportAs: 'mdcCheckbox',
  host: {
    '[id]': 'id',
  },
  template: `
  <input type="checkbox"
    #input
    class="mdc-checkbox__native-control"
    [id]="inputId"
    [name]="name"
    [tabIndex]="tabIndex"
    [attr.aria-label]="ariaLabel"
    [attr.aria-labelledby]="ariaLabelledby"
    [disabled]="disabled"
    [checked]="checked"
    [attr.value]="checked"
    [indeterminate]="indeterminate"
    (change)="onChange($event)"
    (click)="_onInputClick($event)"/>
  <div class="mdc-checkbox__background">
    <svg class="mdc-checkbox__checkmark"
      viewBox="0 0 24 24">
      <path class="mdc-checkbox__checkmark-path"
            fill="none"
            stroke="white"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
    </svg>
    <div class="mdc-checkbox__mixedmark"></div>
  </div>
  `,
  providers: [
    MDC_CHECKBOX_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
    EventRegistry,
    [{ provide: MdcFormFieldControl, useExisting: MdcCheckbox }]
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcCheckbox implements AfterViewInit, ControlValueAccessor, OnDestroy, MdcFormFieldControl<any> {
  readonly componentInstance = MdcCheckbox;

  private _mdcAdapter: MDCCheckboxAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    setNativeControlAttr: (attr: string, value: string) => this._getInputElement().setAttribute(attr, value),
    removeNativeControlAttr: (attr: string) => this._getInputElement().removeAttribute(attr),
    registerAnimationEndHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen(getCorrectEventName(window, 'animationend'), handler, this._getHostElement());
      }
    },
    deregisterAnimationEndHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten(getCorrectEventName(window, 'animationend'), handler);
      }
    },
    registerChangeHandler: (handler: EventListener) => this._registry.listen('change', handler, this._getInputElement()),
    deregisterChangeHandler: (handler: EventListener) => this._registry.unlisten('change', handler),
    getNativeControl: () => this._getInputElement(),
    forceLayout: () => this._getHostElement().offsetWidth,
    isAttachedToDOM: () => !!this.inputEl
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    isChecked(): boolean,
    setChecked(checked: any): void,
    setDisabled(disabled: boolean): void,
    isDisabled(): boolean,
    getValue(): any,
    setValue(value: any): void,
    isIndeterminate(): boolean,
    setIndeterminate(indeterminate: boolean): void
  } = new MDCCheckboxFoundation(this._mdcAdapter);

  private _uniqueId: string = `mdc-checkbox-${++nextUniqueId}`;

  @Input() id: string = this._uniqueId;
  get inputId(): string { return `${this.id || this._uniqueId}-input`; }

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
    this.setDisabled(value);
  }
  private _disabled: boolean;

  /// Alternative state of the checkbox, not user set-able state. Between
  /// [checked] and [indeterminate], only one can be true, though both can be
  /// false.
  /// `true` is INDETERMINATE and `false` is not.
  @Input()
  get indeterminate(): boolean { return this._indeterminate; }
  set indeterminate(value: boolean) {
    this.setIndeterminate(value);
  }
  private _indeterminate: boolean;

  /// Determines the state to go into when [indeterminate] state is toggled.
  /// `true` will go to checked and `false` will go to unchecked.
  @Input()
  get indeterminateToChecked(): boolean { return this._indeterminateToChecked; }
  set indeterminateToChecked(value: boolean) {
    this.setIndeterminateToChecked(value);
  }
  private _indeterminateToChecked: boolean = true;

  @Input() tabIndex: number = 0;
  @Input('aria-label') ariaLabel: string = '';
  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  /// Fired when checkbox is checked or unchecked, but not when set
  /// indeterminate. Sends the state of [checked].
  @Output() readonly change: EventEmitter<MdcCheckboxChange> = new EventEmitter<MdcCheckboxChange>();

  /// Fired when checkbox goes in and out of indeterminate state, but not when
  /// set to checked. Sends the state of [indeterminate];
  @Output() readonly indeterminateChange: EventEmitter<MdcIndeterminateChange>
    = new EventEmitter<MdcIndeterminateChange>();

  @HostBinding('class.mdc-checkbox') isHostClass = true;
  @ViewChild('input') inputEl: ElementRef;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when component has been touched */
  _onTouched = () => { };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    public ripple: MdcRipple,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._foundation.init();

    this.ripple.attachTo(this._getHostElement(), true, this.inputEl.nativeElement);
  }

  ngOnDestroy(): void {
    this.ripple.destroy();
    this._foundation.destroy();
  }

  writeValue(value: any): void {
    if (value == null) { return; }
    this.checked = !!value;
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  /** Focuses the checkbox. */
  focus(): void {
    this.inputEl.nativeElement.focus();
  }

  // Toggles checkbox via user action. When it is indeterminate, toggle
  /// can go to checked or unchecked, depending on state
  /// [indeterminateToChecked].
  toggle(): void {
    if (this.disabled) { return; }

    if (this.indeterminate) {
      this.indeterminate = false;

      this.checked = !this.indeterminateToChecked ? false : true;
    } else {
      this.checked = !this.checked;
    }
    this._foundation.setChecked(this.checked);
    this._onChange(this.checked);
  }

  onChange(evt: Event): void {
    evt.stopPropagation();
  }

  /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     * indeterminate checkbox is clicked.
     */
  _onInputClick(evt: Event) {
    evt.stopPropagation();

    if (this.disabled) { return; }

    this.toggle();
    this.change.emit(new MdcCheckboxChange(this, this.checked));
  }

  setIndeterminate(indeterminate: boolean): void {
    if (this.disabled) { return; }

    const previousValue = this.indeterminate;

    this._indeterminate = toBoolean(indeterminate);
    this._foundation.setIndeterminate(indeterminate);
    this.indeterminateChange.emit({ source: this, indeterminate: indeterminate });
    if (!indeterminate && !this.indeterminateToChecked) {
      this._checked = false;
    }

    this._changeDetectorRef.markForCheck();
  }

  setIndeterminateToChecked(indeterminateToChecked: boolean): void {
    this._indeterminateToChecked = toBoolean(indeterminateToChecked);
    this._changeDetectorRef.markForCheck();
  }

  /** Sets the checkbox disabled state */
  setDisabled(disabled: boolean): void {
    this.setDisabledState(disabled);
  }

  isChecked(): boolean {
    return this._foundation.isChecked();
  }

  isDisabled(): boolean {
    return this._foundation.isDisabled();
  }

  getValue(): any {
    return this._foundation.getValue();
  }

  setChecked(checked: any): void {
    this._checked = checked;
    this._foundation.setValue(checked);

    this._changeDetectorRef.markForCheck();
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = toBoolean(disabled);
    this._foundation.setDisabled(disabled);
    this._changeDetectorRef.markForCheck();
  }

  /** Retrieves the DOM element of the input. */
  private _getInputElement(): HTMLElement {
    return this.inputEl.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
