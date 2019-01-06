import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { MdcTextField, ErrorStateMatcher, MdcIconRegistry } from '@angular-mdc/web';
import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({ template: '<component-viewer></component-viewer>' })
export class TextFieldDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Text Field',
      `Text fields let users enter and edit text.`,
      "import { MdcTextFieldModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Text Fields',
      url: 'https://material.io/design/components/text-fields.html'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/README.md'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

class Directions {
  dt: number;
}

@Component({ templateUrl: './examples.html' })
export class Examples {
  demoForm = new FormGroup({
    username: new FormControl(
      { value: null, disabled: false },
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

  constructor(iconRegistry: MdcIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbup', sanitizer.bypassSecurityTrustResourceUrl('https://trimox.github.io/angular-mdc-web/assets/thumbup-icon.svg'));
  }

  submit(f: NgForm | FormGroup) {
    console.log(f);
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
    html: `<mdc-text-field label="Standard" required [helperText]="standardHelper"></mdc-text-field>
<mdc-helper-text #standardHelper validation persistent>Helper Text</mdc-helper-text>`
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
    sass: `.temporary-workaround-for-text-field-svg {
  top: .90em
}

.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon {
  fill: rgba(0, 0, 0, .54);
}`
  };

  exampleThemeShaped = {
    html: `<mdc-text-field label="Standard" required class="demo-text-field-custom-colors"></mdc-text-field>

<mdc-text-field label="Standard" class="demo-shaped-text-field"></mdc-text-field>

<mdc-text-field label="Standard" outlined class="demo-shaped-text-field--outline"></mdc-text-field>`,
    sass: `.demo-text-field-custom-colors:not(.mdc-text-field--invalid) {
  $idle-border: rgba(blue, .38);
  $hover-border: rgba(blue, .6);
  $focused-border: rgba(blue, 1);

  @include mdc-text-field-bottom-line-color($idle-border);
  @include mdc-text-field-hover-bottom-line-color($hover-border);
  @include mdc-text-field-line-ripple-color($focused-border);
  @include mdc-text-field-ink-color(black);
  @include mdc-text-field-label-color(rgba(blue, .5));
  @include mdc-text-field-outline-color($idle-border);
  @include mdc-text-field-hover-outline-color($hover-border);
  @include mdc-text-field-focused-outline-color($focused-border);
  @include mdc-text-field-helper-text-color($idle-border);
  @include mdc-text-field-textarea-stroke-color($idle-border);
  @include mdc-text-field-icon-color($hover-border);

  &.mdc-text-field--focused {
    @include mdc-text-field-label-color(rgba(blue, .87));
    @include mdc-text-field-icon-color($focused-border);
  }
}

.demo-shaped-text-field {
  @include mdc-text-field-shape-radius(50%);
}

.demo-shaped-text-field--outline {
  @include mdc-text-field-outline-shape-radius(50%);
}`
  };

  exampleClickableIcon = {
    html: `<mdc-text-field type="date" outlined label="Event date" required>
  <mdc-icon mdcTextFieldIcon leading clickable>event</mdc-icon>
</mdc-text-field>

<mdc-text-field type="date" outlined label="Event date">
  <mdc-icon mdcTextFieldIcon trailing clickable>event</mdc-icon>
</mdc-text-field>`
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
    html: `<mdc-text-field [(ngModel)]="prefilledText" label="Username"></mdc-text-field>

<p>ngModel: {{prefilledText}}`,
    ts: `prefilledText: string = 'Prefilled';`
  };

  exampleDateTime = {
    html: `<mdc-text-field type="date" label="Birthday" outlined></mdc-text-field>

<mdc-text-field type="time" label="Time" outlined></mdc-text-field>

<mdc-text-field type="password" label="Password" required outlined></mdc-text-field>

<mdc-text-field type="color" label="Color" outlined></mdc-text-field>`
  };

  exampleFullWithSingleLine = {
    html: `<mdc-text-field label="Subject" fullwidth></mdc-text-field>`,
    sass: `.demo-fullwidth-input:not(.mdc-text-field--invalid) {
  @include mdc-text-field-fullwidth-bottom-line-color(rgba(blue, .38));
  @include mdc-text-field-ink-color(black);
  @include mdc-text-field-label-color(rgba(blue, .5));
  @include mdc-text-field-line-ripple-color(blue);

  &.mdc-text-field--focused {
    @include mdc-text-field-label-color(rgba(blue, .87));
  }
}

.demo-fullwidth-input.mdc-text-field--invalid {
  @include mdc-text-field-fullwidth-bottom-line-color(rgba(orange, .38));
  @include mdc-text-field-ink-color(orange);
  @include mdc-text-field-label-color(rgba(orange, .5));
  @include mdc-text-field-line-ripple-color(orange);

  &.mdc-text-field--focused {
    @include mdc-text-field-label-color(rgba(orange, .87));
    @include mdc-text-field-fullwidth-bottom-line-color(orange);
  }
}`
  };

  exampleTextarea = {
    html: `<mdc-textarea label="Comments" rows="8" cols="40" required [helperText]="commentsHelper"></mdc-textarea>
<mdc-helper-text #commentsHelper validation>Helper Text</mdc-helper-text>`,
    sass: `.demo-textarea:not(.mdc-text-field--invalid) {
  $idle-border: rgba(blue, .38);
  $hover-border: rgba(blue, .6);
  $focused-border: rgba(blue, 1);

  @include mdc-text-field-ink-color(black);
  @include mdc-text-field-label-color(rgba(blue, .5));
  @include mdc-text-field-textarea-stroke-color($idle-border);

  &.mdc-text-field--focused {
    @include mdc-text-field-label-color(rgba(blue, .87));
    @include mdc-text-field-textarea-stroke-color($focused-border);
  }
}

.demo-textarea.mdc-text-field--invalid {
  @include mdc-text-field-ink-color(orange);
  @include mdc-text-field-label-color(rgba(orange, .5));
  @include mdc-text-field-textarea-stroke-color(rgba(orange, .38));

  &.mdc-text-field--focused {
    @include mdc-text-field-label-color(rgba(orange, .87));
    @include mdc-text-field-textarea-stroke-color(orange);
  }
}`
  };

  exampleFullWidth = {
    html: `<mdc-textarea label="Type your message here" fullwidth required rows="8"
  [helperText]="fullWidthHelper"></mdc-textarea>
<mdc-helper-text #fullWidthHelper validation>Helper Text</mdc-helper-text>`,
    sass: `.demo-fullwidth-input:not(.mdc-text-field--invalid) {
  @include mdc-text-field-fullwidth-bottom-line-color(rgba(blue, .38));
  @include mdc-text-field-ink-color(black);
  @include mdc-text-field-label-color(rgba(blue, .5));
  @include mdc-text-field-line-ripple-color(blue);

  &.mdc-text-field--focused {
    @include mdc-text-field-label-color(rgba(blue, .87));
  }
}

.demo-fullwidth-input.mdc-text-field--invalid {
  @include mdc-text-field-fullwidth-bottom-line-color(rgba(orange, .38));
  @include mdc-text-field-ink-color(orange);
  @include mdc-text-field-label-color(rgba(orange, .5));
  @include mdc-text-field-line-ripple-color(orange);

  &.mdc-text-field--focused {
    @include mdc-text-field-label-color(rgba(orange, .87));
    @include mdc-text-field-fullwidth-bottom-line-color(orange);
  }
}`
  };
}
