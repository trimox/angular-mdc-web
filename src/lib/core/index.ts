import { NgModule } from '@angular/core';

import { MdcMaterialIconModule } from './material-icon/index';
import { MdcTypographyModule } from './typography/index';
import { MdcElevationModule } from './elevation/index';

const CORE_DIRECTIVES = [
  MdcElevationModule,
  MdcMaterialIconModule,
  MdcTypographyModule,
];

@NgModule({
  imports: [CORE_DIRECTIVES],
  exports: [CORE_DIRECTIVES],
})
export class MdcCoreModule { }

export * from './public_api';
