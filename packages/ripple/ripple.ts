import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';

import { MdcRipple } from './ripple.service';

@Component({
  selector: 'mdc-ripple, [mdc-ripple]',
  template: '<ng-content></ng-content>',
  providers: [MdcRipple],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcRippleComponent implements AfterContentInit, OnDestroy {
  get ripple(): MdcRipple {
    return this._ripple;
  }

  @Input()
  get attachTo(): HTMLElement { return this._attachTo; }
  set attachTo(element: HTMLElement) {
    this._attachTo.classList.remove('mdc-ripple-surface');
    this._attachTo = element;
    this._attachTo.classList.add('mdc-ripple-surface');
  }
  private _attachTo: HTMLElement = this._getHostElement();

  @Input()
  get primary(): boolean { return this._primary; }
  set primary(value: boolean) {
    this._primary = toBoolean(value);
    this._primary ? this.attachTo.classList.add('mdc-ripple-surface--primary')
      : this.attachTo.classList.remove('mdc-ripple-surface--primary');
  }
  private _primary: boolean;

  @Input()
  get secondary(): boolean { return this._secondary; }
  set secondary(value: boolean) {
    this._secondary = toBoolean(value);
    this._secondary ? this.attachTo.classList.add('mdc-ripple-surface--accent')
      : this.attachTo.classList.remove('mdc-ripple-surface--accent');
  }
  private _secondary: boolean;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
  }
  private _disabled: boolean;

  @Input()
  get unbounded(): boolean { return this._unbounded; }
  set unbounded(value: boolean) {
    this._unbounded = toBoolean(value);
  }
  protected _unbounded: boolean = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _ripple: MdcRipple,
    public elementRef: ElementRef<HTMLElement>) { }

  ngAfterContentInit(): void {
    this._initRipple();
  }

  ngOnDestroy(): void {
    this.ripple.destroy();
  }

  private _initRipple(): void {
    this.ripple.init({
      surface: this._attachTo
    }, Object.assign(this.ripple.createAdapter(), {
      isUnbounded: () => this._unbounded,
      isSurfaceDisabled: () => this._disabled
    }));

    this._changeDetectorRef.markForCheck();
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}

@Directive({
  selector: '[mdcRipple]',
  providers: [MdcRipple]
})
export class MdcRippleDirective extends MdcRippleComponent {
  constructor(
    _changeDetectorRef: ChangeDetectorRef,
    _ripple: MdcRipple,
    elementRef: ElementRef) {

    super(_changeDetectorRef, _ripple, elementRef);

    this._unbounded = true;
    this.elementRef.nativeElement.setAttribute('data-mdc-ripple-is-unbounded', '');
  }
}
