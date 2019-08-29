import {Component, DebugElement, Type} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, flush, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {
  dispatchFakeEvent,
  dispatchTouchEvent,
  dispatchMouseEvent
} from '../testing/dispatch-events';

import {
  A,
  Platform,
  MdcTextField,
  MdcTextFieldModule,
  MdcIconModule,
  MDC_TEXT_FIELD_DEFAULT_OPTIONS
} from '@angular-mdc/web';

describe('MdcTextField', () => {
  let fixture: ComponentFixture<any>;
  let platform: {isBrowser: boolean};

  beforeEach(fakeAsync(() => {
    // Set the default Platform override that can be updated before component creation.
    platform = {isBrowser: true};

    TestBed.configureTestingModule({
      imports: [MdcTextFieldModule, MdcIconModule, FormsModule],
      declarations: [SimpleTextfield, TextFieldTestWithValue],
      providers: [{provide: Platform, useFactory: () => platform}]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let textFieldDebugElement: DebugElement;
    let textFieldNativeElement: HTMLElement;
    let testInstance: MdcTextField;
    let testComponent: SimpleTextfield;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTextfield);
      fixture.detectChanges();

      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextField));
      textFieldNativeElement = textFieldDebugElement.nativeElement;
      testInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-text-field by default', () => {
      expect(textFieldDebugElement.nativeElement.classList)
        .toContain('mdc-text-field', 'Expected to have mdc-text-field class');
    });

    it('#should apply class dense on property', fakeAsync(() => {
      testComponent.isDense = true;
      fixture.detectChanges();
      flush();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--dense')).toBe(true);
    }));

    it('#should apply class fullwidth on property', fakeAsync(() => {
      testComponent.isFullwidth = true;
      fixture.detectChanges();
      flush();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--fullwidth')).toBe(true);
    }));

    it('#should apply class outlined', fakeAsync(() => {
      testComponent.outlined = true;
      fixture.detectChanges();
      flush();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--outlined')).toBe(true);
    }));

    it('#should apply class outlined and not set it again', fakeAsync(() => {
      testComponent.outlined = true;
      fixture.detectChanges();
      flush();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--outlined')).toBe(true);

      testComponent.outlined = true;
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--outlined')).toBe(true);
    }));

    it('#should not be disabled', fakeAsync(() => {
      expect(testInstance.disabled).toBeFalsy();
    }));

    it('#should be disabled', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      flush();

      expect(testInstance.disabled).toBe(true);
    }));

    it('#should not be read only', fakeAsync(() => {
      expect(testInstance.readonly).toBeFalsy();
    }));

    it('#should be read only', fakeAsync(() => {
      testComponent.readonly = true;
      fixture.detectChanges();
      flush();

      expect(testInstance.readonly).toBe(true);
    }));

    it('#should set validity based on input element validity', fakeAsync(() => {
      testInstance.valid = true;
      testInstance.valid = true; // check to ensure it doesn't run change again
      fixture.detectChanges();
      flush();

      expect(testInstance.valid).toBe(true);
    }));

    it('#should call onBlur', () => {
      expect(testInstance.onBlur());
      fixture.detectChanges();
    });

    it('#should set required to true', fakeAsync(() => {
      testComponent.required = true;
      fixture.detectChanges();
      flush();

      expect(testInstance.required).toBe(true);
    }));

    it('#should set required to true and valid to true', fakeAsync(() => {
      testInstance.valid = true;
      fixture.detectChanges();
      testComponent.required = true;
      fixture.detectChanges();

      expect(testInstance.required).toBe(true);
    }));

    it('#should set useNativeValidation to true', fakeAsync(() => {
      testComponent.useNativeValidation = true;
      testInstance.useNativeValidation = true; // check to ensure it doesn't run change again
      fixture.detectChanges();
      flush();

      expect(testInstance.useNativeValidation).toBe(true);
      expect(testInstance.isBadInput()).toBe(false);
    }));

    it('#should set style shake to true', fakeAsync(() => {
      expect(testInstance._floatingLabel.shake(true));
      fixture.detectChanges();

      testComponent.validation = true;
      fixture.detectChanges();
      testComponent.persistent = true;
      fixture.detectChanges();
      expect(testInstance.helperText.persistent).toBe(true);
    }));

    it('#should focus on underlying input element when focus() is called', fakeAsync(() => {
      testComponent.outlined = true;
      fixture.detectChanges();
      expect(document.activeElement).not.toBe(testInstance._input.nativeElement);
      testInstance.focus();
      fixture.detectChanges();
      flush();

      expect(document.activeElement).toBe(testInstance._input.nativeElement);
    }));

    it('change type', fakeAsync(() => {
      testComponent.myType = '';
      fixture.detectChanges();
      flush();

      expect(testInstance.type).toBe('text');
    }));

    it('handles blur event', fakeAsync(() => {
      textFieldNativeElement.blur();
      fixture.detectChanges();
    }));

    it('handles focus event', fakeAsync(() => {
      textFieldNativeElement.focus();
      fixture.detectChanges();
    }));

    it('handles click event', fakeAsync(() => {
      textFieldNativeElement.click();
      fixture.detectChanges();
    }));

    it('handles animationend event', fakeAsync(() => {
      dispatchFakeEvent(testInstance._floatingLabel.elementRef.nativeElement, 'animationend');
    }));

    it('handles transitionend event', fakeAsync(() => {
      testComponent.outlined = false;
      fixture.detectChanges();

      dispatchFakeEvent(testInstance._lineRipple.elementRef.nativeElement, 'transitionend');
    }));

    it('expect trailing icon to be defined', fakeAsync(() => {
      expect(testInstance.trailingIcon).toBeDefined();
    }));

    it('#should show to screen reader', () => {
      expect(testInstance.helperText.elementRef.nativeElement.attributes.getNamedItem('aria-hidden')).toBeDefined();
      testInstance.helperText.showToScreenReader();
      fixture.detectChanges();
      expect(testInstance.helperText.elementRef.nativeElement.attributes.getNamedItem('aria-hidden')).toBeNull();
    });

    it('#should set validity from helper text', () => {
      testInstance.helperText.setValidity(true);
      fixture.detectChanges();
      expect(testInstance.helperText.elementRef.nativeElement.attributes.getNamedItem('role')).toBeDefined();
    });
  });

  describe('basic behaviors', () => {
    let textFieldDebugElement: DebugElement;
    let textFieldNativeElement: HTMLElement;
    let testInstance: MdcTextField;
    let testComponent: TextFieldTestWithValue;

    beforeEach(() => {
      fixture = TestBed.createComponent(TextFieldTestWithValue);
      fixture.detectChanges();

      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextField));
      textFieldNativeElement = textFieldDebugElement.nativeElement;
      testInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should set value to foo', fakeAsync(() => {
      testInstance.value = 'foo';
      fixture.detectChanges();
      flush();

      expect(testInstance.value).toBe('foo');
    }));

    it('#should set helperText to null', fakeAsync(() => {
      testInstance.helperText = null;
      fixture.detectChanges();
      flush();

      expect(testInstance.helperText).toBeNull();
    }));

    it('#should check for browser', fakeAsync(() => {
      platform.isBrowser = false;
      expect(testInstance.focused).toBe(false);
    }));

    it('#should call OnInput', fakeAsync(() => {
      spyOn(testComponent, 'onInput');

      textFieldDebugElement.nativeElement.value = 'text';
      dispatchFakeEvent(textFieldNativeElement, 'input');
      fixture.detectChanges();
      expect(testComponent.onInput).toHaveBeenCalledTimes(1);
    }));

    it('#should handle touch event', fakeAsync(() => {
      expect(testInstance.focused).toBe(false);
      testInstance._input.nativeElement.focus();
      fixture.detectChanges();

      dispatchTouchEvent(textFieldNativeElement, 'touchstart');
      fixture.detectChanges();
      tick(300);

      dispatchTouchEvent(textFieldNativeElement, 'touchstart');
      dispatchMouseEvent(testInstance._input.nativeElement, 'mousedown');
      dispatchMouseEvent(testInstance._input.nativeElement, 'mousedown');
      fixture.detectChanges();
      tick(300);

      expect(testInstance.focused).toBe(true);

      document.body.focus();
      fixture.detectChanges();
    }));
  });
});

