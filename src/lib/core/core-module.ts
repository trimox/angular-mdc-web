import { NgModule } from '@angular/core';

import { MdcMaterialIconModule } from './material-icon';
import { MdcThemeModule } from './theme';

const CORE_DIRECTIVES = [
  MdcMaterialIconModule,
  MdcThemeModule,
];

@NgModule({
  imports: [CORE_DIRECTIVES],
  exports: [CORE_DIRECTIVES],
})
export class MdcCoreModule { }
