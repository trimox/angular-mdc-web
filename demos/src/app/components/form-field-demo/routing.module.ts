import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Api, Examples, FormFieldDemo } from './form-field-demo';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  FormFieldDemo
];

const ROUTES: Routes = [
  {
    path: '', component: FormFieldDemo,
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
