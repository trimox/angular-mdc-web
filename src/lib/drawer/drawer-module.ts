import { NgModule } from '@angular/core';

import {
  MdcDrawer,
  MdcDrawerContent,
  MdcDrawerHeader,
  MdcDrawerHeaderContent,
  MdcDrawerSpacer,
} from './drawer';

import { MdcDrawerPermanent } from './permanent/drawer-permanent';
import {
  MdcTemporaryDrawer,
  MdcTemporaryDrawerContent,
  MdcTemporaryDrawerNavigation,
  MdcTemporaryDrawerHeader,
  MdcTemporaryDrawerSpacer,
  MdcTemporaryDrawerHeaderContent,
} from './temporary/drawer-temporary';

import {
  MdcDrawerPersistent,
  MdcDrawerPersistentNavigation
} from './persistent/drawer-persistent';

const DRAWER_COMPONENTS = [
  MdcDrawerContent,
  MdcDrawerHeader,
  MdcDrawerHeaderContent,
  MdcDrawerPermanent,
  MdcDrawerPersistent,
  MdcDrawerPersistentNavigation,
  MdcDrawerSpacer,
  MdcTemporaryDrawer,
  MdcTemporaryDrawerContent,
  MdcTemporaryDrawerHeader,
  MdcTemporaryDrawerHeaderContent,
  MdcTemporaryDrawerNavigation,
  MdcTemporaryDrawerSpacer,
];

@NgModule({
  exports: DRAWER_COMPONENTS,
  declarations: DRAWER_COMPONENTS,
})
export class MdcDrawerModule { }
