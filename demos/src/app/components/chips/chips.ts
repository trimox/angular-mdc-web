import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

import {MdcChipSetChange, MdcChipSelectionEvent, MdcChipRemovalEvent, MdcChipInteractionEvent} from '@angular-mdc/web/chips';

@Component({template: '<component-api></component-api>'})
export class Api implements OnInit {
  @ViewChild(ComponentApi, {static: true}) _componentApi: ComponentApi;

  ngOnInit() {
    this._componentApi.docApi = {
      sections: [
        {
          header: 'MdcChipSet',
          selectors: [
            'mdc-chip-set',
          ],
          exportedAs: 'mdcChipSet',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'choice: boolean', summary: 'Indicates that the chips in the set are choice chips, which allow a single selection from a set of options.'},
                {name: 'filter: boolean', summary: 'Indicates that the chips in the set are filter chips, which allow multiple selection from a set of options.'},
                {name: 'input: boolean', summary: 'Indicates that the chips in the set are input chips, which enable user input by converting text into chips.'},
                {name: 'touch: boolean', summary: 'Set the component touch target to 48 x 48 px.'},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'getSelectedChipIds(): string[]', summary: 'Returns an array of the IDs of all selected chips.'},
                {name: 'select(chipId: string): void', summary: 'Selects the chip with the given id. Deselects all other chips if the chip set is of the choice variant.'},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'interaction: MdcChipInteractionEvent', summary: 'Indicates when a chip is interacted with (via click/tap or Enter key)'},
                {name: 'change: MdcChipSetChange', summary: 'Emitted when a chip is interacted with.'},
              ]
            },
          ]
        },
        {
          header: 'MdcChip',
          selectors: [
            'mdc-chip',
          ],
          exportedAs: 'mdcChip',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'choice: boolean', summary: 'Indicates that the chips in the set are choice chips, which allow a single selection from a set of options.'},
                {name: 'filter: boolean', summary: 'Indicates that the chips in the set are filter chips, which allow multiple selection from a set of options.'},
                {name: 'input: boolean', summary: 'Indicates that the chips in the set are input chips, which enable user input by converting text into chips.'},
                {name: 'touch: boolean', summary: 'Set the component touch target to 48 x 48 px.'},
                {name: 'label: string', summary: 'Sets the text content of the chip.'},
                {name: 'value: string | string[]', summary: 'The value of the chip. Defaults to the content inside mdc-chip.'},
                {name: 'removable: boolean', summary: 'Sets whether a trailing icon click should trigger exit/removal of the chip. (Default is true)'},
                {name: 'disableRipple: boolean', summary: 'Whether ripples are disabled.'},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'focus()', summary: 'Set focus to the chip.'},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'interactionEvent: MdcChipInteractionEvent', summary: 'Indicates the chip was interacted with (via click/tap or Enter key)'},
                {name: 'selectionChange: MdcChipSelectionEvent', summary: `Indicates the chip's selection state has changed (for choice/filter chips)`},
                {name: `removalEvent: MdcChipRemovalEvent`, summary: `Indicates the chip removal event from a chip set`},
                {name: `navigationEvent: MdcChipNavigationEvent`, summary: `Indicates a navigation event has occurred on a chip`},
                {name: `trailingIconInteraction: MdcChipInteractionEvent`, summary: `Indicates the chip's trailing icon was interacted with (via click/tap or Enter key)`},
              ]
            },
          ]
        },
        {
          header: 'MdcChipText',
          summary: 'Optional. Indicates the text content of the chip.',
          selectors: ['mdc-chip-text'],
          exportedAs: 'mdcChipText',
        },
        {
          header: 'MdcChipIcon',
          summary: 'Optional. Indicates an icon in the chip.',
          selectors: ['mdc-chip-icon'],
          exportedAs: 'mdcChipIcon',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'leading: boolean', summary: 'Indicates a leading icon in the chip'},
                {name: 'leading: boolean', summary: 'Indicates a trailing icon in the chip'},
              ]
            }
          ]
        },
      ]
    };
  }
}

