import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  MdcTextField,
  MdcTextFieldModule,
} from '@angular-mdc/web';

describe('MdcTextField', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcTextFieldModule, FormsModule, ReactiveFormsModule],
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

    it('#should not be disabled', () => {
      fixture.detectChanges();
      expect(textFieldInstance.isDisabled()).toBe(false);
    });

    it('#should not be empty', () => {
      fixture.detectChanges();
      expect(textFieldInstance.empty).toBe(true);
    });

    it('#should remove invalid styling', () => {
      fixture.detectChanges();
      textFieldInstance.setValid(false);
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--invalid')).toBe(false);
    });

    it('#should set validity based on input element validity', () => {
      textFieldInstance.setValid();
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-text-field--invalid')).toBe(false);
    });

    it('#should select all content', () => {
      expect(textFieldInstance.selectAll());
    });

    it('#should activate bottomline', () => {
      expect(textFieldInstance.bottomLine.activate());
    });

    it('#should deactivate bottomline', () => {
      expect(textFieldInstance.bottomLine.deactivate());
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
  });
});

/** Simple component for testing. */
@Component({
  template: `
    <mdc-text-field
      [(ngModel)]="username"
      label="Username"
      [type]="myType"
      [tabIndex]="1"
      [dense]="isDense"
      [fullwidth]="isFullwidth"
      [required]="isRequired"
      [focused]="isFocused"
      [disabled]="isDisabled"
      (blur)="onBlur($event)">
    </mdc-text-field>
    <p mdc-text-field-helper-text
      [validation]="true"
      [persistent]="false">Username is required</p>
  `,
})
class SimpleTextfield {
  username: string = 'Test';
  myType: string = 'text';
  isDisabled: boolean = false;
  isDense: boolean = false;
  isFocused: boolean = false;
  isFullwidth: boolean = false;
  isRequired: boolean = false;

  onBlur(event: any) {
  }
}
