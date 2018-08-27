import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcTopAppBarModule,
  MdcTopAppBar
} from '@angular-mdc/web';

describe('MdcTopAppBar', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcTopAppBarModule],
      declarations: [SimpleTest]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcTopAppBar;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcTopAppBar));
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

    it('#should add mdc-top-app-bar--short after setting shortCollapsed', () => {
      testComponent.short = false;
      fixture.detectChanges();

      testComponent.shortCollapsed = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short')).toBe(true);
    });

    it('#should apply mdc-top-app-bar--prominent class based on property', () => {
      testComponent.short = true;
      fixture.detectChanges();
      testComponent.prominent = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--prominent')).toBe(true);
    });

    it('#should apply mdc-top-app-bar--dense class based on property', () => {
      testComponent.short = true;
      fixture.detectChanges();
      testComponent.dense = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--dense')).toBe(true);
    });

    it('#should apply mdc-top-app-bar--fixed class based on property', () => {
      testComponent.short = true;
      fixture.detectChanges();
      testComponent.fixed = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--fixed')).toBe(true);
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short')).toBe(false);
      expect(testInstance.isCollapsed()).toBe(false);
    });
  });
});

@Component({
  template: `
    <mdc-top-app-bar
      [fixed]="fixed"
      [fixedAdjustElement]="testcontent"
      [short]="short"
      [dense]="dense"
      [prominent]="prominent"
      [shortCollapsed]="shortCollapsed">
      <mdc-top-app-bar-row>
        <mdc-top-app-bar-section align="start">
          <mdc-icon mdcTopAppBarNavigationIcon>menu</mdc-icon>
          <mdc-top-app-bar-title>Title</mdc-top-app-bar-title>
        </mdc-top-app-bar-section>
        <mdc-top-app-bar-section align="end">
          <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
        </mdc-top-app-bar-section>
      </mdc-top-app-bar-row>
    </mdc-top-app-bar>
    <div #testcontent></div>
  `,
})
class SimpleTest {
  fixed: boolean;
  short: boolean;
  shortCollapsed: boolean;
  prominent: boolean;
  dense: boolean;
}
