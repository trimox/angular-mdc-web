import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';

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
      code: `import {MdcMenuSurfaceModule} from '@angular-mdc/web';`,
      sass: `@use '@material/menu-surface/mdc-menu-surface';
@use '@material/menu-surface';`
    };
  }
}

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {}

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
