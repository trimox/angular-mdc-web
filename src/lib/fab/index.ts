import { NgModule } from '@angular/core';

import { MdcIconModule } from '../icon/index';
import { MdcFab } from './fab';

@NgModule({
  imports: [
    MdcIconModule,
  ],
  exports: [
    MdcIconModule,
    MdcFab
  ],
  declarations: [MdcFab],
})
export class MdcFabModule { }

export * from './fab';
