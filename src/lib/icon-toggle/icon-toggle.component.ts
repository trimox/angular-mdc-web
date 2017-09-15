import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Provider,
  Renderer2,
  SimpleChange,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { toBoolean } from '../common';
import { EventRegistry } from '../common/event-registry';
import { MdcRipple } from '../ripple/ripple.directive';

import { MDCIconToggleAdapter } from './adapter';
import { MDCIconToggleFoundation } from '@material/icon-toggle';

export const MD_ICON_TOGGLE_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcIconToggleComponent),
  multi: true
};

@Component({
  selector: 'mdc-icon-toggle',
  template: `<i #icon class="material-icons"></i>`,
  encapsulation: ViewEncapsulation.None,
  providers: [
    MD_ICON_TOGGLE_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
    EventRegistry,
  ],
})
export class MdcIconToggleComponent implements AfterViewInit, OnChanges, OnDestroy {
  private value_: boolean = false;

  @Input() iconOn: string;
  @Input() iconOff: string;
  @Input() labelOn: string;
  @Input() labelOff: string;
  @Input() cssClassOn: string;
  @Input() cssClassOff: string;
  @Input() primary: boolean;
  @Input() secondary: boolean;
  @Input() iconClass: string;
  get value(): boolean { return this.value_; }
  set value(v) {
    this.value_ = toBoolean(v);
  }
  @Input()
  get disabled() { return this._foundation.isDisabled(); }
  set disabled(value) {
    this._foundation.setDisabled(value);
  }
  @Input()
  get disableRipple() { return this._ripple.disabled; }
  set disableRipple(value) {
    this._ripple.disabled = toBoolean(value);
  }
  @Output('change') change_: EventEmitter<boolean> = new EventEmitter();
  @HostBinding('class.mdc-icon-toggle') isHostClass = true;
  @HostBinding('attr.role') role: string = 'button';
  @HostBinding('attr.aria-pressed') ariaPressed: string = 'false';
  @HostBinding('attr.tabIndex') tabindex: string = '0';
  @HostBinding('class.mdc-icon-toggle--primary') get classPrimary() {
    return this.primary ? 'mdc-icon-toggle--primary' : '';
  }
  @HostBinding('class.mdc-icon-toggle--accent') get classSecondary() {
    return this.secondary ? 'mdc-icon-toggle--accent' : '';
  }
  @HostBinding('attr.data-toggle-on') get dataToggleOn() {
    return JSON.stringify({
      content: this.iconOn,
      label: this.labelOn,
      cssClass: this.cssClassOn
    });
  }
  @HostBinding('attr.data-toggle-off') get dataToggleOff() {
    return JSON.stringify({
      content: this.iconOff,
      label: this.labelOff,
      cssClass: this.cssClassOff
    });
  }
  @ViewChild('icon') iconInner: ElementRef;

  onTouched: () => any = () => { };

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };

  private _mdcAdapter: MDCIconToggleAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.iconClass ? this.iconInner.nativeElement : this._root.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.iconClass ? this.iconInner.nativeElement : this._root.nativeElement, className);
    },
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen_(this._renderer, type, handler, this._root);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten_(type, handler);
    },
    setText: (text) => this.iconInner.nativeElement.textContent = text,
    getTabIndex: () => this._root.nativeElement.tabIndex,
    setTabIndex: (tabIndex) => this._root.nativeElement.tabIndex = tabIndex,
    getAttr: (name) => this._root.nativeElement.getAttribute(name),
    setAttr: (name, value) => this._renderer.setAttribute(this._root.nativeElement, name, value),
    rmAttr: (name) => this._renderer.removeAttribute(this._root.nativeElement, name),
    notifyChange: (evtData: { isOn: boolean }) => {
      this._controlValueAccessorChangeFn(evtData.isOn);
      this.change_.emit(evtData.isOn);
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    setDisabled: Function,
    isDisabled: Function,
    isKeyboardActivated: Function,
    toggle: Function,
    refreshToggleData: Function,
    isOn: Function,
  } = new MDCIconToggleFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef,
    private _ripple: MdcRipple,
    private _registry: EventRegistry) { }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    let change = changes['iconClass'];

    if (change) {
      this._renderer.addClass(this.iconInner.nativeElement, this.iconClass);
    }
  }

  ngAfterViewInit() {
    this._foundation.init();
    this._ripple.init(true);
    this._ripple.active = !this._foundation.isKeyboardActivated();
    this._foundation.toggle(this._foundation.isOn());
    this._foundation.refreshToggleData();
  }

  ngOnDestroy() {
    this._foundation.destroy();
  }

  writeValue(value: boolean) {
    this.value_ = value;
  }

  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  toggle(isOn?: boolean) {
    this._foundation.toggle(isOn);
  }

  refreshToggleData() {
    this._foundation.refreshToggleData();
  }

  isOn() {
    this._foundation.isOn();
  }
}
