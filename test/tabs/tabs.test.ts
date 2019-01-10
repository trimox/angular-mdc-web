import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent, dispatchKeyboardEvent } from '../testing/dispatch-events';

import {
  LEFT_ARROW,
  Platform,
  MdcTabBarModule,
  MdcIconModule,
  MdcTabIndicatorModule,
  MdcTabIndicator,
  MdcTabBar,
  MdcTab,
  MdcTabScroller,
  MdcTabScrollerModule,
  MdcTabScrollerAlignment
} from '@angular-mdc/web';

describe('MDC Tabs', () => {
  let fixture: ComponentFixture<any>;
  let platform: { isBrowser: boolean };

  beforeEach(async(() => {
    // Set the default Platform override that can be updated before component creation.
    platform = { isBrowser: true };

    TestBed.configureTestingModule({
      imports: [MdcTabBarModule, MdcTabIndicatorModule, MdcTabScrollerModule, MdcIconModule],
      declarations: [SimpleTest, TabIndicatorTest, TabScrollerTest],
      providers: [{ provide: Platform, useFactory: () => platform }]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcTabBar;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcTabBar));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-tab-bar by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-tab-bar');
    });

    it('#should return is defined for tab parent', () => {
      expect(testInstance.tabs.toArray()[1].getTabBarParent()).toBeDefined();
    });

    it('#should make second tab active', fakeAsync(() => {
      dispatchFakeEvent(testInstance.tabs.toArray()[1].elementRef.nativeElement, 'click');
      fixture.detectChanges();
      flush();
    }));

    it('#should make third tab active', fakeAsync(() => {
      dispatchFakeEvent(testInstance.tabs.toArray()[1].elementRef.nativeElement, 'click');
      fixture.detectChanges();
      flush();

      dispatchFakeEvent(testInstance.tabs.toArray()[2].elementRef.nativeElement, 'click');
      fixture.detectChanges();
      flush();
    }));

    it('#should scroll into view', fakeAsync(() => {
      platform.isBrowser = false;
      testInstance.scrollIntoView(2);
      fixture.detectChanges();
      flush();
    }));

    it('#should handle keydown', fakeAsync(() => {
      dispatchKeyboardEvent(testInstance.tabs.toArray()[1].elementRef.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      flush();
    }));

    it('#should make first tab active, then make second tab active', fakeAsync(() => {
      testInstance.activateTab(0);
      fixture.detectChanges();
      flush();

      expect(testInstance.tabs.toArray()[0].elementRef.nativeElement.classList.contains('mdc-tab--active')).toBe(true);

      testInstance.activateTab(1);
      fixture.detectChanges();
      flush();

      expect(testInstance.tabs.toArray()[1].elementRef.nativeElement.classList.contains('mdc-tab--active')).toBe(true);
    }));

    it('#should make first tab disabled', fakeAsync(() => {
      testInstance.disableTab(0, true);
      fixture.detectChanges();
      flush();

      expect(testInstance.tabs.toArray()[0].elementRef.nativeElement.classList
        .contains('ngx-mdc-tab--disabled')).toBe(true);
    }));

    it('#should turn on stacked for tabs', fakeAsync(() => {
      testComponent.stacked = true;
      fixture.detectChanges();
      flush();
      expect(testInstance.tabs.toArray()[0].stacked).toBe(true);
    }));

    it('#should handle mousedown event', fakeAsync(() => {
      dispatchFakeEvent(testInstance.tabs.toArray()[1].elementRef.nativeElement, 'mousedown');
      fixture.detectChanges();
      flush();

      dispatchFakeEvent(testInstance.tabScroller.content.nativeElement, 'transitionend');
    }));

    it('#should turn on fixed for tabs', fakeAsync(() => {
      testComponent.fixed = true;
      fixture.detectChanges();
      flush();
      expect(testInstance.tabs.toArray()[0].fixed).toBe(true);
    }));

    it('#should turn on fade indicator', fakeAsync(() => {
      testComponent.fade = true;
      fixture.detectChanges();
      flush();
      expect(testInstance.tabs.toArray()[0].tabIndicator.fade).toBe(true);
    }));

    it('#should turn on automatic activation behavior', fakeAsync(() => {
      testComponent.useAutomaticActivation = true;
      fixture.detectChanges();
      flush();
      expect(testInstance.useAutomaticActivation).toBe(true);
    }));

    it('#should turn off focusOnActivate', fakeAsync(() => {
      testComponent.focusOnActivate = false;
      fixture.detectChanges();
      flush();
      expect(testInstance.focusOnActivate).toBe(false);
      expect(testInstance.tabs.toArray()[1].focusOnActivate).toBe(false);
    }));

    it('#should set active tab', fakeAsync(() => {
      testComponent.activeTabIndex = 1;
      fixture.detectChanges();
      flush();
      expect(testInstance.getActiveTabIndex()).toBe(1);
      expect(testInstance.getActiveTab()).toBeDefined();
    }));

    it('#should set alignment to end', fakeAsync(() => {
      testComponent.align = 'end';
      fixture.detectChanges();
      flush();
      expect(testInstance.tabScroller.align).toBe('end');
      expect(testInstance.tabScroller.incrementScroll(20));
      expect(testInstance.tabScroller.getScrollContentWidth()).toBeDefined();
      expect(testInstance.tabScroller.getScrollPosition()).toBeDefined();
    }));
  });

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcTabIndicator;
    let testComponent: TabIndicatorTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(TabIndicatorTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcTabIndicator));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should turn on active', fakeAsync(() => {
      platform.isBrowser = false;
      testComponent.active = true;
      fixture.detectChanges();
      flush();
      expect(testInstance.active).toBe(true);

      testComponent.active = false;
      fixture.detectChanges();
      flush();
    }));

    it('#should turn off active', fakeAsync(() => {
      testComponent.active = false;
      fixture.detectChanges();
      flush();
      expect(testInstance.active).toBe(false);
    }));

    it('#should set indicator to an icon', fakeAsync(() => {
      testComponent.icon = 'favorite';
      fixture.detectChanges();
      flush();
      expect(testInstance.icon).toBe('favorite');
    }));
  });

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcTabScroller;
    let testComponent: TabScrollerTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(TabScrollerTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcTabScroller));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should align to start', fakeAsync(() => {
      testComponent.align = 'start';
      fixture.detectChanges();
      flush();
      expect(testInstance.align).toBe('start');
    }));

    it('#should align to start even if not browser', fakeAsync(() => {
      platform.isBrowser = false;
      testComponent.align = 'start';
      fixture.detectChanges();
      flush();
      expect(testInstance.align).toBe('start');
    }));
  });
});

