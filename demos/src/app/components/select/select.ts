import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, FormBuilder, Validators} from '@angular/forms';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

interface Food {
  value: string;
  viewValue?: string;
  disabled?: boolean;
}

interface Fruit {
  id: number;
  name: string;
}

@Component({template: '<component-viewer></component-viewer>'})
export class Select implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Select Menus',
      description: 'MDC Select provides Material Design single-option select menus, using the MDC menu. The Select component is fully accessible, and supports RTL rendering.',
      references: [{
        name: 'Material Design guidelines: Menus',
        url: 'https://material.io/guidelines/components/menus.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-select/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-select/README.md#sass-mixins'},
        {name: 'Helper Text Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-select/helper-text/README.md#sass-mixins'},
        {name: 'Icon Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-select/icon/README.md#sass-mixins'},
      ],
      code: `import {MdcSelectModule} from '@angular-mdc/web/select';`,
      sass: `@use '@material/select/mdc-select';
@use '@material/select';
@use '@material/list/mdc-list';
@use '@material/menu-surface/mdc-menu-surface';
@use '@material/menu/mdc-menu';`
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
          header: 'MdcSelect',
          selectors: [
            'mdc-select',
          ],
          exportedAs: 'mdcSelect',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'id: string', summary: `Unique Id of the select (auto generated if not supplied).`},
                {name: 'name: string', summary: `Name of the select.`},
                {name: 'placeholder: string', summary: `Text shown if no value has been selected.`},
                {name: 'value: any', summary: `Sets the selected item by value.`},
                {name: 'tabIndex: number', summary: `Set the underlying tab index of the select. (Default is 0)`},
                {name: 'floatLabel: boolean', summary: `Whether or not to show or hide a floating placeholder.`},
                {name: 'outlined: boolean', summary: `Styles the select as an outlined select.`},
                {name: 'disabled: boolean', summary: `Enables/disables the select.`},
                {name: 'helperText: MdcHelperText', summary: `Reference to related MdcHelperText`},
                {name: 'compareWith: (o1: any, o2: any) => boolean', summary: `Function to compare the option values with the selected values. The first argument is a value from an option. The second is a value from the selection. A boolean should be returned.`},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'getSelectedIndex(): number', summary: `Returns the index of the currently selected option. Returns -1 if no option is currently selected.`},
                {name: 'setSelectionByValue(value)', summary: `Set selection to the passed value.`},
                {name: 'focus()', summary: `Set focus to the select.`},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'valueChange(index: number, value: any)', summary: `Event emitted on any value change.`},
                {name: 'selectionChange(source: MdcSelect, index: number, value: any)', summary: `Event emitted if user changed the value.`},
                {name: 'blur(value)', summary: `Emitted whenever the select loses focus.`},
                {name: 'focus(boolean)', summary: `Emitted when the select gains or loses focus.`},
              ]
            },
          ]
        },
        {
          header: 'MDCSelectHelperText',
          selectors: [
            'mdc-select-helper-text',
            'mdcSelectHelperText'
          ],
          exportedAs: 'mdcSelectHelperText',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'validation: boolean', summary: `Help text can be used to provide additional validation messages.`},
                {name: 'persistent: boolean', summary: `Help text will always be visible.`},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'showToScreenReader()', summary: `Makes the helper text visible to the screen reader.`},
                {name: 'setValidity(inputIsValid: boolean)', summary: `Sets the validity of the helper text.`},
              ]
            },
          ]
        },
        {
          header: 'MDC_SELECT_DEFAULT_OPTIONS',
          summary: `Injection token that can be used to configure the default options for all select's within an app.`,
          summaryCode: `const MDC_SELECT_DEFAULT_OPTIONS:
  InjectionToken<MdcSelectDefaultOptions>;`,
        },
      ]
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  lazyFoods: Food[] = [];

  foodControl = new FormControl();

  foodForm = new FormGroup({
    favoriteFood: new FormControl('pizza-1', [Validators.required])
  });

  lazyLoadForm = new FormGroup({
    lazySelect: new FormControl(null, [Validators.required])
  });

  formCompareWith: FormGroup;
  fruits: Fruit[] = [
    {
      id: 1,
      name: 'Pineapple'
    },
    {
      id: 2,
      name: 'Watermelon'
    }
  ];

  foods = [
    {value: '', disabled: false},
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos is disabled', disabled: true},
    {value: 'fruit-3', viewValue: 'Fruit'},
  ];

  compareFn(f1: Fruit, f2: Fruit): boolean {
    return f1 && f2 ? f1.id === f2.id : f1 === f2;
  }

  constructor(private fb: FormBuilder) {
    this.formCompareWith = this.fb.group({
      fruit: this.fruits[0]
    });

    this.foodControl.setValue('fruit-3');
  }

  submitForm() {
    if (this.foodForm.invalid) {
      return;
    }
  }

  resetForm(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.foodForm.reset();
  }

  onSelectionChange(event: {index: any, value: any}) {
    console.log(`onSelectionChange: ${event.index} ${event.value}`);
  }

  loadFoods(): void {
    this.lazyFoods = this.foods;

    // Patch the form
    this.lazyLoadForm.patchValue({
      lazySelect: 'pizza-1'
    });
  }

  public resetLazyLoaded(formDirective: FormGroupDirective): void {
    this.lazyFoods = [];
    formDirective.resetForm();
    this.lazyLoadForm.reset();
  }

  //
  // Examples
  //

  exampleStandard = {
    html: `<mdc-select #standardSelect placeholder="Fruit" name="my-select" required
  [helperText]="standardSelectHelper"
  (selectionChange)="onSelectionChange($event)">
  <mdc-menu class="demo-select-width" [anchorMargin]="{top: 10}">
    <mdc-list>
      <mdc-list-item></mdc-list-item>
      <mdc-list-item value="apple">Apple</mdc-list-item>
      <mdc-list-item value="orange">Orange</mdc-list-item>
      <mdc-list-item value="banana">Banana</mdc-list-item>
      <mdc-list-item disabled value="mango">Mango</mdc-list-item>
    </mdc-list>
  </mdc-menu>
</mdc-select>
<mdc-select-helper-text #standardSelectHelper validation>Field is required
</mdc-select-helper-text>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_select.scss`
  };

  exampleNoLabel = {
    html: `<mdc-select>
  <mdc-menu class="demo-select-width" [anchorMargin]="{top: 10}">
    <mdc-list>
      <mdc-list-item></mdc-list-item>
      <mdc-list-item value="apple">Apple</mdc-list-item>
      <mdc-list-item value="orange">Orange</mdc-list-item>
      <mdc-list-item value="banana">Banana</mdc-list-item>
      <mdc-list-item value="mango">Mango</mdc-list-item>
    </mdc-list>
  </mdc-menu>
</mdc-select>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_select.scss`
  };

  exampleCustomEnhanced = {
    html: `<mdc-select placeholder="Standard" class="custom-select-shape-radius">
  <mdc-menu>
    <mdc-list>
      <mdc-list-item *ngFor="let food of foods" [value]="food.value" [disabled]="food.disabled">
        {{food.viewValue}}
      </mdc-list-item>
    </mdc-list>
  </mdc-menu>
</mdc-select>

<mdc-select placeholder="Standard" outlined class="custom-select-outline-shape-radius">
  <mdc-menu>
    <mdc-list>
      <mdc-list-item *ngFor="let food of foods" [value]="food.value" [disabled]="food.disabled">
        {{food.viewValue}}
      </mdc-list-item>
    </mdc-list>
  </mdc-menu>
</mdc-select>

<mdc-select placeholder="Standard" outlined class="custom-select-outline-color">
  <mdc-menu>
    <mdc-list>
      <mdc-list-item *ngFor="let food of foods" [value]="food.value" [disabled]="food.disabled">
        {{food.viewValue}}
      </mdc-list-item>
    </mdc-list>
  </mdc-menu>
</mdc-select>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_select.scss`
  };

  exampleLeadingIcon = {
    html: `<mdc-select #meal [helperText]="mealHelper" required placeholder="Pick a Meal">
  <mdc-icon mdcSelectIcon>fastfood</mdc-icon>
  <mdc-menu>
    <mdc-list>
      <mdc-list-item *ngFor="let food of foods" [value]="food.value"
        [disabled]="food.disabled">
        {{food.viewValue}}
      </mdc-list-item>
    </mdc-list>
  </mdc-menu>
</mdc-select>
<mdc-select-helper-text #mealHelper validation>
  <span *ngIf="!meal.value">Meal selection is required</span>
</mdc-select-helper-text>`,
    ts: `foods = [
  { value: '', disabled: false },
  { value: 'steak-0', viewValue: 'Steak' },
  { value: 'pizza-1', viewValue: 'Pizza' },
  { value: 'tacos-2', viewValue: 'Tacos is disabled', disabled: true },
  { value: 'fruit-3', viewValue: 'Fruit' },
];`
  };

  exampleNgModel = {
    html: `<form #demoForm="ngForm">
  <mdc-select #select placeholder="Favorite food" name="food" required
    outlined ngModel #demoNgModel="ngModel"
    (selectionChange)="onSelectionChange($event)">
    <mdc-menu class="demo-select-width">
      <mdc-list>
        <mdc-list-item *ngFor="let food of foods" [value]="food.value"
          [disabled]="food.disabled">{{food.viewValue}}</mdc-list-item>
      </mdc-list>
    </mdc-menu>
  </mdc-select>
</form>`,
    ts: `foods = [
  { value: '', disabled: false },
  { value: 'steak-0', viewValue: 'Steak' },
  { value: 'pizza-1', viewValue: 'Pizza' },
  { value: 'tacos-2', viewValue: 'Tacos is disabled', disabled: true },
  { value: 'fruit-3', viewValue: 'Fruit' },
];

onSelectionChange(event: { index: any, value: any }) {
  console.log(event.index);
}`
  };

  exampleReactive = {
    html: `<form [formGroup]="foodForm" id="foodForm" (ngSubmit)="submitForm()" #formDirective="ngForm">
  <mdc-select #favoriteFood placeholder="Favorite food" formControlName="favoriteFood" [helperText]="reactiveHelper">
    <mdc-menu>
      <mdc-list>
        <mdc-list-item *ngFor="let food of foods" [value]="food.value"
          [disabled]="food.disabled">
          {{food.viewValue}}
        </mdc-list-item>
      </mdc-list>
    </mdc-menu>
  </mdc-select>
  <mdc-select-helper-text #reactiveHelper validation>
    <span *ngIf="foodForm.controls['favoriteFood'].hasError('required')">Selection is required</span>
  </mdc-select-helper-text>

  <button mdc-button>Submit</button>
  <button mdc-button type="button" (click)="resetForm(formDirective)">Reset</button>
</form>

<p>Control Valid: {{foodForm.controls['favoriteFood'].valid}}</p>
<p>Dirty: {{ foodForm.dirty }}</p>
<p>Valid: {{ foodForm.valid }}</p>
<p>Pristine: {{ foodForm.pristine }}</p>
<p>Touched: {{ foodForm.touched }}</p>
<p>Value: {{ foodForm.value | json }}</p>`,
    ts: `foods = [
  { value: '', disabled: false },
  { value: 'steak-0', viewValue: 'Steak' },
  { value: 'pizza-1', viewValue: 'Pizza' },
  { value: 'tacos-2', viewValue: 'Tacos is disabled', disabled: true },
  { value: 'fruit-3', viewValue: 'Fruit' },
];

foodForm = new FormGroup({
  favoriteFood: new FormControl(null, [Validators.required])
});

submitForm() {
  if (this.foodForm.invalid) {
    return;
  }
}

resetForm(formDirective: FormGroupDirective) {
  formDirective.resetForm();
  this.foodForm.reset();
}`
  };

  exampleCompareWith = {
    html: `<form [formGroup]="formCompareWith">
  <mdc-select formControlName="fruit" [compareWith]="compareFn">
    <mdc-menu class="demo-select-width">
      <mdc-list>
        <mdc-list-item *ngFor="let fruit of fruits" [value]="fruit">{{fruit.name}}</mdc-list-item>
      </mdc-list>
    </mdc-menu>
  </mdc-select>
</form>`,
    ts: `formCompareWith: FormGroup;

interface Fruit {
  id: number;
  name: string;
}

fruits: Fruit[] = [
  {
    id: 1,
    name: 'Pineapple'
  },
  {
    id: 2,
    name: 'Watermelon'
  }
];

constructor(private fb: FormBuilder) {
  this.formCompareWith = this.fb.group({
    fruit: [undefined]
  });
}

compareFn(f1: Fruit, f2: Fruit): boolean {
  return f1 && f2 ? f1.id === f2.id : f1 === f2;
}`
  };

  exampleLazyLoaded = {
    html: `<form [formGroup]="lazyLoadForm" #formDirectiveLazy="ngForm">
  <mdc-select outlined formControlName="lazySelect" [helperText]="lazyHelper">
    <mdc-menu>
      <mdc-list>
        <mdc-list-item *ngFor="let food of lazyFoods" [value]="food.value"
          [disabled]="food.disabled">{{food.viewValue}}</mdc-list-item>
      </mdc-list>
    </mdc-menu>
  </mdc-select>
  <mdc-select-helper-text #lazyHelper validation>
    <span *ngIf="lazyLoadForm.controls['lazySelect'].hasError('required')">Selection is required</span>
  </mdc-select-helper-text>

  <button mdc-button (click)="loadFoods()">Load</button>
  <button mdc-button type="button" (click)="resetLazyLoaded(formDirectiveLazy)">Reset</button>
</form>`,
    ts: `interface Food {
  value: string;
  viewValue?: string;
  disabled?: boolean;
}

@Component({ templateUrl: './examples.html' })
export class Examples {
  lazyFoods: Food[] = [];

  lazyLoadForm = new FormGroup({
    lazySelect: new FormControl(null, [Validators.required])
  });

  loadFoods(): void {
    this.lazyFoods = [
      { value: '', disabled: false },
      { value: 'steak-0', viewValue: 'Steak' },
      { value: 'pizza-1', viewValue: 'Pizza' },
      { value: 'tacos-2', viewValue: 'Tacos is disabled', disabled: true },
      { value: 'fruit-3', viewValue: 'Fruit' },
    ];

    // Patch the form
    this.lazyLoadForm.patchValue({
      lazySelect: 'pizza-1'
    });
  }

  public resetLazyLoaded(formDirective: FormGroupDirective): void {
    this.lazyFoods = [];
    formDirective.resetForm();
    this.lazyLoadForm.reset();
  }
}`
  };
}