@Component({template: '<component-viewer></component-viewer>'})
export class Chips implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Chips',
      description: `Chips are compact elements that allow users to enter information, select a choice, filter content, or trigger an action.`,
      references: [{
        name: 'Material Design guidelines: Chips',
        url: 'https://material.io/guidelines/components/chips.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-chips/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-chips/README.md#sass-mixins'},
      ],
      code: `import {MdcChipsModule} from '@angular-mdc/web/chips';`,
      sass: `@use '@material/chips/mdc-chips';
@use '@material/chips';`
    };
  }
}

export interface ChipFood {
  value: string;
  viewValue: string;
}

@Component({templateUrl: './examples.html'})
export class Examples {
  demoChipValue = 'pizza-1';
  ngModelValue = 'tacos-2';

  chipForm = new FormGroup({
    chipFood: new FormControl('steak-0')
  });

  foods: ChipFood[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  onChipSetChange(evt: MdcChipSetChange): void {
    console.log(evt);
  }

  onChipInteraction(evt: MdcChipInteractionEvent): void {
    console.log(`MdcChipInteractionEvent: ${evt.chipId} : ${evt.value}`);
  }

  onChipSelection(evt: MdcChipSelectionEvent): void {
    console.log(`MdcChipSelectionEvent: ${evt.chipId} : ${evt.selected}`);
  }

  onChipRemoved(evt: MdcChipRemovalEvent): void {
    console.log(`MdcChipRemovalEvent: ${evt.chipId}`);
  }

  //
  // Examples
  //

  reuseFoods = `foods: ChipFood[] = [
  {value: 'steak-0', viewValue: 'Steak'},
  {value: 'pizza-1', viewValue: 'Pizza'},
  {value: 'tacos-2', viewValue: 'Tacos'},
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
  <mdc-chip label="Alice" (removalEvent)="onChipRemoved($event)">
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-icon trailing>cancel</mdc-chip-icon>
  </mdc-chip>
  <mdc-chip label="Bob" (removalEvent)="onChipRemoved($event)">
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-icon trailing>cancel</mdc-chip-icon>
  </mdc-chip>
  <mdc-chip label='Charlie' (removalEvent)="onChipRemoved($event)">
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-icon trailing>cancel</mdc-chip-icon>
  </mdc-chip>
  <mdc-chip label='David' (removalEvent)="onChipRemoved($event)">
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
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_chips.scss`
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
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_chips.scss`
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
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_chips.scss`
  };

  exampleValue = {
    html: `<mdc-chip-set choice #chipSetValue (change)="onChipSetChange($event)" [value]="demoChipValue">
  <mdc-chip *ngFor="let food of foods" [value]="food.value"
    (interaction)="onChipInteraction($event)"
    (selectionChange)="onChipInteraction($event)">
    {{food.viewValue}}
  </mdc-chip>
</mdc-chip-set>`,
    ts: `${this.reuseFoods}

demoChipValue = 'pizza-1';

onChipSetChange(evt: MdcChipSetChange): void {
  // do something
}

onChipInteraction(evt: MdcChipInteractionEvent): void {
  // do something
}

onChipSelection(evt: MdcChipSelectionEvent): void {
  // do something
}`
  };

  exampleNgModel = {
    html: `<mdc-chip-set choice [(ngModel)]="ngModelValue">
  <mdc-chip *ngFor="let food of foods" [value]="food.value">
    {{food.viewValue}}
  </mdc-chip>
</mdc-chip-set>`,
    ts: `ngModelValue = 'tacos-2';

${this.reuseFoods}`
  };

  exampleReactiveForm = {
    html: `<form [formGroup]="chipForm" novalidate>
  <mdc-chip-set choice formControlName="chipFood">
    <mdc-chip *ngFor="let food of foods" [value]="food.value">
      {{food.viewValue}}
    </mdc-chip>
  </mdc-chip-set>
</form>`,
    ts: `${this.reuseFoods}

chipForm = new FormGroup({
  chipFood: new FormControl('steak-0')
});`
  };

  exampleAccessibility = {
    html: `<div class="mdc-touch-target-wrapper">
  <mdc-chip touch label="My Accessibility Chip"></mdc-chip>
</div>`
  };
}
