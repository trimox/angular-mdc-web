import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  MdcTextfieldBox,
  MdcTextfieldInput,
  MdcTextfieldModule
} from '../../../src/lib/public_api';

describe('MdcTextfieldBoxComponent', () => {
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
    let textFieldInstance: MdcTextfieldBox;
    let testComponent: SimpleTextfield;
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTextfield);
      fixture.detectChanges();

      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextfieldBox));
      textFieldNativeElement = textFieldDebugElement.nativeElement;
      textFieldInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
      inputElement = textFieldInstance.inputText.elementRef.nativeElement;
    });

    it('#should have mdc-textfield--box by default', () => {
      expect(textFieldDebugElement.nativeElement.classList)
        .toContain('mdc-textfield--box', 'Expected to have mdc-textfield--box class');
    });

    it('#should preserve the user-provided id', () => {
      fixture.detectChanges();
      expect(inputElement.id).toBe('simple-check');
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
    <mdc-textfield-box
      [id]="boxId"
      [(ngModel)]="username"
      label="Username"
      [required]="isRequired"
      [disabled]="isDisabled">
      <mdc-icon leading>person</mdc-icon>
      <mdc-icon trailing>person</mdc-icon>
    </mdc-textfield-box>
    <p mdc-textfield-helptext
      [validation]="true"
      [persistent]="true">Username is required</p>
  `,
})
class SimpleTextfield {
  boxId: string = 'simple-check';
  username: string = '';
  isDisabled: boolean = false;
  isRequired: boolean = false;
}
