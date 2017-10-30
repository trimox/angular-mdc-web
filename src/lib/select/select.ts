import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Provider,
  QueryList,
  Renderer2,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import { toBoolean, isBrowser } from '../common';
import { EventRegistry } from '../common/event-registry';
import { MDCSimpleMenu } from '@material/menu/simple';

import { MDCSelectAdapter } from './adapter';
import { MDCSelectFoundation } from '@material/select';

export const MDC_SELECT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcSelect),
  multi: true
};

export interface MdcSelectedData {
  index: number;
  value: string;
}

let nextUniqueId = 0;
let uniqueIdCounter = 0;

@Directive({
  selector: 'mdc-select-label'
})
export class MdcSelectLabel {
  @HostBinding('class.mdc-select__selected-text') isHostClass = true;

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
  selector: 'mdc-select-items',
})
export class MdcSelectItems {
  @HostBinding('class.mdc-list') isHostClass = true;
  @HostBinding('class.mdc-simple-menu__items') isSelectClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-select-item',
  host: {
    '[id]': 'id',
    'role': 'option',
    '[attr.aria-selected]': 'selected',
    '[attr.aria-disabled]': 'disabled',
  }
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

  @Input() value: any;
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
    value ? this.tabIndex = -1 : this.tabIndex = 0;
  }
  @HostBinding('class.mdc-list-item') isHostClass = true;
  @HostBinding('tabindex') tabIndex: number = 0;

  /** Selects the option. */
  select(): void {
    this._selected = true;
  }

  /** Deselects the option. */
  deselect(): void {
    this._selected = false;
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }
}

