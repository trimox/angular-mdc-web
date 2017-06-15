import {
  Component,
  ElementRef,
  Input,
  HostBinding,
  HostListener,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { Ripple } from '.././ripple/ripple';

const MDC_FAB_STYLES = require('@material/fab/mdc-fab.scss');

@Component({
  selector: 'button[mdc-fab]',
  styles: [String(MDC_FAB_STYLES)],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class FabComponent {
  ripple: Ripple;

  @Input() disabled: string;
  @Input() mini: boolean;
  @Input() plain: boolean;
  @HostBinding('tabindex') get tabindex(): number {
    return this.disabled ? -1 : 0;
  }
  @HostBinding('class') className: string = 'mdc-fab';
  @HostBinding('class.material-icons') classMaterialIcons: string = 'material-icons';
  @HostBinding('class.mdc-fab--mini') get classMini(): string {
    return this.mini ? 'mdc-fab--mini' : '';
  }
  @HostBinding('class.mdc-fab--plain') get classPlain(): string {
    return this.plain ? 'mdc-fab--plain' : '';
  }
  @HostListener('keydown', ['$event']) onkeydown(evt) {
    this.handleKeyboardDown_(evt);
  };
  @HostListener('keyup', ['$event']) onkeyup(evt) {
    this.handleKeyboardUp_(evt);
  };

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef) {
    this.ripple = new Ripple(this._renderer, this._root);
  }

  handleKeyboardDown_(evt: KeyboardEvent) {
    const { keyCode, key } = evt;
    const isSpace = key === 'Space' || keyCode === 32;
    const isEnter = key === 'Enter' || keyCode === 13;

    if (isSpace || isEnter) {
      this.ripple.active = true;
      evt.preventDefault();
    }
  }

  handleKeyboardUp_(evt: KeyboardEvent) {
    const { keyCode, key } = evt;
    const isSpace = key === 'Space' || keyCode === 32;
    const isEnter = key === 'Enter' || keyCode === 13;

    if (isSpace || isEnter) {
      this.ripple.active = false;
      evt.preventDefault();
    }
  }
}