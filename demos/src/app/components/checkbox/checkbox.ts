import {Component, OnInit, ViewChild} from '@angular/core';

import {MdcCheckbox, MdcCheckboxChange} from '@angular-mdc/web/checkbox';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

@Component({template: '<component-api></component-api>'})
export class Api implements OnInit {
  @ViewChild(ComponentApi, {static: true}) _componentApi: ComponentApi;

  ngOnInit() {
    this._componentApi.docApi = {
      sections: [
        {
          header: 'MdcCheckbox',
          selectors: [
            'mdc-checkbox',
          ],
          exportedAs: 'mdcCheckbox',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'id: string', summary: `Unique Id of the checkbox (auto generated if not supplied).`},
                {name: 'name: string', summary: 'Name of the checkbox.'},
                {name: 'checked: boolean', summary: 'Whether the checkbox is checked.'},
                {name: 'value: string', summary: 'The value attribute of the native input element.'},
                {name: 'tabIndex: number	', summary: 'Set the underlying tab index of the checkbox. (Default: 0)'},
                {name: 'ariaLabel: string', summary: `Used to set the 'aria-label' attribute on the underlying input element.`},
                {name: 'ariaLabelledby: string', summary: `The 'aria-labelledby' attribute takes precedence as the element's text alternative.`},
                {name: 'indeterminate: boolean', summary: 'Represent a checkbox with three states (e.g. a nested list of checkable items).'},
                {name: 'disabled: boolean', summary: 'Disables the component.'},
                {name: 'disableRipple: boolean', summary: 'Whether ripple ink is disabled.'},
                {name: 'indeterminateToChecked: boolean', summary: 'Whether the checkbox should go to checked state or unchecked when toggled from indeterminate state.'},
                {name: 'touch: boolean', summary: 'Set the component touch target to 48 x 48 px.'},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'focus()', summary: `Set focus to the checkbox.`},
                {name: 'toggle(checked?: boolean)', summary: 'Toggles checkbox via user action. When it is indeterminate, toggle can go to checked or unchecked, depending on state.'},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'change(source: MdcCheckBox, checked: boolean)', summary: `Event dispatched on checked change.`},
                {name: 'indeterminateChange(source: MdcCheckbox, indeterminate: boolean)', summary: 'Emit when checkbox goes in and out of indeterminate state, but not when set to checked.'},
              ]
            },
          ]
        },
      ]
    };
  }
}


@Component({template: '<component-viewer></component-viewer>'})
export class Checkbox implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Checkbox',
      description: 'Checkboxes allow the user to select one or more items from a set.',
      references: [{
        name: 'Material Design guidelines: Checkbox',
        url: 'https://material.io/design/components/selection-controls.html#checkboxes'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-checkbox/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-checkbox/README.md#style-customization'},
      ],
      code: `import {MdcCheckboxModule} from '@angular-mdc/web/checkbox';`,
      sass: `@use '@material/checkbox/mdc-checkbox';
@use '@material/checkbox';`
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  onChange(event: MdcCheckboxChange) {
    console.log(event.checked);
  }

  toggle(cb: MdcCheckbox): void {
    cb.toggle();
  }

  //
  // Examples
  //

  exampleSimple = {
    html: `<mdc-checkbox></mdc-checkbox>

<mdc-checkbox checked></mdc-checkbox>

<mdc-checkbox disabled></mdc-checkbox>

<mdc-checkbox checked disabled></mdc-checkbox>

<mdc-checkbox indeterminate></mdc-checkbox>

<mdc-checkbox indeterminate indeterminateToChecked="false"></mdc-checkbox>`
  };

  exampleLabel = {
    html: `<mdc-form-field>
  <mdc-checkbox></mdc-checkbox>
  <label>Label</label>
</mdc-form-field>

<mdc-form-field>
  <mdc-checkbox disabled></mdc-checkbox>
  <label>Disabled</label>
</mdc-form-field>

<mdc-form-field alignEnd>
  <mdc-checkbox></mdc-checkbox>
  <label>Label</label>
</mdc-form-field>`
  };

  exampleDynamic = {
    html: `<mdc-form-field #formField>
  <mdc-checkbox #cb indeterminateToChecked (change)="onChange($event)"></mdc-checkbox>
  <label>Checkbox value is {{cb.checked}}</label>
</mdc-form-field>`,
    ts: `import { MdcCheckbox, MdcCheckboxChange } from '@angular-mdc/web';

onChange(event: MdcCheckboxChange) {
  console.log(event.checked);
}

toggle(cb: MdcCheckbox): void {
  cb.toggle();
}`
  };

  exampleTheme = {
    html: `<mdc-form-field>
  <mdc-checkbox class="demo-checkbox--custom-all"></mdc-checkbox>
  <label>Custom Stroke/Fill/Ink</label>
</mdc-form-field>

<mdc-form-field>
  <mdc-checkbox class="demo-checkbox--custom-stroke-and-fill"></mdc-checkbox>
  <label>Custom Stroke and Fill</label>
</mdc-form-field>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_checkbox.scss`
  };

  exampleAccessibility = {
    html: `<div class="mdc-touch-target-wrapper">
  <mdc-form-field>
    <mdc-checkbox touch></mdc-checkbox>
    <label>My Accessible Checkbox</label>
  </mdc-form-field>
</div>`
  };
}
