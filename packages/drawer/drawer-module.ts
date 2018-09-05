import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdcDrawer,
  MdcDrawerContent,
  MdcDrawerHeader
} from './drawer';

const DRAWER_DECLARATIONS = [
  MdcDrawer,
  MdcDrawerContent,
  MdcDrawerHeader
];

@NgModule({
  imports: [CommonModule],
  exports: [DRAWER_DECLARATIONS],
  declarations: [DRAWER_DECLARATIONS]
})
export class MdcDrawerModule { }
