import {Component, DebugElement} from '@angular/core';
import {fakeAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {
  MdcTypographyModule,
  MdcTypography,
} from '@angular-mdc/web';

describe('MdcTypography', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdcTypographyModule],
      declarations: [SimpleTest]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcTypography));
    });

    it('#should have mdc-typography by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-typography');
    });
  });
});

@Component({
  template: `
  <div mdcTypography>
    <div mdcOverline>Overline Text</div>
    <h1 mdcButton>Button Text</h1>
    <h1 mdcBody1>Body 1</h1>
    <h1 mdcBody2>Body 2</h1>
    <h1 mdcSubtitle1>Subtitle 1</h1>
    <h1 mdcSubtitle2>Subtitle 2</h1>
    <h1 mdcCaption>Caption</h1>
    <h1 mdcHeadline6>Headline 6</h1>
    <h1 mdcHeadline5>Headline 5</h1>
    <h1 mdcHeadline4>Headline 4</h1>
    <h1 mdcHeadline3>Headline 3</h1>
    <h1 mdcHeadline2>Headline 2</h1>
    <h1 mdcHeadline1>Headline 1</h1>
  </div>
  `,
})
class SimpleTest {}
