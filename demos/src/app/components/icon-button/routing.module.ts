import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, IconButton} from './icon-button';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,  
  IconButton
];

const ROUTES: Routes = [
  {
    path: '', component: IconButton,
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
