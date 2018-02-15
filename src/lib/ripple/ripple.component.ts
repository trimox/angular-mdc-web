import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { toBoolean, EventRegistry } from '@angular-mdc/web/common';

import { MdcRipple } from './ripple.service';

@Component({
  selector: '[mdc-ripple], mdc-ripple',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcRipple',
  providers: [
    MdcRipple,
    EventRegistry
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class MdcRippleComponent implements AfterContentInit, OnDestroy {
  private _active: boolean = true;
  private _primary: boolean;
  private _secondary: boolean;
  private _unbounded: boolean;
  private _disabled: boolean;

  get ripple(): MdcRipple {
    return this._ripple;
  }

  @Input()
  get active(): boolean { return this._active; }
  set active(value: boolean) {
    this._active = toBoolean(value);
  }
  @Input()
  get primary(): boolean { return this._primary; }
  set primary(value: boolean) {
    this._primary = toBoolean(value);
  }
  @Input()
  get secondary(): boolean { return this._secondary; }
  set secondary(value: boolean) {
    this._secondary = toBoolean(value);
  }
  @Input()
  get unbounded(): boolean { return this._unbounded; }
  set unbounded(value: boolean) {
    this.setUnbounded(value);
  }
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.ripple.setDisabled(value);
  }

  @HostBinding('class.mdc-ripple-surface') get classSurface(): string {
    return this.active ? 'mdc-ripple-surface' : '';
  }
  @HostBinding('class.ng-mdc-ripple-surface--primary') get classPrimary(): string {
    return this.primary ? 'ng-mdc-ripple-surface--primary' : '';
  }
  @HostBinding('class.ng-mdc-ripple-surface--secondary') get classSecondary(): string {
    return this.secondary ? 'ng-mdc-ripple-surface--secondary' : '';
  }

  constructor(
    private _ripple: MdcRipple,
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  ngAfterContentInit(): void {
    this._ripple.init(this.unbounded);
    this._renderer.setStyle(this._getHostElement(), 'cursor', 'pointer');
  }

  ngOnDestroy(): void {
    this.ripple.destroy();
  }

  setUnbounded(unbounded: boolean): void {
    this.ripple.setUnbounded(unbounded);
    this._unbounded = unbounded;
    this.ripple.layout();
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
