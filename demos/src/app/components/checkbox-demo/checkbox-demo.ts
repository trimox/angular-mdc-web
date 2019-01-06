import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ template: '<component-viewer></component-viewer>' })
export class CheckboxDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Checkbox',
      `Checkboxes allow the user to select one or more items from a set.
       Checkboxes can be used to turn an option on or off.`,
      "import { MdcCheckboxModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Checkbox',
      url: 'https://material.io/design/components/selection-controls.html#checkboxes'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-checkbox/README.md'
    }];
  }
}

@Component({ templateUrl: './examples.html' })
export class Examples {
  example1 = {
    html: `<mdc-form-field>
  <mdc-checkbox #example></mdc-checkbox>
  <label>Checkbox value is {{example.checked}}</label>
</mdc-form-field>`
  };
}
