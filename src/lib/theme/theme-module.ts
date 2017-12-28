import { NgModule } from '@angular/core';

import { MdcContent } from './mdc-content';
import { MdcMaterialIcon } from './material-icon';
import { MdcThemeDark } from './theme-dark';

const THEME_DIRECTIVES = [
  MdcContent,
  MdcMaterialIcon,
  MdcThemeDark,
];

@NgModule({
  exports: [THEME_DIRECTIVES],
  declarations: [THEME_DIRECTIVES],
})
export class MdcThemeModule { }
