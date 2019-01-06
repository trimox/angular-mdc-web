import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({ template: '<component-viewer></component-viewer>' })
export class MenuSurfaceDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Menu Surface',
      `The MDC Menu Surface component is a reusable surface that appears above the content of the page and can be positioned adjacent to an element.`,
      "import { MdcMenuSurfaceModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-menu-surface/README.md'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ templateUrl: './examples.html' })
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
          <img mdcImageListImage src="https://material-components-web.appspot.com/images/photos/3x2/{{i+1}}.jpg" />
        </mdc-image-list-image-aspect>
        <mdc-image-list-supporting>
          <span mdcImageListLabel>Text label</span>
        </mdc-image-list-supporting>
      </mdc-image-list-item>
    </mdc-image-list>
  </mdc-menu-surface>
</div>`,
    sass: `.demo-menu-surface--shaped {
  @include mdc-menu-surface-shape-radius(4px);
}

.menu-surface-image-list {
  @include mdc-image-list-aspect(1.5); // Images are 3:2
  @include mdc-image-list-standard-columns(1);

  width: 220px;
}`
  };
}