@Component({
  selector: 'mdc-select',
  host: {
    '[id]': 'id',
  },
  template:
  `
  <mdc-select-label>{{label}}</mdc-select-label>
  <mdc-select-menu>
    <mdc-select-items>
      <ng-content></ng-content>
    </mdc-select-items>
  </mdc-select-menu>
  `,
  providers: [
    MDC_SELECT_CONTROL_VALUE_ACCESSOR,
    EventRegistry,
  ],
})
export class MdcSelect implements AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy {
  private _itemsSubscription: ISubscription;
  private _scrollStream: ISubscription;
  private _label: string = '';
  private _value: any;
  private _uniqueId: string = `mdc-select-${++nextUniqueId}`;
  private _menuFactory: any;
  private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };
  private _onChange: (value: any) => void = () => { };
  private _onTouched = () => { };

  @Input() id: string = this._uniqueId;
  @Input() name: string | null = null;
  @Input()
  get label(): string { return this._label; }
  set label(value: string) {
    this._label = value;
  }
  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    if (newValue !== this._value) {
      this.writeValue(newValue);
      this._value = newValue;
    }
  }
  @Input()
  get disabled(): boolean { return this.isDisabled(); }
  set disabled(value: boolean) {
    this.setDisabled(value);
  }
  @Input() closeOnScroll: boolean = true;
  @Output() change = new EventEmitter<MdcSelectedData>();
  @HostBinding('class.mdc-select') isHostClass = true;
  @HostBinding('attr.role') role: string = 'listbox';
  @HostBinding('tabindex') tabIndex: number = 0;
  @ViewChild(MdcSelectMenu) selectMenu: MdcSelectMenu;
  @ViewChild(MdcSelectItems) selectItems: MdcSelectItems;
  @ContentChildren(MdcSelectItem) options: QueryList<MdcSelectItem>;

  private _mdcAdapter: MDCSelectAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
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
      this._registry.listen(this._renderer, type, handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten(type, handler);
    },
    focus: () => this.elementRef.nativeElement.focus(),
    makeTabbable: () => this.elementRef.nativeElement.tabIndex = 0,
    makeUntabbable: () => this.elementRef.nativeElement.tabIndex = -1,
    getComputedStyleValue: (propertyName: string) => {
      return isBrowser() ? window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue(propertyName) : '';
    },
    setStyle: (propertyName: string, value: string) => {
      this._renderer.setProperty(this.elementRef.nativeElement, propertyName, value);
    },
    create2dRenderingContext: () => {
      return this._renderer.createElement('canvas').getContext('2d');
    },
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
      return this._getItemByIndex(index).elementRef.nativeElement.textContent;
    },
    getValueForOptionAtIndex: (index: number) => {
      return this._getItemByIndex(index).value || this._getItemByIndex(index).elementRef.nativeElement.textContent;
    },
    setAttrForOptionAtIndex: (index: number, attr: string, value: string) => {
      this._renderer.setAttribute(this._getItemByIndex(index).elementRef.nativeElement, attr, value);
    },
    rmAttrForOptionAtIndex: (index: number, attr: string) => {
      this._renderer.removeAttribute(this._getItemByIndex(index).elementRef.nativeElement, attr);
    },
    getOffsetTopForOptionAtIndex: (index: number) => {
      return this._getItemByIndex(index).elementRef.nativeElement.offsetTop;
    },
    registerMenuInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen(this._renderer, type, handler, this.selectMenu.elementRef.nativeElement);
    },
    deregisterMenuInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten(type, handler);
    },
    notifyChange: () => {
      this.change.emit({
        index: this._foundation.getSelectedIndex(),
        value: this._foundation.getValue(),
      });
      this._controlValueAccessorChangeFn(this._foundation.getValue());
      this.setSelectedIndex(this._foundation.getSelectedIndex());
    },
    getWindowInnerHeight: () => isBrowser() ? window.innerHeight : 0,
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

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._itemsSubscription = this.options.changes.subscribe(_ => {
      this._foundation.resize();
    });
    this._menuFactory = new MDCSimpleMenu(this.selectMenu.elementRef.nativeElement);
    this._foundation.init();
  }

  ngOnDestroy(): void {
    if (this._itemsSubscription) {
      this._itemsSubscription.unsubscribe();
    }
    if (this._scrollStream) {
      if (!this._scrollStream.closed) {
        this._scrollStream.unsubscribe();
      }
    }
    this._foundation.destroy();
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    let _closeOnScroll = changes['closeOnScroll'];

    if (_closeOnScroll && isBrowser()) {
      if (_closeOnScroll.currentValue && (!this._scrollStream || this._scrollStream.closed)) {
        this._scrollStream = Observable.fromEvent(window, 'scroll')
          .subscribe(res => {
            if (this._mdcAdapter.isMenuOpen()) {
              this.close();
            }
          });
      } else {
        if (this._scrollStream) {
          this._scrollStream.unsubscribe();
        }
      }
    }
  }

  writeValue(value: any): void {
    if (this.options) {
      this.setSelectionByValue(value);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  getValue(): string {
    return this._foundation.getValue();
  }

  setLabel(text: string): void {
    this._label = text;
  }

  getSelectedIndex(): number {
    return this._foundation.getSelectedIndex();
  }

  clearSelection(): void {
    this.options.forEach((_) => _.deselect);
  }

  setSelectionByValue(value: any): void {
    this.clearSelection();
    if (value) {
      this.setSelectedIndex(this.options.toArray().findIndex((_) => _.value == value));
    }
  }

  setSelectedIndex(index: number): void {
    this.clearSelection();
    this._foundation.setSelectedIndex(index);
    this.options.toArray()[this._foundation.getSelectedIndex()].select();
  }

  open(index: number = 0): void {
    this._mdcAdapter.openMenu(index);
  }

  close(): void {
    this._menuFactory.hide();
    this._renderer.removeClass(this.elementRef.nativeElement, 'mdc-select--open');
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
    this.elementRef.nativeElement.focus();
  }

  private _getItemByIndex(index: number): MdcSelectItem | null {
    return this.options ? this.options.toArray()[index] : null;
  }
}
