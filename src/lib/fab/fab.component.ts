import {
  Component,
  ElementRef,
  Input,
  HostBinding,
  HostListener,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { Ripple } from '.././ripple/ripple.directive';
import { toBoolean } from '../common/boolean-property';

@Component({
  selector: 'button[mdc-fab], a[mdc-fab]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  providers: [Ripple]
})
export class FabComponent {
  private _disabled: boolean = false;

  @Input() mini: boolean;
  @Input() plain: boolean;
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value) {
    this._disabled = toBoolean(value);
    if (this._disabled) {
      this._renderer.setAttribute(this._root.nativeElement, "disabled", 'true');
    } else {
      this._renderer.removeAttribute(this._root.nativeElement, "disabled");
    }
  }
  @Input()
  get disableRipple() { return this._ripple.disabled; }
  set disableRipple(value) {
    this._ripple.disabled = toBoolean(value);
  }
  @HostBinding('tabindex') get tabindex(): number {
    return this.disabled ? -1 : 0;
  }
  @HostBinding('class.mdc-fab') isHostClass = true;
  @HostBinding('class.material-icons') classMaterialIcons: string = 'material-icons';
  @HostBinding('class.mdc-fab--mini') get classMini(): string {
    return this.mini ? 'mdc-fab--mini' : '';
  }
  @HostBinding('class.mdc-fab--plain') get classPlain(): string {
    return this.plain ? 'mdc-fab--plain' : '';
  }
  @HostListener('keydown', ['$event']) onkeydown(evt) {
    this.handleKeyboardDown_(evt);
  }
  @HostListener('keyup', ['$event']) onkeyup(evt) {
    this.handleKeyboardUp_(evt);
  }

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef,
    private _ripple: Ripple) {
    this._ripple.init();
  }

  handleKeyboardDown_(evt: KeyboardEvent) {
    const { keyCode, key } = evt;
    const isSpace = key === 'Space' || keyCode === 32;
    const isEnter = key === 'Enter' || keyCode === 13;

    if (isSpace || isEnter) {
      this._ripple.active = true;
      evt.preventDefault();
    }
  }

  handleKeyboardUp_(evt: KeyboardEvent) {
    const { keyCode, key } = evt;
    const isSpace = key === 'Space' || keyCode === 32;
    const isEnter = key === 'Enter' || keyCode === 13;

    if (isSpace || isEnter) {
      this._ripple.active = false;
      evt.preventDefault();
    }
  }
}
