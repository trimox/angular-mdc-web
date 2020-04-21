import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';

@Component({template: '<example-viewer label="Material Colors" [example]="exampleColors"></example-viewer>'})
export class Colors {
  exampleColors = { sass: `https://raw.githubusercontent.com/material-components/material-components-web/master/packages/mdc-theme/_color-palette.scss` };
}

@Component({template: '<component-viewer></component-viewer>'})
export class Theme implements OnInit {
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
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-theme/README.md'
      }],
      sass: `@use '@material/theme';`,
      mdcUrls: [
        {name: 'Usage', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-theme/README.md#usage'},
        {name: 'Color Palette', url: 'https://raw.githubusercontent.com/material-components/material-components-web/master/packages/mdc-theme/_color-palette.scss'},
      ],
      tabs: [],
    };
  }
}
