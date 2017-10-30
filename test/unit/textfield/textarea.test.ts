import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  MdcTextarea,
  MdcTextfieldModule
} from '../../../src/lib/public_api';

describe('MdcTextarea', () => {
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
    let textFieldInstance: MdcTextarea;
    let testComponent: SimpleTextfield;
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTextfield);
      fixture.detectChanges();

      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextarea));
      textFieldNativeElement = textFieldDebugElement.nativeElement;
      textFieldInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-textfield--textarea by default', () => {
      expect(textFieldDebugElement.nativeElement.classList)
        .toContain('mdc-textfield--textarea', 'Expected to have mdc-textfield--textarea class');
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
}
