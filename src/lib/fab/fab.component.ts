import {
  Component,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { MdcRipple } from '../ripple/ripple.directive';
import {
  toBoolean,
  KeyCodes,
  isSpaceKey
} from '../common';

@Directive({
  selector: 'mdc-fab-icon, [mdc-fab-icon]'
})
export class MdcFabIconDirective {
  @HostBinding('class.mdc-fab__icon') isHostClass = true;
}

@Component({
  selector: 'button[mdc-fab], a[mdc-fab]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  providers: [MdcRipple]
})
export class MdcFabComponent {
  @Input() mini: boolean;
  @Input('attr.tabindex') tabIndex: number = 0;
  @Input()
  get disableRipple() { return this._ripple.disabled; }
  set disableRipple(value) {
    this._ripple.disabled = toBoolean(value);
  }
  @HostBinding('class.mdc-fab') isHostClass = true;
  @HostBinding('class.mdc-fab--mini') get classMini(): string {
    return this.mini ? 'mdc-fab--mini' : '';
  }
  @HostListener('keypress', ['$event']) onkeypress(evt: KeyboardEvent) {
    this.handleKeyPress(evt);
  }
  @HostListener('blur', ['$event']) blur(evt: FocusEvent) {
    this.handleBlur(evt);
  }

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef,
    private _ripple: MdcRipple) {
    this._ripple.init();
  }

  private handleKeyPress(keyboardEvent: KeyboardEvent) {
    let keyCode = keyboardEvent.keyCode;
    if (keyCode == KeyCodes.ENTER || isSpaceKey(keyboardEvent)) {
      this._ripple.active = true;
      if (keyCode != KeyCodes.ENTER) {
        keyboardEvent.preventDefault();
      }
    }
  }

  private handleBlur(focusEvent: FocusEvent) {
    this._ripple.active = false;
  }
}
