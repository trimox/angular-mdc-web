import { NgModule } from '@angular/core';

import {
  FabComponent,
  FabIconDirective,
} from './fab.component';

const FAB_COMPONENTS = [
  FabComponent,
  FabIconDirective,
];

@NgModule({
  exports: [FAB_COMPONENTS],
  declarations: [FAB_COMPONENTS],
})
export class FabModule { }

export * from './fab.component';
