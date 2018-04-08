import {
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MDCSelectLabelAdapter } from '@material/select/label/adapter';
import { MDCSelectLabelFoundation } from '@material/select/label';

@Directive({
  selector: '[mdc-select-label], mdc-select-label',
  exportAs: 'mdcSelectLabel'
})
export class MdcSelectLabel implements OnInit, OnDestroy {
  @HostBinding('class.mdc-select__label') isHostClass = true;

  private _mdcAdapter: MDCSelectLabelAdapter = {
    addClass: (className: string) => this._renderer.addClass(this.elementRef.nativeElement, className),
    removeClass: (className: string) => this._renderer.removeClass(this.elementRef.nativeElement, className),
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    styleFloat(value: any): void
  } = new MDCSelectLabelFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  ngOnInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    this._foundation.destroy();
  }

  /** Styles the label to float or defloat as necessary */
  styleFloat(value: any): void {
    this._foundation.styleFloat(value);
  }
}
