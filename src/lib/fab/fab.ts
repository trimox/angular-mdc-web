import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { MdcIcon } from '../icon/icon';
import { MdcRipple } from '../core/ripple/ripple.service';
import {
  toBoolean,
  KeyCodes,
  isSpaceKey
} from '../common';

export type FabPosition = 'bottom-left' | 'bottom-right' | null;

@Component({
  selector: 'button[mdc-fab], a[mdc-fab]',
  template: '<ng-content></ng-content>',
  providers: [MdcRipple],
  encapsulation: ViewEncapsulation.None,
})
export class MdcFab implements AfterViewInit {
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
      value ? this._renderer.addClass(this.elementRef.nativeElement, `mdc-fab--${value}`)
        : this._renderer.removeClass(this.elementRef.nativeElement, `mdc-fab--${this._position}`);
      this._position = value;
    }
  }
  @Input('attr.tabindex') tabIndex: number = 0;
  @HostBinding('class.mdc-fab') isHostClass = true;
  @HostBinding('class.mdc-fab--mini') get classMini(): string {
    return this.mini ? 'mdc-fab--mini' : '';
  }
  @HostBinding('class.mdc-fab--exited') get classExited(): string {
    this.tabIndex = this._exited ? -1 : this.tabIndex;
    return this._exited ? 'mdc-fab--exited' : '';
  }
  @HostListener('keypress', ['$event']) onkeypress(evt: KeyboardEvent) {
    this._onKeyPress(evt);
  }
  @HostListener('blur', ['$event']) blur(evt: FocusEvent) {
    this._onBlur(evt);
  }
  @ContentChild(MdcIcon) fabIcon: MdcIcon;

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _ripple: MdcRipple) {
    this._ripple.init();
  }

  ngAfterViewInit(): void {
    if (this.fabIcon) {
      this._renderer.addClass(this.fabIcon.elementRef.nativeElement, 'mdc-fab__icon');
      this._renderer.addClass(this.elementRef.nativeElement, 'mdc-fab__icon--size');
    }
  }

  toggleExited(exited?: boolean): void {
    this._exited = exited != null ? exited : !this._exited;
  }

  private _onKeyPress(keyboardEvent: KeyboardEvent): void {
    let keyCode = keyboardEvent.keyCode;
    if (keyCode == KeyCodes.ENTER || isSpaceKey(keyboardEvent)) {
      this._ripple.active = true;
      if (keyCode != KeyCodes.ENTER) {
        keyboardEvent.preventDefault();
      }
    }
  }

  private _onBlur(focusEvent: FocusEvent): void {
    this._ripple.active = false;
  }
}
