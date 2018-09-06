import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdcDrawer,
  MdcDrawerAppContent,
  MdcDrawerContent,
  MdcDrawerHeader,
  MdcDrawerSubtitle,
  MdcDrawerTitle
} from './drawer';

const DRAWER_DECLARATIONS = [
  MdcDrawer,
  MdcDrawerAppContent,
  MdcDrawerContent,
  MdcDrawerHeader,
  MdcDrawerSubtitle,
  MdcDrawerTitle
];

@NgModule({
  imports: [CommonModule],
  exports: [DRAWER_DECLARATIONS],
  declarations: [DRAWER_DECLARATIONS]
})
export class MdcDrawerModule { }
