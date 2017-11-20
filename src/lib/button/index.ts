import { NgModule } from '@angular/core';

import { MdcIconModule } from '../icon/index';
import { MdcButton } from './button';

@NgModule({
  imports: [
    MdcIconModule,
  ],
  exports: [
    MdcIconModule,
    MdcButton
  ],
  declarations: [MdcButton],
})
export class MdcButtonModule { }

export * from './button';
