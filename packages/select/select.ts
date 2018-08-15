import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  Self,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
  EventRegistry,
  isBrowser,
  toBoolean
} from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';

import { MdcNotchedOutline } from '@angular-mdc/web/notched-outline';
import { MdcFloatingLabel } from '@angular-mdc/web/floating-label';
import { MdcLineRipple } from '@angular-mdc/web/line-ripple';

import { MDCSelectAdapter } from '@material/select/adapter';
import { MDCSelectFoundation } from '@material/select';

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
    '[id]': 'id'
  },
  template: `
  <select #input
   class="mdc-select__native-control"
   (blur)="onBlur()"
   (change)="onChange($event)"
   (focus)="onFocus()">
    <ng-content #option></ng-content>
  </select>
  <label mdcFloatingLabel [attr.for]="id">{{hasFloatingLabel() ? placeholder : ''}}</label>
  <mdc-line-ripple *ngIf="!outlined"></mdc-line-ripple>
  <mdc-notched-outline *ngIf="outlined"></mdc-notched-outline>
  `,
  providers: [
    MDC_SELECT_CONTROL_VALUE_ACCESSOR,
    EventRegistry,
    MdcRipple
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcSelect implements AfterContentInit, ControlValueAccessor, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _uniqueId: string = `mdc-select-${++nextUniqueId}`;

  @Input() id: string = this._uniqueId;
  @Input() name: string | null = null;

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
    this.setDisabled(value);
  }
  private _disabled: boolean;

  @Input()
  get floatingLabel(): boolean { return this._floatingLabel; }
  set floatingLabel(value: boolean) {
    this.setFloatingLabel(value);
  }
  private _floatingLabel: boolean = true;

  @Input()
  get box(): boolean { return this._box; }
  set box(value: boolean) {
    if (value !== this._box) {
      this.setBox(value);
    }
  }
  private _box: boolean = true;

  @Input()
  get outlined(): boolean { return this._outlined; }
  set outlined(value: boolean) {
    if (value !== this._outlined) {
      this.setOutlined(value);
    }
  }
  private _outlined: boolean = false;

  @Input()
  get autosize(): boolean { return this._autosize; }
  set autosize(value: boolean) {
    this._autosize = value;
  }
  private _autosize: boolean = true;

  @Input()
  get compareWith() { return this._compareWith; }
  set compareWith(fn: (o1: any, o2: any) => boolean) {
    this._compareWith = fn;
    // A different comparator means the selection could change.
    this._initializeSelection();
  }
  private _compareWith = (o1: any, o2: any) => o1 === o2;

  /** Value of the select control. */
  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    if (newValue !== this._value) {
      this.writeValue(newValue);
      this._value = newValue;
    }
  }
  private _value: any;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<MdcSelectChange> =
    new EventEmitter<MdcSelectChange>();

  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   */
  @Output() readonly valueChange: EventEmitter<{ index: number, value: any }> = new EventEmitter<any>();

  @HostBinding('class.mdc-select') isHostClass = true;
  @HostBinding('tabindex') tabIndex: number = 0;
  @HostBinding('class.mdc-select--box') get classBox(): string {
    return this.box ? 'mdc-select--box' : '';
  }
  @HostBinding('class.mdc-select--outlined') get classOutlined(): string {
    return this.outlined ? 'mdc-select--outlined' : '';
  }

  @ViewChild(MdcFloatingLabel) _selectLabel: MdcFloatingLabel;
  @ViewChild(MdcLineRipple) _lineRipple: MdcLineRipple;
  @ViewChild('input') inputEl: ElementRef;
  @ViewChild(MdcNotchedOutline) _notchedOutline: MdcNotchedOutline;

  @ContentChildren('option', { descendants: true }) options: QueryList<HTMLOptionElement>;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when select has been touched */
  _onTouched = () => { };

  private _mdcAdapter: MDCSelectAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    hasClass: (className) => this._getHostElement().classList.contains(className),
    floatLabel: (shouldFloat: boolean) => this._selectLabel.float(shouldFloat),
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
    getValue: () => this._getInputElement().value,
    isRtl: () => getComputedStyle(this._getHostElement()).direction === 'rtl',
    hasLabel: () => !!this._selectLabel,
    getLabelWidth: () => this._selectLabel.getWidth(),
    hasOutline: () => !!this._notchedOutline,
    notchOutline: (labelWidth: number, isRtl: boolean) => this._notchedOutline.notch(labelWidth, isRtl),
    closeOutline: () => this._notchedOutline.closeNotch()
  };

  private _foundation: {
    updateDisabledStyle(disabled: boolean): void,
    notchOutline(openNotch: boolean): void,
    handleChange(): void,
    handleFocus(): void,
    handleBlur(): void
  } = new MDCSelectFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    private _ripple: MdcRipple,
    private _registry: EventRegistry) {

    // Force setter to be called in case id was not specified.
    this.id = this.id;
  }

  ngAfterContentInit(): void {
    this.options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      if (this._value) {
        this._initializeSelection();
      }

      Promise.resolve().then(() => {
        this._selectLabel.float(this.getValue());
        if (this.autosize) {
          this._setWidth();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    this._ripple.destroy();
  }

  writeValue(value: any): void {
    setTimeout(() => {
      if (value !== this.getValue()) {
        this.setSelectionByValue(value, false);
      }
    });
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  onChange(event: Event): void {
    this.setSelectionByValue((<any>event.target).value, true);
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

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      this.setSelectionByValue(this._value, false);
    });
  }

  /**
   * Sets the selected option based on a value. If no option can be
   * found with the designated value, the select trigger is cleared.
   */
  setSelectionByValue(value: any, isUserInput: boolean = true): void {
    const correspondingOption = this._selectValue(value);

    this._value = value;

    this._propagateChanges();
    if (isUserInput) {
      this._onChange(value);
    }

    this._changeDetectorRef.markForCheck();
  }

  private _selectValue(value: any): HTMLOptionElement | undefined {
    const correspondingOption = this.options.find((option: HTMLOptionElement) => {
      try {
        return option.value != null && this._compareWith(option.value, value);
      } catch {
        return false;
      }
    });

    return correspondingOption;
  }

  /** Emits change event to set the model value. */
  private _propagateChanges(fallbackValue?: any): void {
    let valueToEmit: any = null;

    valueToEmit = this._value ? this._value : fallbackValue;

    this.valueChange.emit({ index: this.getSelectedIndex(), value: valueToEmit });
    this._getInputElement().value = valueToEmit;
    this._foundation.handleChange();

    this.selectionChange.emit(new MdcSelectChange(this, this.getSelectedIndex(), valueToEmit));

    this._changeDetectorRef.markForCheck();
  }

  getValue(): any {
    return this._getInputElement().value;
  }

  setPlaceholder(text: string): void {
    this._placeholder = text;
  }

  getSelectedIndex(): number {
    return this._getInputElement().selectedIndex;
  }

  isDisabled(): boolean {
    return this.disabled;
  }

  setDisabled(disabled: boolean): void {
    this.setDisabledState(disabled);
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(disabled: boolean) {
    this._disabled = toBoolean(disabled);
    this._foundation.updateDisabledStyle(disabled);

    this._changeDetectorRef.markForCheck();
  }

  /** Styles the select as a box. */
  setBox(box: boolean): void {
    if (box && this._outlined) {
      this.setOutlined(false);
    }
    this._box = toBoolean(box);

    this.box ? this._ripple.attachTo(this._getHostElement(), false, this._getInputElement()) :
      this._ripple.destroy();

    this._changeDetectorRef.markForCheck();
  }

  /** Styles the select style to outlined. */
  setOutlined(outlined: boolean): void {
    if (outlined && this._box) {
      this.setBox(false);
    }
    this._outlined = toBoolean(outlined);

    setTimeout(() => {
      if (this.getValue() && this._outlined) {
        this._foundation.notchOutline(this.hasFloatingLabel());
      }
    });

    this._changeDetectorRef.markForCheck();
  }

  setFloatingLabel(floatingLabel: boolean) {
    this._floatingLabel = toBoolean(floatingLabel);

    setTimeout(() => {
      if (this.outlined && this.getValue()) {
        this._foundation.notchOutline(floatingLabel);
      }
    });

    this._changeDetectorRef.markForCheck();
  }

  focus(): void {
    if (!this.disabled) {
      this._getInputElement().focus();
    }
  }

  hasFloatingLabel(): boolean {
    return this._floatingLabel || !this.getValue();
  }

  private _setWidth() {
    if (this.options && this.placeholder) {
      const labelLength = this._selectLabel.elementRef.nativeElement.textContent.length;
      this._getHostElement().style.setProperty('width', `${labelLength}rem`);
    }
  }

  /** Retrieves the select input element. */
  private _getInputElement(): HTMLSelectElement {
    return this.inputEl.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
