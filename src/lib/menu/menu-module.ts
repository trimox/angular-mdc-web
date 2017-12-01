import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdcMenu,
  MdcMenuAnchor,
  MdcMenuDivider,
  MdcMenuItem,
  MdcMenuItems,
} from './menu';

const MENU_COMPONENTS = [
  MdcMenu,
  MdcMenuAnchor,
  MdcMenuDivider,
  MdcMenuItem,
  MdcMenuItems,
];

@NgModule({
  imports: [CommonModule],
  exports: [MENU_COMPONENTS],
  declarations: [MENU_COMPONENTS],
})
export class MdcMenuModule { }
