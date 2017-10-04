import { NgModule } from '@angular/core';

import { MdcMaterialIconModule } from './material-icon/index';
import { MdcTypographyModule } from './typography/index';

@NgModule({
  imports: [MdcMaterialIconModule, MdcTypographyModule],
  exports: [MdcMaterialIconModule, MdcTypographyModule],
})
export class MdcCoreModule { }

export * from './public_api';
