import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MenuComponent,
  MenuDividerComponent,
  MenuAnchorDirective,
  MenuOpenFrom,
} from './menu.component';
import { MenuItemDirective } from './menu-item.directive';

const MENU_COMPONENTS = [
  MenuComponent,
  MenuItemDirective,
  MenuAnchorDirective,
  MenuDividerComponent,
];

@NgModule({
  imports: [CommonModule],
  exports: [MENU_COMPONENTS],
  declarations: [MENU_COMPONENTS],
})
export class MenuModule { }

export * from './menu.component';
