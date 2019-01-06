import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Api, Examples, Sass, IconButtonDemo } from './icon-button-demo';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Sass,
  IconButtonDemo
];

const ROUTES: Routes = [
  {
    path: '', component: IconButtonDemo,
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
