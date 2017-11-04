import { NgModule } from '@angular/core';

import { MdcContent, MdcThemeDark } from './theme';

const THEME_DIRECTIVES = [
  MdcContent,
  MdcThemeDark,
];

@NgModule({
  exports: [THEME_DIRECTIVES],
  declarations: [THEME_DIRECTIVES],
})
export class MdcThemeModule { }

export * from './theme';
