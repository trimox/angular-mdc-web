import {Component, OnInit, ViewChild} from '@angular/core';

import {MdcSwitchChange} from '@angular-mdc/web/switch';
import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class Switch implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Switches',
      description: 'Buttons allow users to take actions, and make choices, with a single tap.',
      references: [{
        name: 'Material Design guidelines: Switches',
        url: 'https://material.io/design/components/selection-controls.html#switches'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-switch/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-switch/README.md#sass-mixins'},
      ],
      code: `import {MdcSwitchModule} from '@angular-mdc/web/switch';`,
      sass: `@use '@material/switch/mdc-switch';
@use '@material/switch';`
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
          header: 'MdcSwitch',
          selectors: [
            'mdc-switch',
          ],
          exportedAs: 'mdcSwitch',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'id: string', summary: `Unique Id of the switch (auto generated if not supplied).`},
                {name: 'name: string', summary: `Name of the switch.`},
                {name: 'ariaLabel: string', summary: `Used to set the 'aria-label' attribute on the underlying input element.`},
                {name: 'ariaLabelledby: string', summary: `The 'aria-labelledby' attribute takes precedence as the element's text alternative.`},
                {name: 'tabIndex: number', summary: `Set the underlying tab index of the switch. (Default: 0)`},
                {name: 'checked: boolean', summary: `Use to set the checked value.`},
                {name: 'disabled: boolean', summary: `Disables the switch.`},
                {name: 'required: boolean', summary: `Whether the switch is required.`},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'toggle()', summary: 'Toggle the checked state of the switch.'},
                {name: 'focus()', summary: 'Set focus to the switch.'},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'change(source: MdcSwitch, checked: boolean)', summary: 'Event dispatched on value change.'},
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
  isSwitchOn: boolean = false;
  changeEvent: boolean;

  onChange(evt: MdcSwitchChange): void {
    this.changeEvent = evt.checked;
  }

  //
  // Examples
  //

  exampleBasic = {
    html: `<mdc-switch></mdc-switch>

<mdc-form-field>
  <mdc-switch></mdc-switch>
  <label>off/on</label>
</mdc-form-field>

<mdc-form-field>
  <mdc-switch disabled></mdc-switch>
  <label>off/on</label>
</mdc-form-field>

<mdc-form-field alignEnd>
  <mdc-switch></mdc-switch>
  <label>RTL</label>
</mdc-form-field>`
  };

  exampleChangeEvent = {
    html: `<mdc-form-field>
  <mdc-switch (change)="onChange($event)"></mdc-switch>
  <label>off/on</label>
</mdc-form-field>`,
    ts: `import { MdcSwitchChange } from '@angular-mdc/web';

onChange(evt: MdcSwitchChange): void {
  console.log(evt.checked);
}`
  };

  exampleCustom = {
    html: `<mdc-form-field class="custom-switch__label-left-margin">
  <mdc-switch></mdc-switch>
  <label>Label margin</label>
</mdc-form-field>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_switch.scss`
  };

  exampleNgModel = {
    html: `<mdc-form-field>
  <mdc-switch [(ngModel)]="isSwitchOn"></mdc-switch>
  <label>off/on</label>
</mdc-form-field>

<p>NgModel value: {{isSwitchOn}}</p>`,
    ts: `isSwitchOn: boolean = false;`
  };

  exampleNgModelForm = {
    html: `<form #demoForm="ngForm" id="demoForm">
  <mdc-form-field>
    <mdc-switch #demoSwitch ngModel name="demoSwitch" #demoSwitchModel="ngModel"></mdc-switch>
    <label>off/on</label>
  </mdc-form-field>
</form>

<p>Dirty: {{ demoSwitchModel.dirty }}</p>
<p>Touched: {{ demoSwitchModel.touched }}</p>
<p>Value: {{ demoSwitchModel.value }}</p>`
  };

  exampleTheme = {
    html: `<mdc-form-field>
  <mdc-switch class="demo-switch--custom"></mdc-switch>
  <label>Custom Theme</label>
</mdc-form-field>

<mdc-form-field>
  <mdc-switch class="custom-switch--thumb-color"></mdc-switch>
  <label>Thumb Color</label>
</mdc-form-field>

<mdc-form-field>
  <mdc-switch class="custom-switch--track-color"></mdc-switch>
  <label>Track Color</label>
</mdc-form-field>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_switch.scss`
  };
}
