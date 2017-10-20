import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdcTextfieldInput } from './textfield-input';
import {
  MdcTextfield,
  MdcTextfieldBottomLine,
  MdcTextfieldHelptext,
  MdcTextfieldLabel,
  MdcTextfieldLeadingIcon,
  MdcTextfieldTrailingIcon,
} from './textfield';
import {
  MdcTextfieldBox,
} from './textfield-box';
import { MdcTextarea } from './textarea';

const TEXTFIELD_COMPONENTS = [
  MdcTextarea,
  MdcTextfield,
  MdcTextfieldBottomLine,
  MdcTextfieldBottomLine,
  MdcTextfieldBox,
  MdcTextfieldHelptext,
  MdcTextfieldInput,
  MdcTextfieldLabel,
  MdcTextfieldLeadingIcon,
  MdcTextfieldTrailingIcon,
];

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [TEXTFIELD_COMPONENTS],
  declarations: [TEXTFIELD_COMPONENTS],
})
export class MdcTextfieldModule { }

export * from './textfield';
export * from './textfield-input';
export * from './textfield-box';
export * from './textarea';
