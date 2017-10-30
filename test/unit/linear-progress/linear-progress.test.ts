import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcLinearProgress, MdcLinearProgressModule } from '../../../src/lib/public_api';

describe('MdcLinearProgress', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcLinearProgressModule],
      declarations: [
        SimpleTest,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcLinearProgress;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcLinearProgress));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-linear-progress by default', () => {
      expect(testDebugElement.nativeElement.classList)
        .toContain('mdc-linear-progress', 'Expected to have mdc-linear-progress');
    });

    it('#should apply class based on property', () => {
      testComponent.isReversed = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--reversed')).toBe(true);
      expect(testInstance.reversed).toBe(true);
    });

    it('#should apply secondary class based on property', () => {
      testComponent.isSecondary = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--accent')).toBe(true);
    });

    it('#should apply indeterminate class based on property', () => {
      testComponent.isIndeterminate = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--indeterminate')).toBe(true);
      expect(testInstance.indeterminate).toBe(false);
    });

    it('#should set buffer to value', () => {
      testInstance.setBuffer(50);
      fixture.detectChanges();
    });

    it('#should set progress to value', () => {
      testInstance.setProgress(20);
      fixture.detectChanges();
    });

    it('#should be closed', () => {
      testInstance.close();
      fixture.detectChanges();
    });

    it('#should be open', () => {
      testInstance.open();
      fixture.detectChanges();
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
    <mdc-linear-progress
      [reversed]="isReversed"
      [secondary]="isSecondary"
      [indeterminate]="isIndeterminate">
    </mdc-linear-progress>
  `,
})
class SimpleTest {
  isReversed: boolean = false;
  isSecondary: boolean = false;
  isIndeterminate: boolean = false;
}
