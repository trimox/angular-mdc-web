import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdcTextFieldInput } from './text-field-input';
import {
  MdcTextField,
  MdcTextFieldBottomLine,
  MdcTextFieldHelperText,
  MdcTextFieldLabel,
  MdcTextFieldLeadingIcon,
  MdcTextFieldTrailingIcon,
} from './text-field';
import {
  MdcTextFieldBox,
} from './text-field-box';
import { MdcTextarea } from './textarea';

const TEXTFIELD_COMPONENTS = [
  MdcTextarea,
  MdcTextField,
  MdcTextFieldBottomLine,
  MdcTextFieldBottomLine,
  MdcTextFieldBox,
  MdcTextFieldHelperText,
  MdcTextFieldInput,
  MdcTextFieldLabel,
  MdcTextFieldLeadingIcon,
  MdcTextFieldTrailingIcon,
];

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [TEXTFIELD_COMPONENTS],
  declarations: [TEXTFIELD_COMPONENTS],
})
export class MdcTextFieldModule { }
