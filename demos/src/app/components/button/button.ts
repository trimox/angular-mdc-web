import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {}

@Component({
  template: '<component-viewer></component-viewer>'
})
export class Button implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Button',
      description: 'Buttons allow users to take actions, and make choices, with a single tap.',
      references: [{
        name: 'Material Design guidelines: Buttons',
        url: 'https://material.io/design/components/buttons.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-button/README.md'
      }],
      code: `import {MdcButtonModule} from '@angular-mdc/web';`,
      sass: `@use '@material/button/mdc-button';
@use '@material/button';`
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  exampleDefault = {
    html: `<button mdc-button>Default</button>

<a mdc-button href="#/button-demo/examples">Href link</a>

<a mdc-button raised href="#/button-demo/examples">Href link</a>

<button mdc-button raised>Raised</button>

<button mdc-button unelevated>Unelevated</button>

<button mdc-button outlined>Outlined</button>

<button mdc-button outlined class="demo-thick-outline-button">Thick Outlined</button>

<button mdc-button disabled>Disabled</button>

<button mdc-button class="demo-button-primary">Primary Color</button>

<button mdc-button class="demo-button-secondary">Secondary Color</button>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_button.scss`
  };

  exampleDensity = {
    html: `<button mdc-button class="demo-density-button">Density (-3)</button>

<button mdc-button raised class="demo-density-button">Density (-3)</button>

<button mdc-button outlined class="demo-density-button">Density (-3)</button>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_button.scss`
  };

  exampleIcon = {
    html: `<button mdc-button>
  <mdc-icon>favorite</mdc-icon>Icon
</button>

<button mdc-button outlined>
  <mdc-icon>favorite</mdc-icon>Icon
</button>

<button mdc-button raised class="demo-button-primary">
  <mdc-icon>favorite</mdc-icon>Icon
</button>

<button mdc-button raised class="demo-button-secondary">
  <mdc-icon>favorite</mdc-icon>Icon
</button>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_button.scss`
  };

  svgExample = {
    html: `<button mdc-button raised>
  <mdc-icon>
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M23 12c0-6.07-4.93-11-11-11S1 5.93 1 12s4.93 11 11 11 11-4.93 11-11zM5 17.64C3.75 16.1 3
       14.14 3 12c0-2.13.76-4.08 2-5.63v11.27zM17.64 5H6.36C7.9 3.75 9.86 3 12 3s4.1.75 5.64 2zM12 14.53L8.24
       7h7.53L12 14.53zM17 9v8h-4l4-8zm-6 8H7V9l4 8zm6.64 2c-1.55 1.25-3.51 2-5.64 2s-4.1-.75-5.64-2h11.28zM21
       12c0 2.14-.75 4.1-2 5.64V6.37c1.24 1.55 2 3.5 2 5.63z" />
    </svg>
  </mdc-icon>
  SVG Icon
</button>`
  };

  inkExample = {
    html: `<button mdc-button unelevated class="demo-button-ink-color">
  <mdc-icon>favorite</mdc-icon>Ink Color
</button>

<button mdc-button outlined class="demo-button-icon-color">
  <mdc-icon>favorite</mdc-icon>Icon Color
</button>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_button.scss`
  };

  shapedExample = {
    html: `<button mdc-button unelevated class="big-round-shape-button">Corner Radius</button>

<button mdc-button raised class="big-round-shape-button">
  <mdc-icon>favorite</mdc-icon>Icon
</button>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_button.scss`
  };

  trailingIconExample = {
    html: `<button mdc-button>
  <span mdcButtonLabel>Trailing Icon</span>
  <mdc-icon>favorite</mdc-icon>
</button>

<button mdc-button raised class="demo-button-primary">
  <mdc-button-label>Trailing Icon</mdc-button-label>
  <mdc-icon>favorite</mdc-icon>
</button>

<button mdc-button outlined label="Trailing Icon">
  <mdc-icon>favorite</mdc-icon>
</button>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_button.scss`
  };

  exampleAccessibility = {
html: `<div class="mdc-touch-target-wrapper">
  <button mdc-button touch>My Accessible Button</button>
</div>`
  };
}
