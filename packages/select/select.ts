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
  OnDestroy,
  Optional,
  Output,
  QueryList,
  Self,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { merge, fromEvent, Subject, Subscription, Observable } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';

import { MdcNotchedOutline } from '@angular-mdc/web/notched-outline';
import { MdcFloatingLabel } from '@angular-mdc/web/floating-label';
import { MdcLineRipple } from '@angular-mdc/web/line-ripple';

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

const LINE_RIPPLE_EVENTS = [
  'mousedown',
  'touchstart'
];

let nextUniqueId = 0;

@Component({
  moduleId: module.id,
  selector: 'mdc-select',
  exportAs: 'mdcSelect',
  host: {
    '[id]': 'id',
    'class': 'mdc-select',
    '[class.mdc-select--outlined]': 'outlined'
  },
  template: `
  <select #input
   class="mdc-select__native-control"
   (blur)="onBlur()"
   (change)="onChange($event)"
   (focus)="onFocus()">
    <ng-content #option></ng-content>
  </select>
  <label mdcFloatingLabel [for]="id">{{_shouldHideFloatingLabel() ? '' : placeholder}}</label>
  <mdc-line-ripple *ngIf="!outlined"></mdc-line-ripple>
  <mdc-notched-outline *ngIf="outlined"></mdc-notched-outline>
  `,
  providers: [
    MDC_SELECT_CONTROL_VALUE_ACCESSOR,
    MdcRipple
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcSelect implements AfterContentInit, ControlValueAccessor, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _initialized: boolean = false;
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
    this.setDisabledState(value);
  }
  private _disabled: boolean;

  @Input()
  get floatingLabel(): boolean { return this._floatingLabel; }
  set floatingLabel(value: boolean) {
    this.setFloatingLabel(value);
  }
  private _floatingLabel: boolean = true;

  @Input()
  get outlined(): boolean { return this._outlined; }
  set outlined(value: boolean) {
    if (value !== this._outlined) {
      this.setOutlined(value);
    }
  }
  private _outlined: boolean;

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

  @ViewChild(MdcFloatingLabel) _selectLabel: MdcFloatingLabel;
  @ViewChild(MdcLineRipple) _lineRipple: MdcLineRipple;
  @ViewChild('input') inputEl: ElementRef;
  @ViewChild(MdcNotchedOutline) _notchedOutline: MdcNotchedOutline;

  @ContentChildren('option', { descendants: true }) options: QueryList<HTMLOptionElement>;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when select has been touched */
  _onTouched = () => { };

  private _lineRippleSubscription: Subscription;

  /** Combined stream of all of the line ripple events. */
  get lineRippleEvents(): Observable<any> {
    return merge(...LINE_RIPPLE_EVENTS.map(evt => fromEvent(this._getInputElement(), evt)));
  }

  createAdapter() {
    return {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
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
      getLabelWidth: () => this._selectLabel ? this._selectLabel.getWidth() : 0,
      hasOutline: () => !!this._notchedOutline,
      notchOutline: (labelWidth: number, isRtl: boolean) => this._notchedOutline.notch(labelWidth, isRtl),
      closeOutline: () => this._notchedOutline.closeNotch()
    };
  }

  private _foundation: {
    updateDisabledStyle(disabled: boolean): void,
    notchOutline(openNotch: boolean): void,
    handleChange(): void,
    handleFocus(): void,
    handleBlur(): void
  };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    private _ripple: MdcRipple) {

    // Force setter to be called in case id was not specified.
    this.id = this.id;
  }

  ngAfterContentInit(): void {
    this._foundation = new MDCSelectFoundation(this.createAdapter());
    this.init();

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

  init(): void {
    this._initFoundationVariants();
    this._initialized = true;
  }

  private _destroySelect(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._lineRipple) {
      this._lineRipple.destroy();
    }
    if (this._lineRippleSubscription) {
      this._lineRippleSubscription.unsubscribe();
    }
    if (this._ripple) {
      this._ripple.destroy();
    }
  }

  ngOnDestroy(): void {
    this._destroySelect();
  }

  private _reinitialize(): void {
    if (this._initialized) {
      this._destroySelect();
      this.init();
    }
  }

  private _initFoundationVariants(): void {
    Promise.resolve().then(() => {
      this._initRipple();
      this._initLineRipple();

      this._changeDetectorRef.markForCheck();
    });
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

  // Implemented as part of ControlValueAccessor.
  setDisabledState(disabled: boolean) {
    this._disabled = toBoolean(disabled);
    setTimeout(() => this._foundation.updateDisabledStyle(this._disabled));

    this._changeDetectorRef.markForCheck();
  }

  /** Styles the select style to outlined. */
  setOutlined(outlined: boolean): void {
    const newValue = toBoolean(outlined);

    if (newValue !== this._outlined) {
      this._outlined = toBoolean(newValue);
      this._reinitialize();
      setTimeout(() => this._foundation.notchOutline(this._shouldFloatLabel()));
    }
  }

  setFloatingLabel(floatingLabel: boolean): void {
    this._floatingLabel = toBoolean(floatingLabel);

    setTimeout(() => {
      if (this.outlined && this.getValue()) {
        this._foundation.notchOutline(this._floatingLabel);
      }
    });

    this._changeDetectorRef.markForCheck();
  }

  focus(): void {
    if (!this.disabled) {
      this._getInputElement().focus();
    }
  }

  _shouldHideFloatingLabel(): boolean {
    return !this._floatingLabel && this.getValue();
  }

  private _shouldFloatLabel(): boolean {
    return this._floatingLabel && this.getValue();
  }

  private _initRipple(): void {
    if (!this._ripple.initialized && !this.outlined) {
      this._ripple.init({
        surface: this._getHostElement(),
        activator: this._getInputElement()
      });
    } else {
      this._ripple.destroy();
    }
  }

  private _initLineRipple(): void {
    if (this._outlined) { return; }
    this._lineRippleSubscription = this.lineRippleEvents.pipe()
      .subscribe((evt: MouseEvent | TouchEvent) => {
        if (evt instanceof MouseEvent) {
          this._setRippleCenter(evt.clientX, evt.target!);
        } else {
          const clientX = evt.touches[0] && evt.touches[0].clientX;
          this._setRippleCenter(clientX, evt.target!);
        }
      });
  }

  /**
   * Sets the line ripple's transform origin, so that the line ripple activate
   * animation will animate out from the user's click location. */
  private _setRippleCenter(clientX: number, target: EventTarget): void {
    const targetClientRect = (<HTMLElement>target).getBoundingClientRect();
    const xCoordinate = clientX;
    const normalizedX = xCoordinate - targetClientRect.left;

    this._lineRipple.setRippleCenter(normalizedX);
  }

  private _setWidth(): void {
    if (this.options && this.placeholder) {
      if (this._selectLabel && this._selectLabel.elementRef.nativeElement.textContent) {
        const labelLength = this._selectLabel.elementRef.nativeElement.textContent.length;
        this._getHostElement().style.setProperty('width', `${labelLength}rem`);
      }
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
