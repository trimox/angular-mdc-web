import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  MdcTextareaComponent,
  MdcTextfieldModule
} from '../../../src/lib/public_api';

describe('MdcTextareaComponent', () => {
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
    let textFieldInstance: MdcTextareaComponent;
    let testComponent: SimpleTextfield;
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTextfield);
      fixture.detectChanges();

      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextareaComponent));
      textFieldNativeElement = textFieldDebugElement.nativeElement;
      textFieldInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should apply class multiline on property', () => {
      testComponent.isMultiline = true;
      fixture.detectChanges();
      expect(textFieldDebugElement.nativeElement.classList.contains('mdc-textfield--multiline')).toBe(true);
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
    <mdc-textarea
      [(ngModel)]="comments"
      label="Comments"
      [required]="isRequired"
      [multiline]="isMultiline"
      [disabled]="isDisabled">
    </mdc-textarea>
    <p mdc-textfield-helptext
      [validation]="true"
      [persistent]="false">Comments are required</p>
  `,
})
class SimpleTextfield {
  username: string = '';
  isDisabled: boolean = false;
  isRequired: boolean = false;
  isMultiline: boolean = false;
}
