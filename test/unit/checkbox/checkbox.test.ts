import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MdcCheckbox, MdcCheckboxModule } from '../../../src/lib/public_api';

describe('MdcCheckbox', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcCheckboxModule, FormsModule, ReactiveFormsModule],
      declarations: [
        SingleCheckbox,
        CheckboxWithAriaLabelledby,
        CheckboxWithAriaLabel,
        CheckboxWithTabIndex,
        CheckboxWithFormDirectives,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let checkboxInstance: MdcCheckbox;
    let testComponent: SingleCheckbox;
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SingleCheckbox);
      fixture.detectChanges();

      checkboxDebugElement = fixture.debugElement.query(By.directive(MdcCheckbox));
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      checkboxInstance = checkboxDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
      inputElement = checkboxInstance.inputEl.nativeElement;
    });

    it('#should change native element checked when check programmatically', () => {
      expect(inputElement.checked).toBe(false);

      checkboxInstance.checked = true;
      fixture.detectChanges();

      expect(inputElement.checked).toBe(true);
    });

    it('#should toggle checked state on click', () => {
      expect(checkboxInstance.checked).toBe(false);

      inputElement.click();
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(true);

      inputElement.click();
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(false);
    });

    it('#should add and remove disabled state', () => {
      expect(checkboxInstance.disabled).toBe(false);
      expect(checkboxNativeElement.classList).not.toContain('mdc-checkbox--disabled');
      expect(inputElement.tabIndex).toBe(0);
      expect(inputElement.disabled).toBe(false);

      testComponent.isDisabled = true;
      fixture.detectChanges();

      expect(checkboxInstance.disabled).toBe(true);
      expect(checkboxNativeElement.classList).toContain('mdc-checkbox--disabled');
      expect(inputElement.disabled).toBe(true);

      testComponent.isDisabled = false;
      fixture.detectChanges();

      expect(checkboxInstance.disabled).toBe(false);
      expect(checkboxNativeElement.classList).not.toContain('mdc-checkbox--disabled');
      expect(inputElement.tabIndex).toBe(0);
      expect(inputElement.disabled).toBe(false);
    });

    it('#should not toggle `checked` state upon interation while disabled', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();

      inputElement.click();
      expect(checkboxInstance.checked).toBe(false);
    });

    it('#should disable ripple', () => {
      testComponent.isRippleDisabled = true;
      fixture.detectChanges();
      expect(checkboxInstance.disableRipple).toBeTruthy('Expected checkbox ripple to be disabled');
    });

    it('#should preserve the user-provided id', () => {
      expect(checkboxNativeElement.id).toBe('simple-check');
      expect(inputElement.id).toBe('simple-check-input');
    });

    it('#should generate a unique id for the checkbox input if no id is set', () => {
      testComponent.checkboxId = null;
      fixture.detectChanges();

      expect(checkboxInstance.inputId).toMatch(/mdc-checkbox-\d+/);
      expect(inputElement.id).toBe(checkboxInstance.inputId);
    });

    it('#should focus on underlying input element when focus() is called', () => {
      expect(document.activeElement).not.toBe(inputElement);

      checkboxInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(inputElement);
    });

    it('#should forward the value to input element', () => {
      testComponent.checkboxValue = 'basic_checkbox';
      fixture.detectChanges();

      expect(inputElement.value).toBe('basic_checkbox');
    });

    describe('with provided aria-label', () => {
      let checkboxDebugElement: DebugElement;
      let checkboxNativeElement: HTMLElement;
      let inputElement: HTMLInputElement;

      it('should use the provided aria-label', () => {
        fixture = TestBed.createComponent(CheckboxWithAriaLabel);
        checkboxDebugElement = fixture.debugElement.query(By.directive(MdcCheckbox));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
        inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');

        fixture.detectChanges();
        expect(inputElement.getAttribute('aria-label')).toBe('Super effective');
      });
    });

    describe('with provided aria-labelledby', () => {
      let checkboxDebugElement: DebugElement;
      let checkboxNativeElement: HTMLElement;
      let inputElement: HTMLInputElement;

      it('#should use the provided aria-labelledby', () => {
        fixture = TestBed.createComponent(CheckboxWithAriaLabelledby);
        checkboxDebugElement = fixture.debugElement.query(By.directive(MdcCheckbox));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
        inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');

        fixture.detectChanges();
        expect(inputElement.getAttribute('aria-labelledby')).toBe('some-id');
      });

      it('#should not assign aria-labelledby if none is provided', () => {
        fixture = TestBed.createComponent(SingleCheckbox);
        checkboxDebugElement = fixture.debugElement.query(By.directive(MdcCheckbox));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
        inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');

        fixture.detectChanges();
        expect(inputElement.getAttribute('aria-labelledby')).toBe(null);
      });
    });

    describe('with provided tabIndex', () => {
      let checkboxDebugElement: DebugElement;
      let checkboxNativeElement: HTMLElement;
      let testComponent: CheckboxWithTabIndex;
      let inputElement: HTMLInputElement;
      let labelElement: HTMLLabelElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxWithTabIndex);
        fixture.detectChanges();

        testComponent = fixture.debugElement.componentInstance;
        checkboxDebugElement = fixture.debugElement.query(By.directive(MdcCheckbox));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
        inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
        labelElement = <HTMLLabelElement>checkboxNativeElement.querySelector('label');
      });

      it('#should preserve any given tabIndex', () => {
        expect(inputElement.tabIndex).toBe(7);
      });

      it('#should preserve given tabIndex when the checkbox is disabled then enabled', () => {
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
      let checkboxDebugElement: DebugElement;
      let checkboxNativeElement: HTMLElement;
      let checkboxInstance: MdcCheckbox;
      let inputElement: HTMLInputElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxWithFormDirectives);
        fixture.detectChanges();

        checkboxDebugElement = fixture.debugElement.query(By.directive(MdcCheckbox));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
        checkboxInstance = checkboxDebugElement.componentInstance;
        inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
      });

      it('#should be in pristine, untouched, and valid states initially', fakeAsync(() => {
        flushMicrotasks();

        let checkboxElement = fixture.debugElement.query(By.directive(MdcCheckbox));
        let ngModel = checkboxElement.injector.get<NgModel>(NgModel);

        expect(ngModel.valid).toBe(true);
        expect(ngModel.pristine).toBe(true);
        expect(ngModel.touched).toBe(false);

        // TODO(trimox): test that `touched` and `pristine` state are modified appropriately.
        // This is currently blocked on issues with async() and fakeAsync().
      }));

      it('#should toggle checked state on click', () => {
        expect(checkboxInstance.checked).toBe(false);

        inputElement.click();
        fixture.detectChanges();

        expect(checkboxInstance.checked).toBe(true);

        inputElement.click();
        fixture.detectChanges();

        expect(checkboxInstance.checked).toBe(false);
      });
    });
  });
});

