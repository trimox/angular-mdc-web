import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class FormField implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Form Fields',
      description: `MDC Form Field aligns an MDC Web form field (for example, a checkbox)
      with its label and makes it RTL-aware. It also activates a ripple effect
      upon interacting with the label.`,
      references: [{
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-form-field/README.md'
      }],
      code: `import {MdcFormFieldModule} from '@angular-mdc/web/form-field';`,
      sass: `@use '@material/form-field/mdc-form-field';
@use '@material/form-field';`,
      tabs: [{
        label: 'Api',
        route: './api'
      }, {
        label: 'Examples',
        route: './examples'
      }]
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
          header: 'MdcFormField',
          selectors: [
            'mdc-form-field',
          ],
          exportedAs: 'mdcFormField',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'fluid: boolean', summary: `Width expands and contracts as the screen size changes.`},
                {name: 'alignEnd: boolean', summary: 'Position the input after the label.'},
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
  example1 = {
    html: `<mdc-form-field fluid>
  <mdc-text-field label="First name" outlined required></mdc-text-field>
  <mdc-helper-text persistent validation>*Required</mdc-helper-text>
</mdc-form-field>`
  };

  example2 = {
    html: `<mdc-form-field>
  <mdc-checkbox></mdc-checkbox>
  <label>Checkbox</label>
</mdc-form-field>`
  };

  example3 = {
    html: `<mdc-form-field>
  <mdc-radio></mdc-radio>
  <label>Radio</label>
</mdc-form-field>`
  };

  example4 = {
    html: `<mdc-form-field>
  <mdc-switch></mdc-switch>
  <label>off/on</label>
</mdc-form-field>`
  };
}
