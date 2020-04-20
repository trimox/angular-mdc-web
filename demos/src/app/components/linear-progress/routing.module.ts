import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, LinearProgress} from './linear-progress';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  LinearProgress
];

const ROUTES: Routes = [
  {
    path: '', component: LinearProgress,
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
