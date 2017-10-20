import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  MdcTextfield,
  MdcTextfieldModule
} from '../../../src/lib/public_api';

describe('MdcTextfieldComponent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcTextfieldModule, FormsModule, ReactiveFormsModule],
      declarations: [
        SimpleTextfield,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let textFieldDebugElement: DebugElement;
    let textFieldNativeElement: HTMLElement;
    let textFieldInstance: MdcTextfield;
    let testComponent: SimpleTextfield;
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTextfield);
      fixture.detectChanges();

      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextfield));
      textFieldNativeElement = textFieldDebugElement.nativeElement;
      textFieldInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-textfield by default', () => {
      expect(textFieldDebugElement.nativeElement.classList)
        .toContain('mdc-textfield', 'Expected to have mdc-textfield class');
    });

    it('#should apply class dense on property', () => {
      testComponent.isDense = true;
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-textfield--dense')).toBe(true);
    });

    it('#should apply class fullwidth on property', () => {
      testComponent.isFullwidth = true;
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-textfield--fullwidth')).toBe(true);
    });

    it('#should not be disabled', () => {
      fixture.detectChanges();
      expect(textFieldInstance.isDisabled()).toBe(false);
    });

    it('#should remove invalid styling', () => {
      fixture.detectChanges();
      textFieldInstance.setValid(false);
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-textfield--invalid')).toBe(false);
    });

    it('#should set validity based on input element validity', () => {
      textFieldInstance.setValid();
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-textfield--invalid')).toBe(false);
    });

    it('#should focus on underlying input element when focus() is called', () => {
      expect(document.activeElement).not.toBe(inputElement);
      textFieldInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(textFieldInstance.inputText.elementRef.nativeElement);
    });

    it('#should throw an error', () => {
      expect(() => {
        testComponent.myType = 'button'; fixture.detectChanges();
      }).toThrowError('Input type "button" is not supported.');
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
    <mdc-textfield
      [(ngModel)]="username"
      label="Username"
      [type]="myType"
      [tabIndex]="1"
      [dense]="isDense"
      [fullwidth]="isFullwidth"
      [required]="isRequired"
      [disabled]="isDisabled">
    </mdc-textfield>
    <p mdc-textfield-helptext
      [validation]="true"
      [persistent]="false">Username is required</p>
  `,
})
class SimpleTextfield {
  username: string = 'Test';
  myType: string = 'text';
  isDisabled: boolean = false;
  isDense: boolean = false;
  isFullwidth: boolean = false;
  isRequired: boolean = false;
}
