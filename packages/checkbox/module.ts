import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MdcFormFieldModule} from '@angular-mdc/web/form-field';
import {MdcCheckbox} from './checkbox';

@NgModule({
  imports: [CommonModule, MdcFormFieldModule],
  exports: [
    MdcFormFieldModule,
    MdcCheckbox
  ],
  declarations: [MdcCheckbox]
})
export class MdcCheckboxModule { }
