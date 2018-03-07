import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcFloatingLabelModule } from '@angular-mdc/web/floating-label';
import { MdcLineRippleModule } from '@angular-mdc/web/line-ripple';

import { MdcTextFieldHelperText } from './helper-text';
import {
  MdcTextFieldLeadingIcon,
  MdcTextFieldTrailingIcon,
} from './icon';
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
  MdcTextFieldLeadingIcon,
  MdcTextFieldOutline,
  MdcTextFieldTrailingIcon,
];

@NgModule({
  imports: [
    CommonModule,
    MdcLineRippleModule,
    MdcFloatingLabelModule
  ],
  exports: TEXTFIELD_DECLARATIONS,
  declarations: TEXTFIELD_DECLARATIONS,
})
export class MdcTextFieldModule { }
