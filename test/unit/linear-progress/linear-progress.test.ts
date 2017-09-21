import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcLinearProgressComponent, MdcLinearProgressModule } from '../../../src/lib/public_api';

describe('MdcLinearProgressComponent', () => {
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
    let testInstance: MdcLinearProgressComponent;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcLinearProgressComponent));
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
    });

    it('#should apply class based on property', () => {
      testComponent.isIndeterminate = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-linear-progress--indeterminate')).toBe(true);
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
    <mdc-linear-progress
      [reversed]="isReversed"
      [indeterminate]="isIndeterminate">
    </mdc-linear-progress>
  `,
})
class SimpleTest {
  isReversed: boolean = false;
  isIndeterminate: boolean = false;
}
