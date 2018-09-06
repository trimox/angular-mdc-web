import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcIconModule } from '@angular-mdc/web/icon';
import {
  MdcIconButton,
  MdcIconOn
} from './icon-button';

const ICON_BUTTON_DECLARATIONS = [
  MdcIconButton,
  MdcIconOn
];

@NgModule({
  imports: [
    CommonModule,
    MdcIconModule
  ],
  exports: [
    ...ICON_BUTTON_DECLARATIONS,
    MdcIconModule
  ],
  declarations: ICON_BUTTON_DECLARATIONS
})
export class MdcIconButtonModule { }
