import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Ripple} from './ripple';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Ripple
];

const ROUTES: Routes = [
  {
    path: '', component: Ripple,
    children: [
      {path: '', redirectTo: 'api'},
      {path: 'api', component: Api},
      {path: 'examples', component: Examples}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {}
