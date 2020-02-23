import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Sass, Typography} from './typography';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Sass,
  Typography
];

const ROUTES: Routes = [
  {
    path: '', component: Typography,
    children: [
      {path: '', redirectTo: 'api'},
      {path: 'api', component: Api},
      {path: 'examples', component: Examples},
      {path: 'sass', component: Sass}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {}
