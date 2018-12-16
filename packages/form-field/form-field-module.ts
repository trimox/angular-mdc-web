import { NgModule } from '@angular/core';

import { MdcFormField } from './form-field';
import { MdcHelperText } from './helper-text';

const FORM_FIELD_DECLARATIONS = [
  MdcFormField,
  MdcHelperText
];

@NgModule({
  exports: [FORM_FIELD_DECLARATIONS],
  declarations: [FORM_FIELD_DECLARATIONS]
})
export class MdcFormFieldModule { }
