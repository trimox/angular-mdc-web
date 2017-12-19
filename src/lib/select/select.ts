import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgForm,
} from '@angular/forms';
import { defer } from 'rxjs/observable/defer';
import { filter } from 'rxjs/operators/filter';
import { merge } from 'rxjs/observable/merge';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { Subject } from 'rxjs/Subject';
import { switchMap } from 'rxjs/operators/switchMap';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';

import {
  EventRegistry,
  isBrowser,
  isSpaceKey,
  KeyCodes,
  toBoolean,
} from '@angular-mdc/web/common';
import { MDCSimpleMenu } from '@material/menu/simple';
import { MdcRippleDirective } from '@angular-mdc/web/ripple';

import { MDCSelectAdapter } from './adapter';
import { MDCSelectFoundation } from '@material/select';

export interface MdcSelectedData {
  index: number;
  value: string;
}

export interface MdcSelectedItem {
  source: MdcSelectItem;
  isUserInput: boolean;
}

let nextUniqueId = 0;
let uniqueIdCounter = 0;

@Directive({
  selector: 'mdc-select-label'
})
export class MdcSelectLabel {
  @HostBinding('class.mdc-select__label') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-select-menu',
})
export class MdcSelectMenu {
  @HostBinding('class.mdc-simple-menu') isHostClass = true;
  @HostBinding('class.mdc-select__menu') isSelectClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-select-items'
})
export class MdcSelectItems {
  @HostBinding('class.mdc-list') isHostClass = true;
  @HostBinding('class.mdc-simple-menu__items') isSelectClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-select-surface'
})
export class MdcSelectSurface {
  @HostBinding('class.mdc-select__surface') isHostClass = true;

  public getHostElement(): any {
    return this._elementRef.nativeElement;
  }

  constructor(private _elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-select-selected-text'
})
export class MdcSelectSelectedText {
  @HostBinding('class.mdc-select__selected-text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-select-bottom-line'
})
export class MdcSelectBottomLine {
  @HostBinding('class.mdc-select__bottom-line') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-select-item',
  template: '<ng-content></ng-content>',
  host: {
    '[id]': 'id',
    'role': 'option',
    '[attr.tabindex]': '_getTabIndex()',
    '(click)': '_selectViaInteraction()',
  },
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdcSelectItem {
  private _selected = false;
  private _disabled: boolean = false;
  private _id = `mdc-select-item-${uniqueIdCounter++}`;

  /** The unique ID of the option. */
  get id(): string { return this._id; }

  /** Whether or not the option is currently selected. */
  get selected(): boolean { return this._selected; }

  /** The displayed label of the option. */
  get label(): string {
    return (this.elementRef.nativeElement.textContent || '').trim();
  }

  /** The form value of the option. */
  @Input() value: any;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.tabIndex = value ? -1 : 0;
    this._changeDetectorRef.markForCheck();
  }

  /** Event emitted when the option is selected or deselected. */
  @Output() onSelectionChange = new EventEmitter<MdcSelectedItem>();

