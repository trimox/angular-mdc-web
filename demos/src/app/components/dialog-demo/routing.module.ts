import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Api, Examples, Usage, Sass, DialogDemo } from './dialog-demo';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Sass,
  Usage,
  DialogDemo
];

const ROUTES: Routes = [
  {
    path: '', component: DialogDemo,
    children: [
      { path: '', redirectTo: 'usage' },
      { path: 'usage', component: Usage },
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