describe('MDC_TEXT_FIELD_DEFAULT_OPTIONS', () => {
  let fixture: ComponentFixture<any>;
  let defaultOptions: {outlined?: boolean};

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdcTextFieldModule, MdcIconModule, FormsModule],
      declarations: [SimpleTextfield, TextFieldTestWithValue],
      providers: [
        {provide: MDC_TEXT_FIELD_DEFAULT_OPTIONS, useFactory: () => defaultOptions}
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let textFieldDebugElement: DebugElement;
    let textFieldNativeElement: HTMLElement;
    let testInstance: MdcTextField;
    let testComponent: SimpleTextfield;

    beforeEach(() => {
      defaultOptions = {outlined: true};

      fixture = TestBed.createComponent(SimpleTextfield);
      fixture.detectChanges();

      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextField));
      textFieldNativeElement = textFieldDebugElement.nativeElement;
      testInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-text-field by default', () => {
      expect(textFieldDebugElement.nativeElement.classList)
        .toContain('mdc-text-field', 'Expected to have mdc-text-field class');
    });
  });

  describe('basic behaviors', () => {
    let textFieldDebugElement: DebugElement;
    let textFieldNativeElement: HTMLElement;
    let testInstance: MdcTextField;
    let testComponent: SimpleTextfield;

    beforeEach(() => {
      defaultOptions = undefined;

      fixture = TestBed.createComponent(SimpleTextfield);
      fixture.detectChanges();

      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextField));
      textFieldNativeElement = textFieldDebugElement.nativeElement;
      testInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-text-field by default', () => {
      expect(textFieldDebugElement.nativeElement.classList)
        .toContain('mdc-text-field', 'Expected to have mdc-text-field class');
    });
  });
});

