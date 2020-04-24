import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MdcFormField} from './form-field';

const FORM_FIELD_DECLARATIONS = [
  MdcFormField,
];

@NgModule({
  imports: [CommonModule],
  exports: [FORM_FIELD_DECLARATIONS],
  declarations: [FORM_FIELD_DECLARATIONS]
})
export class MdcFormFieldModule { }
