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
import { MdcRipple } from '../core/ripple/ripple.service';
import { MdcIcon } from '../icon/icon';

import { MDCIconToggleAdapter } from './adapter';
import { MDCIconToggleFoundation } from '@material/icon-toggle';

export const MD_ICON_TOGGLE_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcIconToggle),
  multi: true
};

@Component({
  selector: 'mdc-icon-toggle',
  template: '<mdc-icon></mdc-icon>',
  providers: [
    MD_ICON_TOGGLE_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
    EventRegistry,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MdcIconToggle implements AfterViewInit, OnChanges, OnDestroy {
  private _value: boolean = false;
  private _onTouched: () => any = () => { };
  private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };

  @Input() iconOn: string;
  @Input() iconOff: string;
  @Input() labelOn: string;
  @Input() labelOff: string;
  @Input() cssClassOn: string;
  @Input() cssClassOff: string;
  @Input() primary: boolean = false;
  @Input() secondary: boolean = false;
  @Input() iconClass: string;
  get value(): boolean { return this._value; }
  set value(v: boolean) {
    this._value = toBoolean(v);
  }
  @Input()
  get disabled(): boolean { return this._foundation.isDisabled(); }
  set disabled(value: boolean) {
    this._foundation.setDisabled(toBoolean(value));
  }
  @Output('change') _change: EventEmitter<boolean> = new EventEmitter();
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
  @ViewChild(MdcIcon) iconInner: MdcIcon;

  private _mdcAdapter: MDCIconToggleAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.iconClass ? this.iconInner.elementRef.nativeElement : this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.iconClass ? this.iconInner.elementRef.nativeElement : this.elementRef.nativeElement, className);
    },
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen(this._renderer, type, handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten(type, handler);
    },
    setText: (text: string) => this.iconInner.elementRef.nativeElement.textContent = text,
    getTabIndex: () => this.elementRef.nativeElement.tabIndex,
    setTabIndex: (tabIndex: number) => this.elementRef.nativeElement.tabIndex = tabIndex,
    getAttr: (name: string) => this.elementRef.nativeElement.getAttribute(name),
    setAttr: (name: string, value: string) => this._renderer.setAttribute(this.elementRef.nativeElement, name, value),
    rmAttr: (name: string) => this._renderer.removeAttribute(this.elementRef.nativeElement, name),
    notifyChange: (evtData: { isOn: boolean }) => {
      this._controlValueAccessorChangeFn(evtData.isOn);
      this._change.emit(evtData.isOn);
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
    public elementRef: ElementRef,
    public ripple: MdcRipple,
    private _registry: EventRegistry) { }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    let change = changes['iconClass'];

    if (change) {
      this._renderer.addClass(this.iconInner.elementRef.nativeElement, this.iconClass);
    }
  }

  ngAfterViewInit(): void {
    this._foundation.init();
    this.ripple.init(true);
    this.ripple.active = !this._foundation.isKeyboardActivated();
    this._foundation.toggle(this._foundation.isOn());
    this._foundation.refreshToggleData();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  writeValue(value: boolean): void {
    this._value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  toggle(isOn?: boolean): void {
    this._foundation.toggle(isOn);
  }

  refreshToggleData(): void {
    this._foundation.refreshToggleData();
  }

  isOn(): boolean {
    return this._foundation.isOn();
  }
}
