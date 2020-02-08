import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Sass, Usage, ThemeDocs} from './theme';

export const ROUTE_DECLARATIONS = [
  Sass,
  Usage,
  ThemeDocs
];

const ROUTES: Routes = [
  {
    path: '', component: ThemeDocs,
    children: [
      {path: '', redirectTo: 'usage'},
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
