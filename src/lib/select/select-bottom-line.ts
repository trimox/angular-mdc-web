import {
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MDCSelectBottomLineAdapter } from '@material/select/bottom-line/adapter';
import { MDCSelectBottomLineFoundation } from '@material/select/bottom-line';

@Directive({
  selector: '[mdc-select-bottom-line], mdc-select-bottom-line',
  exportAs: 'mdcSelectBottomLine'
})
export class MdcSelectBottomLine implements OnInit, OnDestroy {
  @HostBinding('class.mdc-select__bottom-line') isHostClass = true;

  private _mdcAdapter: MDCSelectBottomLineAdapter = {
    addClass: (className: string) => this._renderer.addClass(this.elementRef.nativeElement, className),
    removeClass: (className: string) => this._renderer.removeClass(this.elementRef.nativeElement, className),
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    activate(): void,
    deactivate(): void
  } = new MDCSelectBottomLineFoundation(this._mdcAdapter);

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

  /**
   * Activates the bottom line active class
   */
  activate() {
    this._foundation.activate();
  }

  /**
   * Deactivates the bottom line active class
   */
  deactivate() {
    this._foundation.deactivate();
  }
}
