import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {}

@Component({template: '<component-viewer></component-viewer>'})
export class ElevationDemo implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Elevation',
      description: `Shadows provide important visual cues about objects’ depth and directional movement.
      They are the only visual cue indicating the amount of separation between surfaces.
       An object’s elevation determines the appearance of its shadow.`,
      references: [{
        name: 'Material Design guidelines: Elevation',
        url: 'https://material.io/design/environment/elevation.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-elevation/README.md'
      }],
      code: `import {MdcElevationModule} from '@angular-mdc/web';`,
      sass: `@use '@material/elevation/mdc-elevation';`
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  items = Array.from(Array(25), (x, i) => i);
}
