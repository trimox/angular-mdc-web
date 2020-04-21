import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class Ripple implements OnInit {
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
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-ripple/README.md#sass-apis'},
      ],
      code: `import {MdcRippleModule} from '@angular-mdc/web/ripple';`,
      sass: `@use '@material/ripple/mdc-ripple';
@use '@material/ripple';`
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
          header: 'MdcRipple',
          selectors: [
            'mdc-ripple',
          ],
          exportedAs: 'mdcRipple',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'attachTo: Element', summary: `Attach the ripple surface to an element.`},
                {name: 'primary: boolean', summary: 'Colors the ripple with the primary theme color.'},
                {name: 'secondary: boolean', summary: 'Colors the ripple with the secondary theme color.'},
                {name: 'disabled: boolean', summary: 'Disable the ripple ink.'},
                {name: 'unbounded: boolean', summary: 'Whether or not the ripple is unbounded (e.g.: checkbox or radio buttons).'},
              ]
            },
          ]
        },
      ]
    };
  }
}

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
