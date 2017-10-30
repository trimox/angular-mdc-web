import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcTypographyModule,
  MdcTypography,
} from '../../../src/lib/public_api';

describe('MdcTypography', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcTypographyModule,
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
    let testInstance: MdcTypography;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcTypography));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-typography by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-typography');
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
  <div mdc-typography>
  <h1 mdc-typography-display4></h1>
  <h1 mdc-typography-display3></h1>
  <h1 mdc-typography-display2></h1>
  <h1 mdc-typography-display1></h1>
  <h1 mdc-typography-headline></h1>
  <h1 mdc-typography-title></h1>
  <h1 mdc-typography-subheading2></h1>
  <h1 mdc-typography-subheading1></h1>
  <h1 mdc-typography-body2></h1>
  <h1 mdc-typography-body1></h1>
  <h1 mdc-typography-caption></h1>
  <h1 mdc-typography-button></h1>
  <p mdc-typography-adjust-margin></p>
  </div>
  `,
})
class SimpleTest { }
