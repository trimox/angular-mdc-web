import { NgModule } from '@angular/core';

import {
  MdcPermanentDrawer,
  MdcPermanentDrawerSpacer,
  MdcPermanentDrawerContent,
  MdcPermanentDrawerSelected,
} from './permanent/drawer-permanent';
import {
  MdcTemporaryDrawer,
  MdcTemporaryDrawerContent,
  MdcTemporaryDrawerNavigation,
  MdcTemporaryDrawerHeader,
  MdcTemporaryDrawerSpacer,
  MdcTemporaryDrawerHeaderContent,
  MdcTemporaryDrawerSelected,
} from './temporary/drawer-temporary';

import {
  MdcPersistentDrawer,
  MdcPersistentDrawerHeader,
  MdcPersistentDrawerNavigation,
  MdcPersistentDrawerHeaderContent,
  MdcPersistentDrawerContent,
  MdcPersistentDrawerSelected,
  MdcPersistentDrawerSpacer,
} from './persistent/drawer-persistent';

const DRAWER_COMPONENTS = [
  MdcPermanentDrawer,
  MdcPermanentDrawerSpacer,
  MdcPermanentDrawerContent,
  MdcPermanentDrawerSelected,
  MdcTemporaryDrawer,
  MdcTemporaryDrawerContent,
  MdcTemporaryDrawerNavigation,
  MdcTemporaryDrawerHeader,
  MdcTemporaryDrawerSpacer,
  MdcTemporaryDrawerHeaderContent,
  MdcTemporaryDrawerSelected,
  MdcPersistentDrawer,
  MdcPersistentDrawerHeader,
  MdcPersistentDrawerNavigation,
  MdcPersistentDrawerHeaderContent,
  MdcPersistentDrawerContent,
  MdcPersistentDrawerSelected,
  MdcPersistentDrawerSpacer,
];

@NgModule({
  exports: DRAWER_COMPONENTS,
  declarations: DRAWER_COMPONENTS,
})
export class MdcDrawerModule { }

export * from './permanent/drawer-permanent';
export * from './temporary/drawer-temporary';
export * from './persistent/drawer-persistent';
