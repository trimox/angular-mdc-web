import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Platform, toBoolean } from '@angular-mdc/web/common';
import { MdcRipple, MATCHES } from '@angular-mdc/web/ripple';
import { MdcFormFieldControl } from '@angular-mdc/web/form-field';

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
    'class': 'mdc-checkbox'
  },
  template: `
  <input type="checkbox"
    #input
    class="mdc-checkbox__native-control"
    [id]="inputId"
    [attr.name]="name"
    [tabIndex]="tabIndex"
    [attr.aria-label]="ariaLabel"
    [attr.aria-labelledby]="ariaLabelledby"
    [disabled]="disabled"
    [checked]="checked"
    [attr.value]="checked"
    [indeterminate]="indeterminate"
    (change)="onChange($event)"
    (click)="_onInputClick()"/>
  <div class="mdc-checkbox__background">
    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
      <path class="mdc-checkbox__checkmark-path"
            fill="none"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
    </svg>
    <div class="mdc-checkbox__mixedmark"></div>
  </div>
  `,
  providers: [
    MDC_CHECKBOX_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
    [{ provide: MdcFormFieldControl, useExisting: MdcCheckbox }]
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcCheckbox implements AfterViewInit, ControlValueAccessor, OnDestroy, MdcFormFieldControl<any> {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  readonly componentInstance = MdcCheckbox;

  createAdapter() {
    return {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      setNativeControlAttr: (attr: string, value: string) => this._getInputElement().setAttribute(attr, value),
      removeNativeControlAttr: (attr: string) => this._getInputElement().removeAttribute(attr),
      getNativeControl: () => this._getInputElement(),
      isIndeterminate: () => this.indeterminate,
      isChecked: () => this.checked,
      hasNativeControl: () => !!this._inputElement,
      setNativeControlDisabled: (disabled: boolean) => this._inputElement.nativeElement.disabled = disabled,
      forceLayout: () => this._getHostElement().offsetWidth,
      isAttachedToDOM: () => !!this._getInputElement().parentNode
    };
  }

  private _foundation: {
    init(): void,
    destroy(): void,
    setDisabled(disabled: boolean): void,
    handleChange(): void,
    handleAnimationEnd(): void
  } = new MDCCheckboxFoundation(this.createAdapter());

  private _uniqueId: string = `mdc-checkbox-${++nextUniqueId}`;

  @Input() id: string = this._uniqueId;
  get inputId(): string { return `${this.id || this._uniqueId}-input`; }

  @Input() name: string | null = null;

  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) {
    this._checked = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  private _checked: boolean;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabledState(value);
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
    this._indeterminateToChecked = toBoolean(value);
    this._changeDetectorRef.markForCheck();
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

  @ViewChild('input') _inputElement: ElementRef<HTMLInputElement>;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when component has been touched */
  _onTouched = () => { };

  constructor(
    private _platform: Platform,
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    public ripple: MdcRipple) { }

  ngAfterViewInit(): void {
    this._foundation.init();

    this._initRipple();
    this._loadListeners();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

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
    this._getInputElement().focus();
  }

  // Toggles checkbox via user action. When it is indeterminate, toggle
  /// can go to checked or unchecked, depending on state
  /// [indeterminateToChecked].
  toggle(): void {
    if (this.disabled) { return; }

    if (this.indeterminate) {
      this.indeterminate = false;

      this._checked = !this.indeterminateToChecked ? false : true;
    } else {
      this._checked = !this.checked;
    }
    this._onChange(this.checked);
  }

  onChange(evt: Event): void {
    this._foundation.handleChange();
    evt.stopPropagation();
  }

  _onInputClick(evt: Event) {
    if (this.disabled) { return; }

    this.toggle();
    this.change.emit(new MdcCheckboxChange(this, this.checked));
  }

  setIndeterminate(indeterminate: boolean): void {
    if (this.disabled) { return; }

    this._indeterminate = toBoolean(indeterminate);
    this.indeterminateChange.emit({ source: this, indeterminate: this.indeterminate });
    if (!this.indeterminate && !this.indeterminateToChecked) {
      this._checked = false;
    }

    this._changeDetectorRef.markForCheck();
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = toBoolean(disabled);
    this._foundation.setDisabled(this.disabled);
    this._changeDetectorRef.markForCheck();
  }

  private _initRipple(): void {
    const rippleAdapter = Object.assign(this.ripple.createAdapter({
      surface: this.elementRef.nativeElement,
      activator: this._getInputElement()
    }), {
        isUnbounded: () => true,
        isSurfaceActive: () => this._getInputElement()[MATCHES](':active')
      });

    this.ripple.init({
      surface: this.elementRef.nativeElement,
      activator: this._getInputElement()
    }, rippleAdapter);
  }

  private _loadListeners(): void {
    if (!this._platform.isBrowser) { return; }

    this._ngZone.runOutsideAngular(() =>
      fromEvent<AnimationEvent>(this._getHostElement(), 'animationend')
        .pipe(takeUntil(this._destroy), filter((e: AnimationEvent) =>
          e.target === this._getHostElement()))
        .subscribe(() => this._ngZone.run(() => this._foundation.handleAnimationEnd())));
  }

  /** Retrieves the DOM element of the input. */
  private _getInputElement(): HTMLElement {
    return this._inputElement.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
