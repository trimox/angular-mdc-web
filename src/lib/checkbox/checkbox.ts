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
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChange,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { toBoolean, EventRegistry } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/core';

import { MDCCheckboxAdapter } from './adapter';
import { MDCCheckboxFoundation } from '@material/checkbox';

let nextUniqueId = 0;

export interface MdcIndeterminateChange {
  source: MdcCheckbox;
  indeterminate: boolean;
}

export const MD_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcCheckbox),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'mdc-checkbox',
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
    (click)="_onInputClick($event)"
    (change)="_onChange($event)"/>
  <div class="mdc-checkbox__background">
    <svg class="mdc-checkbox__checkmark"
      viewBox="0 0 24 24">
      <path class="mdc-checkbox__checkmark__path"
            fill="none"
            stroke="white"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcCheckbox implements AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy {
  private _mdcAdapter: MDCCheckboxAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    registerAnimationEndHandler: (handler: EventListener) => {
      this._registry.listen('animationend', handler, this.elementRef.nativeElement);
    },
    deregisterAnimationEndHandler: (handler: EventListener) => {
      this._registry.unlisten('animationend', handler);
    },
    registerChangeHandler: (handler: EventListener) => {
      this._registry.listen('change', handler, this.inputEl.nativeElement);
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

  private _uniqueId: string = `mdc-checkbox-${++nextUniqueId}`;
  private _checked: boolean = false;
  private _indeterminate: boolean = false;
  private _disableRipple: boolean = false;
  private _disabled: boolean = false;

  @Input() id: string = this._uniqueId;
  get inputId(): string { return `${this.id || this._uniqueId}-input`; }
  @Input() name: string | null = null;
  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) {
    if (value !== this._checked) {
      this._checked = toBoolean(value);
      this._changeDetectorRef.markForCheck();
    }
  }
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    if (value !== this._disabled) {
      this._disabled = toBoolean(value);
    }
  }

  /// Alternative state of the checkbox, not user set-able state. Between
  /// [checked] and [indeterminate], only one can be true, though both can be
  /// false.
  /// `true` is INDETERMINATE and `false` is not.
  @Input()
  get indeterminate(): boolean { return this._indeterminate; }
  set indeterminate(value: boolean) {
    if (this.disabled) { return; }

    if (value !== this._indeterminate) {
      this._indeterminate = toBoolean(value);
      this._changeDetectorRef.markForCheck();
    }
  }

  @Input()
  get disableRipple(): boolean { return this._disableRipple; }
  set disableRipple(value: boolean) {
    this._disableRipple = toBoolean(value);
  }

  /// Determines the state to go into when [indeterminate] state is toggled.
  /// `true` will go to checked and `false` will go to unchecked.
  @Input() indeterminateToChecked: boolean = false;

  @Input() tabIndex: number = 0;
  @Input('aria-label') ariaLabel: string = '';
  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  /// Fired when checkbox is checked or unchecked, but not when set
  /// indeterminate. Sends the state of [checked].
  @Output() change: EventEmitter<MdcCheckbox> = new EventEmitter<MdcCheckbox>();

  /// Fired when checkbox goes in and out of indeterminate state, but not when
  /// set to checked. Sends the state of [indeterminate];
  @Output() indeterminateChange: EventEmitter<MdcIndeterminateChange>
    = new EventEmitter<MdcIndeterminateChange>();

  @HostBinding('class.mdc-checkbox') isHostClass = true;
  @ViewChild('input') inputEl: ElementRef;

  private _controlValueAccessorChangeFn: (value: any) => void = () => { };
  onTouched: () => any = () => { };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    public ripple: MdcRipple,
    private _registry: EventRegistry) { }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    const disableRipple = changes['disableRipple'];
    const indeterminate = changes['indeterminate'];
    const checked = changes['checked'];
    const disabled = changes['disabled'];

    if (disableRipple) {
      disableRipple.currentValue ? this.ripple.destroy() : this.ripple.init(true);
    }

    if (checked) {
      this._foundation.setChecked(checked.currentValue);
    }

    if (disabled) {
      this._foundation.setDisabled(disabled.currentValue);
    }

    if (indeterminate) {
      if (this.disabled) { return; }

      this._foundation.setIndeterminate(indeterminate.currentValue);
      if (!this.checked && indeterminate.previousValue) {
        this.indeterminateChange.emit({ source: this, indeterminate: indeterminate.currentValue });
      }
      if (!indeterminate.currentValue && !this.indeterminateToChecked) {
        this._checked = false;
      }
    }
  }

  ngAfterViewInit(): void {
    this._foundation.init();

    if (!this._disableRipple) {
      this.ripple.init(true);
    }
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  writeValue(value: any): void {
    if (value == null) { return; }
    this.checked = !!value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
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

      if (!this.indeterminateToChecked) {
        this.checked = false;
      } else {
        this.checked = true;
      }
    } else {
      this.checked = !this.checked;
    }
    this._foundation.setChecked(this.checked);
    this._controlValueAccessorChangeFn(this.checked);
  }

  _onChange(evt: Event): void {
    evt.stopPropagation();
  }

  /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param event
     */
  _onInputClick(event: Event) {
    event.stopPropagation();

    if (this.disabled) { return; }

    this.toggle();
    this.change.emit(this);
  }

  setIndeterminate(value: boolean): void {
    if (this.disabled) { return; }

    this.indeterminate = toBoolean(value);
    this.indeterminateChange.emit({ source: this, indeterminate: value });
  }

  /**
  * Sets the checkbox's disabled state. Implemented as a part of ControlValueAccessor.
  * @param isDisabled Whether the checkbox should be disabled.
  */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }
}
