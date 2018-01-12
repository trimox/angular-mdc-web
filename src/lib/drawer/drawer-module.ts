import { NgModule } from '@angular/core';

import {
  MdcDrawer,
  MdcDrawerContent,
  MdcDrawerHeader,
  MdcDrawerHeaderContent,
  MdcDrawerNavigation,
  MdcDrawerSpacer,
} from './drawer';

import { MdcDrawerPermanent } from './permanent/drawer-permanent';
import { MdcDrawerTemporary } from './temporary/drawer-temporary';
import { MdcDrawerPersistent } from './persistent/drawer-persistent';

const DRAWER_COMPONENTS = [
  MdcDrawerContent,
  MdcDrawerHeader,
  MdcDrawerHeaderContent,
  MdcDrawerNavigation,
  MdcDrawerPermanent,
  MdcDrawerPersistent,
  MdcDrawerSpacer,
  MdcDrawerTemporary
];

@NgModule({
  exports: DRAWER_COMPONENTS,
  declarations: DRAWER_COMPONENTS,
})
export class MdcDrawerModule { }
