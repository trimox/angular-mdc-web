import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Menu} from './menu';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Menu
];

const ROUTES: Routes = [
  {
    path: '', component: Menu,
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
