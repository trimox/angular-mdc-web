import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';
import {MdcSliderChange} from '@angular-mdc/web/slider';

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {}

@Component({template: '<component-viewer></component-viewer>'})
export class CircularProgress implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Circular Progress',
      description: `Circular progress indicators display progress by animating an indicator
      along an invisible circular track in a clockwise direction. They can be applied directly to a surface, such as a button or card.`,
      references: [{
        name: 'Material Design guidelines: Circular Progress',
        url: 'https://material.io/components/progress-indicators/#circular-progress-indicators'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-circular-progress/README.md'
      }],
      code: `import {MdcCircularProgressModule} from '@angular-mdc/web';`,
      sass: `@use '@material/circular-progress/mdc-circular-progress';
@use '@material/mdc-circular-progress';`
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  onInput(event: MdcSliderChange): void {
    // this.continuousInputEventValue = event.value;
  }

  onChange(event: MdcSliderChange): void {
    // this.continuousChangeEventValue = event.value;
  }
}
