import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Drawer} from './drawer';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,  
  Drawer
];

const ROUTES: Routes = [
  {
    path: '', component: Drawer,
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
