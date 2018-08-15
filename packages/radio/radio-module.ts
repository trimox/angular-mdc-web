import { NgModule } from '@angular/core';

import { MdcFormFieldModule } from '@angular-mdc/web/form-field';
import { MdcRadio } from './radio';

@NgModule({
  imports: [MdcFormFieldModule],
  exports: [
    MdcFormFieldModule,
    MdcRadio
  ],
  declarations: [MdcRadio]
})
export class MdcRadioModule { }
