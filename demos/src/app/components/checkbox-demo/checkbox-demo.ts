import { Component, OnInit, ViewChild } from '@angular/core';

import { MdcCheckbox, MdcCheckboxChange } from '@angular-mdc/web';

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
    sass: `.demo-checkbox--custom-all {
  $color: $material-color-red-500;

  @include mdc-checkbox-focus-indicator-color($color);
  @include mdc-states($color);
  @include mdc-checkbox-container-colors(
    $unmarked-stroke-color: $color,
    $unmarked-fill-color: rgba($color, .25),
    $marked-fill-color: $color,
    $generate-keyframes: false);
}

.demo-checkbox--custom-stroke-and-fill {
  @include mdc-checkbox-container-colors(
    $unmarked-stroke-color: $material-color-blue-500,
    $marked-fill-color: $material-color-purple-500,
    $generate-keyframes: false);
}`
  };
}
