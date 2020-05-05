import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MdcFloatingLabelModule} from '@angular-mdc/web/floating-label';
import {MdcLineRippleModule} from '@angular-mdc/web/line-ripple';
import {MdcNotchedOutlineModule} from '@angular-mdc/web/notched-outline';
import {MdcFormFieldModule} from '@angular-mdc/web/form-field';
import {MdcMenuModule} from '@angular-mdc/web/menu';
import {MdcListModule} from '@angular-mdc/web/list';

import {MdcSelect} from './select';
import {MdcSelectIcon} from './select-icon';

const SELECT_DECLARATIONS = [
  MdcSelect,
  MdcSelectIcon,
];

@NgModule({
  imports: [
    CommonModule,
    MdcMenuModule,
    MdcListModule,
    MdcFormFieldModule,
    MdcFloatingLabelModule,
    MdcNotchedOutlineModule,
    MdcLineRippleModule
  ],
  exports: [
    MdcMenuModule,
    MdcListModule,
    MdcFormFieldModule,
    SELECT_DECLARATIONS
  ],
  declarations: SELECT_DECLARATIONS
})
export class MdcSelectModule {}
