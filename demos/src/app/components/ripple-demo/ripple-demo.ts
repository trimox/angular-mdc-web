import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({ template: '<component-viewer></component-viewer>' })
export class RippleDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Ripple',
      'Ripple provides components (or any element) with a material "ink ripple" interaction effect.',
      "import { MdcRippleModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Ripple',
      url: 'https://material.io/design/interaction/states.html'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-ripple/README.md'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ templateUrl: './examples.html' })
export class Examples {
  exampleRipple = {
    html: `<mdc-ripple [attachTo]="demodiv">
  <div #demodiv>
    Click me
  </div>
</mdc-ripple>`
  };
}
