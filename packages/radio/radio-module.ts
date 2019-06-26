import {NgModule} from '@angular/core';

import {MdcFormFieldModule} from '@angular-mdc/web/form-field';
import {MdcRadio, MdcRadioGroup} from './radio';

@NgModule({
  imports: [MdcFormFieldModule],
  exports: [MdcRadioGroup, MdcRadio],
  declarations: [MdcRadioGroup, MdcRadio]
})
export class MdcRadioModule { }
