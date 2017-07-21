import { NgModule } from '@angular/core';

import {
  PermanentDrawerComponent,
  PermanentDrawerSpacerDirective,
  PermanentDrawerContentDirective,
  PermanentDrawerSelectedDirective,
} from './permanent/drawer-permanent.component';
import {
  TemporaryDrawerComponent,
  TemporaryDrawerContentDirective,
  TemporaryDrawerNavigationDirective,
  TemporaryDrawerHeaderDirective,
  TemporaryDrawerSpacerDirective,
  TemporaryDrawerHeaderContentDirective,
  TemporaryDrawerSelectedDirective,
} from './temporary/drawer-temporary.component';

import {
  PersistentDrawerComponent,
  PersistentDrawerHeaderDirective,
  PersistentDrawerNavigationDirective,
  PersistentDrawerHeaderContentDirective,
  PersistentDrawerContentDirective,
  PersistentDrawerSelectedDirective,
  PersistentDrawerSpacerDirective,
} from './persistent/drawer-persistent.component';

const DRAWER_COMPONENTS = [
  PermanentDrawerComponent,
  PermanentDrawerSpacerDirective,
  PermanentDrawerContentDirective,
  PermanentDrawerSelectedDirective,
  TemporaryDrawerComponent,
  TemporaryDrawerNavigationDirective,
  TemporaryDrawerContentDirective,
  TemporaryDrawerHeaderDirective,
  TemporaryDrawerSpacerDirective,
  TemporaryDrawerHeaderContentDirective,
  TemporaryDrawerSelectedDirective,
  PersistentDrawerComponent,
  PersistentDrawerHeaderDirective,
  PersistentDrawerNavigationDirective,
  PersistentDrawerHeaderContentDirective,
  PersistentDrawerContentDirective,
  PersistentDrawerSpacerDirective,
  PersistentDrawerSelectedDirective,
];

@NgModule({
  exports: DRAWER_COMPONENTS,
  declarations: DRAWER_COMPONENTS,
})
export class DrawerModule { }

export * from './permanent/drawer-permanent.component';
export * from './temporary/drawer-temporary.component';
export * from './persistent/drawer-persistent.component';
