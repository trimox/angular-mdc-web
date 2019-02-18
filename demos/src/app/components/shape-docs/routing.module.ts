import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Usage, ShapeDocs } from './shape';

export const ROUTE_DECLARATIONS = [
  Usage,
  ShapeDocs
];

const ROUTES: Routes = [
  {
    path: '', component: ShapeDocs,
    children: [
      { path: '', redirectTo: 'usage' },
      { path: 'usage', component: Usage }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule { }
