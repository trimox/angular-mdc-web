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
  ViewEncapsulation
} from '@angular/core';
import { EventRegistry } from '@angular-mdc/web/common';
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
  changeDetection: ChangeDetectionStrategy.OnPush
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
  get outlined(): boolean { return this._outlined; }
  set outlined(value: boolean) {
    this.setOutlined(value);
  }
  protected _outlined: boolean = false;

  @Input()
  get icon(): any { return this._icon; }
  set icon(value: any) {
    this.setIcon(value);
  }
  protected _icon: any;

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
  @HostBinding('class.ng-mdc-button--primary') get classPrimary(): string {
    return this.primary ? 'ng-mdc-button--primary' : '';
  }
  @HostBinding('class.ng-mdc-button--secondary') get classSecondary(): string {
    return this.secondary ? 'ng-mdc-button--secondary' : '';
  }
  @HostBinding('class.mdc-button--dense') get classDense(): string {
    return this.dense ? 'mdc-button--dense' : '';
  }
  @HostBinding('class.mdc-button--unelevated') get classUnelevated(): string {
    return this.unelevated ? 'mdc-button--unelevated' : '';
  }
  @HostBinding('class.mdc-button--outlined') get classOutlined(): string {
    return this.outlined ? 'mdc-button--outlined' : '';
  }
  @HostListener('click', ['$event']) onclick(evt: Event) {
    this._onClick(evt);
  }
  @ContentChild(MdcIcon) buttonIcon: MdcIcon;

  constructor(
    protected _renderer: Renderer2, // remove after dialog PR#1057
    protected _elementRef: ElementRef,
    protected _ripple: MdcRipple) { }

  ngAfterContentInit(): void {
    this._ripple.attachTo(this.getHostElement());
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }

  setDisabled(disabled: boolean): void {
    this._disabled = disabled;

    if (disabled) {
      this.getHostElement().setAttribute('disabled', 'true');
      this.getHostElement().setAttribute('aria-disabled', 'true');
    } else {
      this.getHostElement().removeAttribute('disabled');
      this.getHostElement().removeAttribute('aria-disabled');
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

  setOutlined(outlined: boolean): void {
    this._outlined = outlined;
  }

  setIcon(icon: any): void {
    this._icon = icon;

    if (this.buttonIcon) {
      this.buttonIcon.elementRef.nativeElement.classList.add('mdc-button__icon');
    } else if (icon) {
      this.icon.classList.add('mdc-button__icon');
    }
  }

  /** Focuses the button. */
  focus(): void {
    this.getHostElement().focus();
  }

  getHostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  private _onClick(event: Event): void {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