  @HostBinding('class.mdc-list-item') isHostClass = true;
  @HostBinding('tabindex') tabIndex: number = 0;
  @HostBinding('attr.aria-disabled') get ariaDisabled(): string {
    return this._disabled ? 'true' : '';
  }
  @HostListener('keydown', ['$event']) keydown($event) {
    this._onKeydown($event);
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  /** Selects the option. */
  select(): void {
    this._selected = true;
    this._changeDetectorRef.markForCheck();
    this._emitSelectionChangeEvent();
  }

  /** Deselects the option. */
  deselect(): void {
    this._selected = false;
    this._changeDetectorRef.markForCheck();
    this._emitSelectionChangeEvent();
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
  _selectViaInteraction(): void {
    if (!this.disabled) {
      this._selected = true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent(true);
    }
  }

  /** Returns the correct tabindex for the option depending on disabled state. */
  private _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  _onKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    if (keyCode === KeyCodes.ENTER || isSpaceKey(event)) {
      this._selectViaInteraction();

      // Prevent the page from scrolling down and form submits.
      event.preventDefault();
    }
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(isUserInput = false): void {
    this.onSelectionChange.emit({ source: this, isUserInput: isUserInput });
  }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-select',
  host: {
    '[id]': 'id',
  },
  template: `
  <mdc-ripple>
    <mdc-select-surface>
      <mdc-select-label>{{placeholder}}</mdc-select-label>
      <mdc-select-selected-text>{{label}}</mdc-select-selected-text>
      <mdc-select-bottom-line></mdc-select-bottom-line>
    </mdc-select-surface>
  </mdc-ripple>
  <mdc-select-menu>
    <mdc-select-items>
      <ng-content></ng-content>
    </mdc-select-items>
  </mdc-select-menu>
  `,
  providers: [
    EventRegistry,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcSelect implements AfterViewInit, AfterContentInit, ControlValueAccessor, OnDestroy {
  private _mdcAdapter: MDCSelectAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    addClassToLabel: (className: string) => {
      this._renderer.addClass(this.selectLabel.elementRef.nativeElement, className);
    },
    removeClassFromLabel: (className: string) => {
      this._renderer.removeClass(this.selectLabel.elementRef.nativeElement, className);
    },
    addClassToBottomLine: (className: string) => {
      this._renderer.addClass(this.bottomLine.elementRef.nativeElement, className);
    },
    removeClassFromBottomLine: (className: string) => {
      this._renderer.removeClass(this.bottomLine.elementRef.nativeElement, className);
    },
    setBottomLineAttr: (attr: string, value: string) => {
      this._renderer.setAttribute(this.bottomLine.elementRef.nativeElement, attr, value);
    },
    setAttr: (attr: string, value: string) => {
      this._renderer.setAttribute(this.elementRef.nativeElement, attr, value);
    },
    rmAttr: (attr: string) => {
      this._renderer.removeAttribute(this.elementRef.nativeElement, attr);
    },
    computeBoundingRect: () => {
      return this.elementRef.nativeElement.getBoundingClientRect();
    },
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen(type, handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten(type, handler);
    },
    focus: () => this.elementRef.nativeElement.focus(),
    makeTabbable: () => this.elementRef.nativeElement.tabIndex = 0,
    makeUntabbable: () => this.elementRef.nativeElement.tabIndex = -1,
    getComputedStyleValue: (propertyName: string) => {
      return isBrowser() ? window.getComputedStyle(this.surface.getHostElement()).getPropertyValue(propertyName) : '';
    },
    setStyle: (propertyName: string, value: string) => {
      this._renderer.setProperty(this.surface.getHostElement(), propertyName, value);
    },
    create2dRenderingContext: () => document.createElement('canvas').getContext('2d'),
    setMenuElStyle: (propertyName: string, value: string) => {
      this._renderer.setStyle(this.selectMenu.elementRef.nativeElement, propertyName, value);
    },
    setMenuElAttr: (attr: string, value: string) => {
      this._renderer.setAttribute(this.selectMenu.elementRef.nativeElement, attr, value);
    },
    rmMenuElAttr: (attr: string) => {
      this._renderer.removeAttribute(this.selectMenu.elementRef.nativeElement, attr);
    },
    getMenuElOffsetHeight: () => {
      return this.selectMenu.elementRef.nativeElement.offsetHeight;
    },
    openMenu: (focusIndex: number) => {
      this._menuFactory.show({ focusIndex });
    },
    isMenuOpen: () => this._menuFactory.open,
    setSelectedTextContent: (textContent: string) => {
      this._label = textContent;
    },
    getNumberOfOptions: () => {
      return this.options ? this.options.length : 0;
    },
    getTextForOptionAtIndex: (index: number) => {
      const item = this._getItemByIndex(index);
      return item ? item.elementRef.nativeElement.textContent : null;
    },
    getValueForOptionAtIndex: (index: number) => {
      const item = this._getItemByIndex(index);
      return item ? item.value || item.elementRef.nativeElement.textContent : null;
    },
    setAttrForOptionAtIndex: (index: number, attr: string, value: string) => {
      const item = this._getItemByIndex(index);
      if (item) {
        this._renderer.setAttribute(item.elementRef.nativeElement, attr, value);
      }
    },
    rmAttrForOptionAtIndex: (index: number, attr: string) => {
      const item = this._getItemByIndex(index);
      if (item) {
        this._renderer.removeAttribute(item.elementRef.nativeElement, attr);
      }
    },
    getOffsetTopForOptionAtIndex: (index: number) => {
      const item = this._getItemByIndex(index);
      return item ? item.elementRef.nativeElement.offsetTop : 0;
    },
    registerMenuInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen(type, handler, this.selectMenu.elementRef.nativeElement);
    },
    deregisterMenuInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten(type, handler);
    },
    notifyChange: () => {
      this.change.emit({
        index: this._foundation.getSelectedIndex(),
        value: this._foundation.getValue(),
      });
    },
    getWindowInnerHeight: () => isBrowser() ? window.innerHeight : 0,
    addBodyClass: (className: string) => {
      if (isBrowser()) {
        this._renderer.addClass(document.body, className);
      }
    },
    removeBodyClass: (className: string) => {
      this._renderer.removeClass(document.body, className);
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    getValue: Function,
    getSelectedIndex: Function,
    setSelectedIndex: Function,
    isDisabled: Function,
    setDisabled: Function,
    resize: Function,
  } = new MDCSelectFoundation(this._mdcAdapter);

  private _uniqueId: string = `mdc-select-${++nextUniqueId}`;
  @ViewChild(MdcSelectSurface) surface: MdcSelectSurface;
  @ViewChild(MdcSelectLabel) selectLabel: MdcSelectLabel;
  @ViewChild(MdcSelectBottomLine) bottomLine: MdcSelectBottomLine;
  @ViewChild(MdcSelectMenu) selectMenu: MdcSelectMenu;
  @ViewChild(MdcSelectItems) selectItems: MdcSelectItems;
  @ContentChildren(MdcSelectItem, { descendants: true }) options: QueryList<MdcSelectItem>;

  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  /** Comparison function to specify which option is displayed. Defaults to object equality. */
  private _compareWith = (o1: any, o2: any) => o1 === o2;

  private _label: string = '';
  private _placeholder: string;
  private _menuFactory: any;
  private _value: any;

  @Input() id: string = this._uniqueId;
  @Input() name: string | null = null;
  @Output() change = new EventEmitter<MdcSelectedData>();

  @HostBinding('class.mdc-select') isHostClass = true;
  @HostBinding('attr.role') role: string = 'listbox';
  @HostBinding('tabindex') tabIndex: number = 0;
  @HostListener('blur', ['$event']) blur() {
    this._onBlur();
  }

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when select has been touched */
  _onTouched = () => { };

  /** Value of the select control. */
  @Input()
  get value() { return this._value; }
  set value(newValue: any) {
    if (this.disabled) {
      return;
    }

    if (newValue !== this._value) {
      this.writeValue(newValue);
      this._value = newValue;
    }
  }

  /** Placeholder to be shown if no value has been selected. */
  @Input()
  get placeholder() { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
  }
  get label(): any { return this._label; }

  @Input()
  get disabled(): boolean { return this.isDisabled(); }
  set disabled(value: boolean) {
    this.setDisabled(value);
  }

  /** Combined stream of all of the child options' change events. */
  optionSelectionChanges: Observable<MdcSelectedItem> = defer(() => {
    if (this.options) {
      return merge(...this.options.map(option => option.onSelectionChange));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.optionSelectionChanges));
  });

  constructor(
    private _ngControl: NgControl,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) {

    if (this._ngControl) {
      this._ngControl.valueAccessor = this;
    }

    // Force setter to be called in case id was not specified.
    this.id = this.id;
  }

  ngAfterViewInit(): void {
    this._menuFactory = new MDCSimpleMenu(this.selectMenu.elementRef.nativeElement);
    this._foundation.init();
  }

  ngAfterContentInit() {
    this.options.changes.subscribe(_ => {
      this._foundation.resize();
    });

    this.options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._resetOptions();
      this._initializeSelection();
    });

