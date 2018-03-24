import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Input,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class MdcRippleComponent implements AfterContentInit, OnDestroy {
  get ripple(): MdcRipple {
    return this._ripple;
  }

  @Input()
  get active(): boolean { return this._active; }
  set active(value: boolean) {
    this._active = toBoolean(value);
  }
  private _active: boolean = true;

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
    this.ripple.setDisabled(value);
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
  protected _unbounded: boolean;

  constructor(
    protected _ripple: MdcRipple,
    protected _renderer: Renderer2,
    protected elementRef: ElementRef) { }

  ngAfterContentInit(): void {
    this.setAttachTo(this.attachTo ? this.attachTo : this._getHostElement());
  }

  ngOnDestroy(): void {
    this.ripple.destroy();
  }

  setUnbounded(unbounded: boolean): void {
    this._unbounded = unbounded;

    this.ripple.setUnbounded(unbounded);
  }

  setAttachTo(element: any, unbounded: boolean = false): void {
    this._attachTo = element;
    this._renderer.addClass(this.attachTo, 'mdc-ripple-surface');

    this.ripple.attachTo(element, unbounded);
    this.setUnbounded(unbounded);
  }

  setPrimary(primary: boolean): void {
    this._primary = primary;
    this._primary ? this._renderer.addClass(this.attachTo, 'mdc-ripple-surface--primary')
      : this._renderer.removeClass(this.attachTo, 'mdc-ripple-surface--primary');
  }

  setSecondary(secondary: boolean): void {
    this._secondary = secondary;
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
export class MdcRippleDirective extends MdcRippleComponent implements AfterViewInit, OnDestroy {
  constructor(
    _ripple: MdcRipple,
    _renderer: Renderer2,
    elementRef: ElementRef) {

    super(_ripple, _renderer, elementRef);
  }

  ngAfterViewInit(): void {
    this.setAttachTo(this.elementRef.nativeElement, true);
    this._renderer.setAttribute(this.elementRef.nativeElement, 'data-mdc-ripple-is-unbounded', '');
    this.ripple.layout();
  }

  ngOnDestroy(): void {
    this.ripple.destroy();
  }
}
