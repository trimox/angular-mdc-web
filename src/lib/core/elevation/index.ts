import { NgModule } from '@angular/core';

import {
  MdcElevationTransition,
  MdcElevation
} from './elevation';

const ELEVATION_DIRECTIVES = [
  MdcElevationTransition,
  MdcElevation
];

@NgModule({
  exports: [ELEVATION_DIRECTIVES],
  declarations: [ELEVATION_DIRECTIVES],
})
export class MdcElevationModule { }

export * from './elevation';
