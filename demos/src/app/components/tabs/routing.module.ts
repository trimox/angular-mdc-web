import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Tabs} from './tabs';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Tabs
];

const ROUTES: Routes = [
  {
    path: '', component: Tabs,
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
