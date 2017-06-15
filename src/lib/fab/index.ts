import { NgModule } from '@angular/core';

import { FabComponent } from './fab.component';
import { FabIconDirective } from './fab-icon.directive';

const FAB_COMPONENTS = [
  FabComponent,
  FabIconDirective
];

@NgModule({
  exports: [FAB_COMPONENTS],
  declarations: [FAB_COMPONENTS],
})
export class FabModule { }