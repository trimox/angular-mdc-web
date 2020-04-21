import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

import {MdcTextField} from '@angular-mdc/web/textfield';
import {MdcIconRegistry} from '@angular-mdc/web/icon';
import {ErrorStateMatcher} from '@angular-mdc/web/form-field';
import {environment} from '../../../environments/environment';
import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({template: '<component-viewer></component-viewer>'})
export class TextField implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Text Field',
      description: 'Text fields let users enter and edit text.',
      references: [{
        name: 'Material Design guidelines: Text Fields',
        url: 'https://material.io/design/components/text-fields.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/README.md#sass-mixins'},
        {name: 'Character Counter Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/character-counter/README.md#sass-mixins'},
        {name: 'Helper Text Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/helper-text/README.md#sass-mixins'},
        {name: 'Icon Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/icon/README.md#sass-mixins'},
      ],
      code: `import {MdcTextFieldModule} from '@angular-mdc/web/textfield';`,
      sass: `@use '@material/textfield/mdc-text-field';
@use '@material/textfield';
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
          header: 'MdcTextField',
          selectors: [
            'mdc-text-field',
          ],
          exportedAs: 'mdcTextField',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'id: string', summary: `Unique id of the element.`},
                {name: `type: string = 'text'`, summary: `Input type of textfield (e.g.: email, password, date, color).`},
                {name: 'name: string', summary: `Name of the textfield.`},
                {name: 'label: string', summary: `Shown to the user when there's no focus or values.`},
                {name: 'value: string', summary: `The input element's value.`},
                {name: 'outlined: boolean', summary: `Set a border around all sides of the text field.`},
                {name: 'fullwidth: boolean', summary: `Set to fullwidth textfield. Do not use outlined to style a full width text field.`},
                {name: 'disabled: boolean', summary: `Disables the component.`},
                {name: 'prefix: string', summary: `Gets or sets the text content of the prefix, if it exists.`},
                {name: 'suffix: string', summary: `Gets or sets the text content of the suffix, if it exists.`},
                {name: 'readonly: boolean', summary: `Whether or not the textfield value is editable.`},
                {name: 'required: boolean', summary: `Whether the element is required.`},
                {
                  name: 'characterCounter: boolean', summary: `Character counter is used if there is a character limit. It displays the ratio of characters used and the total character limit.
                maxlength is required on MdcTextField.`},
                {name: 'useNativeValidation: boolean', summary: `Sets whether to check native HTML validity state (true, default) or custom validity state when updating styles (false).`},
                {name: 'valid: boolean', summary: `Updates input validity styling using passed value.`},
                {name: 'empty: boolean', summary: `Returns whether the control is empty.`},
                {name: 'endAligned: boolean', summary: `Styles the text field with an end-aligned input.`},
                {name: 'ltrText: boolean', summary: `Styles the text field's text elements (input, prefix, and suffix) as LTR even when the direction is RTL. Useful for RTL languages that use LTR for fractional notations.`},
                {
                  name: 'inputmode: string', summary: `Provides a hint to browsers for devices with onscreen keyboards to help them decide which keyboard to display.
                'verbatim' | 'latin' | 'latin-name' | 'latin-prose' | 'full-width-latin' | 'kana' | 'kana-name' | 'katakana' | 'numeric' | 'tel' | 'email' | 'url'`},
                {name: 'autocomplete: string', summary: `Indicates if the input can be automatically completed by the browser, usually by remembering previous values the user has entered.`},
                {name: 'tabIndex: number', summary: `Tab index of the text element.`},
                {name: 'pattern: string', summary: `Regular expression that the control's value is checked against.`},
                {name: 'maxlength: number', summary: `Maxlength of characters allowed to be entered.`},
                {name: 'minlength: number', summary: `Specifies the minimum number of characters that the user can enter.`},
                {name: 'max: number', summary: `The maximum numeric value for the input.`},
                {name: 'min: number', summary: `The minimum numeric value for this input, which must not be greater than its maximum (max attribute) value.`},
                {name: 'step: number', summary: `Works with the min and max attributes to limit the increments at which a numeric or date-time value can be set.`},
                {name: 'size: number', summary: `The initial size of the control.`},
                {name: 'helperText: MdcHelperText', summary: `Reference to related MdcHelperText`},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'focus()', summary: `Sets focus to the input.`},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'change(value)', summary: `Emitted when an alteration to the element value is committed.`},
                {name: 'blur(value)', summary: `Emitted whenever the input loses focus.`},
                {name: 'input(value)', summary: `Emitted synchronously when the value has been altered.`},
                {name: 'focus(boolean)', summary: `Emitted when the input gains or loses focus.`},
              ]
            },
          ]
        },
        {
          header: 'MdcHelperText',
          selectors: [
            'mdc-helper-text',
            'mdcHelperText',
          ],
          exportedAs: 'mdcHelperText',
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
          header: 'MdcTextFieldIcon',
          selectors: [
            'mdc-icon[mdcTextFieldIcon]',
          ],
          exportedAs: 'mdcTextFieldIcon',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'leading: boolean', summary: `Styles the text field as a text field with a leading icon.`},
                {name: 'trailing: boolean	', summary: `Styles the text field as a text field with a trailing icon.`},
              ]
            },
          ]
        },
        {
          header: 'MdcTextarea',
          summary: `Same properties, methods and events as MdcTextField`,
          selectors: [
            'mdc-textarea',
          ],
          exportedAs: 'mdcTextarea',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'rows: number', summary: `Number of rows for this textarea.`},
                {name: 'cols: number', summary: `Number of columns for this textarea.`},
                {name: 'characterCounter: boolean', summary: `Character counter is used if there is a character limit. It displays the ratio of characters used and the total character limit.
                maxlength is required on MdcTextArea.`},
              ]
            },
          ]
        },
        {
          header: 'MDC_TEXT_FIELD_DEFAULT_OPTIONS',
          summary: `Injection token that can be used to configure the default options for all text fields within an app.`,
          summaryCode: `const MDC_TEXT_FIELD_DEFAULT_OPTIONS:
  InjectionToken<MdcTextFieldDefaultOptions>;`
        },
      ]
    };
  }
}

