import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({ template: '<component-viewer></component-viewer>' })
export class IconButtonDemo implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Icon Buttons',
      `Icon buttons allow users to take actions, and make choices, with a single tap.`,
      "import { MdcIconButtonModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Toggle Buttons',
      url: 'https://material.io/design/components/buttons.html#toggle-button'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-icon-button/README.md'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ templateUrl: './examples.html' })
export class Examples {
  example1 = {
    html: `<button mdc-icon-button icon="keyboard_arrow_left"></button>

<button mdc-icon-button icon="keyboard_arrow_right"></button>

<button mdcIconButton>
  <mdc-icon>favorite</mdc-icon>
</button>`
  };

  example2 = {
    html: `<button mdcIconButton>
  <mdc-icon fontSet="fa" fontIcon="fa-star" mdcIconOn></mdc-icon>
  <mdc-icon fontSet="fa" fontIcon="fa-star-o"></mdc-icon>
</button>`
  };

  example3 = {
    html: `<form #demoForm="ngForm">
  <button mdcIconButton ngModel #demoIconButtonModel="ngModel">
    <mdc-icon mdcIconOn>favorite</mdc-icon>
    <mdc-icon>favorite_border</mdc-icon>
  </button>
</form>`
  };

  example4 = {
    html: `<button mdcIconButton [on]="true">
  <mdc-icon mdcIconOn>favorite</mdc-icon>
  <mdc-icon>favorite_border</mdc-icon>
</button>`
  };

  exampleSvg = {
    html: `<button mdcIconButton>
  <mdc-icon mdcIconOn>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>
    </svg>
  </mdc-icon>
  <mdc-icon>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
    </svg>
  </mdc-icon>
</button>

<button mdcIconButton class="demo-icon-button-large">
  <mdc-icon mdcIconOn>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>
    </svg>
  </mdc-icon>
  <mdc-icon>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
    </svg>
  </mdc-icon>
</button>`,
    sass: `.demo-icon-button-large {
  @include mdc-icon-button-size(36px);
}`
  };

  example6 = {
    html: `<button mdcIconButton class="demo-icon-button-custom">
  <mdc-icon mdcIconOn>favorite</mdc-icon>
  <mdc-icon>favorite_border</mdc-icon>
</button>

<button mdcIconButton class="demo-icon-button-primary">
  <mdc-icon mdcIconOn>favorite</mdc-icon>
  <mdc-icon>favorite_border</mdc-icon>
</button>

<button mdcIconButton class="demo-icon-button-secondary">
  <mdc-icon mdcIconOn>favorite</mdc-icon>
  <mdc-icon>favorite_border</mdc-icon>
</button>`,
    sass: `.demo-icon-button-custom {
  @include mdc-icon-button-ink-color(#de442c);
  @include mdc-states-base-color(#de442c);
  @include mdc-states-hover-opacity(.09);
  @include mdc-states-focus-opacity(.26);
  @include mdc-states-press-opacity(.35);
}

.demo-icon-button-primary {
  @include mdc-icon-button-ink-color($mdc-theme-primary);
}

.demo-icon-button-secondary {
  @include mdc-icon-button-ink-color($mdc-theme-secondary);
}`
  };
}
