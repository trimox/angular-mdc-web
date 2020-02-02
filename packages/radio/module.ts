import {NgModule} from '@angular/core';

import {MdcFormFieldModule} from '@angular-mdc/web/form-field';
import {MdcRadio} from './radio';
import {MdcRadioGroup} from './radio-group';

@NgModule({
  imports: [MdcFormFieldModule],
  exports: [MdcRadioGroup, MdcRadio],
  declarations: [MdcRadioGroup, MdcRadio]
})
export class MdcRadioModule { }
