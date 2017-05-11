import { NgModule } from '@angular/core';

import { FabComponent } from './fab';
import { FabIconDirective } from './fab-icon';

const FAB_COMPONENTS = [
  FabComponent,
  FabIconDirective
];

@NgModule({
  exports: [FAB_COMPONENTS],
  declarations: [FAB_COMPONENTS],
})
export class FabModule { }