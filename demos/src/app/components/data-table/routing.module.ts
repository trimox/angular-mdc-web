import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Sass, DataTable} from './data-table';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Sass,
  DataTable
];

const ROUTES: Routes = [
  {
    path: '', component: DataTable,
    children: [
      {path: '', redirectTo: 'api'},
      {path: 'api', component: Api},
      {path: 'sass', component: Sass},
      {path: 'examples', component: Examples}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {}
