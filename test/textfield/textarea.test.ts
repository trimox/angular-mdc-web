import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  MdcTextarea,
  MdcTextFieldModule
} from '@angular-mdc/web';

describe('MdcTextarea', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdcTextFieldModule, FormsModule, ReactiveFormsModule],
      declarations: [SimpleTextfield]
    });
    TestBed.compileComponents();
  });

  describe('basic behaviors', () => {
    let textFieldDebugElement: DebugElement;
    let textFieldInstance: MdcTextarea;
    let testComponent: SimpleTextfield;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTextfield);
      fixture.detectChanges();

      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextarea));
      textFieldInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-text-field--textarea by default', () => {
      expect(textFieldDebugElement.nativeElement.classList)
        .toContain('mdc-text-field--textarea', 'Expected to have mdc-text-field--textarea class');
    });

    it('#should equal textarea', () => {
      expect(textFieldInstance.textarea).toBe(true);
    });

    it('#should set character counter true', () => {
      testComponent.characterCounter = true;
      fixture.detectChanges();
      expect(testComponent.characterCounter).toBe(true);

      testComponent.comments = 'my comments';
      fixture.detectChanges();
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
  <mdc-textarea
    [(ngModel)]="comments"
    label="Comments"
    [rows]="3"
    [cols]="5"
    maxlength="140"
    [characterCounter]="characterCounter"
    [required]="isRequired"
    [disabled]="isDisabled">
  </mdc-textarea>`,
})
class SimpleTextfield {
  comments: string = '';
  isDisabled: boolean = false;
  isRequired: boolean = false;
  characterCounter: boolean = true;
}
