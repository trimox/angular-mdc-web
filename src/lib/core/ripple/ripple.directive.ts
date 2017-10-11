import {
  Directive,
  HostBinding,
  Input,
} from '@angular/core';
import { toBoolean } from '../../common';
import { MdcRipple } from './ripple.service';

@Directive({
  selector: '[mdc-surface]',
  providers: [MdcRipple],
})
export class MdcSurfaceDirective {
  @Input('mdc-surface')
  get mdcSurface() { return this.ripple_.active; }
  set mdcSurface(value: boolean) {
    this.ripple_.active = toBoolean(value);
  }
  @HostBinding('style.cursor') cursor:string = 'pointer';
  @HostBinding('class.mdc-ripple-surface') get classSurface(): string {
    return this.mdcSurface ? 'mdc-ripple-surface' : '';
  }

  constructor(private ripple_: MdcRipple) { }
}

@Directive({
  selector: '[mdc-ripple]',
  providers: [MdcRipple],
})
export class MdcRippleDirective {
  @Input('mdc-ripple')
  get mdcRipple() { return this.ripple_.active; }
  set mdcRipple(value: boolean) {
    this.ripple_.active = value;
  }
  @HostBinding('class.mdc-ripple-surface') get classSurface(): string {
    return this.mdcRipple ? 'mdc-ripple-surface' : '';
  }

  constructor(private ripple_: MdcRipple) {
    this.ripple_.init();
  }
}
