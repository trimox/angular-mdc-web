import { NgModule } from '@angular/core';

import { MdcRippleModule } from './ripple';
import { MdcMaterialIconModule } from './material-icon';
import { MdcTypographyModule } from './typography';
import { MdcElevationModule } from './elevation';
import { MdcThemeModule } from './theme';

const CORE_DIRECTIVES = [
  MdcElevationModule,
  MdcMaterialIconModule,
  MdcTypographyModule,
  MdcRippleModule,
  MdcThemeModule,
];

@NgModule({
  imports: [CORE_DIRECTIVES],
  exports: [CORE_DIRECTIVES],
})
export class MdcCoreModule { }
