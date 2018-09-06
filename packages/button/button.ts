import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    '[class.mdc-button--outlined]': 'outlined'
  },
  template: '<ng-content></ng-content>',
  providers: [MdcRipple],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcButton implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  @Input()
  get raised(): boolean { return this._raised; }
  set raised(value: boolean) {
    this._raised = toBoolean(value);
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
    this._dense = toBoolean(value);
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
    this._unelevated = toBoolean(value);
  }
  protected _unelevated: boolean = false;

  @Input()
  get outlined(): boolean { return this._outlined; }
  set outlined(value: boolean) {
    this._outlined = toBoolean(value);
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

  @ContentChild(MdcIcon) buttonIcon: MdcIcon;

  constructor(
    protected _ngZone: NgZone,
    protected _elementRef: ElementRef,
    protected _ripple: MdcRipple) { }

  ngAfterContentInit(): void {
    this._ripple.attachTo(this.getHostElement());

    this._ngZone.runOutsideAngular(() =>
      fromEvent<MouseEvent>(this.getHostElement(), 'click').pipe(takeUntil(this._destroy))
        .subscribe((evt) => this._ngZone.run(() => this._onClick(evt))));
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

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

  private _onClick(event: Event): void {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
