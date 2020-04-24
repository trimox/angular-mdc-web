import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class IconButton implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Icon Buttons',
      description: `Icon buttons allow users to take actions, and make choices, with a single tap.`,
      references: [{
        name: 'Material Design guidelines: Toggle Buttons',
        url: 'https://material.io/design/components/buttons.html#toggle-button'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-icon-button/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-icon-button/README.md#sass-mixins'},
      ],
      code: `import {MdcIconButtonModule} from '@angular-mdc/web/icon-button';`,
      sass: `@use '@material/icon-button/mdc-icon-button';
@use '@material/icon-button/_index' as icon-button;`
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
          header: 'MdcIconButton',
          selectors: [
            'button[mdcIconButton]',
            'a[mdcIconButton]',
            'mdc-icon-button',
          ],
          exportedAs: 'mdcIconButton',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'on: boolean', summary: `Sets the toggle state to the provided value.`},
                {name: 'disabled: boolean', summary: `Disables the icon button.`},
                {name: 'icon: string', summary: `Optional. Set a Material icon as a non-toggle icon.`},
                {name: 'onIcon: string', summary: `Icon to display when 'on' is true.`},
                {name: 'offIcon: string', summary: `Icon to display when 'on' is false.`},
                {name: 'labelOn: string', summary: `Optional. Text to set aria label while in on state.`},
                {name: 'labelOff: string', summary: `Optional. Text to set aria label while in off state.`},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'change: MdcIconButtonChange', summary: `Emits when the icon is toggled.`},
              ]
            },
          ]
        },
        {
          header: 'MdcIconOn',
          summary: 'Optional. Apply to an mdc-icon, and is used to indicate the toggle button icon representing the "on" icon.',
          selectors: [
            'mdcIcon[mdcIconOn]',
            'mdcIconOn',
          ],
        },
      ]
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  exampleSimple = {
    html: `<button mdc-icon-button icon="keyboard_arrow_left"></button>

<button mdc-icon-button icon="keyboard_arrow_right"></button>

<button mdcIconButton>
  <mdc-icon>favorite</mdc-icon>
</button>`
  };

  exampleIconToggle = {
    html: `<button mdc-icon-button
  onIcon="sentiment_very_satisfied"
  offIcon="sentiment_very_dissatisfied"></button>`
  };

  exampleFA = {
    html: `<button mdcIconButton>
  <mdc-icon fontSet="fa" fontIcon="fa-star" mdcIconOn></mdc-icon>
  <mdc-icon fontSet="fa" fontIcon="fa-star-o"></mdc-icon>
</button>`
  };

  exampleNgModel = {
    html: `<form #demoForm="ngForm">
  <button mdcIconButton ngModel #demoIconButtonModel="ngModel">
    <mdc-icon mdcIconOn>favorite</mdc-icon>
    <mdc-icon>favorite_border</mdc-icon>
  </button>
</form>`
  };

  exampleOn = {
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
</button>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_icon-button.scss`
  };

  exampleTheme = {
    html: `<button mdcIconButton class="demo-icon-button-custom" onIcon="favorite"
  offIcon="favorite_border">
</button>
<button mdcIconButton class="demo-icon-button-primary" onIcon="favorite"
  offIcon="favorite_border">
</button>
<button mdcIconButton class="demo-icon-button-secondary" onIcon="favorite"
  offIcon="favorite_border">
</button>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_icon-button.scss`
  };

  exampleAriaLabel = {
    html: `<button mdcIconButton onIcon="favorite" offIcon="favorite_border"
  labelOn="Remove from favorites" labelOff="Add to favorites">
</button>`
  };

  exampleDensity = {
    html: `<button mdc-icon-button icon="favorite" class="demo-density-icon-button-1"></button>
<button mdc-icon-button icon="favorite" class="demo-density-icon-button-2"></button>
<button mdcIconButton icon="favorite" class="demo-density-icon-button-3"></button>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_icon-button.scss`
  };
}
