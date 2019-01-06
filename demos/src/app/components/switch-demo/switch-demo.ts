import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, NgForm, Validators } from '@angular/forms';

import { MdcSwitchChange } from '@angular-mdc/web';
import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({ template: '<component-viewer></component-viewer>' })
export class SwitchDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Switches',
      'Switches toggle the state of a single setting on or off.',
      "import { MdcSwitchModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Switches',
      url: 'https://material.io/design/components/selection-controls.html#switches'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-switch/README.md'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ templateUrl: './examples.html' })
export class Examples {
  isSwitchOn: boolean = true;

  onChange(evt: MdcSwitchChange): void {
    console.log(evt);
  }

  //
  // Examples
  //

  example1 = {
    html: `<mdc-switch></mdc-switch>

<mdc-form-field>
  <mdc-switch></mdc-switch>
  <label>off/on</label>
</mdc-form-field>

<mdc-form-field>
  <mdc-switch disabled></mdc-switch>
  <label>off/on</label>
</mdc-form-field>

<mdc-form-field>
  <mdc-switch class="demo-switch--custom"></mdc-switch>
  <label>Custom Theme</label>
</mdc-form-field>`,
    sass: `.demo-switch--custom {
  $color: $material-color-red-500;

  @include mdc-switch-toggled-on-color($color);
}`
  };

  exampleNgModel = {
    html: `<mdc-form-field [alignEnd]="false">
  <mdc-switch [(ngModel)]="isSwitchOn" (change)="onChange($event)"></mdc-switch>
  <label>off/on</label>
</mdc-form-field>

<p>NgModel value: {{isSwitchOn}}</p>`,
    ts: `import { MdcSwitchChange } from '@angular-mdc/web';

isSwitchOn: boolean = true;

onChange(evt: MdcSwitchChange): void {
  console.log(evt);
}`
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
}
