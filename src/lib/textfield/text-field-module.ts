import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdcTextFieldBottomLine } from './bottom-line';
import { MdcTextFieldHelperText } from './helper-text';
import {
  MdcTextFieldLeadingIcon,
  MdcTextFieldTrailingIcon,
} from './icon';
import { MdcTextFieldLabel } from './label';
import { MdcTextField } from './text-field';
import { MdcTextFieldBox } from './text-field-box';
import { MdcTextarea } from './textarea';
import {
  MdcTextFieldOutline,
  MdcTextFieldOutlinePath,
  MdcTextFieldIdleOutline,
} from './outline';

const TEXTFIELD_COMPONENTS = [
  MdcTextarea,
  MdcTextField,
  MdcTextFieldBottomLine,
  MdcTextFieldBox,
  MdcTextFieldHelperText,
  MdcTextFieldIdleOutline,
  MdcTextFieldLabel,
  MdcTextFieldLeadingIcon,
  MdcTextFieldOutline,
  MdcTextFieldOutlinePath,
  MdcTextFieldTrailingIcon,
];

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [TEXTFIELD_COMPONENTS],
  declarations: [TEXTFIELD_COMPONENTS],
})
export class MdcTextFieldModule { }
