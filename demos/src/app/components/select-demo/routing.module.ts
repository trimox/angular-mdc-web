import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Api, Examples, Sass, SelectDemo } from './select-demo';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Sass,
  SelectDemo
];

const ROUTES: Routes = [
  {
    path: '', component: SelectDemo,
    children: [
      { path: '', redirectTo: 'api' },
      { path: 'api', component: Api },
      { path: 'sass', component: Sass },
      { path: 'examples', component: Examples }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule { }
