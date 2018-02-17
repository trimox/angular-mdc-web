import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdcLineRippleModule } from '@angular-mdc/web/line-ripple';

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
  MdcTextFieldIdleOutline,
} from './outline';

const TEXTFIELD_DECLARATIONS = [
  MdcTextarea,
  MdcTextField,
  MdcTextFieldBox,
  MdcTextFieldHelperText,
  MdcTextFieldIdleOutline,
  MdcTextFieldLabel,
  MdcTextFieldLeadingIcon,
  MdcTextFieldOutline,
  MdcTextFieldTrailingIcon,
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MdcLineRippleModule
  ],
  exports: [TEXTFIELD_DECLARATIONS],
  declarations: [TEXTFIELD_DECLARATIONS],
})
export class MdcTextFieldModule { }
