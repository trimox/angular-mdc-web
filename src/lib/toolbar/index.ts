import { NgModule } from '@angular/core';

import {
  MdcToolbar,
  MdcToolbarFixedAdjust,
  MdcToolbarIcon,
  MdcToolbarMenuIcon,
  MdcToolbarRow,
  MdcToolbarSection,
  MdcToolbarTitle,
} from './toolbar';

const TOOLBAR_COMPONENTS = [
  MdcToolbar,
  MdcToolbarFixedAdjust,
  MdcToolbarIcon,
  MdcToolbarMenuIcon,
  MdcToolbarRow,
  MdcToolbarSection,
  MdcToolbarTitle,
];

@NgModule({
  exports: [TOOLBAR_COMPONENTS],
  declarations: [TOOLBAR_COMPONENTS],
})
export class MdcToolbarModule { }

export * from './toolbar';
