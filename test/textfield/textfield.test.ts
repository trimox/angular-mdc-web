import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  MdcTextField,
  MdcTextFieldModule,
  MdcIconModule
} from '@angular-mdc/web';

describe('MdcTextField', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcTextFieldModule, MdcIconModule, FormsModule],
      declarations: [SimpleTextfield]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let textFieldDebugElement: DebugElement;
    let textFieldNativeElement: HTMLElement;
    let textFieldInstance: MdcTextField;
    let testComponent: SimpleTextfield;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTextfield);
      fixture.detectChanges();
      fixture.whenStable();
      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextField));
      textFieldNativeElement = textFieldDebugElement.nativeElement;
      textFieldInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should be created', () => {
      expect(textFieldInstance).toBeTruthy();
    });

    it('#should have mdc-text-field by default', () => {
      expect(textFieldDebugElement.nativeElement.classList)
        .toContain('mdc-text-field', 'Expected to have mdc-text-field class');
    });

    it('#should apply class dense on property', () => {
      testComponent.isDense = true;
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--dense')).toBe(true);
    });

    it('#should apply class fullwidth on property', () => {
      testComponent.isFullwidth = true;
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--fullwidth')).toBe(true);
    });

    it('#should apply class outlined', () => {
      testComponent.outlined = true;
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--outlined')).toBe(true);
    });

    it('#should not be disabled', () => {
      expect(textFieldInstance.isDisabled()).toBe(false);
    });

    it('#should be disabled', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(textFieldInstance.isDisabled()).toBe(true);
    });

    it('#should have value of testing', fakeAsync(() => {
      testComponent.myModel = 'testing';
      fixture.detectChanges();
      tick();

      expect(textFieldInstance.getValue()).toBe('testing');
      tick();
    }));

    it('#should not be empty', fakeAsync(() => {
      textFieldInstance.setValue('newvalue');
      fixture.detectChanges();
      tick();

      expect(textFieldInstance.getValue()).toBe('newvalue');
      expect(textFieldInstance.empty).toBe(false);
    }));

    it('#should set validity based on input element validity', () => {
      textFieldInstance.setValid(true);
      fixture.detectChanges();
      expect(textFieldInstance.valid).toBe(true);
    });

    it('#should select all content', () => {
      expect(textFieldInstance.selectAll());
    });

    it('#should activate lineRipple', () => {
      expect(textFieldInstance._lineRipple.activate());
    });

    it('#should deactivate lineRipple', () => {
      expect(textFieldInstance._lineRipple.deactivate());
    });

    it('#should set helper content', () => {
      expect(textFieldInstance.helperText.setContent('test'));
    });

    it('#should show to screen reader', () => {
      expect(textFieldInstance.helperText.showToScreenReader());
    });

    it('#should turn on validation errors', () => {
      expect(textFieldInstance.helperText.setValidity(true));
    });

    it('#should activate focus', () => {
      expect(textFieldInstance.activateFocus());
    });

    it('#should deactivate focus', () => {
      expect(textFieldInstance.deactivateFocus());
    });

    it('#should set validation to true', () => {
      textFieldInstance.helperText.setValidation(true);
      fixture.detectChanges();
      expect(textFieldInstance.helperText.validation).toBe(true);
      expect(textFieldInstance.isBadInput()).toBe(false);
    });

    it('#should set persistent to true', () => {
      textFieldInstance.helperText.setPersistent(true);
      fixture.detectChanges();
      expect(textFieldInstance.helperText.persistent).toBe(true);
    });

    it('#should set required to true', () => {
      testComponent.required = true;
      fixture.detectChanges();
      expect(textFieldInstance.required).toBe(true);
      expect(textFieldInstance.isRequired()).toBe(true);
    });

    it('#should set style shake to true', () => {
      expect(textFieldInstance._floatingLabel.shake(true));
      fixture.detectChanges();
    });

    it('#should focus on underlying input element when focus() is called', () => {
      expect(document.activeElement).not.toBe(textFieldInstance._input.nativeElement);
      textFieldInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(textFieldInstance._input.nativeElement);
    });

    it('change type', () => {
      testComponent.myType = '';
      fixture.detectChanges();
      expect(textFieldInstance.type).toBe('text');
    });

    it('handles blur event', () => {
      textFieldNativeElement.blur();
      fixture.detectChanges();
    });

    it('handles focus event', () => {
      textFieldNativeElement.focus();
      fixture.detectChanges();
    });

    it('handles click event', () => {
      textFieldNativeElement.click();
      fixture.detectChanges();
    });

    it('expect leading icon to be defined', () => {
      expect(textFieldInstance.getLeadingIcon()).toBeDefined();
    });

    it('expect trailing icon to be defined', () => {
      expect(textFieldInstance.getTrailingIcon()).toBeDefined();
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
    <mdc-text-field
      [(ngModel)]="myModel"
      label="Username"
      [type]="myType"
      [tabIndex]="1"
      [dense]="isDense"
      [outlined]="outlined"
      [fullwidth]="isFullwidth"
      [required]="required"
      [focused]="isFocused"
      [disabled]="disabled"
      [helperText]="userHelper"
      (blur)="onBlur($event)">
      <mdc-icon leading>person</mdc-icon>
      <mdc-icon trailing>person</mdc-icon>
    </mdc-text-field>
    <p mdcTextFieldHelperText
      #userHelper="mdcHelperText"
      [validation]="true"
      [persistent]="false">Username is required
    </p>
  `,
})
class SimpleTextfield {
  myModel: string = 'Test';
  myType: string = 'text';
  disabled: boolean = false;
  isDense: boolean = false;
  isFocused: boolean = false;
  isFullwidth: boolean = false;
  outlined: boolean = false;
  required: boolean = false;

  onBlur(event: any) { }
}
