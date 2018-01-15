import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcLinearProgress, MdcLinearProgressModule } from '@angular-mdc/web';

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
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--secondary')).toBe(true);
    });

    it('#should apply indeterminate class based on property', () => {
      testComponent.isIndeterminate = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--indeterminate')).toBe(true);
      expect(testInstance.indeterminate).toBe(false);
    });

    it('#should apply closed class based on property', () => {
      testComponent.isClosed = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--closed')).toBe(true);
      expect(testInstance.closed).toBe(true);
    });

    it('#should set buffer to value', () => {
      testInstance.setBuffer(50);
      fixture.detectChanges();
    });

    it('#should set progress to value', () => {
      testInstance.setProgress(20);
      fixture.detectChanges();
    });

    it('#should not apply indeterminate class', () => {
      testInstance.setDeterminate(true);
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--indeterminate')).toBe(false);
      expect(testInstance.indeterminate).toBe(false);
    });

    it('#should not apply reverse class', () => {
      testInstance.setReverse(true);
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--reversed')).toBe(true);
      expect(testInstance.reversed).toBe(true);
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

@Component({
  template: `
    <mdc-linear-progress
      [reversed]="isReversed"
      [secondary]="isSecondary"
      [closed]="isClosed"
      [progress]="0.5"
      [buffer]="0.75"
      [indeterminate]="isIndeterminate">
    </mdc-linear-progress>
  `,
})
class SimpleTest {
  isReversed: boolean = false;
  isSecondary: boolean = false;
  isIndeterminate: boolean = false;
  isClosed: boolean = false;
}
