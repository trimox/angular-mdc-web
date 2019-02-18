import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({ templateUrl: './usage.html' })
export class Usage {
  basicUsage = `@import "@angular-mdc/theme/shape/mixins";
@import "@angular-mdc/theme/shape/functions";`;

  customTheming = `.my-custom-button {
  @include mdc-button-shape-radius(50%);
}`;
}

@Component({ template: '<component-viewer></component-viewer>' })
export class ShapeDocs implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Shape',
      'Shapes direct attention, identify components, communicate state, and express brand.');

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Shape',
      url: 'https://material.io/go/design-shape'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-shape/README.md'
    }];

    this._componentViewer.componentView.tabs = [{
      label: 'Usage',
      route: './usage'
    }];
  }
}
