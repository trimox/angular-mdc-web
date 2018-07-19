import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  Provider,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { EventRegistry, toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';

import { MDCIconButtonToggleAdapter } from '@material/icon-button/adapter';
import { MDCIconButtonToggleFoundation } from '@material/icon-button';

export const MDC_ICON_BUTTON_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcIconButton),
  multi: true
};

/** Change event object emitted by MdcIconButton. */
export class MdcIconButtonChange {
  constructor(
    /** The MdcIconButton that emits the event. */
    public source: MdcIconButton,

    /** The value assigned to the MdcIconButton. */
    public value: any) { }
}

let nextUniqueId = 0;

@Component({
  moduleId: module.id,
  selector: 'button[mdcIconButton], a[mdcIconButton]',
  exportAs: 'mdcIconButton',
  template: '<ng-content></ng-content>',
  host: {
    '[id]': 'id',
  },
  providers: [
    MDC_ICON_BUTTON_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
    EventRegistry,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcIconButton implements AfterViewInit, OnDestroy {
  private _uniqueId: string = `mdc-icon-button-${++nextUniqueId}`;

  @Input() id: string = this._uniqueId;
  get inputId(): string { return `${this.id || this._uniqueId}`; }

  @Input() name: string | null = null;
  @Input() labelOn: string;
  @Input() labelOff: string;

  @Input()
  get iconOn(): string { return this._iconOn; }
  set iconOn(value: string) {
    this.setIconOn(value);
  }
  private _iconOn: string;

  @Input()
  get iconOff(): string { return this._iconOff; }
  set iconOff(value: string) {
    this.setIconOff(value);
  }
  private _iconOff: string;

  @Input()
  get on(): boolean { return this._foundation.isOn(); }
  set on(value: boolean) {
    this.setOn(value);
  }
  private _on: boolean;

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

  @Output() readonly change: EventEmitter<MdcIconButtonChange> =
    new EventEmitter<MdcIconButtonChange>();

  @HostBinding('class.mdc-icon-button') isHostClass = true;
  @HostBinding('class.material-icons') isMaterialIcons = true;
  @HostBinding('attr.aria-pressed') ariaPressed: string = 'false';
  @HostBinding('attr.tabIndex') get tabindex(): number {
    return this.disabled ? -1 : 0;
  }

  @HostBinding('class.ng-mdc-icon-button--primary') get classPrimary(): string {
    return this.primary ? 'ng-mdc-icon-button--primary' : '';
  }
  @HostBinding('class.ng-mdc-icon-button--secondary') get classSecondary(): string {
    return this.secondary ? 'ng-mdc-icon-button--secondary' : '';
  }

  _onChange: (value: any) => void = () => { };
  _onTouched = () => { };

  private _mdcAdapter: MDCIconButtonToggleAdapter = {
    addClass: (className: string) =>
      this._getIconInnerSelector() ? this._getIconInnerSelector().classList.add(className) :
        this._getHostElement().classList.add(className),
    removeClass: (className: string) =>
      this._getIconInnerSelector() ? this._getIconInnerSelector().classList.remove(className) :
        this._getHostElement().classList.remove(className),
    registerInteractionHandler: (type: string, handler: EventListener) => this._registry.listen(type, handler, this._getHostElement()),
    deregisterInteractionHandler: (type: string, handler: EventListener) => this._registry.unlisten(type, handler),
    setText: (text: string) =>
      this._getIconInnerSelector() ? this._getIconInnerSelector().textContent = text : this._getHostElement().textContent = text,
    getAttr: (name: string) => this._getHostElement().getAttribute(name),
    setAttr: (name: string, value: string) => this._getHostElement().setAttribute(name, value),
    notifyChange: (evtData: { isOn: boolean }) => {
      this.change.emit(new MdcIconButtonChange(this, evtData.isOn));
      this._onChange(this._foundation.isOn());
    }
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    toggle(isOn: boolean): void,
    refreshToggleData(): void,
    isOn(): boolean
  } = new MDCIconButtonToggleFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    public ripple: MdcRipple,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._foundation.init();
    this._foundation.toggle(this._on || this._foundation.isOn());

    this.ripple.attachTo(this._getHostElement(), true);

    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.ripple.destroy();
    this._foundation.destroy();
  }

  writeValue(value: boolean): void {
    this._onChange(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  toggle(isOn: boolean): void {
    this._foundation.toggle(isOn);
  }

  refreshToggleData(): void {
    this._foundation.refreshToggleData();
  }

  isOn(): boolean {
    return this._foundation.isOn();
  }

  setIconOn(iconOn: string): void {
    this._iconOn = iconOn;

    if (!this._getIconInnerSelector()) {
      this._getHostElement().removeAttribute('data-toggle-on-class');
      this._getHostElement().setAttribute('data-toggle-on-content', iconOn);
    } else {
      this._getHostElement().removeAttribute('data-toggle-on-content');
      this._getHostElement().setAttribute('data-toggle-on-class', iconOn);
    }
    this._foundation.refreshToggleData();
  }

  setIconOff(iconOff: string): void {
    this._iconOff = iconOff;

    if (!this._getIconInnerSelector()) {
      this._getHostElement().removeAttribute('data-toggle-off-class');
      this._getHostElement().setAttribute('data-toggle-off-content', iconOff);
    } else {
      this._getHostElement().removeAttribute('data-toggle-off-content');
      this._getHostElement().setAttribute('data-toggle-on-class', iconOff);
    }
    this._foundation.refreshToggleData();
  }

  setOn(on: boolean): void {
    if (on !== this._on) {
      this._on = on;
      this._foundation.toggle(on);

      this._changeDetectorRef.markForCheck();
    }
  }

  setPrimary(primary: boolean): void {
    if (primary) {
      this.setSecondary(false);
    }

    this._primary = toBoolean(primary);
  }

  setSecondary(secondary: boolean): void {
    if (secondary) {
      this.setPrimary(false);
    }

    this._secondary = toBoolean(secondary);
  }

  /** Sets the button disabled state */
  setDisabled(disabled: boolean): void {
    this._disabled = toBoolean(disabled);
    disabled ? this._getHostElement().setAttribute('disabled', '') :
      this._getHostElement().removeAttribute('disabled');
    this._changeDetectorRef.markForCheck();
  }

  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  private _getIconInnerSelector() {
    const iconSelector = this.elementRef.nativeElement.firstElementChild;

    this.isMaterialIcons = !iconSelector ? true : false;
    return iconSelector;
  }
}
