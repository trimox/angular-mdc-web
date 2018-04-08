import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdcSlider,
  MdcSliderPin,
  MdcSliderPinValueMarker,
  MdcSliderThumbContainer,
  MdcSliderTrack,
  MdcSliderTrackContainer,
  MdcSliderTrackMarker,
  MdcSliderTrackMarkerContainer,
} from './slider';

const SLIDER_DECLARATIONS = [
  MdcSlider,
  MdcSliderPin,
  MdcSliderPinValueMarker,
  MdcSliderThumbContainer,
  MdcSliderTrack,
  MdcSliderTrackContainer,
  MdcSliderTrackMarker,
  MdcSliderTrackMarkerContainer,
];

@NgModule({
  imports: [CommonModule],
  exports: SLIDER_DECLARATIONS,
  declarations: SLIDER_DECLARATIONS
})
export class MdcSliderModule { }
