import { NgModule } from '@angular/core';

import { MdcFormFieldModule } from '@angular-mdc/web/form-field';
import { MdcSwitch } from './switch';

@NgModule({
  imports: [MdcFormFieldModule],
  exports: [
    MdcFormFieldModule,
    MdcSwitch
  ],
  declarations: [MdcSwitch]
})
export class MdcSwitchModule { }
