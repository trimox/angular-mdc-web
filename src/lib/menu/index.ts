import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdcMenuComponent,
  MdcMenuDividerComponent,
  MdcMenuAnchorDirective,
  MenuOpenFrom,
} from './menu.component';
import { MdcMenuItemDirective } from './menu-item.directive';

const MENU_COMPONENTS = [
  MdcMenuComponent,
  MdcMenuItemDirective,
  MdcMenuAnchorDirective,
  MdcMenuDividerComponent,
];

@NgModule({
  imports: [CommonModule],
  exports: [MENU_COMPONENTS],
  declarations: [MENU_COMPONENTS],
})
export class MdcMenuModule { }

export * from './menu.component';
export * from './menu-item.directive';
