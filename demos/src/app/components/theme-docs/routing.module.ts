import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Sass, Usage, Colors, ThemeDocs} from './theme';

export const ROUTE_DECLARATIONS = [
  Colors,
  Sass,
  Usage,
  ThemeDocs
];

const ROUTES: Routes = [
  {
    path: '', component: ThemeDocs,
    children: [
      {path: '', redirectTo: 'usage'},
      {path: 'colors', component: Colors},
      {path: 'usage', component: Usage},
      {path: 'sass', component: Sass}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {}
