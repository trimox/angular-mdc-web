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

const MDC_BUTTON_STYLES = require('@material/button/mdc-button.scss');

@Component({
  selector: 'mdc-button',
  styles: [String(MDC_BUTTON_STYLES)],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  providers: [Ripple]
})
export class ButtonComponent {
  @Input() type: string = 'button';
  @Input() raised: boolean;
  @Input() primary: boolean;
  @Input() dense: boolean;
  @Input() compact: boolean;
  @Input() accent: boolean;
  @HostBinding('tabindex') tabindex: number = 0;
  @HostBinding('class') className: string = 'mdc-button';
  @HostBinding('class.mdc-button--raised') get classRaised(): string {
    return this.raised ? 'mdc-button--raised' : '';
  }
  @HostBinding('class.mdc-button--primary') get classPrimary(): string {
    return this.primary ? 'mdc-button--primary' : '';
  }
  @HostBinding('class.mdc-button--accent') get classAccent(): string {
    return this.accent ? 'mdc-button--accent' : '';
  }
  @HostBinding('class.mdc-button--dense') get classDense(): string {
    return this.dense ? 'mdc-button--dense' : '';
  }
  @HostBinding('class.mdc-button--compact') get classCompact(): string {
    return this.compact ? 'mdc-button--compact' : '';
  }
  @HostListener('keydown', ['$event']) onkeydown(evt) {
    this.handleKeyboardDown_(evt);
  };
  @HostListener('keyup', ['$event']) onkeyup(evt) {
    this.handleKeyboardUp_(evt);
  };

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef, private _ripple: Ripple) {
  }

  handleKeyboardDown_(evt) {
    const { keyCode, key } = evt;
    const isSpace = key === 'Space' || keyCode === 32;

    if (isSpace) {
      this._ripple.active = true;
      evt.preventDefault();
    }
  }

  handleKeyboardUp_(evt) {
    const { keyCode, key } = evt;
    const isSpace = key === 'Space' || keyCode === 32;

    if (isSpace) {
      this._ripple.active = false;
      evt.preventDefault();
    }
  }
}