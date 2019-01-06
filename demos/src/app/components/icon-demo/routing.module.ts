import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Api, Examples, IconDemo } from './icon-demo';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  IconDemo
];

const ROUTES: Routes = [
  {
    path: '', component: IconDemo,
    children: [
      { path: '', redirectTo: 'api' },
      { path: 'api', component: Api },
      { path: 'examples', component: Examples }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule { }
