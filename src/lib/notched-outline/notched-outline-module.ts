import { NgModule } from '@angular/core';

import { MdcNotchedOutline, MdcNotchedOutlineIdle } from './notched-outline';

@NgModule({
  exports: [MdcNotchedOutline, MdcNotchedOutlineIdle],
  declarations: [MdcNotchedOutline, MdcNotchedOutlineIdle],
})
export class MdcNotchedOutlineModule { }
