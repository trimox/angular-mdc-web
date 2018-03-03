import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcTabBar, MdcTabModule } from '@angular-mdc/web';

describe('MdcTabBar', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcTabModule],
      declarations: [
        SimpleTabs,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLButtonElement;
    let testInstance: MdcTabBar;
    let testComponent: SimpleTabs;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTabs);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcTabBar));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-tab-bar by default', () => {
      expect(testDebugElement.nativeElement.classList)
        .toContain('mdc-tab-bar', 'Expected MdcTabBar to have mdc-tab-bar css class');
    });

    it('#should execute following methods', () => {
      expect(testInstance.getComputedWidth());
      expect(testInstance.layout());
      expect(testInstance.getNumberOfTabs()).toBe(3);
    });

    it('#should disable ripple', () => {
      testComponent.isRippleDisabled = true;
      fixture.detectChanges();
      expect(testInstance.disableRipple).toBeTruthy('Expected tab ripple to be disabled');
    });

    it('#should switch to tab', () => {
      expect(testInstance.setTabActiveAtIndex(2));
      fixture.detectChanges();
      expect(testInstance.getActiveTabIndex()).toBe(2);
    });

    it('#should set prevent default on tab index', () => {
      expect(testInstance.setPreventDefaultOnClickForTabAtIndex(2, false));
      fixture.detectChanges();
      expect(testInstance.isDefaultPreventedOnClickForTabAtIndex(2)).toBe(false);
    });

    it('#should apply primary class', () => {
      testComponent.isPrimary = true;
      fixture.detectChanges();
      expect(testInstance.elementRef.nativeElement.classList.contains('ng-mdc-tab--primary')).toBe(true);
    });

    it('#should apply secondary class', () => {
      testComponent.isSecondary = true;
      fixture.detectChanges();
      expect(testInstance.elementRef.nativeElement.classList.contains('ng-mdc-tab--secondary')).toBe(true);
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
    <mdc-tab-bar [secondary]="isSecondary" [primary]="isPrimary" [disableRipple]="isRippleDisabled">
      <mdc-tab>Home</mdc-tab>
      <mdc-tab>Merchandise</mdc-tab>
      <mdc-tab>About Us</mdc-tab>
    </mdc-tab-bar>
  `,
})
class SimpleTabs {
  isRippleDisabled: boolean = false;
  isSecondary: boolean = false;
  isPrimary: boolean = false;
}
