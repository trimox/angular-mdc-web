import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MdcFloatingLabelModule} from '@angular-mdc/web/floating-label';
import {MdcLineRippleModule} from '@angular-mdc/web/line-ripple';
import {MdcNotchedOutlineModule} from '@angular-mdc/web/notched-outline';
import {MdcFormFieldModule} from '@angular-mdc/web/form-field';
import {MdcMenuModule} from '@angular-mdc/web/menu';

import {MdcSelect, MdcSelectOption} from './select';
import {MdcSelectIcon} from './select-icon';

const SELECT_DECLARATIONS = [
  MdcSelect,
  MdcSelectIcon,
  MdcSelectOption
];

@NgModule({
  imports: [
    CommonModule,
    MdcMenuModule,
    MdcFormFieldModule,
    MdcFloatingLabelModule,
    MdcNotchedOutlineModule,
    MdcLineRippleModule
  ],
  exports: [
    MdcMenuModule,
    MdcFormFieldModule,
    SELECT_DECLARATIONS
  ],
  declarations: SELECT_DECLARATIONS
})
export class MdcSelectModule { }
