import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, TopAppBar} from './top-app-bar';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,  TopAppBar
];

const ROUTES: Routes = [
  {
    path: '', component: TopAppBar,
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
