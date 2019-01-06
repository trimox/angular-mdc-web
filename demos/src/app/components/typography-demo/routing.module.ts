import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Api, Examples, Sass, TypographyDemo } from './typography-demo';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Sass,
  TypographyDemo
];

const ROUTES: Routes = [
  {
    path: '', component: TypographyDemo,
    children: [
      { path: '', redirectTo: 'api' },
      { path: 'api', component: Api },
      { path: 'examples', component: Examples },
      { path: 'sass', component: Sass }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule { }
