import { NgModule } from '@angular/core';

import { MdcFormFieldModule } from '@angular-mdc/web/form-field';
import { MdcRadioGroup } from './radio-group';
import { MdcRadio } from './radio';

@NgModule({
  imports: [MdcFormFieldModule],
  exports: [
    MdcRadio,
    MdcRadioGroup
  ],
  declarations: [
    MdcRadio,
    MdcRadioGroup
  ]
})
export class MdcRadioModule { }
