import { NgModule } from '@angular/core';

import { ThemeDark } from './theme-dark.directive';

const THEME_DIRECTIVES = [
  ThemeDark
];

@NgModule({
  exports: [THEME_DIRECTIVES],
  declarations: [THEME_DIRECTIVES],
})
export class ThemeModule { }

export * from './theme-dark.directive';
