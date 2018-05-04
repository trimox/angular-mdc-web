import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcTypographyModule,
  MdcTypography,
} from '@angular-mdc/web';

describe('MdcTypography', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcTypographyModule],
      declarations: [SimpleTest]
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

@Component({
  template: `
  <div mdc-typography>
  <h1 mdc-typography-headline6></h1>
  <h1 mdc-typography-headline5></h1>
  <h1 mdc-typography-headline4></h1>
  <h1 mdc-typography-headline3></h1>
  <h1 mdc-typography-headline2></h1>
  <h1 mdc-typography-headline1></h1>
  <h1 mdc-typography-subtitle2></h1>
  <h1 mdc-typography-subtitle1></h1>
  <h1 mdc-typography-body2></h1>
  <h1 mdc-typography-body1></h1>
  <h1 mdc-typography-caption></h1>
  <h1 mdc-typography-button></h1>
  <div mdcOverline></div>
  </div>
  `,
})
class SimpleTest { }
