import {Component, DebugElement} from '@angular/core';
import {fakeAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {MdcLinearProgress, MdcLinearProgressModule} from '@angular-mdc/web';

describe('MdcLinearProgress', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
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

    it('#should apply reversed class based on property', () => {
      testComponent.reversed = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--reversed')).toBe(true);
      expect(testInstance.reversed).toBe(true);
    });

    it('#should apply indeterminate class based on property', () => {
      testComponent.determinate = false;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--indeterminate')).toBe(true);
      expect(testInstance.determinate).toBe(false);
    });

    it('#should apply closed class', () => {
      testInstance.close();
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--closed')).toBe(true);
    });

    it('#should be open', () => {
      testInstance.open();
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--closed')).toBe(false);
    });

    it('#should set buffer to value', () => {
      testComponent.buffer = 50;
      fixture.detectChanges();
      expect(testInstance.buffer).toBe(50);
    });

    it('#should set progress to value', () => {
      testComponent.progress = 20;
      fixture.detectChanges();
      expect(testInstance.progress).toBe(20);
    });

    it('#should not apply indeterminate class', () => {
      testComponent.determinate = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--indeterminate')).toBe(false);
    });

    it('#should apply reverse class', () => {
      testComponent.reversed = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--reversed')).toBe(true);
      expect(testInstance.reversed).toBe(true);
    });

    it('#should have aria-label', () => {
      testComponent.label = 'example';
      fixture.detectChanges();
      expect(testNativeElement.hasAttribute('aria-label')).toBe(true);
    });
  });
});

@Component({
  template: `
    <mdc-linear-progress
      [reversed]="reversed"
      [label]="label"
      [progress]="progress"
      [buffer]="buffer"
      [determinate]="determinate">
    </mdc-linear-progress>
  `,
})
class SimpleTest {
  reversed: boolean;
  determinate: boolean;
  buffer = 0.75;
  progress = 0.5;
  label: string;
}
