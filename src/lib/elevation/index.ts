import { NgModule } from '@angular/core';

import {
  ElevationTransition,
  Elevation0Directive,
  Elevation1Directive,
  Elevation2Directive,
  Elevation3Directive,
  Elevation4Directive,
  Elevation5Directive,
  Elevation6Directive,
  Elevation7Directive,
  Elevation8Directive,
  Elevation9Directive,
  Elevation10Directive,
  Elevation11Directive,
  Elevation12Directive,
  Elevation13Directive,
  Elevation14Directive,
  Elevation15Directive,
  Elevation16Directive,
  Elevation17Directive,
  Elevation18Directive,
  Elevation19Directive,
  Elevation20Directive,
  Elevation21Directive,
  Elevation22Directive,
  Elevation23Directive,
  Elevation24Directive
} from './elevation.directive';

const ELEVATION_DIRECTIVES = [
  ElevationTransition,
  Elevation0Directive,
  Elevation1Directive,
  Elevation2Directive,
  Elevation3Directive,
  Elevation4Directive,
  Elevation5Directive,
  Elevation6Directive,
  Elevation7Directive,
  Elevation8Directive,
  Elevation9Directive,
  Elevation10Directive,
  Elevation11Directive,
  Elevation12Directive,
  Elevation13Directive,
  Elevation14Directive,
  Elevation15Directive,
  Elevation16Directive,
  Elevation17Directive,
  Elevation18Directive,
  Elevation19Directive,
  Elevation20Directive,
  Elevation21Directive,
  Elevation22Directive,
  Elevation23Directive,
  Elevation24Directive
];

@NgModule({
  exports: [ELEVATION_DIRECTIVES],
  declarations: [ELEVATION_DIRECTIVES],
})
export class ElevationModule { }