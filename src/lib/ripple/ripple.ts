import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { toBoolean, EventRegistry } from '@angular-mdc/web/common';

import { MdcRipple } from './ripple.service';

@Component({
  selector: 'mdc-ripple, [mdc-ripple]',
  template: '<ng-content></ng-content>',
  providers: [
    MdcRipple,
    EventRegistry
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcRippleComponent implements AfterContentInit, OnDestroy {
  get ripple(): MdcRipple {
    return this._ripple;
  }

  @Input()
  get primary(): boolean { return this._primary; }
  set primary(value: boolean) {
    this.setPrimary(value);
  }
  protected _primary: boolean;

  @Input()
  get secondary(): boolean { return this._secondary; }
  set secondary(value: boolean) {
    this.setSecondary(value);
  }
  protected _secondary: boolean;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
    this._disabled ? this.ripple.destroy() : this.ripple.init();
  }
  private _disabled: boolean;

  @Input()
  get attachTo(): any { return this._attachTo; }
  set attachTo(element: any) {
    if (this._attachTo !== element) {
      this.setAttachTo(element);
    }
  }
  protected _attachTo: any;

  @Input()
  get unbounded(): boolean { return this._unbounded; }
  set unbounded(value: boolean) {
    this.setUnbounded(value);
  }
  protected _unbounded: boolean = false;

  constructor(
    private _ngZone: NgZone,
    protected _changeDetectorRef: ChangeDetectorRef,
    protected _ripple: MdcRipple,
    protected _renderer: Renderer2,
    protected elementRef: ElementRef) { }

  ngAfterContentInit(): void {
    this._ngZone.runOutsideAngular(() => setTimeout(() => {
      this.setAttachTo(this.attachTo ? this.attachTo : this._getHostElement());
    }, 10));
  }

  ngOnDestroy(): void {
    this.ripple.destroy();
  }

  setUnbounded(unbounded: boolean): void {
    this._unbounded = unbounded;

    if (this.ripple.isAttached()) {
      this.ripple.setUnbounded(unbounded);
    }
    this._changeDetectorRef.markForCheck();
  }

  setAttachTo(element: any, unbounded?: boolean): void {
    this._attachTo = element;
    this._renderer.addClass(this.attachTo, 'mdc-ripple-surface');

    this.ripple.attachTo(element, this.unbounded);
    this.setUnbounded(unbounded ? unbounded : this.unbounded);

    this._changeDetectorRef.markForCheck();
  }

  setPrimary(primary: boolean): void {
    this._primary = toBoolean(primary);
    this._primary ? this._renderer.addClass(this.attachTo, 'mdc-ripple-surface--primary')
      : this._renderer.removeClass(this.attachTo, 'mdc-ripple-surface--primary');
  }

  setSecondary(secondary: boolean): void {
    this._secondary = toBoolean(secondary);
    this._secondary ? this._renderer.addClass(this.attachTo, 'mdc-ripple-surface--accent')
      : this._renderer.removeClass(this.attachTo, 'mdc-ripple-surface--accent');
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}

@Directive({
  selector: '[mdcRipple]',
  providers: [
    MdcRipple,
    EventRegistry
  ],
})
export class MdcRippleDirective extends MdcRippleComponent {
  constructor(
    _ngZone: NgZone,
    _changeDetectorRef: ChangeDetectorRef,
    _ripple: MdcRipple,
    _renderer: Renderer2,
    elementRef: ElementRef) {

    super(_ngZone, _changeDetectorRef, _ripple, _renderer, elementRef);

    this._renderer.setAttribute(this.elementRef.nativeElement, 'data-mdc-ripple-is-unbounded', '');
    this.setUnbounded(true);
  }
}
