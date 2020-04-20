import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Examples, Typography} from './typography';

export const ROUTE_DECLARATIONS = [
  Examples,
  Typography
];

const ROUTES: Routes = [
  {
    path: '', component: Typography,
    children: [
      {path: '', redirectTo: 'examples'},
      {path: 'examples', component: Examples},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {}
