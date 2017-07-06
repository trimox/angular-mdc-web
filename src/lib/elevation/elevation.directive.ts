import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange,
} from '@angular/core';
import { toNumber } from '../common/number-property';

@Directive({
  selector: '[mdc-elevation-transition]'
})
export class ElevationTransition {
  @HostBinding('class.mdc-elevation-transition') className: string = 'mdc-elevation-transition';
}

const MDC_ELEVATION_VALUES = Array.from(Array(25), (x, i) => i);

@Directive({
  selector: '[mdc-elevation]'
})
export class ElevationDirective implements OnChanges {
  private nativeEl: ElementRef;
  private _mdcElevation: number = 0;

  @Input('mdc-elevation')
  get mdcElevation() { return this._mdcElevation; }
  set mdcElevation(value: number) {
    this._mdcElevation = toNumber(value);
  }

  constructor(private _renderer: Renderer2, private _root: ElementRef) {
    this.nativeEl = this._root.nativeElement;
  }

  public ngOnChanges(changes: { [key: string]: SimpleChange }) {
    let change = changes['mdcElevation'];

    if (MDC_ELEVATION_VALUES.indexOf(Number(this.mdcElevation)) === -1) {
      throw new Error(`Valid mdc-elevation values are 0 through 24`);
    }

    if (!change.isFirstChange()) {
      this._renderer.removeClass(this.nativeEl, `mdc-elevation--z${change.previousValue}`);
    }
    this._renderer.addClass(this.nativeEl, `mdc-elevation--z${change.currentValue}`);
  }
}
