import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';

import {MdcSliderChange} from '@angular-mdc/web';

@Component({template: '<component-viewer></component-viewer>'})
export class Slider implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Slider',
      description: 'Sliders allow users to make selections from a range of values.',
      references: [{
        name: 'Material Design guidelines: Sliders',
        url: 'https://material.io/guidelines/components/sliders.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-slider/README.md'
      }],
      code: `import {MdcSliderModule} from '@angular-mdc/web';`,
      sass: `@use '@material/slider/mdc-slider';
@use '@material/slider';`
    };
  }
}

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {}

@Component({templateUrl: './examples.html'})
export class Examples {
  max: number = 50;
  min: number = 10;
  value: number = 25;

  discreteValue = 50;

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

  exampleEvents = `import {MdcSliderChange} from '@angular-mdc/web';

onInput(event: MdcSliderChange): void {
  console.log(event.value);
}

onChange(event: MdcSliderChange): void {
  console.log(event.value);
}`;

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

  exampleCustomRange = {
    html: `<mdc-slider #ranged discrete min="500" max="1000" value="500"></mdc-slider>`
  };

  exampleNgModel = {
    html: `<mdc-slider [min]="0" [max]="100" [(ngModel)]="sliderModel"></mdc-slider>`,
    ts: `sliderModel: number = 10;`
  };

  exampleTheme = {
    html: `<mdc-slider discrete markers class="demo-slider-custom" value="20"></mdc-slider>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_slider.scss`
  };
}
