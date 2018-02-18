import { NgModule } from '@angular/core';

import { MdcContent } from './mdc-content';
import { MdcMaterialIcon } from './material-icon';

const THEME_DECLARATIONS = [
  MdcContent,
  MdcMaterialIcon,
];

@NgModule({
  exports: [THEME_DECLARATIONS],
  declarations: [THEME_DECLARATIONS],
})
export class MdcThemeModule { }
