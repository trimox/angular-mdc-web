import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange,
} from '@angular/core';
import { toNumber } from '@angular-mdc/web/common';

@Directive({
  selector: '[mdc-elevation]',
  exportAs: 'mdcElevation'
})
export class MdcElevation implements OnChanges {
  private _mdcElevation: number = 0;

  @Input('mdc-elevation')
  get mdcElevation(): number { return this._mdcElevation; }
  set mdcElevation(value: number) {
    this._mdcElevation = toNumber(value);
  }

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  public ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    const change = changes['mdcElevation'];

    if (toNumber(change.currentValue) < 0 || toNumber(change.currentValue > 24)) {
      throw new Error(`Valid mdc-elevation values are 0 through 24`);
    }

    if (!change.isFirstChange()) {
      this._renderer.removeClass(this.elementRef.nativeElement, `mdc-elevation--z${change.previousValue}`);
    }
    this._renderer.addClass(this.elementRef.nativeElement, `mdc-elevation--z${change.currentValue}`);
  }
}
