import { NgModule } from '@angular/core';

import { MdcContent } from './mdc-content';
import { MdcMaterialIcons } from './material-icons';

const THEME_DECLARATIONS = [
  MdcContent,
  MdcMaterialIcons,
];

@NgModule({
  exports: THEME_DECLARATIONS,
  declarations: THEME_DECLARATIONS,
})
export class MdcThemeModule { }
