import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  Provider,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { toBoolean, isSpaceKey, EventRegistry, SPACE } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcIcon } from '@angular-mdc/web/icon';

import { MDCIconToggleAdapter } from '@material/icon-toggle/adapter';
import { MDCIconToggleFoundation } from '@material/icon-toggle';

export const MD_ICON_TOGGLE_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcIconToggle),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'mdc-icon-toggle',
  exportAs: 'mdcIconToggle',
  template: '<mdc-icon></mdc-icon>',
  providers: [
    MD_ICON_TOGGLE_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
    EventRegistry,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class MdcIconToggle implements AfterViewInit, OnDestroy {
  @Input() iconOn: string;
  @Input() iconOff: string;
  @Input() labelOn: string;
  @Input() labelOff: string;
  @Input() cssClassOn: string;
  @Input() cssClassOff: string;

  onChange: (value: any) => void = () => { };
  onTouched = () => { };

  @Input()
  get iconClass(): string { return this._iconClass; }
  set iconClass(value: string) {
    this.setIconClass(value);
  }
  private _iconClass: string;

  @Input()
  get on(): boolean { return this._foundation.isOn(); }
  set on(value: boolean) {
    this.setOn(value);
  }
  private _on: boolean;

  get value(): any { return this._foundation.isOn(); }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabled(value);
  }
  private _disabled: boolean;

  @Input()
  get primary(): boolean { return this._primary; }
  set primary(value: boolean) {
    this.setPrimary(value);
  }
  private _primary: boolean;

  @Input()
  get secondary(): boolean { return this._secondary; }
  set secondary(value: boolean) {
    this.setSecondary(value);
  }
  private _secondary: boolean;

  @Output() readonly change: EventEmitter<boolean> = new EventEmitter();

  @HostBinding('class.mdc-icon-toggle') isHostClass = true;
  @HostBinding('attr.role') role: string = 'button';
  @HostBinding('attr.aria-pressed') ariaPressed: string = 'false';
  @HostBinding('attr.tabIndex') tabindex: string = '0';

  @HostBinding('class.ng-mdc-icon-toggle--primary') get classPrimary(): string {
    return this.primary ? 'ng-mdc-icon-toggle--primary' : '';
  }
  @HostBinding('class.ng-mdc-icon-toggle--secondary') get classSecondary(): string {
    return this.secondary ? 'ng-mdc-icon-toggle--secondary' : '';
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
  @HostListener('keydown', ['$event']) onkeydown(evt: KeyboardEvent) {
    this._onKeydown(evt);
  }

  @ViewChild(MdcIcon) icon: MdcIcon;

  private _mdcAdapter: MDCIconToggleAdapter = {
    addClass: (className: string) => this._renderer.addClass(this.iconClass ? this._getIconElement() : this._getHostElement(), className),
    removeClass: (className: string) =>
      this._renderer.removeClass(this.iconClass ? this._getIconElement() : this._getHostElement(), className),
    registerInteractionHandler: (type: string, handler: EventListener) => this._registry.listen(type, handler, this._getHostElement()),
    deregisterInteractionHandler: (type: string, handler: EventListener) => this._registry.unlisten(type, handler),
    setText: (text: string) => this._getIconElement().textContent = text,
    getTabIndex: () => this._getHostElement().tabIndex,
    setTabIndex: (tabIndex: number) => this._getHostElement().tabIndex = tabIndex,
    getAttr: (name: string) => this._getHostElement().getAttribute(name),
    setAttr: (name: string, value: string) => this._renderer.setAttribute(this._getHostElement(), name, value),
    rmAttr: (name: string) => this._renderer.removeAttribute(this._getHostElement(), name),
    notifyChange: (evtData: { isOn: boolean }) => {
      this.change.emit(evtData.isOn);
      this.onChange(this._foundation.isOn());
    }
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    setDisabled(isDisabled: boolean): void,
    isDisabled(): boolean,
    toggle(isOn?: boolean): void,
    refreshToggleData(): void,
    isKeyboardActivated(): boolean,
    isOn(): boolean
  } = new MDCIconToggleFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    public ripple: MdcRipple,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._foundation.init();
    this._foundation.refreshToggleData();
    this._foundation.toggle(this._on || this._foundation.isOn());

    this.ripple.attachTo(this._getHostElement(), true);

    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.ripple.destroy();
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

  setIconClass(iconClass: string): void {
    this._renderer.removeClass(this._getIconElement(), this._iconClass);
    this._iconClass = iconClass ? iconClass : 'material-icons';

    this._renderer.addClass(this._getIconElement(), this._iconClass);

    this._changeDetectorRef.markForCheck();
  }

  isOn(): boolean {
    return this._foundation.isOn();
  }

  setOn(on: boolean): void {
    if (on !== this._on) {
      this._on = on;
      this._foundation.refreshToggleData();
      this._foundation.toggle(on);

      this._changeDetectorRef.markForCheck();
    }
  }

  setPrimary(primary: boolean): void {
    this._primary = toBoolean(primary);
    this._changeDetectorRef.markForCheck();
  }

  setSecondary(secondary: boolean): void {
    this._secondary = toBoolean(secondary);
    this._changeDetectorRef.markForCheck();
  }

  /** Sets the button disabled state */
  setDisabled(disabled: boolean): void {
    this._disabled = disabled;
    this._foundation.setDisabled(disabled);
    this._changeDetectorRef.markForCheck();
  }

  private _onClick(event: Event): void {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  private _onKeydown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    if (event.keyCode === SPACE) {
      this.ripple.setSurfaceActive(true);
    } else {
      this.ripple.setSurfaceActive(false);
    }
  }

  private _getIconElement() {
    return this.icon.elementRef.nativeElement;
  }

  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