describe('MDC_TEXT_FIELD_DEFAULT_OPTIONS', () => {
  it('should be no default options provided', fakeAsync(() => {
    const fixture = createComponent(SimpleTextfield);
    fixture.detectChanges();
    flush();
    expect(fixture.componentInstance.outlined).toBe(undefined);
  }));

  // it('should be default of outlined, if specified in default options',
  //   fakeAsync(() => {
  //     const fixture = createComponent(SimpleTextfield, [{
  //       provide: MDC_TEXT_FIELD_DEFAULT_OPTIONS, useValue: { outlined: true }
  //     }
  //     ]);
  //     fixture.detectChanges();
  //     flush();
  //     expect(fixture.componentInstance.outlined).toBe(true);
  //   }));
});

function createComponent<T>(component: Type<T>,
  providers: any[] = [],
  imports: any[] = [],
  declarations: any[] = []): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [
      FormsModule,
      MdcTextFieldModule,
      MdcIconModule,
      ...imports
    ],
    declarations: [component, ...declarations],
    providers,
  }).compileComponents();

  return TestBed.createComponent<T>(component);
}

@Component({
  template: `
  <mdc-form-field>
    <mdc-text-field
      [(ngModel)]="myModel"
      label="Username"
      [type]="myType"
      [tabIndex]="1"
      [dense]="isDense"
      [characterCounter]="characterCounter"
      [outlined]="outlined"
      [value]="value"
      [fullwidth]="isFullwidth"
      [required]="required"
      [readonly]="readonly"
      [disabled]="disabled"
      [useNativeValidation]="useNativeValidation"
      (input)="onInput($event)"
      (change)="onChange($event)"
      (blur)="onBlur($event)">
      <mdc-icon mdcTextFieldIcon leading>person</mdc-icon>
      <mdc-icon mdcTextFieldIcon trailing>person</mdc-icon>
    </mdc-text-field>
    <mdc-helper-text [validation]="validation" [persistent]="persistent">Username is required</mdc-helper-text>
  </mdc-form-field>
  `,
})
class SimpleTextfield {
  myModel: string = 'Test';
  myType: string = 'text';
  disabled: boolean;
  isDense: boolean;
  isFullwidth: boolean;
  outlined: boolean;
  required: boolean;
  readonly: boolean;
  useNativeValidation: boolean = false;
  validation: boolean;
  persistent: boolean = true;
  characterCounter: boolean = true;

  onInput(value: any) {}
  onChange(value: any) {}
  onBlur(event: any) {}
}

@Component({
  template: `
    <mdc-text-field
      label="Username"
      [helperText]="helper"
      (input)="onInput($event)"
      (change)="onChange($event)"
      [value]="value">
    </mdc-text-field>
    <mdc-helper-text #helper validation></mdc-helper-text>
  `,
})
class TextFieldTestWithValue {
  value: string = 'my-test';

  onInput: (value: any) => void = () => {};
  onChange(value: any) {}
}
