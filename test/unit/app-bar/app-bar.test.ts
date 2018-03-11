import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcAppBarModule,
  MdcAppBar,
} from '@angular-mdc/web';

describe('MdcAppBar', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcAppBarModule],
      declarations: [SimpleTest]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcAppBar;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcAppBar));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-top-app-bar by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-top-app-bar');
    });

    it('#should apply mdc-top-app-bar--short class based on property', () => {
      testComponent.short = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short')).toBe(true);
    });

    it('#should remove mdc-top-app-bar--short class based on property', () => {
      testComponent.short = false;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short')).toBe(false);
    });

    it('#should apply mdc-top-app-bar--short-collapsed class based on property', () => {
      testComponent.collapsed = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short-collapsed')).toBe(true);
    });
  });
});

@Component({
  template: `
    <mdc-app-bar
      [fixedAdjustElement]="testcontent"
      [short]="short"
      [collapsed]="collapsed">
      <mdc-app-bar-row>
        <mdc-app-bar-section align="start">
          <mdc-icon mdcAppBarNavIcon>menu</mdc-icon>
          <mdc-app-bar-title>Title</mdc-app-bar-title>
        </mdc-app-bar-section>
        <mdc-app-bar-section align="end">
          <mdc-icon mdcAppBarActionItem>file_download</mdc-icon>
        </mdc-app-bar-section>
      </mdc-app-bar-row>
    </mdc-app-bar>
    <div #testcontent></div>
  `,
})
class SimpleTest {
  short: boolean = true;
  collapsed: boolean = false;
}
