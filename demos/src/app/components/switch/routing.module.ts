import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Switch} from './switch';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Switch
];

const ROUTES: Routes = [
  {
    path: '', component: Switch,
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