class Directions {
  dt: number;
}

@Component({templateUrl: './examples.html'})
export class Examples {
  demoForm = new FormGroup({
    username: new FormControl(
      {value: null, disabled: false},
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(11)
      ])
  });

  matcher = new MyErrorStateMatcher();

  waypoint = new Directions();

  updateForm: FormGroup;
  demoInputValue: string;
  prefilledText: string = 'Prefilled';

  inputEvent: string = '';
  changeEvent: string = '';
  focusEvent = false;

  constructor(iconRegistry: MdcIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbup', sanitizer.bypassSecurityTrustResourceUrl(environment.production ?
        'https://trimox.github.io/angular-mdc-web/assets/thumbup-icon.svg' : '/assets/thumbup-icon.svg'));
  }

  onInput(value: any): void {
    this.inputEvent = value;
  }

  onChange(value: any): void {
    this.changeEvent = value;
  }

  onFocus(focused: boolean): void {
    this.focusEvent = focused;
  }

  submit(f: NgForm | FormGroup) {
    if (f.invalid) {
      return;
    }
  }

  resetForm(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.demoForm.reset();
  }

  alternateColors(input: MdcTextField) {
    if (!input.textarea) {
      const demoTextField = 'demo-text-field-custom-colors';

      input.elementRef.nativeElement.classList.contains(demoTextField) ?
        input.elementRef.nativeElement.classList.remove(demoTextField)
        : input.elementRef.nativeElement.classList.add(demoTextField);
    } else if (input.textarea) {
      const demoTextarea = 'demo-textarea';

      input.elementRef.nativeElement.classList.contains(demoTextarea) ?
        input.elementRef.nativeElement.classList.remove(demoTextarea)
        : input.elementRef.nativeElement.classList.add(demoTextarea);
    } else {
      const demoFullwidth = 'demo-fullwidth-input';

      input.elementRef.nativeElement.classList.contains(demoFullwidth) ?
        input.elementRef.nativeElement.classList.remove(demoFullwidth)
        : input.elementRef.nativeElement.classList.add(demoFullwidth);
    }
  }

  //
  // Examples
  //

  exampleStandard = {
    html: `<mdc-text-field label="Standard"
  name="txt-field-standard"
  required
  [helperText]="standardHelper"></mdc-text-field>
<mdc-helper-text #standardHelper validation persistent>Helper Text</mdc-helper-text>`
  };

  exampleEvents = {
    html: `<mdc-text-field label="Standard"
  (input)="onInput($event)"
  (focus)="onFocus($event)"
  (change)="onChange($event)"></mdc-text-field>`,
    ts: `onInput(value: any): void {
  this.inputEvent = value;
}

onInput(value: any): void {
  // do something
}

onChange(value: any): void {
  // do something
}

onFocus(focused: boolean): void {
  // do something
}`
  };

  exampleReactive = {
    html: `<form [formGroup]="demoForm" (ngSubmit)="submit(demoForm)" #formDirective="ngForm">
  <mdc-form-field>
    <mdc-text-field formControlName="username" label="Username" outlined
      [errorStateMatcher]="matcher"></mdc-text-field>
    <mdc-helper-text validation>
      <span *ngIf="demoForm.controls['username'].hasError('required')">Username is required</span>
      <span *ngIf="demoForm.controls['username'].hasError('minlength')">Username is not long enough</span>
      <span *ngIf="demoForm.controls['username'].hasError('maxlength')">Username is max length is 11</span>
    </mdc-helper-text>
  </mdc-form-field>
  <div class="demo-layout__row">
    <button mdc-button type="submit">Submit</button>
    <button mdc-button type="button" (click)="resetForm(formDirective)">Reset</button>
    <button mdc-button type="button" (click)="demoForm.controls['username'].setValue('User-1')">Set Value</button>
  </div>
</form>

<p>Control Valid: {{demoForm.controls['username'].valid}}</p>
<p>Dirty: {{ demoForm.dirty }}</p>
<p>Valid: {{ demoForm.valid }}</p>
<p>Pristine: {{ demoForm.pristine }}</p>
<p>Touched: {{ demoForm.touched }}</p>
<p>Value: {{ demoForm.value | json }}</p>`,
    ts: `/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

matcher = new MyErrorStateMatcher();

demoForm = new FormGroup({
  username: new FormControl(
    { value: null, disabled: false },
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(11)
    ])
});

submit(f: NgForm | FormGroup) {
  if (f.invalid) {
    return;
  }
}

resetForm(formDirective: FormGroupDirective) {
  formDirective.resetForm();
  this.demoForm.reset();
}`
  };

  exampleNumericNgModel = {
    html: `<form #demoWeightForm="ngForm" id="demoWeightForm" (ngSubmit)="submit(demoWeightForm)">
  <mdc-form-field>
    <mdc-text-field type="number" name="demoweight" label="Weight" ngModel #demoWeightModel="ngModel"
      required></mdc-text-field>
    <mdc-helper-text validation>
      <span *ngIf="!demoweight?.value">Weight is required</span>
    </mdc-helper-text>
  </mdc-form-field>
</form>

<button mdc-button type="submit" form="demoWeightForm">Submit</button>
<button mdc-button (click)="demoWeightForm.reset()">Reset</button>

<p>Dirty: {{ demoWeightModel.dirty }}</p>
<p>Valid: {{ demoWeightForm.valid }}</p>
<p>Pristine: {{ demoWeightForm.pristine }}</p>
<p>Touched: {{ demoWeightModel.touched }}</p>
<p>Value: {{ demoWeightModel.value }}</p>`
  };

  exampleUsingValue = {
    html: `<mdc-form-field>
  <mdc-text-field #demoValue label="Enter value" [value]="demoInputValue" required></mdc-text-field>
  <mdc-helper-text validation>
    <span *ngIf="!demoValue?.value">Field is required</span>
  </mdc-helper-text>
</mdc-form-field>

<button mdc-button (click)="demoValue.value = null">Reset value</button>

<p>Value: {{demoValue.value}}</p>`,
    ts: `demoInputValue: string;`
  };

  exampleDensity = {
    html: `<mdc-text-field class="demo-density-text-field" label="Density"></mdc-text-field>
<mdc-text-field class="demo-density-outlined-text-field" outlined label="Density"></mdc-text-field>
<mdc-text-field class="demo-density-outlined-text-field-with-leading-icon" outlined label="Event date">
  <mdc-icon mdcTextFieldIcon leading>event</mdc-icon>
</mdc-text-field>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_text-field.scss`
  };

  exampleIcons = {
    html: `<mdc-text-field autocomplete="tel" type="tel" label="Phone number">
  <mdc-icon mdcTextFieldIcon leading>phone</mdc-icon>
  <mdc-icon mdcTextFieldIcon trailing>event</mdc-icon>
</mdc-text-field>
<mdc-text-field type="date" outlined label="Event date">
  <mdc-icon mdcTextFieldIcon leading>event</mdc-icon>
</mdc-text-field>
<mdc-text-field type="date" outlined label="Event date">
  <button mdc-icon-button mdcTextFieldIcon trailing icon="event"></button>
</mdc-text-field>
<mdc-text-field disabled label="Disabled">
  <mdc-icon mdcTextFieldIcon leading>event</mdc-icon>
</mdc-text-field>`
  };

  examplePrefixSuffix = {
    html: `<mdc-text-field label="Currency Value" type="number" prefix="$" suffix=".00"></mdc-text-field>
<mdc-text-field outlined label="Currency Value" type="number" prefix="$" suffix=".00"></mdc-text-field>
<mdc-text-field outlined type="number" prefix="$" suffix=".00" endAligned></mdc-text-field>

<div dir="rtl">
  <mdc-text-field outlined label="Label" type="number"
    suffix="/100" ltrText></mdc-text-field>
</div>`
  };

  exampleSvgIcon = {
    html: `<mdc-text-field outlined label="Svg icon">
  <mdc-icon mdcTextFieldIcon leading svgIcon="thumbup" class="temporary-workaround-for-text-field-svg"></mdc-icon>
</mdc-text-field>`,
    ts: `import { DomSanitizer } from '@angular/platform-browser';
import { MdcIconRegistry } from '@angular-mdc/web';

constructor(iconRegistry: MdcIconRegistry, sanitizer: DomSanitizer) {
  iconRegistry.addSvgIcon(
    'thumbup', sanitizer.bypassSecurityTrustResourceUrl('/assets/thumbup-icon.svg'));
}`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_text-field.scss`
  };

  exampleShape = {
    html: `<mdc-text-field label="Standard" required class="demo-text-field-custom-colors"></mdc-text-field>

<mdc-text-field label="Standard" class="demo-shaped-text-field"></mdc-text-field>

<mdc-text-field label="Standard" outlined class="demo-shaped-text-field--outline"></mdc-text-field>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_text-field.scss`
  };

  exampleNumeric = {
    html: `<mdc-text-field type="number" label="Distance" [(ngModel)]="waypoint.dt"></mdc-text-field>

<p>Model: {{waypoint | json}}</p>`,
    ts: `class Directions {
  dt: number;
}

waypoint = new Directions();`
  };

  examplePrefilled = {
    html: `<mdc-text-field [(ngModel)]="prefilledText" label="Username"></mdc-text-field>`,
    ts: `prefilledText: string = 'Prefilled';`
  };

  exampleDateTime = {
    html: `<mdc-text-field type="date" label="Birthday"></mdc-text-field>

<mdc-text-field type="time" label="Time"></mdc-text-field>

<mdc-text-field type="password" label="Password" required outlined></mdc-text-field>

<mdc-text-field type="color" label="Color"></mdc-text-field>`
  };

  exampleRtl = {
    html: `<mdc-form-field dir="rtl">
  <mdc-text-field outlined label="Standard">
    <mdc-icon mdcTextFieldIcon leading>phone</mdc-icon>
  </mdc-text-field>
</mdc-form-field>`
  };

  exampleFullWithSingleLine = {
    html: `<mdc-text-field label="Subject" fullwidth></mdc-text-field>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_text-field.scss`
  };

  exampleNoLabel = {
    html: `<mdc-form-field>
  <mdc-text-field></mdc-text-field>
  <mdc-helper-text persistent>Helper Text</mdc-helper-text>
</mdc-form-field>

<mdc-form-field>
  <mdc-text-field outlined></mdc-text-field>
  <mdc-helper-text persistent>Helper Text</mdc-helper-text>
</mdc-form-field>

<mdc-form-field>
  <mdc-text-field outlined class="demo-shaped-text-field--outline"></mdc-text-field>
  <mdc-helper-text persistent>Helper Text</mdc-helper-text>
</mdc-form-field>

<mdc-form-field>
  <mdc-text-field outlined required></mdc-text-field>
  <mdc-helper-text validation>Required with no label</mdc-helper-text>
</mdc-form-field>
`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_text-field.scss`
  };

  exampleCharacterCounter = {
    html: `<mdc-form-field>
  <mdc-text-field label="Standard" characterCounter maxlength="10">
  </mdc-text-field>
  <mdc-helper-text></mdc-helper-text>
</mdc-form-field>

<mdc-form-field>
  <mdc-text-field outlined characterCounter label="Standard" maxlength="10">
  </mdc-text-field>
  <mdc-helper-text persistent>Helper Text
  </mdc-helper-text>
</mdc-form-field>`
  };

  exampleTACounter = {
    html: `<mdc-textarea label="Comments" characterCounter maxlength="140"
  [helperText]="taCounterHelper" rows="8" cols="40"></mdc-textarea>
<mdc-helper-text #taCounterHelper validation>Helper Text</mdc-helper-text>`
  };

  exampleTextarea = {
    html: `<mdc-textarea label="Comments" rows="8" cols="40" required [helperText]="commentsHelper"></mdc-textarea>
<mdc-helper-text #commentsHelper validation>Helper Text</mdc-helper-text>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_text-field.scss`
  };

  exampleFullWidth = {
    html: `<mdc-textarea label="Type your message here" fullwidth required rows="8"
  [helperText]="fullWidthHelper"></mdc-textarea>
<mdc-helper-text #fullWidthHelper validation>Helper Text</mdc-helper-text>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_text-field.scss`
  };
}
