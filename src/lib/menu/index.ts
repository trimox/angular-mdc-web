import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { MenuItemDirective } from './menu-item.directive';
import { MenuAnchorDirective } from './menu-anchor.directive';
import { MenuDividerComponent } from './menu-divider.component';

const MENU_COMPONENTS = [
  MenuComponent,
  MenuItemDirective,
  MenuAnchorDirective,
  MenuDividerComponent
];

@NgModule({
  imports: [CommonModule],
  exports: [MENU_COMPONENTS],
  declarations: [MENU_COMPONENTS],
})
export class MenuModule { }

export * from './menu.component';
export * from './menu-open-from';
