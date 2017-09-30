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

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: 'button[mdc-fab], a[mdc-fab]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  providers: [MdcRipple]
})
export class MdcFabComponent {
  private exited_: boolean = false;

  @Input() mini: boolean = false;
  @Input()
  get exited() { return this.exited_; }
  set exited(value) {
    this.exited_ = toBoolean(value);
  }
  @Input('attr.tabindex') tabIndex: number = 0;
  @HostBinding('class.mdc-fab') isHostClass = true;
  @HostBinding('class.mdc-fab--mini') get classMini(): string {
    return this.mini ? 'mdc-fab--mini' : '';
  }
  @HostBinding('class.mdc-fab--exited') get classExited(): string {
    this.tabIndex = this.exited_ ? -1 : this.tabIndex;
    return this.exited_ ? 'mdc-fab--exited' : '';
  }
  @HostListener('keypress', ['$event']) onkeypress(evt: KeyboardEvent) {
    this.handleKeyPress(evt);
  }
  @HostListener('blur', ['$event']) blur(evt: FocusEvent) {
    this.handleBlur(evt);
  }

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _ripple: MdcRipple) {
    this._ripple.init();
  }

  toggleExited(exited?: boolean): void {
    this.exited_ = exited != null ? exited : !this.exited_;
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
