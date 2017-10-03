import { NgModule } from '@angular/core';

import {
  MdcRippleDirective,
  MdcSurfaceDirective,
} from './ripple.directive';

const RIPPLE_DIRECTIVES = [
  MdcRippleDirective,
  MdcSurfaceDirective,
];

@NgModule({
  exports: [RIPPLE_DIRECTIVES],
  declarations: [RIPPLE_DIRECTIVES],
})
export class MdcRippleModule { }

export * from './ripple.service';
export * from './ripple.directive';
