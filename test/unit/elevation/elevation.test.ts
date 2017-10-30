import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcElevationModule,
  MdcElevation,
} from '../../../src/lib/public_api';

describe('MdcElevation', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcElevationModule,
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
    let testInstance: MdcElevation;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcElevation));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-elevation--z2 by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-elevation--z2');
    });

    it('#should throw an error', () => {
      expect(() => {
        testComponent.elevation = 99; fixture.detectChanges();
      }).toThrowError('Valid mdc-elevation values are 0 through 24');
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
  <div [mdc-elevation]="elevation"></div>
  `,
})
class SimpleTest {
  elevation: number = 2;
}
