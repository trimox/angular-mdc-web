import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcIconModule } from '@angular-mdc/web/icon';
import { MdcFab } from './fab';

@NgModule({
  imports: [MdcIconModule, CommonModule],
  exports: [MdcFab],
  declarations: [MdcFab],
})
export class MdcFabModule { }
