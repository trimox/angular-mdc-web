import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Shape} from './shape';

export const ROUTE_DECLARATIONS = [
  Shape
];

const ROUTES: Routes = [
  {
    path: '', component: Shape,
    children: [
      {path: '', redirectTo: 'shape'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {}
