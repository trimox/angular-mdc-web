import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcFloatingLabelModule } from '@angular-mdc/web/floating-label';
import { MdcLineRippleModule } from '@angular-mdc/web/line-ripple';
import { MdcNotchedOutlineModule } from '@angular-mdc/web/notched-outline';

import { MdcTextFieldHelperText } from './helper-text';
import { MdcTextField } from './text-field';
import { MdcTextarea } from './textarea';
import { MdcTextFieldIcon } from './text-field-icon';

const TEXTFIELD_DECLARATIONS = [
  MdcTextarea,
  MdcTextField,
  MdcTextFieldHelperText,
  MdcTextFieldIcon
];

@NgModule({
  imports: [
    CommonModule,
    MdcLineRippleModule,
    MdcFloatingLabelModule,
    MdcNotchedOutlineModule
  ],
  exports: TEXTFIELD_DECLARATIONS,
  declarations: TEXTFIELD_DECLARATIONS
})
export class MdcTextFieldModule { }
