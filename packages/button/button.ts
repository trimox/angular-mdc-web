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
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {MdcRipple} from '@angular-mdc/web/ripple';
import {MdcIcon} from '@angular-mdc/web/icon';

@Directive({
  selector: 'mdc-button-label, [mdcButtonLabel]',
  exportAs: 'mdcButtonLabel',
  host: {'class': 'mdc-button__label'}
})
export class MdcButtonLabel {}

@Component({
  exportAs: 'mdcButton',
  selector: 'button[mdc-button], a[mdc-button]',
  host: {
    '[tabIndex]': 'disabled ? -1 : 0',
    'class': 'mdc-button',
    '[class.mdc-button--raised]': 'raised',
    '[class.mdc-button--unelevated]': 'unelevated',
    '[class.mdc-button--outlined]': 'outlined',
    '[class.mdc-button--touch]': 'touch',
    '(click)': 'onClick($event)'
  },
  template: `
  <div class="mdc-button__ripple"></div>
  <mdc-button-label *ngIf="label">{{label}}</mdc-button-label>
  <div class="mdc-button__touch" *ngIf="touch"></div>
  <ng-content></ng-content>
  `,
  providers: [MdcRipple],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcButton implements OnInit, OnDestroy {
  @Input()
  get raised(): boolean {
    return this._raised;
  }
  set raised(value: boolean) {
    this._raised = coerceBooleanProperty(value);
  }
  private _raised: boolean = false;

  @Input()
  get unelevated(): boolean {
    return this._unelevated;
  }
  set unelevated(value: boolean) {
    this._unelevated = coerceBooleanProperty(value);
  }
  private _unelevated: boolean = false;

  @Input()
  get outlined(): boolean {
    return this._outlined;
  }
  set outlined(value: boolean) {
    this._outlined = coerceBooleanProperty(value);
  }
  private _outlined: boolean = false;

  @Input()
  get touch(): boolean {
    return this._touch;
  }
  set touch(value: boolean) {
    this._touch = coerceBooleanProperty(value);
  }
  private _touch: boolean = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this.setDisabled(value);
  }
  private _disabled: boolean = false;

  @ContentChild(MdcIcon, {static: true}) _icon!: MdcIcon;

  @Input() label?: string;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private _ripple: MdcRipple) {
    this._ripple = new MdcRipple(this.elementRef);
    this._ripple.init();
  }

  ngOnInit(): void {
    if (this._icon) {
      this._icon.elementRef.nativeElement.classList.add('mdc-button__icon');
    }
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }

  setDisabled(disabled: boolean): void {
    this._disabled = coerceBooleanProperty(disabled);

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
