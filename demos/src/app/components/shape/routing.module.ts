import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Usage, Shape} from './shape';

export const ROUTE_DECLARATIONS = [
  Usage,
  Shape
];

const ROUTES: Routes = [
  {
    path: '', component: Shape,
    children: [
      {path: '', redirectTo: 'usage'},
      {path: 'usage', component: Usage}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {}
