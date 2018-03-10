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

    it('#should apply mdc-top-app-bar--short-collapsed class based on property', () => {
      testComponent.collapsed = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short-collapsed')).toBe(true);
    });

    it('#should turn off collapsed', () => {
      testComponent.collapsed = true;
      fixture.detectChanges();
      testComponent.short = false;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short-collapsed')).toBe(false);
    });
  });
});

@Component({
  template: `
    <mdc-app-bar
      [short]="short"
      [collapsed]="collapsed">
      <mdc-app-bar-row>
        <mdc-app-bar-section align="start">
          <a href="#" mdcAppBarNavIcon material-icon>menu</a>
          <mdc-app-bar-title>Title</mdc-app-bar-title>
        </mdc-app-bar-section>
        <mdc-app-bar-section align="end">
          <a href="#/toolbar-demo" mdcAppBarActionItem material-icon>file_download</a>
        </mdc-app-bar-section>
      </mdc-app-bar-row>
    </mdc-app-bar>
  `,
})
class SimpleTest {
  short: boolean = true;
  collapsed: boolean = false;
}
