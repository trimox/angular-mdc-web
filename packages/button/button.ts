import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcIcon } from '@angular-mdc/web/icon';

@Directive({
  selector: 'mdc-button-label, [mdcButtonLabel]',
  exportAs: 'mdcButtonLabel',
  host: {
    'class': 'mdc-button__label'
 }
})
export class MdcButtonLabel { }

@Component({
  moduleId: module.id,
  exportAs: 'mdcButton',
  selector: 'button[mdc-button], a[mdc-button]',
  host: {
    '[tabIndex]': 'disabled ? -1 : 0',
    'class': 'mdc-button',
    '[class.ngx-mdc-button--primary]': 'primary',
    '[class.ngx-mdc-button--secondary]': 'secondary',
    '[class.mdc-button--raised]': 'raised',
    '[class.mdc-button--dense]': 'dense',
    '[class.mdc-button--unelevated]': 'unelevated',
    '[class.mdc-button--outlined]': 'outlined',
    '(click)': 'onClick($event)'
  },
  template: `
  <mdc-button-label *ngIf="label">{{label}}</mdc-button-label>
  <ng-content></ng-content>
  `,
  providers: [MdcRipple],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcButton implements OnInit, OnDestroy {
  @Input()
  get raised(): boolean { return this._raised; }
  set raised(value: boolean) {
    this._raised = toBoolean(value);
  }
  private _raised: boolean = false;

  @Input()
  get primary(): boolean { return this._primary; }
  set primary(value: boolean) {
    this._primary = toBoolean(value);
  }
  private _primary: boolean = false;

  @Input()
  get dense(): boolean { return this._dense; }
  set dense(value: boolean) {
    this._dense = toBoolean(value);
  }
  private _dense: boolean = false;

  @Input()
  get secondary(): boolean { return this._secondary; }
  set secondary(value: boolean) {
    this._secondary = toBoolean(value);
  }
  private _secondary: boolean = false;

  @Input()
  get unelevated(): boolean { return this._unelevated; }
  set unelevated(value: boolean) {
    this._unelevated = toBoolean(value);
  }
  private _unelevated: boolean = false;

  @Input()
  get outlined(): boolean { return this._outlined; }
  set outlined(value: boolean) {
    this._outlined = toBoolean(value);
  }
  private _outlined: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabled(value);
  }
  private _disabled: boolean = false;

  @ContentChild(MdcIcon) _icon!: MdcIcon;

  @Input() label?: string;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private _ripple: MdcRipple) { }

  ngOnInit(): void {
    if (this._icon) {
      this._icon.elementRef.nativeElement.classList.add('mdc-button__icon');
    }

    this._ripple.init({ surface: this.getHostElement() });
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

  /** Focuses the button. */
  focus(): void {
    this.getHostElement().focus();
  }

  getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  onClick(event: MouseEvent): void {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
