import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';

@Component({templateUrl: './sass.html'})
export class Sass {}

@Component({templateUrl: './usage.html'})
export class Usage {
  exampleUsage = `@use "@material/theme" with (
  $primary: #fcb8ab,
  $secondary: #feeae6,
  $on-primary: #442b2d,
  $on-secondary: #442b2d,
);
@use "@material/button/mdc-button";`;
}

@Component({template: '<example-viewer label="Material Colors" [example]="exampleColors"></example-viewer>'})
export class Colors {
  exampleColors = { sass: `https://raw.githubusercontent.com/material-components/material-components-web/master/packages/mdc-theme/_color-palette.scss` };
}

@Component({template: '<component-viewer></component-viewer>'})
export class ThemeDocs implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Theme',
      description: 'The Material Design color system can be used to create a color scheme that reflects your brand or style.',
      references: [{
        name: 'Material Design guidelines: Color',
        url: 'https://material.io/design/material-theming/overview.html#material-theming'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-theme'
      }],
      sass: `@use '@material/theme';`,
      tabs: [{
        label: 'Usage',
        route: './usage'
      }, {
        label: 'Sass',
        route: './sass'
      }, {
        label: 'Material Colors',
        route: './colors'
      }]
    };
  }
}
