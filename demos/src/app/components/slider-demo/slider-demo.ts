import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

import { MdcSliderChange } from '@angular-mdc/web';

@Component({ template: '<component-viewer></component-viewer>' })
export class SliderDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Slider',
      `Sliders allow users to make selections from a range of values.`,
      "import { MdcSliderModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Sliders',
      url: 'https://material.io/guidelines/components/sliders.html'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-slider/README.md'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ templateUrl: './examples.html' })
export class Examples {
  max: number = 50;
  min: number = 10;
  value: number = 25;

  sliderModel: number = 10;

  continuousInputEventValue: number;
  continuousChangeEventValue: number;

  discreteInputEventValue: number;
  discreteChangeEventValue: number;

  markersInputEventValue: number;
  markersChangeEventValue: number;

  onInput(event: MdcSliderChange): void {
    this.continuousInputEventValue = event.value;
  }

  onChange(event: MdcSliderChange): void {
    this.continuousChangeEventValue = event.value;
  }

  //
  // Examples
  //

  exampleEvents = `import { MdcSliderChange } from '@angular-mdc/web';

onInput(event: MdcSliderChange): void {
  console.log(event.value);
}

onChange(event: MdcSliderChange): void {
  console.log(event.value);
}`;

  exampleSimple = {
    html: `<mdc-slider discrete [min]="min" [max]="max" [value]="value"></mdc-slider>`,
    ts: `max: number = 50;
min: number = 10;
value: number = 25;`
  };

  exampleContinuous = {
    html: `<mdc-slider [min]="0" [max]="100" value="50"
  (input)="onInput($event)" (change)="onChange($event)"></mdc-slider>`,
    ts: this.exampleEvents
  };

  exampleDiscrete = {
    html: `<mdc-slider discrete [min]="0" [max]="100" value="25"
  (input)="onInput($event)" (change)="onChange($event)"></mdc-slider>`,
    ts: this.exampleEvents
  };

  exampleDiscreteTickMarks = {
    html: `<mdc-slider discrete markers [min]="0" [max]="100" [step]="5" [value]="20"
  (input)="onInput($event)" (change)="onChange($event)"></mdc-slider>`,
    ts: this.exampleEvents
  };

  exampleNgModel = {
    html: `<mdc-slider [min]="0" [max]="100" [(ngModel)]="sliderModel"></mdc-slider>`,
    ts: `sliderModel: number = 10;`
  };

  exampleTheme = {
    html: `<mdc-slider discrete markers class="demo-slider--custom" value="20"></mdc-slider>`,
    sass: `.demo-slider--custom {
  @include mdc-slider-highlight-color($material-color-red-700);
  @include mdc-slider-rail-color($material-color-yellow-600, 1);
  @include mdc-slider-rail-tick-mark-color(white);
  @include mdc-slider-thumb-color($material-color-orange-500);
  @include mdc-slider-focus-halo-color($material-color-yellow-900);
  @include mdc-slider-value-pin-fill-color-accessible($material-color-pink-500);
}`
  };
}
