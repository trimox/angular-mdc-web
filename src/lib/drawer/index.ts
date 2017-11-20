import { NgModule } from '@angular/core';

import { MdcDrawer } from './drawer';

import {
  MdcPermanentDrawer,
  MdcPermanentDrawerSpacer,
  MdcPermanentDrawerContent,
} from './permanent/drawer-permanent';
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
  MdcPermanentDrawer,
  MdcPermanentDrawerSpacer,
  MdcPermanentDrawerContent,
  MdcTemporaryDrawer,
  MdcTemporaryDrawerContent,
  MdcTemporaryDrawerNavigation,
  MdcTemporaryDrawerHeader,
  MdcTemporaryDrawerSpacer,
  MdcTemporaryDrawerHeaderContent,
  MdcPersistentDrawer,
  MdcPersistentDrawerHeader,
  MdcPersistentDrawerNavigation,
  MdcPersistentDrawerHeaderContent,
  MdcPersistentDrawerContent,
  MdcPersistentDrawerSpacer,
];

@NgModule({
  exports: DRAWER_COMPONENTS,
  declarations: DRAWER_COMPONENTS,
})
export class MdcDrawerModule { }

export * from './drawer';
export * from './permanent/drawer-permanent';
export * from './temporary/drawer-temporary';
export * from './persistent/drawer-persistent';
