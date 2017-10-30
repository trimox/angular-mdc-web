import { NgModule } from '@angular/core';

import { EventRegistry } from '../../common/event-registry';

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
  providers: [EventRegistry],
})
export class MdcRippleModule { }

export * from './ripple.service';
export * from './ripple.directive';
