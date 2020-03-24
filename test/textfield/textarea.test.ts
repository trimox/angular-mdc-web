import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {
  MdcTextarea,
  MdcTextFieldModule
} from '@angular-mdc/web/textfield';

describe('MdcTextarea', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdcTextFieldModule, FormsModule, ReactiveFormsModule],
      declarations: [SimpleTextArea, SimpleTextAreaNoCounter]
    });
    TestBed.compileComponents();
  });

  describe('basic behaviors', () => {
    let textFieldDebugElement: DebugElement;
    let textFieldInstance: MdcTextarea;
    let testComponent: SimpleTextArea;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTextArea);
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

    it('#should set character counter false', () => {
      testComponent.characterCounter = false;
      fixture.detectChanges();
      expect(testComponent.characterCounter).toBe(false);

      testComponent.comments = 'my comments';
      fixture.detectChanges();
    });
  });

  describe('basic behaviors', () => {
    let textFieldDebugElement: DebugElement;
    let textFieldInstance: MdcTextarea;
    let testComponent: SimpleTextAreaNoCounter;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTextAreaNoCounter);
      fixture.detectChanges();

      textFieldDebugElement = fixture.debugElement.query(By.directive(MdcTextarea));
      textFieldInstance = textFieldDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });
  });
});

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
class SimpleTextArea {
  comments: string = '';
  isDisabled: boolean = false;
  isRequired: boolean = false;
  characterCounter: boolean = true;
}

@Component({
  template: `
  <mdc-textarea
    label="Comments"
    [rows]="3"
    [cols]="5">
  </mdc-textarea>`,
})
class SimpleTextAreaNoCounter {}
