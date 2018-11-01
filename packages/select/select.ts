import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';

import { toBoolean, Platform } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcNotchedOutline } from '@angular-mdc/web/notched-outline';
import { MdcFloatingLabel } from '@angular-mdc/web/floating-label';
import { MdcMenu } from '@angular-mdc/web/menu';
import { MdcLineRipple } from '@angular-mdc/web/line-ripple';
import { MdcFormField, MdcFormFieldControl } from '@angular-mdc/web/form-field';

import { MdcSelectIcon } from './select-icon';
import { MdcSelectHelperText } from './helper-text';

import { cssClasses } from '@material/select/constants';
import { MDCSelectFoundation } from '@material/select/index';

export const MDC_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcSelect),
  multi: true
};

export class MdcSelectChange {
  constructor(
    public source: MdcSelect,
    public index: number,
    public value: any) { }
}

let nextUniqueId = 0;

@Component({
  moduleId: module.id,
  selector: 'mdc-select',
  exportAs: 'mdcSelect',
  host: {
    '[id]': 'id',
    'class': 'mdc-select',
    '[class.mdc-select--disabled]': 'disabled',
    '[class.mdc-select--outlined]': 'outlined',
    '[class.mdc-select--required]': 'required',
    '[class.mdc-select--with-leading-icon]': 'leadingIcon',
  },
  template: `
  <ng-container *ngIf="_selectMenu">
    <input #nativeInput type="hidden">
    <div #selectedText class="mdc-select__selected-text"></div>
  </ng-container>
  <ng-content select="mdc-icon"></ng-content>
  <i class="mdc-select__dropdown-icon"></i>
  <select #nativeSelect *ngIf="!_selectMenu"
   class="mdc-select__native-control"
   [attr.aria-describedby]="_ariaDescribedby || null"
   [required]="required"
   (mousedown)="onInteraction($event)"
   (touchstart)="onInteraction($event)"
   (blur)="onBlur()"
   (change)="onChange($event)"
   (focus)="onFocus()">
    <ng-content></ng-content>
  </select>
  <label mdcFloatingLabel [for]="id">{{_floatingLabelValue()}}</label>
  <mdc-line-ripple *ngIf="!outlined"></mdc-line-ripple>
  <mdc-notched-outline *ngIf="outlined"></mdc-notched-outline>
  `,
  providers: [
    MdcRipple,
    MDC_SELECT_CONTROL_VALUE_ACCESSOR,
    { provide: MdcFormFieldControl, useExisting: MdcSelect }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcSelect implements OnInit, ControlValueAccessor, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _initialized: boolean = false;
  private _uniqueId: string = `mdc-select-${++nextUniqueId}`;

  readonly stateChanges: Subject<void> = new Subject<void>();

  @Input() id: string = this._uniqueId;
  @Input() name: string | null = null;
  /** The aria-describedby attribute on the input for improved a11y. */
  _ariaDescribedby: string;

  /** Placeholder to be shown if no value has been selected. */
  @Input()
  get placeholder() { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
  }
  private _placeholder: string;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  private _disabled: boolean;

  @Input()
  get floatingLabel(): boolean { return this._floatingLabel; }
  set floatingLabel(value: boolean) {
    this._floatingLabel = toBoolean(value);
    if (this.outlined && this.getValue()) {
      this._foundation.notchOutline(this._floatingLabel);
    }
    this._changeDetectorRef.markForCheck();
  }
  private _floatingLabel: boolean = true;

  @Input()
  get outlined(): boolean { return this._outlined; }
  set outlined(value: boolean) {
    const newValue = toBoolean(value);
    if (newValue !== this._outlined) {
      this._outlined = toBoolean(newValue);
      this._reinitialize();
    }
  }
  private _outlined: boolean;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = toBoolean(value);
    if (!this._required) {
      this.valid = true;
    }
  }
  private _required: boolean;

  @Input()
  get valid(): boolean { return this._valid; }
  set valid(value: boolean) {
    this._valid = toBoolean(value);
    if (this._foundation) {
      this._foundation.setValid(this._valid);
    }
  }
  private _valid: boolean;

  @Input()
  get autosize(): boolean { return this._autosize; }
  set autosize(value: boolean) {
    this._autosize = toBoolean(value);
  }
  private _autosize: boolean;

  @Input()
  get compareWith() { return this._compareWith; }
  set compareWith(fn: (o1: any, o2: any) => boolean) {
    this._compareWith = fn;
  }
  private _compareWith = (o1: any, o2: any) => o1 === o2;

  /** Value of the select control. */
  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    this.setSelectionByValue(newValue);
  }
  private _value: any;

  @Input()
  get helperText(): MdcSelectHelperText { return this._helperText; }
  set helperText(helperText: MdcSelectHelperText) {
    this._helperText = helperText;
  }
  private _helperText: MdcSelectHelperText;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<MdcSelectChange> =
    new EventEmitter<MdcSelectChange>();

  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   */
  @Output() readonly valueChange:
    EventEmitter<{ index: number, value: any }> = new EventEmitter<any>();

  @ViewChild(MdcFloatingLabel) _selectLabel: MdcFloatingLabel;
  @ViewChild(MdcLineRipple) _lineRipple: MdcLineRipple;
  @ViewChild(MdcNotchedOutline) _notchedOutline: MdcNotchedOutline;

  @ViewChild('nativeInput') _nativeInput: ElementRef<HTMLInputElement>;
  @ViewChild('nativeSelect') _nativeSelect: ElementRef<HTMLSelectElement>;
  @ViewChild('selectedText') _selectedText: ElementRef<HTMLElement>;
  @ContentChild(MdcMenu) _selectMenu: MdcMenu;
  @ContentChild(MdcSelectIcon) leadingIcon: MdcSelectIcon;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when select has been touched */
  _onTouched = () => { };

  private _createAdapter() {
    return Object.assign(
      this._getNativeSelectAdapterMethods(),
      this._getCommonAdapterMethods(),
      this._getOutlineAdapterMethods(),
      this._getLabelAdapterMethods()
    );
  }

  private _getCommonAdapterMethods() {
    return {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      isRtl: () => getComputedStyle(this._getHostElement()).direction === 'rtl',
      setRippleCenter: (normalizedX: number) => this._lineRipple && this._lineRipple.setRippleCenter(normalizedX),
      activateBottomLine: () => {
        if (this._lineRipple) {
          this._lineRipple.activate();
        }
      },
      deactivateBottomLine: () => {
        if (this._lineRipple) {
          this._lineRipple.deactivate();
        }
      },
      notifyChange: (value: string) => this.selectionChange.emit(new MdcSelectChange(this, this.getSelectedIndex(), value))
    };
  }

  private _getNativeSelectAdapterMethods() {
    return {
      getValue: () => this._nativeSelect.nativeElement.value,
      setValue: (value: any) => this._nativeSelect.nativeElement.value = value,
      openMenu: () => { },
      closeMenu: () => { },
      isMenuOpen: () => false,
      setSelectedIndex: (index: number) => this._nativeSelect.nativeElement.selectedIndex = index,
      setDisabled: (isDisabled: boolean) => this._nativeSelect.nativeElement.disabled = isDisabled,
      setValid: (isValid: boolean) =>
        isValid ? this._getHostElement().classList.remove(cssClasses.INVALID) :
          this._getHostElement().classList.add(cssClasses.INVALID),
      checkValidity: () => this._nativeSelect.nativeElement.checkValidity()
    };
  }

  private _getOutlineAdapterMethods() {
    return {
      hasOutline: () => !!this._notchedOutline,
      notchOutline: (labelWidth: number, isRtl: boolean) => this._notchedOutline.notch(labelWidth, isRtl),
      closeOutline: () => this._notchedOutline.closeNotch()
    };
  }

  private _getLabelAdapterMethods() {
    return {
      floatLabel: (shouldFloat: boolean) => this._selectLabel.float(shouldFloat),
      getLabelWidth: () => this._selectLabel ? this._selectLabel.getWidth() : 0
    };
  }

  /** Returns a map of all subcomponents to subfoundations.*/
  private _getFoundationMap() {
    return {
      helperText: this._helperText || undefined
    };
  }

  private _foundation: {
    setSelectedIndex(index: number): void,
    setValue(value: any): void,
    getValue(): any,
    setDisabled(isDisabled: boolean): void,
    updateDisabledStyle(disabled: boolean): void,
    notchOutline(openNotch: boolean): void,
    handleChange(didChange?: boolean): void,
    handleFocus(): void,
    handleBlur(): void,
    handleClick(normalizedX: number): void,
    handleKeydown(event: KeyboardEvent): void,
    setValid(isValid: boolean): void,
    isValid(): boolean,
    layout(): void
  };

  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    private _ripple: MdcRipple,
    @Optional() private _parentFormField: MdcFormField) {

    // Force setter to be called in case id was not specified.
    this.id = this.id;

    if (this._parentFormField) {
      _parentFormField.elementRef.nativeElement.classList.add('ngx-mdc-form-field');
    }
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this._destroySelect();
  }

  init(): void {
    this._foundation = new MDCSelectFoundation(this._createAdapter(), this._getFoundationMap());
    this._initialized = true;
    this._changeDetectorRef.detectChanges();

    // initialize these after detectChanges()
    this._initRipple();
    this._initializeSelection();
    this._setWidth();
  }

  writeValue(value: any): void {
    this.setSelectionByValue(value, false);
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  onChange(event: Event): void {
    this.setSelectionByValue((<any>event.target).value);
    event.stopPropagation();
  }

  onBlur(): void {
    if (!this.disabled) {
      this._foundation.handleBlur();
      this._onTouched();
    }
  }

  onFocus(): void {
    if (!this.disabled) {
      this._foundation.handleFocus();
      this._onTouched();
    }
  }

  onInteraction(evt: MouseEvent | TouchEvent): void {
    this._foundation.handleClick(this._getNormalizedXCoordinate(evt));
  }

  /**
   * Sets the selected option based on a value. If no option can be
   * found with the designated value, the select trigger is cleared.
   */
  setSelectionByValue(value: any, isUserInput: boolean = true): void {
    if (!this._foundation) { return; }

    this._value = value;
    this._foundation.setValue(this._value);
    this.valueChange.emit({ index: this.getSelectedIndex(), value: this._value });

    if (isUserInput) {
      this._onChange(this._value);
    }
    this._changeDetectorRef.markForCheck();
  }

  getValue(): any {
    return this._value;
  }

  getSelectedIndex(): number {
    return (<HTMLSelectElement>this._getInputElement()).selectedIndex;
  }

  setSelectedIndex(index: number): void {
    this._foundation.setSelectedIndex(index);
    this.setSelectionByValue(this._getInputElement().value);
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(disabled: boolean) {
    this._disabled = toBoolean(disabled);
    if (this._foundation) {
      this._foundation.setDisabled(this._disabled);
    }
    this._changeDetectorRef.markForCheck();
  }

  focus(): void {
    if (!this.disabled) {
      this._getInputElement().focus();
    }
  }

  _floatingLabelValue(): string {
    return !this._floatingLabel && this.getValue() ? '' : this.placeholder;
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      if (this.value) {
        this.setSelectionByValue(this.value);
      }
      this._foundation.layout();
    });
  }

  private _initRipple(): void {
    if (!this.outlined) {
      this._ripple.init({
        surface: this.elementRef.nativeElement,
        activator: this._nativeSelect ? this._nativeSelect.nativeElement : this._selectedText
      });
    }
  }

  private _destroySelect(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._lineRipple) {
      this._lineRipple.destroy();
    }
    if (this._ripple) {
      this._ripple.destroy();
    }
  }

  private _reinitialize(): void {
    if (this._initialized) {
      this._destroySelect();
      this.init();
    }
  }

  /**
   * Calculates where the line ripple should start based on the x coordinate within the component.
   */
  private _getNormalizedXCoordinate(evt: MouseEvent | TouchEvent): number {
    const targetClientRect = (<HTMLElement>evt.target).getBoundingClientRect();
    if (evt instanceof MouseEvent) {
      return evt.clientX - targetClientRect.left;
    }
    const clientX = evt.touches[0] && evt.touches[0].clientX;
    return clientX - targetClientRect.left;
  }

  private _setWidth(): void {
    if (!this.autosize) { return; }

    if (this._selectLabel && this._selectLabel.elementRef.nativeElement.textContent) {
      const labelLength = this._selectLabel.elementRef.nativeElement.textContent.length;
      this._getHostElement().style.setProperty('width', `${labelLength}rem`);
    }
  }

  /** Retrieves the select input element. */
  private _getInputElement(): HTMLSelectElement | HTMLInputElement {
    return this._nativeSelect ? this._nativeSelect.nativeElement : this._nativeInput.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
