import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MdcSelectBottomLine,
  MdcSelectItems,
  MdcSelectMenu,
  MdcSelectSelectedText,
  MdcSelectSurface,
} from './select.directives';

import { MdcSelectLabel } from './select-label';
import { MdcSelectItem } from './select-item';
import { MdcSelect } from './select';

export const SELECT_DECLARATIONS = [
  MdcSelect,
  MdcSelectBottomLine,
  MdcSelectItem,
  MdcSelectItems,
  MdcSelectLabel,
  MdcSelectMenu,
  MdcSelectSelectedText,
  MdcSelectSurface,
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
  ],
  exports: SELECT_DECLARATIONS,
  declarations: SELECT_DECLARATIONS,
})
export class MdcSelectModule { }
