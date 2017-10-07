import { NgModule } from '@angular/core';

import { MdcIconModule } from '../icon/index';
import { MdcButtonComponent } from './button.component';

@NgModule({
  imports: [
    MdcIconModule,
  ],
  exports: [
    MdcIconModule,
    MdcButtonComponent
  ],
  declarations: [MdcButtonComponent],
})
export class MdcButtonModule { }

export * from './button.component';
