import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

@Component({template: '<component-api></component-api>'})
export class Api implements OnInit {
  @ViewChild(ComponentApi, {static: true}) _componentApi: ComponentApi;

  ngOnInit() {
    this._componentApi.docApi = {
      sections: [
        {
          header: 'MdcElevation',
          selectors: [
            '[mdcElevation]="0-24"',
          ],
          exportedAs: 'mdcElevation',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: '[mdcElevation]="#"', summary: `Elevation values are mapped out in a "z-space" and range from 0 to 24`},
              ]
            },
          ]
        },
      ]
    };
  }
}

@Component({template: '<component-viewer></component-viewer>'})
export class Elevation implements OnInit {
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
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-elevation/README.md#style-customization'},
      ],
      code: `import {MdcElevationModule} from '@angular-mdc/web/elevation';`,
      sass: `@use '@material/elevation/mdc-elevation';`
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  items = Array.from(Array(25), (x, i) => i);
}
