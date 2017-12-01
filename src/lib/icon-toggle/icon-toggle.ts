import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
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
import { toBoolean, isSpaceKey, KeyCodes, EventRegistry } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/core';
import { MdcIcon } from '@angular-mdc/web/icon';

import { MDCIconToggleAdapter } from './adapter';
import { MDCIconToggleFoundation } from '@material/icon-toggle';

export const MD_ICON_TOGGLE_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcIconToggle),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'mdc-icon-toggle',
  template: '<mdc-icon></mdc-icon>',
  providers: [
    MD_ICON_TOGGLE_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
    EventRegistry,
  ],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class MdcIconToggle implements AfterViewInit, OnChanges, OnDestroy {
  private _mdcAdapter: MDCIconToggleAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.iconClass ? this.iconInner.elementRef.nativeElement : this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.iconClass ? this.iconInner.elementRef.nativeElement : this.elementRef.nativeElement, className);
    },
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen(type, handler, this.elementRef.nativeElement);
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
      this.change.emit(evtData.isOn);
      this.onChange(this._foundation.isOn());
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

  @Input() iconOn: string;
  @Input() iconOff: string;
  @Input() labelOn: string;
  @Input() labelOff: string;
  @Input() cssClassOn: string;
  @Input() cssClassOff: string;
  @Input() primary: boolean = false;
  @Input() secondary: boolean = false;
  @Input() iconClass: string;
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @HostBinding('class.mdc-icon-toggle') isHostClass = true;
  @HostBinding('attr.role') role: string = 'button';
  @HostBinding('attr.aria-pressed') ariaPressed: string = 'false';
  @HostBinding('attr.tabIndex') tabindex: string = '0';
  @ViewChild(MdcIcon) iconInner: MdcIcon;

  onChange = (value: any) => { };
  onTouched = () => { };

  get value(): any { return this._foundation.isOn(); }
  @Input()
  get disabled(): boolean { return this._foundation.isDisabled(); }
  set disabled(value: boolean) {
    this._foundation.setDisabled(toBoolean(value));
  }
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
  @HostListener('click', ['$event']) onclick(evt: Event) {
    this._onClick(evt);
  }
  @HostListener('keypress', ['$event']) onkeypress(evt: KeyboardEvent) {
    this._onKeyPress(evt);
  }
  @HostListener('blur', ['$event']) blur(evt: FocusEvent) {
    this._onBlur(evt);
  }

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    public ripple: MdcRipple,
    private _registry: EventRegistry) { }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    const iconClass = changes['iconClass'];

    if (iconClass) {
      this._renderer.addClass(this.iconInner.elementRef.nativeElement, this.iconClass);
    }
  }

  ngAfterViewInit(): void {
    this._foundation.init();
    this._foundation.toggle(this._foundation.isOn());
    this._foundation.refreshToggleData();

    this.ripple.init(true);
    this.ripple.activeSurface = !this._foundation.isKeyboardActivated();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  writeValue(value: boolean): void {
    this.onChange(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
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

  private _onClick(event: Event): void {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  private _onKeyPress(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    if (keyCode === KeyCodes.ENTER || isSpaceKey(event)) {
      this.ripple.activate(event);
      if (keyCode !== KeyCodes.ENTER) {
        event.preventDefault();
      }
    }
  }

  private _onBlur(event: FocusEvent): void {
    this.ripple.deactivate(event);
  }
}
