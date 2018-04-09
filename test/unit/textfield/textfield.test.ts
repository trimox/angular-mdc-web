import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
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
      imports: [MdcTextFieldModule, MdcIconModule, FormsModule, ReactiveFormsModule],
      declarations: [
        SimpleTextfield,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let textFieldDebugElement: DebugElement;
    let textFieldNativeElement: HTMLElement;
    let textFieldInstance: MdcTextField;
    let testComponent: SimpleTextfield;
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTextfield);
      fixture.detectChanges();

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

    it('#should apply class outline', () => {
      testComponent.isOutline = true;
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--outlined')).toBe(true);
    });

    it('#should apply class box', () => {
      testComponent.box = true;
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--box')).toBe(true);
    });

    it('#should not be disabled', () => {
      fixture.detectChanges();
      expect(textFieldInstance.isDisabled()).toBe(false);
    });

    it('#should not be empty', () => {
      fixture.detectChanges();
      expect(textFieldInstance.empty).toBe(false);
    });

    it('#should remove invalid styling', () => {
      textFieldInstance.setValid(false);
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--invalid')).toBe(true);
    });

    it('#should set validity based on input element validity', () => {
      textFieldInstance.setValid(true);
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--invalid')).toBe(false);
      expect(textFieldInstance.valid).toBe(true);
    });

    it('#should select all content', () => {
      expect(textFieldInstance.selectAll());
    });

    it('#should activate lineRipple', () => {
      expect(textFieldInstance.lineRipple.activate());
    });

    it('#should deactivate lineRipple', () => {
      expect(textFieldInstance.lineRipple.deactivate());
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
      expect(textFieldInstance.floatingLabel.shake(true));
      fixture.detectChanges();
    });

    it('#should have value of Test', () => {
      testComponent.username = 'Test';
      fixture.detectChanges();
      expect(textFieldInstance.getValue()).toBe('Test');
    });

    it('#should focus on underlying input element when focus() is called', () => {
      expect(document.activeElement).not.toBe(inputElement);
      textFieldInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(textFieldInstance.inputText.nativeElement);
    });

    it('#should throw an error', () => {
      expect(() => {
        testComponent.myType = 'button'; fixture.detectChanges();
      }).toThrowError('Input type "button" is not supported.');
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
      value='Test'
      label="Username"
      [type]="myType"
      [tabIndex]="1"
      [dense]="isDense"
      [outline]="isOutline"
      [fullwidth]="isFullwidth"
      [box]="box"
      [required]="required"
      [focused]="isFocused"
      [disabled]="isDisabled"
      [helperText]="userHelper"
      (blur)="onBlur($event)">
      <mdc-icon leading>person</mdc-icon>
      <mdc-icon trailing>person</mdc-icon>
    </mdc-text-field>
    <mdc-text-field-helper-text
      #userHelper="mdcHelperText"
      [validation]="true"
      [persistent]="false">Username is required</mdc-text-field-helper-text>
  `,
})
class SimpleTextfield {
  username: string = 'Test';
  myType: string = 'text';
  isDisabled: boolean = false;
  isDense: boolean = false;
  isFocused: boolean = false;
  isFullwidth: boolean = false;
  isOutline: boolean = false;
  required: boolean = false;
  box: boolean = false;

  onBlur(event: any) { }
}
