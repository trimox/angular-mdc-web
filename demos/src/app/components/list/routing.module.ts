import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, List} from './list';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  List
];

const ROUTES: Routes = [
  {
    path: '', component: List,
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
