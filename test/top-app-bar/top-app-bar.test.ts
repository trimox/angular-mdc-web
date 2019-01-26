import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent, dispatchKeyboardEvent } from '../testing/dispatch-events';

import {
  DOWN_ARROW,
  Platform,
  MdcIconModule,
  MdcTopAppBarModule,
  MdcTopAppBar
} from '@angular-mdc/web';

describe('MdcTopAppBar', () => {
  let fixture: ComponentFixture<any>;
  let platform: { isBrowser: boolean };

  // Create a very large element that will make the page scrollable.
  const veryLargeElement: HTMLElement = document.createElement('div');
  veryLargeElement.style.width = '6000px';
  veryLargeElement.style.height = '6000px';

  beforeEach(fakeAsync(() => {
    // Set the default Platform override that can be updated before component creation.
    platform = { isBrowser: true };

    TestBed.configureTestingModule({
      imports: [MdcTopAppBarModule, MdcIconModule],
      declarations: [SimpleTest, NoScrollContent],
      providers: [
        { provide: Platform, useFactory: () => platform }
      ]
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

    it('#should apply mdc-top-app-bar--short class based on property', fakeAsync(() => {
      testComponent.short = true;
      fixture.detectChanges();

      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short')).toBe(true);
      flush();
      // expect(testInstance.fixedAdjustElement.classList.contains('mdc-top-app-bar--short-fixed-adjust')).toBe(true);
      // expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short-has-action-item')).toBe(true);
      flush();
    }));

    it('#should remove mdc-top-app-bar--short class based on property', fakeAsync(() => {
      testComponent.short = false;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short')).toBe(false);
    }));

    it('#should add mdc-top-app-bar--short after setting shortCollapsed', fakeAsync(() => {
      testComponent.short = false;
      fixture.detectChanges();

      testComponent.shortCollapsed = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short')).toBe(true);
      flush();
    }));

    it('#should apply mdc-top-app-bar--prominent class based on property', fakeAsync(() => {
      testComponent.short = true;
      fixture.detectChanges();
      testComponent.prominent = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--prominent')).toBe(true);
      flush();
    }));

    it('#should apply prominent and dense class based on property', fakeAsync(() => {
      testComponent.dense = true;
      fixture.detectChanges();
      testComponent.prominent = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--prominent')).toBe(true);
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--dense')).toBe(true);
      flush();
    }));

    it('#should apply mdc-top-app-bar--dense class based on property', fakeAsync(() => {
      testComponent.short = true;
      fixture.detectChanges();
      testComponent.dense = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--dense')).toBe(true);
      flush();
    }));

    it('#should apply mdc-top-app-bar--fixed class based on property', fakeAsync(() => {
      testComponent.short = true;
      fixture.detectChanges();
      testComponent.fixed = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--fixed')).toBe(true);
      expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short')).toBe(false);
      expect(testInstance.isCollapsed()).toBe(false);

      dispatchKeyboardEvent(window.document, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      flush();
    }));

    it('#should run even if platform is not a browser', fakeAsync(() => {
      platform.isBrowser = false;
      fixture.detectChanges();
      document.body.appendChild(veryLargeElement);
      window.scrollTo(1500, 2000);
      fixture.detectChanges();

      testInstance.scrollTarget = undefined;
      fixture.detectChanges();
      document.body.removeChild(veryLargeElement);
    }));

    it('#should reset scrollTarget value to Window', fakeAsync(() => {
      testInstance.scrollTarget = undefined;
      fixture.detectChanges();
      expect(testInstance.scrollTarget).toBe(window);
    }));
  });

  describe('MdcTopAppBar', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcTopAppBar;
    let testComponent: NoScrollContent;

    describe('basic behaviors', () => {
      beforeEach(() => {
        // Set the default Platform override that can be updated before component creation.
        platform = { isBrowser: true };

        fixture = TestBed.createComponent(NoScrollContent);
        fixture.detectChanges();

        testDebugElement = fixture.debugElement.query(By.directive(MdcTopAppBar));
        testNativeElement = testDebugElement.nativeElement;
        testInstance = testDebugElement.componentInstance;
        testComponent = fixture.debugElement.componentInstance;
      });

      it('#scrollTarget should default to window', () => {
        expect(testInstance.scrollTarget).toEqual(window);
      });

      it('#should not apply `mdc-top-app-bar--short-has-action-item` property', fakeAsync(() => {
        testComponent.short = true;
        fixture.detectChanges();

        dispatchFakeEvent(window, 'resize');
        // expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short')).toBe(true);
        // expect(testInstance.fixedAdjustElement.classList.contains('mdc-top-app-bar--short-fixed-adjust')).toBe(true);
        expect(testDebugElement.nativeElement.classList.contains('mdc-top-app-bar--short-has-action-item')).toBe(true);
      }));

      it('#should handle when window is scrolled if not fixed', () => {
        document.body.appendChild(veryLargeElement);
        window.scrollTo(1500, 2000);
        fixture.detectChanges();
      });

      it('#should handle when window is scrolled if fixed', () => {
        testComponent.fixed = true;
        fixture.detectChanges();

        expect(testInstance.scrollTarget).toEqual(window);
        document.body.appendChild(veryLargeElement);
        window.scrollTo(1500, 2000);
        fixture.detectChanges();
        document.body.removeChild(veryLargeElement);
      });
    });
  });

  describe('MdcTopAppBar - Platform !== browser', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcTopAppBar;
    let testComponent: NoScrollContent;

    describe('basic behaviors', () => {
      beforeEach(() => {
        // Set the default Platform override that can be updated before component creation.
        platform = { isBrowser: false };

        fixture = TestBed.createComponent(NoScrollContent);
        fixture.detectChanges();

        testDebugElement = fixture.debugElement.query(By.directive(MdcTopAppBar));
        testNativeElement = testDebugElement.nativeElement;
        testInstance = testDebugElement.componentInstance;
        testComponent = fixture.debugElement.componentInstance;
      });

      it('#scrollTarget should default to undefined', () => {
        expect(testInstance.scrollTarget).toEqual(undefined);
      });

      it('#should handle when window is scrolled if not fixed', () => {
        document.body.appendChild(veryLargeElement);
        window.scrollTo(1500, 2000);
        fixture.detectChanges();
      });

      it('#should handle when window is scrolled if fixed', () => {
        testComponent.fixed = true;
        fixture.detectChanges();

        expect(testInstance.scrollTarget).toEqual(undefined);
        document.body.appendChild(veryLargeElement);
        window.scrollTo(1500, 2000);
        fixture.detectChanges();
        document.body.removeChild(veryLargeElement);
      });

      it('#should handle when window is scrolled if fixed, and not a browser', () => {
        testComponent.fixed = true;
        fixture.detectChanges();

        document.body.appendChild(veryLargeElement);
        window.scrollTo(1500, 2000);
        fixture.detectChanges();
        expect(testInstance.scrollTarget).toEqual(undefined);
        document.body.removeChild(veryLargeElement);
      });

      it('#should reset scrollTarget value to test', () => {
        testInstance.scrollTarget = 'test';
        testInstance.scrollTarget = 'test';
        fixture.detectChanges();
        expect(testInstance.scrollTarget).toBe('test');
      });
    });
  });
});

@Component({
  template: `
    <mdc-top-app-bar
      [fixed]="fixed"
      [fixedAdjustElement]="testcontent"
      [short]="short"
      [scrollTarget]="testcontent"
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
    <div #testcontent mdcTopAppBarFixedAdjust></div>
  `,
})
class SimpleTest {
  fixed: boolean = false;
  short: boolean = false;
  shortCollapsed: boolean = false;
  prominent: boolean = false;
  dense: boolean = false;
}

@Component({
  template: `
    <mdc-top-app-bar
      [fixed]="fixed"
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
  `,
})
class NoScrollContent {
  fixed: boolean = false;
  short: boolean = true;
  shortCollapsed: boolean = false;
  prominent: boolean = false;
  dense: boolean = false;
}
