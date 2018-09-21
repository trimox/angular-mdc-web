import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcIcon } from '@angular-mdc/web/icon';

@Component({
  moduleId: module.id,
  exportAs: 'mdcButton',
  selector: 'button[mdc-button], a[mdc-button]',
  host: {
    '[tabIndex]': 'disabled ? -1 : 0',
    'class': 'mdc-button',
    '[class.ng-mdc-button--primary]': 'primary',
    '[class.ng-mdc-button--secondary]': 'secondary',
    '[class.mdc-button--raised]': 'raised',
    '[class.mdc-button--dense]': 'dense',
    '[class.mdc-button--unelevated]': 'unelevated',
    '[class.mdc-button--outlined]': 'outlined',
    '(click)': 'onClick($event)'
  },
  template: '<ng-content></ng-content>',
  providers: [MdcRipple],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcButton implements AfterContentInit, OnDestroy {
  @Input()
  get raised(): boolean { return this._raised; }
  set raised(value: boolean) {
    this._raised = toBoolean(value);
  }
  protected _raised: boolean;

  @Input()
  get primary(): boolean { return this._primary; }
  set primary(value: boolean) {
    this.setPrimary(value);
  }
  protected _primary: boolean;

  @Input()
  get dense(): boolean { return this._dense; }
  set dense(value: boolean) {
    this._dense = toBoolean(value);
  }
  protected _dense: boolean;

  @Input()
  get secondary(): boolean { return this._secondary; }
  set secondary(value: boolean) {
    this.setSecondary(value);
  }
  protected _secondary: boolean;

  @Input()
  get unelevated(): boolean { return this._unelevated; }
  set unelevated(value: boolean) {
    this._unelevated = toBoolean(value);
  }
  protected _unelevated: boolean;

  @Input()
  get outlined(): boolean { return this._outlined; }
  set outlined(value: boolean) {
    this._outlined = toBoolean(value);
  }
  protected _outlined: boolean;

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
  protected _disabled: boolean;

  @ContentChild(MdcIcon) buttonIcon: MdcIcon;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _ripple: MdcRipple) { }

  ngAfterContentInit(): void {
    this._ripple.attachTo(this.getHostElement());
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }

  setDisabled(disabled: boolean): void {
    this._disabled = toBoolean(disabled);

    if (this._disabled) {
      this.getHostElement().setAttribute('disabled', 'true');
      this.getHostElement().setAttribute('aria-disabled', 'true');
    } else {
      this.getHostElement().removeAttribute('disabled');
      this.getHostElement().removeAttribute('aria-disabled');
    }
  }

  setPrimary(primary: boolean): void {
    this._primary = toBoolean(primary);

    if (primary) {
      this.setSecondary(false);
    }
  }

  setSecondary(secondary: boolean): void {
    this._secondary = toBoolean(secondary);

    if (secondary) {
      this.setPrimary(false);
    }
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

  onClick(event: MouseEvent): void {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
