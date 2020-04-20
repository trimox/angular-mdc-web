import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';
import {FormGroup, FormControl} from '@angular/forms';

import {MdcRadio} from '@angular-mdc/web/radio';

@Component({template: '<component-viewer></component-viewer>'})
export class Radio implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Radio Buttons',
      description: 'Radio buttons allow the user to select one option from a set while seeing all available options.',
      references: [{
        name: 'Material Design guidelines: Radio Buttons',
        url: 'https://material.io/design/components/selection-controls.html#radio-buttons'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-radio/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-radio#style-customization'},
      ],
      code: `import {MdcRadioModule} from '@angular-mdc/web/radio';`,
      sass: `@use '@material/radio/mdc-radio';
@use '@material/radio';
@use '@material/form-field/mdc-form-field';`
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
          header: 'MdcRadio',
          selectors: [
            'mdc-radio',
          ],
          exportedAs: 'mdcRadio',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'id: string', summary: `Unique Id of the radio button (auto generated if not supplied).`},
                {name: 'name: string', summary: `Name of the radio button.`},
                {name: 'value: any', summary: `Value of the radio button.`},
                {name: 'ariaLabel: string', summary: `Used to set the 'aria-label' attribute on the underlying input element.`},
                {name: 'ariaLabelledby: string', summary: `The 'aria-labelledby' attribute takes precedence as the element's text alternative.`},
                {name: 'checked: boolean', summary: `Use to verify the checked value.`},
                {name: 'disabled: boolean	', summary: `Disables the component.`},
                {name: 'required: boolean', summary: `Whether the radio button is required.`},
                {name: 'touch: boolean', summary: `Set the component touch target to 48 x 48 px.`},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'focus()', summary: `Set focus to the radio button.`},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'change(source: MdcRadio, value: any)', summary: `Event emitted when the group value changes. Change events are only emitted when the value changes due to user interaction with a radio button.`},
              ]
            },
          ]
        },
        {
          header: 'MdcRadioGroup',
          selectors: [
            'mdc-radio-group',
          ],
          exportedAs: 'mdcRadioGroup',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'name: string', summary: `Name of the radio button group.`},
                {name: 'required: boolean', summary: `Whether the radio group is required.`},
                {name: 'disabled: boolean', summary: `Whether the radio group is disabled.`},
                {name: 'selected: MdcRadio | null', summary: `The currently selected radio button. If set to a new radio button, the radio group value will be updated to match the new selected button.`},
                {name: 'value: any', summary: `Value for the radio-group. Should equal the value of the selected radio button if there is a corresponding radio button with a matching value. If there is not such a corresponding radio button, this value persists to be applied in case a new radio button is added with a matching value.`},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'change(source: MdcRadio, value: any)', summary: `Event emitted when the group value changes. Change events are only emitted when the value changes due to user interaction with a radio button.`},
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
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  form = new FormGroup({
    season: new FormControl('Spring'),
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
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_radio.scss`
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
  season: new FormControl('Spring'),
});`
  };

  exampleAccessibility = {
    html: `<div class="mdc-touch-target-wrapper">
  <mdc-form-field>
    <mdc-radio name="demo-radio-set" touch></mdc-radio>
    <label>My Accessibility Radio</label>
  </mdc-form-field>
</div>`
  };
}
