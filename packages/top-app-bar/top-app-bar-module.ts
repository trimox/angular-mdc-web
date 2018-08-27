import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcTopAppBar } from './top-app-bar';
import {
  MdcTopAppBarActionItem,
  MdcTopAppBarNavigationIcon,
  MdcTopAppBarRow,
  MdcTopAppBarSection,
  MdcTopAppBarTitle
} from './top-app-bar.directives';

const TOP_APP_BAR_DECLARATIONS = [
  MdcTopAppBar,
  MdcTopAppBarActionItem,
  MdcTopAppBarNavigationIcon,
  MdcTopAppBarRow,
  MdcTopAppBarSection,
  MdcTopAppBarTitle
];

@NgModule({
  imports: [CommonModule],
  exports: TOP_APP_BAR_DECLARATIONS,
  declarations: TOP_APP_BAR_DECLARATIONS
})
export class MdcTopAppBarModule { }
