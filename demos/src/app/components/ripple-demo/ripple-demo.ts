import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentView} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class RippleDemo implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

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

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {}

@Component({templateUrl: './examples.html'})
export class Examples {
  exampleRipple = {
    html: `<div #rippleExample mdcRipple [attachTo]="demodiv"
    [disabled]="disabled.checked">
  <div style="height: 200px; width: 100%;" class="demo-layout--center"
    #demodiv>
    Click me
  </div>
</div>`
  };

  examplePrimary = {
    html: `<div mdcRipple [attachTo]="demoPrimary" primary>
  <div style="height: 200px; width: 100%;" class="demo-layout--center"
    #demoPrimary>
    Primary Theme Color
  </div>
</div>`
  };

  exampleSecondary = {
    html: `<div mdcRipple [attachTo]="demoSecondary" secondary>
  <div style="height: 200px; width: 100%;" class="demo-layout--center"
    #demoSecondary>
    Secondary Theme Color
  </div>
</div>`
  };
}
