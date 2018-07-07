import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChange
} from '@angular/core';
import { toNumber } from '@angular-mdc/web/common';

@Directive({
  selector: '[mdcElevation]',
  exportAs: 'mdcElevation'
})
export class MdcElevation implements OnChanges {
  @Input()
  get mdcElevation(): number { return this._mdcElevation; }
  set mdcElevation(value: number) {
    this._mdcElevation = toNumber(value);
  }
  private _mdcElevation: number = 0;

  constructor(public elementRef: ElementRef) { }

  public ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    const change = changes['mdcElevation'];

    if (change.currentValue < 0 || change.currentValue > 24) {
      throw new Error(`Valid mdc-elevation values are 0 through 24`);
    }

    if (!change.isFirstChange()) {
      this.elementRef.nativeElement.classList.remove(`mdc-elevation--z${change.previousValue}`);
    }
    this.elementRef.nativeElement.classList.add(`mdc-elevation--z${change.currentValue}`);
  }
}
