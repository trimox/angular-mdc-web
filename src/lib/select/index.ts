import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MdcSelect,
  MdcSelectedText,
  MdcSelectItem,
  MdcSelectItems,
  MdcSelectLabel,
  MdcSelectMenu,
} from './select.component';

export const SELECT_COMPONENTS = [
  MdcSelect,
  MdcSelectedText,
  MdcSelectItem,
  MdcSelectItems,
  MdcSelectLabel,
  MdcSelectMenu,
];

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [SELECT_COMPONENTS],
  declarations: [SELECT_COMPONENTS],
})
export class MdcSelectModule { }

export * from './select.component';
