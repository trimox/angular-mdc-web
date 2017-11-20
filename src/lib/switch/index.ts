import { NgModule } from '@angular/core';

import { MdcSwitch } from './switch';

@NgModule({
  exports: [MdcSwitch],
  declarations: [MdcSwitch],
})
export class MdcSwitchModule { }

export * from './switch';
