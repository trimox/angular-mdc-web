import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Colors, Theme} from './theme';

export const ROUTE_DECLARATIONS = [
  Colors,
  Theme
];

const ROUTES: Routes = [
  {
    path: '', component: Theme,
    children: [
      {path: '', redirectTo: 'theme'},
      {path: 'colors', component: Colors},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {}
