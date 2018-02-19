import { NgModule } from '@angular/core';

import { MdcIconModule } from '@angular-mdc/web/icon';
import { MdcFab } from './fab';

@NgModule({
  imports: [MdcIconModule],
  exports: [MdcFab],
  declarations: [MdcFab],
})
export class MdcFabModule { }
