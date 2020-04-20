import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class MenuSurface implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Menu Surface',
      description: 'The MDC Menu Surface component is a reusable surface that appears above the content of the page and can be positioned adjacent to an element.',
      references: [{
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-menu-surface/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-menu-surface/README.md#sass-mixins'},
      ],
      code: `import {MdcMenuSurfaceModule} from '@angular-mdc/web/menu-surface';`,
      sass: `@use '@material/menu-surface/mdc-menu-surface';
@use '@material/menu-surface';`
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
          header: 'MdcMenuSurface',
          selectors: [
            'mdc-menu-surface',
          ],
          exportedAs: 'mdcMenuSurface',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'open: boolean', summary: `Opens or closes the menu.`},
                {
                  name: 'anchorCorner: string', summary: `Override the opening point of the menu. (Default: topStart)
                Values: 'bottomEnd' | 'bottomStart' | 'topEnd' | 'topStart'`},
                {name: 'anchorMargin: {top: number, bottom: number, left: number, right : number}', summary: `Sets the distance from the anchor point that the menu surface should be shown.`},
                {name: 'coordinates: {x: number, y: number}', summary: `Sets the absolute x/y position of the menu. Should only be used when the menu is hoisted or using fixed positioning.`},
                {name: 'quickOpen: boolean', summary: `Sets whether the menu should open and close without animation when the open/close methods are called.`},
                {name: 'anchorElement: Element | mdcMenuSurfaceAnchor', summary: `Set to indicate an element the menu should be anchored to.`},
                {name: 'fixed: boolean', summary: `Used to indicate that the menu is using fixed positioning.`},
                {name: 'hoistToBody: boolean', summary: `Removes the menu-surface element from the DOM and appends it to the body element. Should be used to overcome overflow: hidden issues.`},
              ]
            },
          ]
        },
        {
          header: 'MdcMenuSurfaceAnchor',
          summary: 'Sets the anchor element used as an anchor for menu-surface positioning logic.',
          selectors: [
            'mdcMenuSurfaceAnchor',
            'mdc-menu-surface-anchor',
          ],
          exportedAs: 'mdcMenuSurfaceAnchor',
        },
      ]
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  images = Array.from(Array(2), (x, i) => i);
  corners: string[] = ['topStart', 'topEnd', 'bottomStart', 'bottomEnd'];

  example1 = {
    html: `<div mdcMenuSurfaceAnchor #demoAnchor>
  <button mdc-button raised (click)="demoSurface.open = !demoSurface.open">
    Show Menu Surface
  </button>
  <mdc-menu-surface #demoSurface class="demo-menu-surface--shaped" [anchorElement]="demoAnchor">
    <mdc-image-list class="menu-surface-image-list">
      <mdc-image-list-item *ngFor="let i of images">
        <mdc-image-list-image-aspect>
          <img mdcImageListImage src="<image source>" />
        </mdc-image-list-image-aspect>
        <mdc-image-list-supporting>
          <span mdcImageListLabel>Text label</span>
        </mdc-image-list-supporting>
      </mdc-image-list-item>
    </mdc-image-list>
  </mdc-menu-surface>
</div>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_menu-surface.scss`
  };
}
