import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import {
  EventRegistry,
  toBoolean,
  isSpaceKey,
} from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcIcon } from '@angular-mdc/web/icon';

@Component({
  moduleId: module.id,
  exportAs: 'mdcButton',
  selector: 'button[mdc-button], a[mdc-button]',
  template: '<ng-content></ng-content>',
  providers: [
    MdcRipple,
    EventRegistry
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class MdcButton implements AfterContentInit, OnDestroy {
  @Input()
  get raised(): boolean { return this._raised; }
  set raised(value: boolean) {
    this.setRaised(value);
  }
  protected _raised: boolean = false;

  @Input()
  get primary(): boolean { return this._primary; }
  set primary(value: boolean) {
    this.setPrimary(value);
  }
  protected _primary: boolean = false;

  @Input()
  get dense(): boolean { return this._dense; }
  set dense(value: boolean) {
    this.setDense(value);
  }
  protected _dense: boolean = false;

  @Input()
  get secondary(): boolean { return this._secondary; }
  set secondary(value: boolean) {
    this.setSecondary(value);
  }
  protected _secondary: boolean = false;

  @Input()
  get unelevated(): boolean { return this._unelevated; }
  set unelevated(value: boolean) {
    this.setUnelevated(value);
  }
  protected _unelevated: boolean = false;

  @Input()
  get stroked(): boolean { return this._stroked; }
  set stroked(value: boolean) {
    this.setStroked(value);
  }
  protected _stroked: boolean = false;

  @Input()
  get icon(): boolean { return this._icon; }
  set icon(value: boolean) {
    this.setIcon(value);
  }
  protected _icon: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabled(value);
  }
  protected _disabled: boolean = false;

  @HostBinding('tabindex') get tabindex(): number {
    return this.disabled ? -1 : 0;
  }
  @HostBinding('class.mdc-button') isHostClass = true;
  @HostBinding('class.mdc-button--raised') get classRaised(): string {
    return this.raised ? 'mdc-button--raised' : '';
  }
  @HostBinding('class.mdc-button--primary') get classPrimary(): string {
    return this.primary ? 'mdc-button--primary' : '';
  }
  @HostBinding('class.mdc-button--secondary') get classSecondary(): string {
    return this.secondary ? 'mdc-button--secondary' : '';
  }
  @HostBinding('class.mdc-button--dense') get classDense(): string {
    return this.dense ? 'mdc-button--dense' : '';
  }
  @HostBinding('class.mdc-button--unelevated') get classUnelevated(): string {
    return this.unelevated ? 'mdc-button--unelevated' : '';
  }
  @HostBinding('class.mdc-button--stroked') get classStroked(): string {
    return this.stroked ? 'mdc-button--stroked' : '';
  }
  @HostListener('click', ['$event']) onclick(evt: Event) {
    this._onClick(evt);
  }
  @ContentChild(MdcIcon) buttonIcon: MdcIcon;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public ripple: MdcRipple) { }

  ngAfterContentInit(): void {
    this.ripple.attachTo(this._getHostElement());
  }

  ngOnDestroy(): void {
    this.ripple.destroy();
  }

  setDisabled(disabled: boolean): void {
    this._disabled = disabled;

    if (disabled) {
      this.renderer.setAttribute(this._getHostElement(), 'disabled', 'true');
      this.renderer.setAttribute(this._getHostElement(), 'aria-disabled', 'true');
    } else {
      this.renderer.removeAttribute(this._getHostElement(), 'disabled');
      this.renderer.removeAttribute(this._getHostElement(), 'aria-disabled');
    }
  }

  setRaised(raised: boolean): void {
    this._raised = raised;
  }

  setPrimary(primary: boolean): void {
    this._primary = primary;
  }

  setDense(dense: boolean): void {
    this._dense = dense;
  }

  setSecondary(secondary: boolean): void {
    this._secondary = secondary;
  }

  setUnelevated(unelevated: boolean): void {
    this._unelevated = unelevated;
  }

  setStroked(stroked: boolean): void {
    this._stroked = stroked;
  }

  setIcon(icon: boolean): void {
    this._icon = icon;

    if (icon && this.buttonIcon) {
      this.renderer.addClass(this.buttonIcon.elementRef.nativeElement, 'mdc-button__icon');
    } else {
      this.renderer.removeClass(this.buttonIcon.elementRef.nativeElement, 'mdc-button__icon');
    }
  }

  /** Focuses the button. */
  focus(): void {
    this._getHostElement().focus();
  }

  protected _getHostElement() {
    return this.elementRef.nativeElement;
  }

  private _onClick(event: Event): void {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
