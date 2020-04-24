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
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MdcFormFieldControl} from './form-field-control';

@Component({
  selector: 'mdc-form-field',
  exportAs: 'mdcFormField',
  host: {
    '[class.ngx-mdc-form-field--fluid]': 'fluid',
    '[class.mdc-form-field--align-end]': 'alignEnd',
    '[class.mdc-form-field--nowrap]': 'nowrap',
    '[class.mdc-form-field--space-between]': 'spaceBetween',
  },
  templateUrl: 'form-field.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcFormField implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  public label?: HTMLElement;

  @Input()
  get fluid(): boolean {
    return this._fluid;
  }
  set fluid(value: boolean) {
    this._fluid = coerceBooleanProperty(value);
  }
  private _fluid = false;

  @Input()
  get alignEnd(): boolean {
    return this._alignEnd;
  }
  set alignEnd(value: boolean) {
    this._alignEnd = coerceBooleanProperty(value);
  }
  private _alignEnd = false;

  @Input()
  get nowrap(): boolean {
    return this._nowrap;
  }
  set nowrap(value: boolean) {
    this._nowrap = coerceBooleanProperty(value);
  }
  private _nowrap = false;

  @Input()
  get spaceBetween(): boolean {
    return this._spaceBetween;
  }
  set spaceBetween(value: boolean) {
    this._spaceBetween = coerceBooleanProperty(value);
  }
  private _spaceBetween = false;

  @ContentChild(MdcFormFieldControl, {static: false}) _control!: MdcFormFieldControl<any>;

  constructor(
    private _ngZone: NgZone,
    public elementRef: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    if (this._control) {
      const control = this._control.elementRef.nativeElement;

      if (control?.nextElementSibling?.tagName === 'LABEL') {
        this.label = control.nextElementSibling;
        if (this.label && this._control.inputId) {
          this.label!.setAttribute('for', this._control.inputId);
          this._loadListeners();
        }
      }
    }
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  private _loadListeners(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent<MouseEvent>(this.label!, 'click').pipe(takeUntil(this._destroy))
        .subscribe(() => this._ngZone.run(() => {
          this._control.ripple!.activateRipple();

          if (typeof requestAnimationFrame !== 'undefined') {
            requestAnimationFrame(() => this._control.ripple!.deactivateRipple());
          }
        })));
  }
}
