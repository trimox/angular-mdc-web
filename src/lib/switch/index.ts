import { NgModule } from '@angular/core';

import { MdcSwitchComponent } from './switch.component';

@NgModule({
  exports: [MdcSwitchComponent],
  declarations: [MdcSwitchComponent],
})
export class MdcSwitchModule { }

export * from './switch.component';
