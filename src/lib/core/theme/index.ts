import { NgModule } from '@angular/core';

import { MdcThemeDark } from './theme-dark';

const THEME_DIRECTIVES = [
  MdcThemeDark
];

@NgModule({
  exports: [THEME_DIRECTIVES],
  declarations: [THEME_DIRECTIVES],
})
export class MdcThemeModule { }

export * from './theme-dark';
