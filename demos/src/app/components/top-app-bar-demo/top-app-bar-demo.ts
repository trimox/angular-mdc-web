import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({ template: '<component-viewer></component-viewer>' })
export class TopAppBarDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Top App Bar',
      `The top app bar displays information and actions relating to the current screen.`,
      "import { MdcTopAppBarModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: App bars: top',
      url: 'https://material.io/design/components/app-bars-top.html'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-top-app-bar/README.md'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ templateUrl: './examples.html' })
export class Examples {
  text = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,
  repudiandae dignissimos et quam velit autem mollitia tenetur,
  eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.
  Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel,
  consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium,
  excepturi!`;
  lorems = Array(5).fill(this.text);

  exampleFixed = {
    html: `<mdc-top-app-bar fixed>
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcIconButton mdcTopAppBarNavIcon icon="menu"></button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>print</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>bookmark</mdc-icon>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>`
  };

  exampleProminent = {
    html: `<mdc-top-app-bar prominent>
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcIconButton mdcTopAppBarNavIcon icon="menu"></button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>print</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>bookmark</mdc-icon>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>`
  };

  exampleDense = {
    html: `<mdc-top-app-bar dense>
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcIconButton mdcTopAppBarNavIcon icon="menu"></button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>print</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>bookmark</mdc-icon>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>`
  };

  exampleShort = {
    html: `<mdc-top-app-bar short [scrollTarget]="mainContent">
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcIconButton mdcTopAppBarNavIcon icon="menu"></button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>
<div #mainContent>
  <p *ngFor="let lorem of lorems">{{lorem}}</p>
</div>`,
    ts: `text = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,
repudiandae dignissimos et quam velit autem mollitia tenetur,
eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.
Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel,
consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium,
excepturi!';
lorems = Array(5).fill(this.text);`
  };

  exampleShortCollapsed = {
    html: `<mdc-top-app-bar shortCollapsed>
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcIconButton mdcTopAppBarNavIcon icon="menu"></button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>`
  };

  exampleThemed = {
    html: `<mdc-top-app-bar class="demo-top-app-bar-themed" [scrollTarget]="mainThemedContent">
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcIconButton mdcTopAppBarNavIcon icon="menu"></button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>
<div #mainThemedContent>
  <p *ngFor="let lorem of lorems">{{lorem}}</p>
</div>`,
    sass: `.demo-top-app-bar-themed {
  @include mdc-top-app-bar-fill-color($material-color-yellow-800);
  @include mdc-top-app-bar-icon-ink-color($material-color-blue-900)
}`
  };
}
