import { NgModule } from '@angular/core';

import { MdcRadio } from './radio';
import { MdcRippleModule } from '../core/ripple/index';

@NgModule({
  imports: [
    MdcRippleModule,
  ],
  exports: [MdcRadio],
  declarations: [MdcRadio]
})
export class MdcRadioModule { }

export * from './radio';
