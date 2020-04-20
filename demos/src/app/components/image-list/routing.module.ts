import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, ImageList} from './image-list';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,  
  ImageList
];

const ROUTES: Routes = [
  {
    path: '', component: ImageList,
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
