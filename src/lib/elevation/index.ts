import { NgModule } from '@angular/core';

import {
  ElevationTransition,
  ElevationDirective
} from './elevation.directive';

const ELEVATION_DIRECTIVES = [
  ElevationTransition,
  ElevationDirective
];

@NgModule({
  exports: [ELEVATION_DIRECTIVES],
  declarations: [ELEVATION_DIRECTIVES],
})
export class ElevationModule { }

export * from './elevation.directive';
