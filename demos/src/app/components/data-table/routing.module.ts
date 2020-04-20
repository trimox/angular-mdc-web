import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, DataTable} from './data-table';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  DataTable
];

const ROUTES: Routes = [
  {
    path: '', component: DataTable,
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
