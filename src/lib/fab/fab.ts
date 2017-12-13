import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import {
  toBoolean,
  EventRegistry,
} from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/core';
import { MdcIcon } from '@angular-mdc/web/icon';

export type FabPosition = 'bottom-left' | 'bottom-right' | null;

@Component({
  moduleId: module.id,
  selector: 'button[mdc-fab], a[mdc-fab]',
  template: '<ng-content></ng-content>',
  providers: [
    MdcRipple,
    EventRegistry,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcFab implements AfterContentInit, OnDestroy {
  private _exited: boolean = false;
  private _position: FabPosition = null;

  @Input() mini: boolean = false;
  @Input()
  get exited(): boolean { return this._exited; }
  set exited(value: boolean) {
    this._exited = toBoolean(value);
  }
  @Input()
  get position(): FabPosition { return this._position; }
  set position(value: FabPosition) {
    if (value !== this._position) {
      value ? this._renderer.addClass(this._getHostElement(), `mdc-fab--${value}`)
        : this._renderer.removeClass(this._getHostElement(), `mdc-fab--${this._position}`);
      this._position = value;
    }
  }
  @Input('attr.tabindex') tabIndex: number = 0;
  @ContentChild(MdcIcon) fabIcon: MdcIcon;
  @HostBinding('class.mdc-fab') isHostClass = true;
  @HostBinding('class.mdc-fab--mini') get classMini(): string {
    return this.mini ? 'mdc-fab--mini' : '';
  }
  @HostBinding('class.mdc-fab--exited') get classExited(): string {
    this.tabIndex = this._exited ? -1 : this.tabIndex;
    return this._exited ? 'mdc-fab--exited' : '';
  }
  @HostListener('blur', ['$event']) blur() {
    this._onBlur();
  }

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _ripple: MdcRipple) { }

  ngAfterContentInit(): void {
    if (this.fabIcon) {
      this._renderer.addClass(this.fabIcon.elementRef.nativeElement, 'mdc-fab__icon');
      this._renderer.addClass(this._getHostElement(), 'mdc-fab__icon--size');
    }
    this._ripple.init();
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }

  /** Focuses the button. */
  focus(): void {
    this._getHostElement().focus();
  }

  _getHostElement() {
    return this.elementRef.nativeElement;
  }

  toggleExited(exited?: boolean): void {
    this._exited = exited != null ? exited : !this._exited;
  }

  private _onBlur(): void {
    this._ripple.activeSurface = false;
  }
}
