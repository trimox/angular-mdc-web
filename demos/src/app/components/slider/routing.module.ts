import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Slider} from './slider';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Slider
];

const ROUTES: Routes = [
  {
    path: '', component: Slider,
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
