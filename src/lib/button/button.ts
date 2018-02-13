import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange,
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
    EventRegistry,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcButton implements AfterContentInit, OnChanges {
  private _disabled: boolean = false;
  private _disableRipple: boolean = false;

  @Input() raised: boolean = false;
  @Input() primary: boolean = false;
  @Input() dense: boolean = false;
  @Input() compact: boolean = false;
  @Input() secondary: boolean = false;
  @Input() unelevated: boolean = false;
  @Input() stroked: boolean = false;
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
  }
  @Input()
  get disableRipple(): boolean { return this._disableRipple; }
  set disableRipple(value: boolean) {
    this._disableRipple = toBoolean(value);
  }
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
  @HostBinding('class.mdc-button--compact') get classCompact(): string {
    return this.compact ? 'mdc-button--compact' : '';
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

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    const disabled = changes['disabled'];
    const disableRipple = changes['disableRipple'];

    if (disabled) {
      if (disabled.currentValue) {
        this.renderer.setAttribute(this._getHostElement(), 'disabled', 'true');
        this.renderer.setAttribute(this._getHostElement(), 'aria-disabled', 'true');
      } else {
        this.renderer.removeAttribute(this._getHostElement(), 'disabled');
        this.renderer.removeAttribute(this._getHostElement(), 'aria-disabled');
      }
    }

    if (disableRipple) {
      disableRipple.currentValue ? this.ripple.destroy() : this.ripple.init();
    }
  }

  ngAfterContentInit(): void {
    if (this.buttonIcon) {
      this.renderer.addClass(this.buttonIcon.elementRef.nativeElement, 'mdc-button__icon');
    }

    if (!this._disableRipple) {
      this.ripple.init();
    }
  }

  /** Focuses the button. */
  focus(): void {
    this._getHostElement().focus();
  }

  _getHostElement() {
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
