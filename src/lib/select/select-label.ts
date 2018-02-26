import {
  Directive,
  ElementRef,
  HostBinding,
  Renderer2,
} from '@angular/core';
import { MDCSelectLabelAdapter } from '@material/select/label/adapter';
import { MDCSelectLabelFoundation } from '@material/select/label';

@Directive({
  selector: '[mdc-select-label], mdc-select-label',
  exportAs: 'mdcSelectLabel'
})
export class MdcSelectLabel {
  @HostBinding('class.mdc-select__label') isHostClass = true;

  private _mdcAdapter: MDCSelectLabelAdapter = {
    addClass: (className: string) => this._renderer.addClass(this.elementRef.nativeElement, className),
    removeClass: (className: string) => this._renderer.removeClass(this.elementRef.nativeElement, className),
  };

  foundation: {
    styleFloat(float: boolean): void
  } = new MDCSelectLabelFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  /** Styles the label to float or defloat as necessary */
  styleFloat(float: boolean): void {
    this.foundation.styleFloat(float);
  }
}
