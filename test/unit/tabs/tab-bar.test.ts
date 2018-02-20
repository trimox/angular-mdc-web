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

    it('#should apply class based on property', () => {
      testComponent.isPrimary = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('ng-mdc-indicator-tab-bar--primary')).toBe(true);

      testComponent.isSecondary = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('ng-mdc-indicator-tab-bar--secondary')).toBe(true);
    });

    it('#should execute following methods', () => {
      expect(testInstance.getComputedWidth());
      expect(testInstance.layout());
      expect(testInstance.getNumberOfTabs()).toBe(3);
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
  });
});

/** Simple component for testing. */
@Component({
  template: `
    <mdc-tab-bar [secondary]="isSecondary" [primary]="isPrimary">
      <mdc-tab [active]="isActive">Home</mdc-tab>
      <mdc-tab>Merchandise</mdc-tab>
      <mdc-tab>About Us</mdc-tab>
    </mdc-tab-bar>
  `,
})
class SimpleTabs {
  isActive: boolean = false;
  isRippleDisabled: boolean = false;
  isSecondary: boolean = false;
  isPrimary: boolean = false;
}
