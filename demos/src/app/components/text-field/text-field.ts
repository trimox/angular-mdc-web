import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

import {MdcTextField} from '@angular-mdc/web/textfield';
import {MdcIconRegistry} from '@angular-mdc/web/icon';
import {ErrorStateMatcher} from '@angular-mdc/web/form-field';
import {environment} from '../../../environments/environment';
import {ComponentViewer} from '../../shared/component-viewer';

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
      code: `import {MdcTextFieldModule} from '@angular-mdc/web';`,
      sass: `@use '@material/textfield/mdc-text-field';
@use '@material/textfield';
@use '@material/form-field/mdc-form-field';`
    };
  }
}

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {}

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
    html: `<mdc-text-field type="date" label="Birthday" outlined></mdc-text-field>

<mdc-text-field type="time" label="Time" outlined></mdc-text-field>

<mdc-text-field type="password" label="Password" required outlined></mdc-text-field>

<mdc-text-field type="color" label="Color" outlined></mdc-text-field>`
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
  <mdc-text-field>
  </mdc-text-field>
  <mdc-helper-text persistent>Helper Text
  </mdc-helper-text>
</mdc-form-field>

<mdc-form-field>
  <mdc-text-field outlined></mdc-text-field>
  <mdc-helper-text persistent>Helper Text
  </mdc-helper-text>
</mdc-form-field>

<mdc-form-field>
  <mdc-text-field outlined class="demo-shaped-text-field--outline">
  </mdc-text-field>
  <mdc-helper-text persistent>Helper Text
  </mdc-helper-text>
</mdc-form-field>`,
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
