import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  Self,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { toBoolean, Platform } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcNotchedOutline } from '@angular-mdc/web/notched-outline';
import { MdcFloatingLabel } from '@angular-mdc/web/floating-label';
import { MdcMenu } from '@angular-mdc/web/menu';
import { MdcLineRipple } from '@angular-mdc/web/line-ripple';
import {
  MdcFormField,
  MdcFormFieldControl,
  MdcHelperText,
  ErrorStateMatcher,
  CanUpdateErrorState,
  CanUpdateErrorStateCtor,
  mixinErrorState
} from '@angular-mdc/web/form-field';
import { MdcList, MdcListItemChange } from '@angular-mdc/web/list';

import { MdcSelectIcon } from './select-icon';

import { MDCSelectHelperTextFoundation } from '@material/select/helper-text/index';
import { cssClasses } from '@material/select/constants';
import { MDCSelectFoundation } from '@material/select/index';

export class MdcSelectBase {
  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl) { }
}

export const _MdcSelectMixinBase: CanUpdateErrorStateCtor & typeof MdcSelectBase =
  mixinErrorState(MdcSelectBase);

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
    '[class.mdc-select--invalid]': 'errorState || !valid'
  },
  template: `
  <ng-content select="mdc-icon"></ng-content>
  <ng-container *ngIf="_list">
    <div #selectedText class="mdc-select__selected-text"
      [tabindex]="disabled ? '-1' : '0'"
      (blur)="onBlur()"
      (change)="onChange($event)"
      (focus)="onFocus()"
      (keydown)="onKeydown($event)"
      (mousedown)="onInteraction($event)"
      (touchstart)="onInteraction($event)">{{_enhancedSelectedText}}</div>
    <ng-content select="mdc-menu"></ng-content>
  </ng-container>
  <i class="mdc-select__dropdown-icon"></i>
  <select #nativeSelect *ngIf="!_list"
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
  <label mdcFloatingLabel *ngIf="!outlined" [for]="id">{{placeholderText}}</label>
  <mdc-line-ripple *ngIf="!outlined"></mdc-line-ripple>
  <mdc-notched-outline *ngIf="outlined" [label]="placeholderText" [for]="id"></mdc-notched-outline>
  `,
  providers: [
    MdcRipple,
    { provide: MdcFormFieldControl, useExisting: MdcSelect }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcSelect extends _MdcSelectMixinBase implements AfterViewInit, DoCheck,
  OnDestroy, ControlValueAccessor, MdcFormFieldControl<any>, CanUpdateErrorState {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  private _uniqueId: string = `mdc-select-${++nextUniqueId}`;

  controlType: string = 'mdc-select';
  _enhancedSelectedText: string = '';

  @Input() id: string = this._uniqueId;
  @Input() name: string | null = null;

  /** The aria-describedby attribute on the input for improved a11y. */
  _ariaDescribedby?: string;

  /** Placeholder to be shown if no value has been selected. */
  @Input()
  get placeholder() { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
  }
  private _placeholder: string = '';

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  private _disabled: boolean = false;

  @Input()
  get floatLabel(): boolean { return this._floatLabel; }
  set floatLabel(value: boolean) {
    this._floatLabel = toBoolean(value);
    this.layout();
  }
  private _floatLabel: boolean = true;

  @Input()
  get outlined(): boolean { return this._outlined; }
  set outlined(value: boolean) {
    const newValue = toBoolean(value);
    if (newValue !== this._outlined) {
      this._outlined = toBoolean(newValue);
      this.layout();
    }
  }
  private _outlined: boolean = false;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = toBoolean(value);
    if (!this._required) {
      this.valid = true;
    }
  }
  private _required: boolean = false;

  @Input()
  get valid(): boolean | undefined { return this._valid; }
  set valid(value: boolean | undefined) {
    this._valid = toBoolean(value);
    if (this._foundation) {
      this._foundation.setValid(this._valid);
    }
  }
  private _valid: boolean | undefined;

  @Input()
  get autosize(): boolean { return this._autosize; }
  set autosize(value: boolean) {
    this._autosize = toBoolean(value);
    this._setWidth();
  }
  private _autosize: boolean = false;

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
  get helperText(): MdcHelperText | null { return this._helperText; }
  set helperText(helperText: MdcHelperText | null) {
    if (this._helperText !== helperText) {
      this._helperText = helperText;
      this._initHelperText();
    }
  }
  private _helperText: MdcHelperText | null = null;

  /** An object used to control when error messages are shown. */
  @Input() errorStateMatcher?: ErrorStateMatcher;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<MdcSelectChange> =
    new EventEmitter<MdcSelectChange>();

  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   */
  @Output() readonly valueChange:
    EventEmitter<{ index: number, value: any }> = new EventEmitter<any>();

  @ViewChild(MdcFloatingLabel) _floatingLabel!: MdcFloatingLabel;
  @ViewChild(MdcLineRipple) _lineRipple!: MdcLineRipple;
  @ViewChild(MdcNotchedOutline) _notchedOutline!: MdcNotchedOutline;
  @ViewChild('nativeSelect') _nativeSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('selectedText') _selectedText!: ElementRef<HTMLElement>;
  @ContentChild(MdcMenu) _menu!: MdcMenu;
  @ContentChild(MdcSelectIcon) leadingIcon!: MdcSelectIcon;
  @ContentChild(MdcList) _list!: MdcList;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when select has been touched */
  _onTouched = () => { };

  get placeholderText(): string {
    return !this._hasFloatingLabel() && this.getValue() ? '' : this.placeholder;
  }

  private _createAdapter() {
    return Object.assign(
      this._isEnhancedVariant() ? this._getEnhancedSelectAdapterMethods() : this._getNativeSelectAdapterMethods(),
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
      notifyChange: (value: string) =>
        this.selectionChange.emit(new MdcSelectChange(this, this.getSelectedIndex(), value))
    };
  }

  private _getNativeSelectAdapterMethods() {
    return {
      getValue: () => this._platform.isBrowser ? this._nativeSelect.nativeElement.value : '',
      setValue: (value: any) => this._nativeSelect.nativeElement.value = value,
      isMenuOpen: () => false,
      setSelectedIndex: (index: number) => this._nativeSelect.nativeElement.selectedIndex = index,
      setDisabled: (isDisabled: boolean) => this._nativeSelect.nativeElement.disabled = isDisabled,
      setValid: (isValid: boolean) =>
        isValid ? this._getHostElement().classList.remove(cssClasses.INVALID) :
          this._getHostElement().classList.add(cssClasses.INVALID),
      checkValidity: () => this._nativeSelect.nativeElement.checkValidity()
    };
  }

  private _getEnhancedSelectAdapterMethods() {
    return {
      getValue: () => this.getValue() || '',
      openMenu: () => {
        if (this._menu && !this._menu.open) {
          this._menu.open = true;
          this._selectedText.nativeElement.setAttribute('aria-expanded', 'true');
        }
      },
      closeMenu: () => {
        if (this._menu && this._menu.open) {
          this._menu.open = false;
        }
      },
      isMenuOpen: () => this._menu && this._menu.open,
      setDisabled: (isDisabled: boolean) => {
        this._selectedText.nativeElement.setAttribute('aria-disabled', isDisabled.toString());
      },
      checkValidity: () => this._hasErrorState(),
      setValid: (isValid: boolean) => {
        this._selectedText.nativeElement.setAttribute('aria-invalid', (!isValid).toString());
        this._valid = isValid;
      }
    };
  }

  private _getOutlineAdapterMethods() {
    return {
      hasOutline: () => !!this._notchedOutline,
      notchOutline: (labelWidth: number) => this._notchedOutline.notch(labelWidth),
      closeOutline: () => this._notchedOutline.closeNotch()
    };
  }

  private _getLabelAdapterMethods() {
    return {
      floatLabel: (shouldFloat: boolean) => this._getFloatingLabel().float(shouldFloat),
      getLabelWidth: () => this._hasFloatingLabel() ? this._getFloatingLabel()!.getWidth() : 0
    };
  }

  /** Returns a map of all subcomponents to subfoundations.*/
  private _getFoundationMap() {
    return {
      helperText: this._helperText || undefined
    };
  }

  private _foundation!: {
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
    public elementRef: ElementRef<HTMLElement>,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() private _parentFormField: MdcFormField,
    @Optional() private _ripple: MdcRipple,
    @Self() @Optional() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective) {

    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);

    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    // Force setter to be called in case id was not specified.
    this.id = this.id;
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this._destroy();
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }
  }

  init(): void {
    this._foundation = new MDCSelectFoundation(this._createAdapter(), this._getFoundationMap());
    this._changeDetectorRef.detectChanges();

    // initialize after running a detectChanges()
    this._initRipple();
    this._initializeSelection();
    this._setWidth();
    this._enhancedSelectSetup();

    // Initially sync floating label
    this._foundation.handleChange(false);
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
    if (this._selectedText) {
      this._selectedText.nativeElement.focus();
    }
    this._foundation.handleClick(this._getNormalizedXCoordinate(evt));
  }

  onKeydown(evt: KeyboardEvent): void {
    this._foundation.handleKeydown(evt);
  }

  /**
   * Sets the selected option based on a value. If no option can be
   * found with the designated value, the select trigger is cleared.
   */
  setSelectionByValue(value: any, isUserInput: boolean = true): void {
    if (!this._foundation) { return; }

    const newValue = value || null;

    if (this._value === newValue) {
      // If value reset, change style to valid
      if (newValue === null) {
        this.valid = true;
      }
      return;
    }

    if (this._isEnhancedVariant()) {
      this._menu.open = false;
      this._enhancedSelectedText = this._list.getSelectedText();
    }

    this._value = newValue;
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
    if (this._isEnhancedVariant()) {
      return this._list ? this._list.getSelectedIndex() : -1;
    }

    return (<HTMLSelectElement>this._getInputElement()).selectedIndex || -1;
  }

  setSelectedIndex(index: number): void {
    this._foundation.setSelectedIndex(index);

    if (this._isEnhancedVariant()) {
      this._list.setSelectedIndex(index);
    }
    this.setSelectionByValue(this._isEnhancedVariant() ?
      this._list.getSelectedValue() : this._getInputElement().value);
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
      this._isEnhancedVariant() ? this._selectedText.nativeElement.focus() : this._getInputElement().focus();
    }
  }

  /** Initialize Select internal state based on the environment state */
  private layout(): void {
    if (this._foundation) {
      this._destroy();
    }

    this.init();
    this._changeDetectorRef.markForCheck();

    if (this._outlined) {
      this._foundation.layout();
    }
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      const value = this.ngControl ? this.ngControl.value : this._value;
      if (value) {
        this.setSelectionByValue(value);
        this._foundation.layout();
      }
    });
  }

  private _initHelperText(): void {
    const helper = this.helperText;
    if (helper) {
      helper.addHelperTextClass(this.controlType);
      helper.initFoundation(MDCSelectHelperTextFoundation);
    }
  }

  private _initRipple(): void {
    if (!this.outlined) {
      this._ripple.init({
        surface: this.elementRef.nativeElement,
        activator: this._nativeSelect ? this._nativeSelect.nativeElement : this._selectedText.nativeElement
      });
    }
  }

  private _destroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    if (this._lineRipple) {
      this._lineRipple.destroy();
    }
    if (this._ripple) {
      this._ripple.destroy();
    }
  }

  private _isEnhancedVariant(): boolean {
    return !!this._list;
  }

  private _enhancedSelectSetup(): void {
    if (this._isEnhancedVariant()) {
      this._menu.elementRef.nativeElement.classList.add('mdc-select__menu');
      this._menu.hoistToBody = true;
      this._menu.anchorElement = this._getHostElement();
      this._menu.wrapFocus = false;

      this._list.useSelectedClass = true;
      this._list.singleSelection = true;

      // Subscribe to menu opened event
      this._menu.opened.pipe(takeUntil(this._destroyed))
        .subscribe(() => {
          const selectedIndex = this._list.getSelectedIndex();
          if (selectedIndex > -1) {
            this._list.items.toArray()[selectedIndex].focus();
          }
        });

      // Subscribe to menu closed event
      this._menu.closed.pipe(takeUntil(this._destroyed))
        .subscribe(() => {
          this._selectedText.nativeElement.removeAttribute('aria-expanded');
          if (this._platform.isBrowser) {
            if (document.activeElement !== this._selectedText.nativeElement) {
              this._foundation.handleBlur();
            }
          }
        });

      // Subscribe to menu selected event
      this._list.selectionChange.pipe(takeUntil(this._destroyed))
        .subscribe((evt: MdcListItemChange) => {
          this.setSelectionByValue(evt.option.value, true);
        });
    }
  }

  private _hasErrorState(): boolean {
    if (this.ngControl) {
      return !this.errorState;
    }

    if (this.required && !this.disabled) {
      return this._list.getSelectedIndex() !== -1 && (this.getSelectedIndex() !== 0 || this.value);
    }
    return false;
  }

  private _hasFloatingLabel(): boolean {
    return this.placeholder && this.floatLabel && (this._floatingLabel || this._notchedOutline) ? true : false;
  }

  private _getFloatingLabel(): MdcFloatingLabel {
    return this._floatingLabel || this._notchedOutline.floatingLabel;
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
    if (this.placeholder && this.autosize) {
      const labelLength = this.placeholder.length;
      this._getHostElement().style.setProperty('width', `${labelLength}rem`);

      if (this._isEnhancedVariant()) {
        this._menu.elementRef.nativeElement.style.setProperty('width', `${labelLength}rem`);
      }
    } else {
      this._getHostElement().style.removeProperty('width');
    }
  }

  /** Retrieves the select input element. */
  private _getInputElement(): HTMLSelectElement {
    return this._nativeSelect.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
