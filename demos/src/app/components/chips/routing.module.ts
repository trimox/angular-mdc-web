import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Chips} from './chips';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Chips
];

const ROUTES: Routes = [
  {
    path: '', component: Chips,
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
