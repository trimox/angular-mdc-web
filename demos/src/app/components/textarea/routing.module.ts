import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Textarea} from './textarea';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Textarea
];

const ROUTES: Routes = [
  {
    path: '', component: Textarea,
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
