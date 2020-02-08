import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class RippleDemo implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Ripple',
      description: 'Ripple provides components (or any element) with a material "ink ripple" interaction effect.',
      references: [{
        name: 'Material Design guidelines: Ripple',
        url: 'https://material.io/design/interaction/states.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-ripple/README.md'
      }],
      code: `import {MdcRippleModule} from '@angular-mdc/web';`,
      sass: `@use '@material/ripple/mdc-ripple';
@use '@material/ripple';`
    };
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
  <div #demodiv>
    Click me
  </div>
</div>`
  };

  examplePrimary = {
    html: `<div mdcRipple [attachTo]="demoPrimary" primary>
  <div #demoPrimary>
    Primary Color
  </div>
</div>`
  };

  exampleSecondary = {
    html: `<div mdcRipple [attachTo]="demoSecondary" secondary>
  <div #demoSecondary>
    Secondary Color
  </div>
</div>`
  };
}
