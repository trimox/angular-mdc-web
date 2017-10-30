import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcFormField,
  MdcFormFieldModule,
  MdcCheckboxModule,
  MdcRadioModule,
  MdcSwitchModule
} from '../../../src/lib/public_api';

describe('MdcFormField', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcFormFieldModule,
        MdcCheckboxModule,
        MdcRadioModule,
        MdcSwitchModule
      ],
      declarations: [
        SimpleTest,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcFormField;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcFormField));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-form-field by default', () => {
      expect(testDebugElement.nativeElement.classList)
        .toContain('mdc-form-field', 'Expected to have mdc-form-field');
    });

    it('#should contain mdc-form-field--align-end css class', () => {
      testComponent.isAlignEnd = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList).toContain('mdc-form-field--align-end');
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
    <mdc-form-field [alignEnd]="isAlignEnd">
      <mdc-checkbox></mdc-checkbox>
      <label>My label</label>
    </mdc-form-field>
    <mdc-form-field>
      <mdc-radio></mdc-radio>
      <label>My label</label>
    </mdc-form-field>
    <mdc-form-field>
      <mdc-switch></mdc-switch>
      <label>My label</label>
    </mdc-form-field>
  `,
})
class SimpleTest {
  isAlignEnd: boolean = false;
}