    this.optionSelectionChanges.pipe(
      takeUntil(merge(this._destroy, this.options.changes)),
      filter(event => event.isUserInput)
    ).subscribe(event => {
      this._propagateChanges(event.source.value);
      this.close();
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    this._foundation.destroy();
  }

  writeValue(value: any): void {
    if (this.disabled || !this.options) {
      return;
    }

    if (value !== this._value) {
      this._propagateChanges(value);
    }
  }

  /** Drops current option subscriptions and IDs and resets from scratch. */
  private _resetOptions(): void {
    this.optionSelectionChanges.pipe(
      takeUntil(merge(this._destroy, this.options.changes)),
      filter(event => event.isUserInput)
    ).subscribe(event => {
      this._onChange(event.source.value);
      this._propagateChanges(event.source);

      this.close();
    });
  }

  private _propagateChanges(newValue: any): void {
    if (this.disabled || !this.options) {
      return;
    }
    this._value = newValue;
    this._foundation.setSelectedIndex(this.options.toArray().findIndex(_ => _.value === newValue));
    this._ngControl.valueAccessor.writeValue(newValue);

    if (this._foundation.getSelectedIndex() === -1) {
      this._mdcAdapter.removeClassFromLabel('mdc-select__label--float-above');
    } else {
      this._mdcAdapter.addClassToLabel('mdc-select__label--float-above');
    }

    this._changeDetectorRef.markForCheck();
    this._mdcAdapter.notifyChange();
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      this._setSelectionByValue(this._ngControl ? this._ngControl.value : this._value);
    });
  }

  /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
  private _setSelectionByValue(value: any, isUserInput = false): void {
    this._clearSelection();

    this._selectValue(value, isUserInput);
    if (value) {
      this._onChange(value);
    }
    this._ngControl.valueAccessor.writeValue(value);
    this._changeDetectorRef.markForCheck();
  }

  /** Finds and selects and option based on its value. */
  private _selectValue(value: any, isUserInput = false): MdcSelectItem | undefined {
    const correspondingOption = this.options.find((option: MdcSelectItem) => {
      // Treat null as a special reset value.
      return option.value != null && this._compareWith(option.value, value);
    });

    if (correspondingOption) {
      isUserInput ? correspondingOption._selectViaInteraction() : correspondingOption.select();
    }

    return correspondingOption;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  getValue(): string {
    return this._foundation.getValue();
  }

  private _clearSelection(skip?: MdcSelectItem): void {
    if (this.disabled || !this.options) {
      return;
    }

    this.options.forEach(option => {
      if (option !== skip) {
        option.deselect();
      }
    });
  }

  /** The currently selected option. */
  get selected(): MdcSelectItem {
    return this.options.find(_ => _.selected);
  }

  setPlaceholder(text: string): void {
    this._placeholder = text;
  }

  getSelectedIndex(): number {
    return this.options.toArray().findIndex(_ => _.selected);
  }

  open(index?: number): void {
    if (this.disabled) {
      return;
    }

    this._mdcAdapter.openMenu(index ? index : this._foundation.getSelectedIndex());
  }

  close(): void {
    if (this.isOpen()) {
      this._menuFactory.hide();
      this._renderer.removeClass(this.elementRef.nativeElement, 'mdc-select--open');
      this._changeDetectorRef.markForCheck();
      this.focus();
    }
  }

  isOpen(): boolean {
    return this._mdcAdapter.isMenuOpen();
  }

  isDisabled(): boolean {
    return this._foundation.isDisabled();
  }

  setDisabled(disabled: boolean): void {
    this._foundation.setDisabled(disabled);
  }

  resize(): void {
    this._foundation.resize();
  }

  focus(): void {
    if (!this.disabled) {
      this.elementRef.nativeElement.focus();
    }
  }

  private _onBlur(): void {
    if (!this.disabled) {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
    }
  }

  private _getItemByIndex(index: number): MdcSelectItem | null {
    return this.options ? this.options.toArray()[index] : null;
  }
}
