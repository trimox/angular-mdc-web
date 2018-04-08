import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcSelectBottomLine } from './select-bottom-line';
import { MdcSelectLabel } from './select-label';
import { MdcSelect } from './select';

export const SELECT_DECLARATIONS = [
  MdcSelect,
  MdcSelectBottomLine,
  MdcSelectLabel
];

@NgModule({
  imports: [CommonModule],
  exports: SELECT_DECLARATIONS,
  declarations: SELECT_DECLARATIONS,
})
export class MdcSelectModule { }
