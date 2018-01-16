import {
  Directive,
  ElementRef,
  HostBinding,
  Renderer2,
} from '@angular/core';
import { MDCTextFieldLabelAdapter } from '@material/textfield/label/adapter';
import { MDCTextFieldLabelFoundation } from '@material/textfield/label';

@Directive({
  selector: '[mdc-text-field-label], mdc-text-field-label'
})
export class MdcTextFieldLabel {
  @HostBinding('class.mdc-text-field__label') isHostClass = true;

  mdcAdapter: MDCTextFieldLabelAdapter = {
    addClass: (className: string) => this._renderer.addClass(this.elementRef.nativeElement, className),
    removeClass: (className: string) => this._renderer.removeClass(this.elementRef.nativeElement, className),
    getWidth: () => this.elementRef.nativeElement.offsetWidth,
  };

  foundation: {
    destroy: () => {},
    getWidth: () => number,
    styleShake: (isValid: boolean, isFocused: boolean) => {},
    styleFloat: (value: string, isFocused: boolean, isBadInput: boolean) => {}
  } = new MDCTextFieldLabelFoundation(this.mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  destroy(): void {
    this.foundation.destroy();
  }

  /** Returns the width of the label element */
  getWidth(): number {
    return this.foundation.getWidth();
  }

  /** Styles the label to produce the label shake for errors */
  styleShake(isValid: boolean, isFocused: boolean): void {
    this.foundation.styleShake(isValid, isFocused);
  }

  /** Styles the label to float or defloat as necessary */
  styleFloat(value: string, isFocused: boolean, isBadInput: boolean): void {
    this.foundation.styleFloat(value, isFocused, isBadInput);
  }
}
