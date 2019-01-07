import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sass, Usage, ColorPalette, Theme } from './theme';

export const ROUTE_DECLARATIONS = [
  Sass,
  ColorPalette,
  Usage,
  Theme
];

const ROUTES: Routes = [
  {
    path: '', component: Theme,
    children: [
      { path: '', redirectTo: 'usage' },
      { path: 'color-palette', component: ColorPalette },
      { path: 'usage', component: Usage },
      { path: 'sass', component: Sass }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule { }
