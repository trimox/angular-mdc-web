import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcIconModule } from '@angular-mdc/web/icon';
import { MdcFab, MdcFabLabel } from './fab';

@NgModule({
  imports: [
    CommonModule,
    MdcIconModule
  ],
  exports: [
    MdcFab,
    MdcFabLabel
  ],
  declarations: [MdcFab, MdcFabLabel]
})
export class MdcFabModule { }