@Component({
  template: `
  <mdc-tab-bar [stacked]="stacked" [fixed]="fixed" [fade]="fade" [align]="align" [activeTabIndex]="activeTabIndex"
    [useAutomaticActivation]="useAutomaticActivation" [iconIndicator]="iconIndicator"
    [focusOnActivate]="focusOnActivate"
    (activated)="handleActivatedTab($event)">
    <mdc-tab-scroller>
      <mdc-tab [id]="my-tab" label="Flights" icon="airplanemode_active" [disabled]="disabledTab"></mdc-tab>
      <mdc-tab label="Hotel" icon="hotel" [focusOnActivate]="focusOnActivate"></mdc-tab>
      <mdc-tab label="Favorites" icon="favorite"></mdc-tab>
      <mdc-tab>
        <mdc-icon mdcTabIcon>favorite</mdc-icon>
        <mdc-tab-label>Favorites</mdc-tab-label>
      </mdc-tab>
    </mdc-tab-scroller>
  </mdc-tab-bar>
  `,
})
class SimpleTest {
  fixed: boolean;
  stacked: boolean;
  fade: boolean;
  align: MdcTabScrollerAlignment;
  useAutomaticActivation: boolean;
  activeTabIndex: number;
  iconIndicator: string;
  disabledTab: boolean;
  focusOnActivate: boolean;

  handleActivatedTab: (event: { index: number, tab: MdcTab }) => void = () => { };
}

@Component({
  template: `
  <mdc-tab-indicator [active]="active" [icon]="icon"></mdc-tab-indicator>
  `,
})
class TabIndicatorTest {
  active: boolean;
  icon: string;
}

@Component({
  template: `
  <mdc-tab-scroller [align]="align"></mdc-tab-scroller>
  `,
})
class TabScrollerTest {
  align: string;
}
