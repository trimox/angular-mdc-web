import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Radio} from './radio';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Radio
];

const ROUTES: Routes = [
  {
    path: '', component: Radio,
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
