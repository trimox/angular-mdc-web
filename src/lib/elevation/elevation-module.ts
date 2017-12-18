import { NgModule } from '@angular/core';

import { MdcElevation } from './elevation';

const ELEVATION_DIRECTIVES = [
  MdcElevation
];

@NgModule({
  exports: [ELEVATION_DIRECTIVES],
  declarations: [ELEVATION_DIRECTIVES],
})
export class MdcElevationModule { }
