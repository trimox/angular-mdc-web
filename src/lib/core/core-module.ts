import { NgModule } from '@angular/core';

import { MdcMaterialIconModule } from './material-icon';
import { MdcTypographyModule } from './typography';
import { MdcThemeModule } from './theme';

const CORE_DIRECTIVES = [
  MdcMaterialIconModule,
  MdcTypographyModule,
  MdcThemeModule,
];

@NgModule({
  imports: [CORE_DIRECTIVES],
  exports: [CORE_DIRECTIVES],
})
export class MdcCoreModule { }
