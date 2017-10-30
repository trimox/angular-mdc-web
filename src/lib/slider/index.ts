import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

const SLIDER_COMPONENTS = [
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
  imports: [CommonModule, FormsModule],
  exports: SLIDER_COMPONENTS,
  declarations: SLIDER_COMPONENTS
})
export class MdcSliderModule { }

export * from './slider';
