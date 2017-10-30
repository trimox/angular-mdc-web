import { NgModule } from '@angular/core';

import { MdcSwitch } from './switch';
import { MdcRippleModule } from '../core/ripple/index';

@NgModule({
  imports: [
    MdcRippleModule,
  ],
  exports: [MdcSwitch],
  declarations: [MdcSwitch],
})
export class MdcSwitchModule { }

export * from './switch';
