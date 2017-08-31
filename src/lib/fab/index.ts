import { NgModule } from '@angular/core';

import {
  MdcFabComponent,
  MdcFabIconDirective,
} from './fab.component';

const FAB_COMPONENTS = [
  MdcFabComponent,
  MdcFabIconDirective,
];

@NgModule({
  exports: [FAB_COMPONENTS],
  declarations: [FAB_COMPONENTS],
})
export class MdcFabModule { }

export * from './fab.component';
