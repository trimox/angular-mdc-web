import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Api, Examples, Sass, ElevationDemo } from './elevation-demo';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Sass,
  ElevationDemo
];

const ROUTES: Routes = [
  {
    path: '', component: ElevationDemo,
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
