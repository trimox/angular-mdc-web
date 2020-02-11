import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';

@Component({templateUrl: './usage.html'})
export class Usage {
  customTheming = `@use '@material/button';

.my-custom-button {
  @include button.shape-radius(50%);
}`;
}

@Component({template: '<component-viewer></component-viewer>'})
export class Shape implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Shape',
      description: 'Shapes direct attention, identify components, communicate state, and express brand.',
      references: [{
        name: 'Material Design guidelines: Shape',
        url: 'https://material.io/go/design-shape'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-shape/README.md'
      }],
      sass: `@use '@material/shape';`,
      tabs: [{
        label: 'Usage',
        route: './usage'
      }]
    };
  }
}
