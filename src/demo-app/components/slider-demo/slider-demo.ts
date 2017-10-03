import { Component } from '@angular/core';

@Component({
  selector: 'slider-demo',
  templateUrl: './slider-demo.html'
})
export class SliderDemo {
  continuousIsDisabled: boolean = false;
  continuousValue: number = 0;
  continuousMin: number = 0;
  continuousMax: number = 100;
  continuousModel: number = 50;

  discreteIsDisabled: boolean = false;
  discreteValue: number = 20;
  discreteMin: number = 0;
  discreteMax: number = 100;

  dmIsDisabled: boolean = false;
  dmValue: number = 10;
  dmModel: number = 10;
  dmMin: number = 0;
  dmMax: number = 100;
  dmStep: number = 5;

  inputContinuousValue(event: { source: any, value: any }) {
    // this.continuousResult = event.value;
  }
}
