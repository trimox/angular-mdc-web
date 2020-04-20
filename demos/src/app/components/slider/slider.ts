import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

import {MdcSliderChange} from '@angular-mdc/web/slider';

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
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-slider/README.md#theming'},
      ],
      code: `import {MdcSliderModule} from '@angular-mdc/web/slider';`,
      sass: `@use '@material/slider/mdc-slider';
@use '@material/slider';`
    };
  }
}

@Component({template: '<component-api></component-api>'})
export class Api implements OnInit {
  @ViewChild(ComponentApi, {static: true}) _componentApi: ComponentApi;

  ngOnInit() {
    this._componentApi.docApi = {
      sections: [
        {
          header: 'MdcSlider',
          selectors: [
            'mdc-slider',
          ],
          exportedAs: 'mdcSlider',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'min: number', summary: `The minimum value that the slider can have.`},
                {name: 'max: number', summary: `The maximum value that the slider can have.`},
                {name: 'value: number', summary: `The current value of the slider.`},
                {name: 'step: number', summary: `Specifies the increments at which a slider value can be set.`},
                {name: 'discrete: boolean', summary: `Discrete sliders allow users to select a specific value from a range. (Default: false)`},
                {name: 'markers: boolean', summary: `Show markers on track. Discrete sliders support displaying markers on their tracks. (Default: false)`},
                {name: 'disabled: boolean', summary: `Disables the slider.`},
                {name: 'tabIndex: number', summary: `Set the underlying tab index of the component. (Default is 0)`},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'layout()', summary: `Recomputes the dimensions and re-lays out the component. This should be called if the dimensions of the slider itself or any of its parent elements change programmatically (it is called automatically on resize).`},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'change(source: MdcSlider, value: number)', summary: `Broadcast when slider value is changed and committed by way of a user event, e.g. when a user stops dragging the slider or changes the value using the arrow keys.`},
                {name: 'input(source: MdcSlider, value: number)', summary: `Broadcasts when slider value is changed by way of a user event, e.g. when a user is dragging the slider or changing the value using the arrow keys.`},
                {name: 'valueChange(value: number)', summary: `Emits when the value of the slider changes.`},
              ]
            },
          ]
        },
      ]
    };  }
}

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
