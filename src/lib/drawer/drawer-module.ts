import { NgModule } from '@angular/core';

import {
  MdcDrawer,
  MdcDrawerContent,
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
  MdcPersistentDrawer,
  MdcPersistentDrawerHeader,
  MdcPersistentDrawerNavigation,
  MdcPersistentDrawerHeaderContent,
  MdcPersistentDrawerContent,
  MdcPersistentDrawerSpacer,
} from './persistent/drawer-persistent';

const DRAWER_COMPONENTS = [
  MdcDrawerContent,
  MdcDrawerPermanent,
  MdcDrawerSpacer,
  MdcPersistentDrawer,
  MdcPersistentDrawerContent,
  MdcPersistentDrawerHeader,
  MdcPersistentDrawerHeaderContent,
  MdcPersistentDrawerNavigation,
  MdcPersistentDrawerSpacer,
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
