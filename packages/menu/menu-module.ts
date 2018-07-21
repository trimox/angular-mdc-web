import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdcMenu,
  MdcMenuAnchor,
  MdcMenuDivider,
  MdcMenuItem,
  MdcMenuItems,
} from './menu';

const MENU_DECLARATIONS = [
  MdcMenu,
  MdcMenuAnchor,
  MdcMenuDivider,
  MdcMenuItem,
  MdcMenuItems,
];

@NgModule({
  imports: [CommonModule],
  exports: [MENU_DECLARATIONS],
  declarations: [MENU_DECLARATIONS],
})
export class MdcMenuModule { }
