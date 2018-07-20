import { Component } from '@angular/core';

import { MdcSliderChange } from '@angular-mdc/web';

@Component({
  selector: 'slider-demo',
  templateUrl: './slider-demo.html'
})
export class SliderDemo {
  continuousInputEventValue: number;
  continuousChangeEventValue: number;

  discreteInputEventValue: number;
  discreteChangeEventValue: number;

  markersInputEventValue: number;
  markersChangeEventValue: number;

  continuousMin: number = 0;
  continuousMax: number = 100;

  discreteMin: number = 0;
  discreteMax: number = 100;

  dmMin: number = 0;
  dmMax: number = 100;
  dmStep: number = 5;

  onInput(event: MdcSliderChange): void {
    this.continuousInputEventValue = event.value;
  }

  onChange(event: MdcSliderChange): void {
    this.continuousChangeEventValue = event.value;
  }
}
