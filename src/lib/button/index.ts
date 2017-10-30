import { NgModule } from '@angular/core';

import { MdcIconModule } from '../icon/index';
import { MdcRippleModule } from '../core/ripple/index';
import { MdcButton } from './button';

@NgModule({
  imports: [
    MdcIconModule,
    MdcRippleModule,
  ],
  exports: [
    MdcIconModule,
    MdcButton
  ],
  declarations: [MdcButton],
})
export class MdcButtonModule { }

export * from './button';
