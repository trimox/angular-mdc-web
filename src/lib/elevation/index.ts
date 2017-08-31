import { NgModule } from '@angular/core';

import {
  MdcElevationTransition,
  MdcElevationDirective
} from './elevation.directive';

const ELEVATION_DIRECTIVES = [
  MdcElevationTransition,
  MdcElevationDirective
];

@NgModule({
  exports: [ELEVATION_DIRECTIVES],
  declarations: [ELEVATION_DIRECTIVES],
})
export class MdcElevationModule { }

export * from './elevation.directive';
