import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Usage, Dialog} from './dialog';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Usage,
  Dialog
];

const ROUTES: Routes = [
  {
    path: '', component: Dialog,
    children: [
      {path: '', redirectTo: 'usage'},
      {path: 'usage', component: Usage},
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
