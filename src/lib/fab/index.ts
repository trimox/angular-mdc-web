import { NgModule } from '@angular/core';

import { MdcIconModule } from '../icon/index';
import { MdcFabComponent } from './fab.component';

@NgModule({
  imports: [
    MdcIconModule,
  ],
  exports: [
    MdcIconModule,
    MdcFabComponent
  ],
  declarations: [MdcFabComponent],
})
export class MdcFabModule { }

export * from './fab.component';
