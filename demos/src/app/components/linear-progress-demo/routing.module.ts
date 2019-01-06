import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Api, Examples, Sass, LinearProgressDemo } from './linear-progress-demo';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Sass,
  LinearProgressDemo
];

const ROUTES: Routes = [
  {
    path: '', component: LinearProgressDemo,
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
