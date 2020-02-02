import {NgModule} from '@angular/core';

import {MdcMenuSurfaceModule} from '@angular-mdc/web/menu-surface';

import {MdcMenu} from './menu';

import {
  MdcMenuSelectionGroup,
  MdcMenuSelectionGroupIcon
} from './menu-directives';

const MENU_DECLARATIONS = [
  MdcMenu,
  MdcMenuSelectionGroup,
  MdcMenuSelectionGroupIcon
];

@NgModule({
  imports: [MdcMenuSurfaceModule],
  exports: [
    ...MENU_DECLARATIONS,
    MdcMenuSurfaceModule
  ],
  declarations: [MENU_DECLARATIONS]
})
export class MdcMenuModule {}
