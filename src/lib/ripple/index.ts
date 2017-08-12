import { NgModule } from '@angular/core';

import { Ripple } from './ripple.directive';
import { EventRegistry } from '../common/event-registry';

@NgModule({
  exports: [Ripple],
  declarations: [Ripple],
  providers: [EventRegistry]
})
export class RippleModule { }

export * from './ripple.directive';
