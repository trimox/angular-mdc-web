import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Icon} from './icon';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Icon
];

const ROUTES: Routes = [
  {
    path: '', component: Icon,
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