/** Simple component for testing MdcCheckbox. */
@Component({
  template: `
    <mdc-checkbox
      [id]="checkboxId"
      [value]="checkboxValue"
      [(indeterminate)]="isIndeterminate"
      [disableRipple]="isRippleDisabled"
      [disabled]="isDisabled">
    </mdc-checkbox>
  `,
})
class SingleCheckbox {
  checkboxId: string | null = 'simple-check';
  isDisabled: boolean = false;
  isRippleDisabled: boolean = false;
  checkboxValue: string = 'single_checkbox';
}

/** Simple test component with an aria-label set. */
@Component({
  template: `<mdc-checkbox aria-labelledby="some-id"></mdc-checkbox>`
})
class CheckboxWithAriaLabelledby { }

/** Simple test component with an aria-label set. */
@Component({
  template: `<mdc-checkbox aria-label="Super effective"></mdc-checkbox>`
})
class CheckboxWithAriaLabel { }

/** Simple test component with tabIndex */
@Component({
  template: `
    <mdc-checkbox
        [tabIndex]="customTabIndex"
        [disabled]="isDisabled">
    </mdc-checkbox>`,
})
class CheckboxWithTabIndex {
  customTabIndex: number = 7;
  isDisabled: boolean = false;
}

/** Simple component for testing an MdcCheckbox with ngModel in a form. */
@Component({
  template: `
    <form>
      <mdc-checkbox name="cb" [(ngModel)]="isGood">Be good</mdc-checkbox>
    </form>
  `,
})
class CheckboxWithFormDirectives {
  isGood: boolean = false;
}
