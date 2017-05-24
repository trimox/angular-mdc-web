import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu';
import { MenuItemDirective } from './menu-item';

const MENU_COMPONENTS = [
  MenuComponent,
  MenuItemDirective
];

@NgModule({
  imports: [CommonModule],
  exports: [MENU_COMPONENTS],
  declarations: [MENU_COMPONENTS],
})
export class MenuModule { }
