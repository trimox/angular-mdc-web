import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Api, Examples, Sass, TabsDemo } from './tabs-demo';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Sass,
  TabsDemo
];

const ROUTES: Routes = [
  {
    path: '', component: TabsDemo,
    children: [
      { path: '', redirectTo: 'api' },
      { path: 'api', component: Api },
      { path: 'sass', component: Sass },
      { path: 'examples', component: Examples }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule { }
