import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

import { MdcChipSetChange, MdcChipInteractionEvent, MdcChipRemovedEvent } from '@angular-mdc/web';

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ template: '<component-viewer></component-viewer>' })
export class ChipsDemo implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Chips',
      `Chips are compact elements that allow users to enter information,
       select a choice, filter content, or trigger an action.`,
      "import { MdcChipsModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Chips',
      url: 'https://material.io/guidelines/components/chips.html'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-chips/README.md'
    }];
  }
}

@Component({ templateUrl: './examples.html' })
export class Examples {
  selectedFood: any;

  demoChipValue = 'pizza-1';

  formControl = new FormControl('', Validators.required);

  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak', selected: false },
    { value: 'pizza-1', viewValue: 'Pizza', selected: false },
    { value: 'tacos-2', viewValue: 'Tacos', selected: false },
  ];

  @ViewChild('form', {static: false}) form: NgForm;

  onChipSetChange(evt: MdcChipSetChange): void {
    console.log(evt);
  }

  onChipInteraction(evt: MdcChipInteractionEvent): void {
    console.log(evt);
  }

  onChipRemoved(evt: MdcChipRemovedEvent): void {
    console.log(evt);
  }

  //
  // Examples
  //

  reuseFoods = `foods: any[] = [
  { value: 'steak-0', viewValue: 'Steak', selected: false },
  { value: 'pizza-1', viewValue: 'Pizza', selected: false },
  { value: 'tacos-2', viewValue: 'Tacos', selected: false },
];`;

  exampleSimple = {
    html: `<mdc-chip-set>
  <mdc-chip>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-text>Jane Smith</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`
  };

  exampleInput = {
    html: `<mdc-chip-set input>
  <mdc-chip label="Alice">
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-icon trailing>cancel</mdc-chip-icon>
  </mdc-chip>
  <mdc-chip label="Bob">
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-icon trailing>cancel</mdc-chip-icon>
  </mdc-chip>
  <mdc-chip label='Charlie'>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-icon trailing>cancel</mdc-chip-icon>
  </mdc-chip>
  <mdc-chip label='David'>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-icon trailing>cancel</mdc-chip-icon>
  </mdc-chip>
</mdc-chip-set>`
  };

  exampleChoice = {
    html: `<mdc-chip-set choice>
  <mdc-chip>
    <mdc-chip-text>Get Directions</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-text>Get Weather</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-text>Add to Calendar</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`
  };

  exampleFilter = {
    html: `<mdc-chip-set filter>
  <mdc-chip>
    <mdc-chip-text>Tops</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-text>Bottoms</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-text>Shoes</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-text>Accessories</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`
  };

  exampleFilterWithIcon = {
    html: `<mdc-chip-set filter>
  <mdc-chip>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-text>Alice</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-text>Bob</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-text>Charlie</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-text>David</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`
  };

  exampleAction = {
    html: `<mdc-chip-set>
  <mdc-chip>
    <mdc-chip-icon leading>wb_sunny</mdc-chip-icon>
    <mdc-chip-text>Turn on lights</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-icon leading>bookmark</mdc-chip-icon>
    <mdc-chip-text>Bookmark</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-icon leading>alarm</mdc-chip-icon>
    <mdc-chip-text>Set alarm</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-icon leading>directions</mdc-chip-icon>
    <mdc-chip-text>Get Directions</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`
  };

  exampleShape = {
    html: `<mdc-chip-set>
  <mdc-chip class="custom-chip--shape-radius">
    <mdc-chip-text>Turn on lights</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip--shape-radius">
    <mdc-chip-text>Bookmark</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip--shape-radius">
    <mdc-chip-text>Set alarm</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip--shape-radius">
    <mdc-chip-text>Get Directions</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`,
    sass: `.custom-chip--shape-radius {
  @include mdc-chip-shape-radius(4px);
}`
  };

  exampleTheme = {
    html: `<mdc-chip-set>
  <mdc-chip class="custom-chip-secondary">
    <mdc-chip-text>Turn on lights</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip-secondary">
    <mdc-chip-text>Bookmark</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip-secondary">
    <mdc-chip-text>Set alarm</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip-secondary">
    <mdc-chip-text>Get Directions</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`,
    sass: `.custom-chip-secondary {
  @include mdc-chip-fill-color(white);
  @include mdc-chip-ink-color($mdc-theme-secondary);
  @include mdc-chip-selected-ink-color($mdc-theme-secondary);
  @include mdc-chip-outline(2px, solid, $mdc-theme-secondary);
}`
  };

  exampleCustom = {
    html: `<mdc-chip-set>
  <mdc-chip class="custom-chip--height">
    <mdc-chip-text>Height</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip--horizontal-padding">
    <mdc-chip-text>Horizontal Padding</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip--leading-icon-color">
    <mdc-chip-icon leading>wb_sunny</mdc-chip-icon>
    <mdc-chip-text>Leading Icon Color</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip--trailing-icon-color">
    <mdc-chip-text>Trailing Icon Color</mdc-chip-text>
    <mdc-chip-icon trailing>wb_sunny</mdc-chip-icon>
  </mdc-chip>
  <mdc-chip class="custom-chip--leading-icon-size">
    <mdc-chip-icon leading>wb_sunny</mdc-chip-icon>
    <mdc-chip-text>Leading Icon Size</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip--trailing-icon-size">
    <mdc-chip-text>Trailing Icon Size</mdc-chip-text>
    <mdc-chip-icon trailing>wb_sunny</mdc-chip-icon>
  </mdc-chip>
  <mdc-chip class="custom-chip--leading-icon-margin">
    <mdc-chip-icon leading>wb_sunny</mdc-chip-icon>
    <mdc-chip-text>Leading Icon Margin</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip--trailing-icon-margin">
    <mdc-chip-text>Trailing Icon Margin</mdc-chip-text>
    <mdc-chip-icon trailing>wb_sunny</mdc-chip-icon>
  </mdc-chip>
</mdc-chip-set>`,
    sass: `.custom-chip--height {
  @include mdc-chip-height(40px);
}

.custom-chip--leading-icon-color {
  @include mdc-chip-leading-icon-color($custom-chip-fill-color, .5);
}

.custom-chip--trailing-icon-color {
  @include mdc-chip-trailing-icon-color($custom-chip-fill-color, .5);
}

.custom-chip--leading-icon-size {
  @include mdc-chip-leading-icon-size(25px);
}

.custom-chip--trailing-icon-size {
  @include mdc-chip-trailing-icon-size(25px);
}

.custom-chip--leading-icon-margin {
  @include mdc-chip-leading-icon-margin(5px, 5px, 5px, 5px);
}

.custom-chip--trailing-icon-margin {
  @include mdc-chip-trailing-icon-margin(5px, 5px, 5px, 5px);
}

.custom-chip--horizontal-padding {
  @include mdc-chip-horizontal-padding(25px);
}`
  };

  exampleValue = {
    html: `<mdc-chip-set choice #chipSetValue (change)="onChipSetChange($event)" [value]="demoChipValue">
  <mdc-chip *ngFor="let food of foods" [value]="food.value" [selected]="food.selected"
    (selectionChange)="onChipInteraction($event)">
    {{food.viewValue}}
  </mdc-chip>
</mdc-chip-set>
<p>Value: {{chipSetValue.value}}</p>`,
    ts: `${this.reuseFoods}

demoChipValue = 'pizza-1';

onChipSetChange(evt: MdcChipSetChange): void {
  console.log(evt);
}

onChipInteraction(evt: MdcChipInteractionEvent): void {
  console.log(evt);
}`
  };

  exampleNgModel = {
    html: `<mdc-chip-set [(ngModel)]="selectedFood">
  <mdc-chip *ngFor="let food of foods" [value]="food.value" [selected]="food.selected">
    {{food.viewValue}}
  </mdc-chip>
</mdc-chip-set>
<p>Value: {{selectedFood}}</p>`,
    ts: this.reuseFoods
  };

  exampleFormControl = {
    html: `<form #form="ngForm" novalidate>
  <mdc-chip-set [formControl]="formControl">
    <mdc-chip *ngFor="let food of foods" [value]="food.value" [selected]="food.selected">
      {{food.viewValue}}
    </mdc-chip>
  </mdc-chip-set>
</form>`,
    ts: `${this.reuseFoods}

formControl = new FormControl('', Validators.required);

@ViewChild('form') form: NgForm;`
  };
}
