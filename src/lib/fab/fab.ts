import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import {
  toBoolean,
  EventRegistry,
} from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcFab implements AfterContentInit, OnDestroy {
  @Input()
  get mini(): boolean { return this._mini; }
  set mini(value: boolean) {
    this.setMini(value);
  }
  private _mini: boolean;

  @Input()
  get exited(): boolean { return this._exited; }
  set exited(value: boolean) {
    this.setExited(value);
  }
  private _exited: boolean;

  @Input()
  get position(): string { return this._position; }
  set position(value: string) {
    this.setPosition(value);
  }
  private _position: string;

  @Input('attr.tabindex') tabIndex: number = 0;
  @ContentChild(MdcIcon) fabIcon: MdcIcon;
  @HostBinding('class.mdc-fab') isHostClass = true;
  @HostBinding('class.mdc-fab--mini') get classMini(): string {
    return this.mini ? 'mdc-fab--mini' : '';
  }
  @HostBinding('class.mdc-fab--exited') get classExited(): string {
    return this.exited ? 'mdc-fab--exited' : '';
  }

  constructor(
    private _changeDetectionRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _ripple: MdcRipple) { }

  ngAfterContentInit(): void {
    if (this.fabIcon) {
      this._renderer.addClass(this.fabIcon.elementRef.nativeElement, 'mdc-fab__icon');
      this._renderer.addClass(this._getHostElement(), 'mdc-fab__icon--size');
    }
    this._ripple.attachTo(this._getHostElement());
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }

  setMini(mini: boolean): void {
    this._mini = mini;
    this._changeDetectionRef.markForCheck();
  }

  setExited(exited: boolean): void {
    this._exited = exited;
    this.tabIndex = exited ? -1 : this.tabIndex;
    this._changeDetectionRef.markForCheck();
  }

  setPosition(position: string): void {
    this._renderer.removeClass(this._getHostElement(), `mdc-fab--${this._position}`);
    this._position = position;

    if (this.position) {
      this._renderer.addClass(this._getHostElement(), `mdc-fab--${position}`);
    }
  }

  toggleExited(exited?: boolean): void {
    this._exited = exited != null ? exited : !this._exited;
  }

  /** Focuses the button. */
  focus(): void {
    this._getHostElement().focus();
  }

  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
