import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcAppBar } from './app-bar';
import {
  MdcAppBarActionItem,
  MdcAppBarNavigationIcon,
  MdcAppBarRow,
  MdcAppBarSection,
  MdcAppBarTitle
} from './app-bar.directives';

const APPBAR_DECLARATIONS = [
  MdcAppBar,
  MdcAppBarActionItem,
  MdcAppBarNavigationIcon,
  MdcAppBarRow,
  MdcAppBarSection,
  MdcAppBarTitle
];

@NgModule({
  imports: [CommonModule],
  exports: APPBAR_DECLARATIONS,
  declarations: APPBAR_DECLARATIONS
})
export class MdcAppBarModule { }
