import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';
import { FormGroup, FormControl } from '@angular/forms';

import { MdcRadio } from '@angular-mdc/web';

@Component({ template: '<component-viewer></component-viewer>' })
export class RadioDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Radio Buttons',
      `Radio buttons allow the user to select one option from a set while seeing all available options.`,
      "import { MdcRadioModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Radio Buttons',
      url: 'https://material.io/design/components/selection-controls.html#radio-buttons'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-radio/README.md'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ templateUrl: './examples.html' })
export class Examples {
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  form = new FormGroup({
    season: new FormControl(''),
  });

  alternateColors(input: MdcRadio) {
    const demoInput = 'demo-radio--custom';

    input.elementRef.nativeElement.classList.contains(demoInput) ?
      input.elementRef.nativeElement.classList.remove(demoInput)
      : input.elementRef.nativeElement.classList.add(demoInput);
  }

  example1 = {
    html: `<mdc-radio></mdc-radio>`
  };

  exampleRadioSet = {
    html: `<mdc-form-field>
  <mdc-radio name="demo-radio-set"></mdc-radio>
  <label>Radio 1</label>
</mdc-form-field>
<mdc-form-field>
  <mdc-radio name="demo-radio-set"></mdc-radio>
  <label>Radio 2</label>
</mdc-form-field>`
  };

  example2 = {
    html: `<mdc-form-field [alignEnd]="false">
  <mdc-radio [disabled]="false" class="demo-radio--custom"></mdc-radio>
  <label>Radio Button</label>
</mdc-form-field>`,
    sass: `.demo-radio--custom {
  $color: $material-color-red-500;

  @include mdc-radio-unchecked-stroke-color($color);
  @include mdc-radio-checked-stroke-color($color);
  @include mdc-radio-ink-color($material-color-orange-500);
  @include mdc-radio-focus-indicator-color($color);
  @include mdc-states($color);
}`
  };

  exampleRadioGroup = {
    html: `<mdc-radio-group [(ngModel)]="favoriteSeason">
  <mdc-form-field *ngFor="let season of seasons">
    <mdc-radio [value]="season"></mdc-radio>
    <label>{{season}}</label>
  </mdc-form-field>
</mdc-radio-group>
<p>Your favorite season is: {{favoriteSeason}}</p>`,
    ts: `favoriteSeason: string;
seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];`
  };

  exampleReactive = {
    html: `<form [formGroup]="form">
  <mdc-radio-group formControlName="season">
    <mdc-form-field *ngFor="let season of seasons">
      <mdc-radio [value]="season"></mdc-radio>
      <label>{{season}}</label>
    </mdc-form-field>
  </mdc-radio-group>
</form>
<p>Your favorite season is: {{form.controls['season'].value}}</p>`,
    ts: `seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

form = new FormGroup({
  season: new FormControl(''),
});`
  };
}
