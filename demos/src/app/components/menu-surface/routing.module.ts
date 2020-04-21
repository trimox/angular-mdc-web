import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, MenuSurface} from './menu-surface';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  MenuSurface
];

const ROUTES: Routes = [
  {
    path: '', component: MenuSurface,
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
