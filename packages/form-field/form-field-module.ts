import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MdcFormField} from './form-field';
import {MdcHelperText} from './helper-text';
import {MdcCharacterCounter} from './character-counter';

const FORM_FIELD_DECLARATIONS = [
  MdcCharacterCounter,
  MdcFormField,
  MdcHelperText
];

@NgModule({
  imports: [CommonModule],
  exports: [FORM_FIELD_DECLARATIONS],
  declarations: [FORM_FIELD_DECLARATIONS]
})
export class MdcFormFieldModule { }
