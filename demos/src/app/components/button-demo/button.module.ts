import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';
import { RoutingModule, ROUTE_DECLARATIONS } from './routing.module';

@NgModule({
  imports: [
    SharedModule,
    RoutingModule
  ],
  declarations: [ROUTE_DECLARATIONS]
})
export class ButtonModule { }
