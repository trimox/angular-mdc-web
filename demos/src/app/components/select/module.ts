import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared.module';
import {RoutingModule, ROUTE_DECLARATIONS} from './routing.module';
import {MDC_SELECT_DEFAULT_OPTIONS} from '@angular-mdc/web/select';

@NgModule({
  imports: [
    SharedModule,
    RoutingModule
  ],
  declarations: [ROUTE_DECLARATIONS],
  // providers: [{ provide: MDC_SELECT_DEFAULT_OPTIONS, useValue: {outlined: true}}],
})
export class SelectModule {}
