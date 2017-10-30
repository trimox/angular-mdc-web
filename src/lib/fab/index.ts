import { NgModule } from '@angular/core';

import { MdcIconModule } from '../icon/index';
import { MdcRippleModule } from '../core/ripple/index';
import { MdcFab } from './fab';

@NgModule({
  imports: [
    MdcIconModule,
    MdcRippleModule,
  ],
  exports: [
    MdcIconModule,
    MdcFab
  ],
  declarations: [MdcFab],
})
export class MdcFabModule { }

export * from './fab';
