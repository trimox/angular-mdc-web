import { NgModule } from '@angular/core';

import {
  MdcDrawerContent,
  MdcDrawerHeader,
  MdcDrawerHeaderContent,
  MdcDrawerNavigation,
  MdcDrawerSpacer,
} from './drawer.directives';

import { MdcDrawer } from './drawer';

const DRAWER_COMPONENTS = [
  MdcDrawer,
  MdcDrawerContent,
  MdcDrawerHeader,
  MdcDrawerHeaderContent,
  MdcDrawerNavigation,
  MdcDrawerSpacer,
];

@NgModule({
  exports: DRAWER_COMPONENTS,
  declarations: DRAWER_COMPONENTS,
})
export class MdcDrawerModule { }
