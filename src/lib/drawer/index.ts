import { NgModule } from '@angular/core';

import {
  MdcPermanentDrawerComponent,
  MdcPermanentDrawerSpacerDirective,
  MdcPermanentDrawerContentDirective,
  MdcPermanentDrawerSelectedDirective,
} from './permanent/drawer-permanent.component';
import {
  MdcTemporaryDrawerComponent,
  MdcTemporaryDrawerContentDirective,
  MdcTemporaryDrawerNavigationDirective,
  MdcTemporaryDrawerHeaderDirective,
  MdcTemporaryDrawerSpacerDirective,
  MdcTemporaryDrawerHeaderContentDirective,
  MdcTemporaryDrawerSelectedDirective,
} from './temporary/drawer-temporary.component';

import {
  MdcPersistentDrawerComponent,
  MdcPersistentDrawerHeaderDirective,
  MdcPersistentDrawerNavigationDirective,
  MdcPersistentDrawerHeaderContentDirective,
  MdcPersistentDrawerContentDirective,
  MdcPersistentDrawerSelectedDirective,
  MdcPersistentDrawerSpacerDirective,
} from './persistent/drawer-persistent.component';

const DRAWER_COMPONENTS = [
  MdcPermanentDrawerComponent,
  MdcPermanentDrawerSpacerDirective,
  MdcPermanentDrawerContentDirective,
  MdcPermanentDrawerSelectedDirective,
  MdcTemporaryDrawerComponent,
  MdcTemporaryDrawerNavigationDirective,
  MdcTemporaryDrawerContentDirective,
  MdcTemporaryDrawerHeaderDirective,
  MdcTemporaryDrawerSpacerDirective,
  MdcTemporaryDrawerHeaderContentDirective,
  MdcTemporaryDrawerSelectedDirective,
  MdcPersistentDrawerComponent,
  MdcPersistentDrawerHeaderDirective,
  MdcPersistentDrawerNavigationDirective,
  MdcPersistentDrawerHeaderContentDirective,
  MdcPersistentDrawerContentDirective,
  MdcPersistentDrawerSpacerDirective,
  MdcPersistentDrawerSelectedDirective,
];

@NgModule({
  exports: DRAWER_COMPONENTS,
  declarations: DRAWER_COMPONENTS,
})
export class MdcDrawerModule { }

export * from './permanent/drawer-permanent.component';
export * from './temporary/drawer-temporary.component';
export * from './persistent/drawer-persistent.component';
