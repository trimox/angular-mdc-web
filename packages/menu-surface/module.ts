import {NgModule} from '@angular/core';

import {MdcMenuSurface} from './menu-surface';
import {MdcMenuSurfaceAnchor} from './menu-surface-anchor';

const MENU_SURFACE_DECLARATIONS = [
  MdcMenuSurface,
  MdcMenuSurfaceAnchor
];

@NgModule({
  exports: [MENU_SURFACE_DECLARATIONS],
  declarations: [MENU_SURFACE_DECLARATIONS]
})
export class MdcMenuSurfaceModule { }
