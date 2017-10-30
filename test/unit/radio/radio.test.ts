import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MdcRadio, MdcRadioModule } from '../../../src/lib/public_api';

describe('MdcRadio', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcRadioModule, FormsModule, ReactiveFormsModule],
      declarations: [
        SingleRadio,
        radioWithAriaLabelledby,
        RadioWithAriaLabel,
        RadioWithTabIndex,
        RadioWithFormDirectives,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let radioDebugElement: DebugElement;
    let radioNativeElement: HTMLElement;
    let radioInstance: MdcRadio;
    let testComponent: SingleRadio;
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SingleRadio);
      fixture.detectChanges();

      radioDebugElement = fixture.debugElement.query(By.directive(MdcRadio));
      radioNativeElement = radioDebugElement.nativeElement;
      radioInstance = radioDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
      inputElement = radioInstance.inputEl.nativeElement;
    });

    it('#should change native element checked when check programmatically', () => {
      expect(inputElement.checked).toBe(false);

      radioInstance.checked = true;
      fixture.detectChanges();

      expect(inputElement.checked).toBe(true);
    });

    it('#should toggle checked state on click', () => {
      expect(radioInstance.checked).toBe(false);

      inputElement.click();
      fixture.detectChanges();

      expect(radioInstance.checked).toBe(true);
    });

    it('#should add and remove disabled state', () => {
      expect(radioInstance.disabled).toBe(false);
      expect(radioNativeElement.classList).not.toContain('mdc-radio--disabled');
      expect(inputElement.tabIndex).toBe(0);
      expect(inputElement.disabled).toBe(false);

      testComponent.isDisabled = true;
      fixture.detectChanges();

      expect(radioInstance.disabled).toBe(true);
      expect(radioNativeElement.classList).toContain('mdc-radio--disabled');
      expect(inputElement.disabled).toBe(true);

      testComponent.isDisabled = false;
      fixture.detectChanges();

      expect(radioInstance.disabled).toBe(false);
      expect(radioNativeElement.classList).not.toContain('mdc-radio--disabled');
      expect(inputElement.tabIndex).toBe(0);
      expect(inputElement.disabled).toBe(false);
    });

    it('#should not toggle `checked` state upon interation while disabled', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();

      inputElement.click();
      expect(radioInstance.checked).toBe(false);
    });

    it('#should disable ripple', () => {
      testComponent.isRippleDisabled = true;
      fixture.detectChanges();
      expect(radioInstance.disableRipple).toBeTruthy('Expected radio ripple to be disabled');
    });

    it('#should preserve the user-provided id', () => {
      expect(radioNativeElement.id).toBe('simple-radio');
      expect(inputElement.id).toBe('simple-radio-input');
    });

    it('#should generate a unique id for the radio input if no id is set', () => {
      testComponent.radioId = null;
      fixture.detectChanges();

      expect(radioInstance.inputId).toMatch(/mdc-radio-\d+/);
      expect(inputElement.id).toBe(radioInstance.inputId);
    });

    it('#should focus on underlying input element when focus() is called', () => {
      expect(document.activeElement).not.toBe(inputElement);

      radioInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(inputElement);
    });

    it('#should forward the value to input element', () => {
      testComponent.radioValue = 'basic_radio';
      fixture.detectChanges();

      expect(inputElement.value).toBe('basic_radio');
    });

    describe('with provided aria-label', () => {
      let radioDebugElement: DebugElement;
      let radioNativeElement: HTMLElement;
      let inputElement: HTMLInputElement;

      it('should use the provided aria-label', () => {
        fixture = TestBed.createComponent(RadioWithAriaLabel);
        radioDebugElement = fixture.debugElement.query(By.directive(MdcRadio));
        radioNativeElement = radioDebugElement.nativeElement;
        inputElement = <HTMLInputElement>radioNativeElement.querySelector('input');

        fixture.detectChanges();
        expect(inputElement.getAttribute('aria-label')).toBe('Super effective');
      });
    });

    describe('with provided aria-labelledby', () => {
      let radioDebugElement: DebugElement;
      let radioNativeElement: HTMLElement;
      let inputElement: HTMLInputElement;

      it('#should use the provided aria-labelledby', () => {
        fixture = TestBed.createComponent(radioWithAriaLabelledby);
        radioDebugElement = fixture.debugElement.query(By.directive(MdcRadio));
        radioNativeElement = radioDebugElement.nativeElement;
        inputElement = <HTMLInputElement>radioNativeElement.querySelector('input');

        fixture.detectChanges();
        expect(inputElement.getAttribute('aria-labelledby')).toBe('some-id');
      });

      it('#should not assign aria-labelledby if none is provided', () => {
        fixture = TestBed.createComponent(SingleRadio);
        radioDebugElement = fixture.debugElement.query(By.directive(MdcRadio));
        radioNativeElement = radioDebugElement.nativeElement;
        inputElement = <HTMLInputElement>radioNativeElement.querySelector('input');

        fixture.detectChanges();
        expect(inputElement.getAttribute('aria-labelledby')).toBe(null);
      });
    });

    describe('with provided tabIndex', () => {
      let radioDebugElement: DebugElement;
      let radioNativeElement: HTMLElement;
      let testComponent: RadioWithTabIndex;
      let inputElement: HTMLInputElement;
      let labelElement: HTMLLabelElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(RadioWithTabIndex);
        fixture.detectChanges();

        testComponent = fixture.debugElement.componentInstance;
        radioDebugElement = fixture.debugElement.query(By.directive(MdcRadio));
        radioNativeElement = radioDebugElement.nativeElement;
        inputElement = <HTMLInputElement>radioNativeElement.querySelector('input');
        labelElement = <HTMLLabelElement>radioNativeElement.querySelector('label');
      });

      it('#should preserve any given tabIndex', () => {
        expect(inputElement.tabIndex).toBe(7);
      });

      it('#should preserve given tabIndex when the radio is disabled then enabled', () => {
        testComponent.isDisabled = true;
        fixture.detectChanges();

        testComponent.customTabIndex = 13;
        fixture.detectChanges();

        testComponent.isDisabled = false;
        fixture.detectChanges();

        expect(inputElement.tabIndex).toBe(13);
      });
    });

    describe('with ngModel', () => {
      let radioDebugElement: DebugElement;
      let radioNativeElement: HTMLElement;
      let radioInstance: MdcRadio;
      let inputElement: HTMLInputElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(RadioWithFormDirectives);
        fixture.detectChanges();

        radioDebugElement = fixture.debugElement.query(By.directive(MdcRadio));
        radioNativeElement = radioDebugElement.nativeElement;
        radioInstance = radioDebugElement.componentInstance;
        inputElement = <HTMLInputElement>radioNativeElement.querySelector('input');
      });

      it('#should be in pristine, untouched, and valid states initially', fakeAsync(() => {
        flushMicrotasks();

        let radioElement = fixture.debugElement.query(By.directive(MdcRadio));
        let ngModel = radioElement.injector.get<NgModel>(NgModel);

        expect(ngModel.valid).toBe(true);
        expect(ngModel.pristine).toBe(true);
        expect(ngModel.touched).toBe(false);

        // TODO(trimox): test that `touched` and `pristine` state are modified appropriately.
        // This is currently blocked on issues with async() and fakeAsync().
      }));

      it('#should toggle checked state on click', () => {
        expect(radioInstance.checked).toBe(false);

        inputElement.click();
        fixture.detectChanges();

        expect(radioInstance.checked).toBe(true);
      });
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
    <mdc-radio
      [id]="radioId"
      [value]="radioValue"
      [disableRipple]="isRippleDisabled"
      [disabled]="isDisabled">
    </mdc-radio>
  `,
})
class SingleRadio {
  radioId: string | null = 'simple-radio';
  isDisabled: boolean = false;
  isRippleDisabled: boolean = false;
  radioValue: string = 'single_radio';
}

/** Simple test component with an aria-label set. */
@Component({
  template: `<mdc-radio aria-labelledby="some-id"></mdc-radio>`
})
class radioWithAriaLabelledby { }

/** Simple test component with an aria-label set. */
@Component({
  template: `<mdc-radio aria-label="Super effective"></mdc-radio>`
})
class RadioWithAriaLabel { }

/** Simple test component with tabIndex */
@Component({
  template: `
    <mdc-radio
        [tabIndex]="customTabIndex"
        [disabled]="isDisabled">
    </mdc-radio>`,
})
class RadioWithTabIndex {
  customTabIndex: number = 7;
  isDisabled: boolean = false;
}

/** Simple component for testing with ngModel in a form. */
@Component({
  template: `
    <form>
      <mdc-radio name="cb" [(ngModel)]="isGood">Be good</mdc-radio>
    </form>
  `,
})
class RadioWithFormDirectives {
  isGood: boolean = false;
}
