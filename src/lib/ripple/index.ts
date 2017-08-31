import { NgModule } from '@angular/core';

import { MdcRipple } from './ripple.directive';
import { EventRegistry } from '../common/event-registry';

@NgModule({
  exports: [MdcRipple],
  declarations: [MdcRipple],
  providers: [EventRegistry]
})
export class MdcRippleModule { }

export * from './ripple.directive';
