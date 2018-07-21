import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcSlider } from './slider';

@NgModule({
  imports: [CommonModule],
  exports: [MdcSlider],
  declarations: [MdcSlider]
})
export class MdcSliderModule { }
