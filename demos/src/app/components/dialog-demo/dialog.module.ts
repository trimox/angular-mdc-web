import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';
import { RoutingModule, ROUTE_DECLARATIONS } from './routing.module';

import {
  DialogAlert,
  DialogConfirmation,
  DialogScrollable,
  DialogForm,
  DialogSimple
} from './dialog-demo';

@NgModule({
  imports: [
    RoutingModule,
    SharedModule
  ],
  declarations: [
    ROUTE_DECLARATIONS,
    DialogAlert,
    DialogConfirmation,
    DialogForm,
    DialogScrollable,
    DialogSimple
  ],
  entryComponents: [
    DialogAlert,
    DialogConfirmation,
    DialogForm,
    DialogScrollable,
    DialogSimple
  ]
})
export class DialogModule { }
