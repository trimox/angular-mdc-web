import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcTabBar, MdcTabModule } from '../../../src/lib/public_api';

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
    let tabBarDebugElement: DebugElement;
    let tabBarNativeElement: HTMLButtonElement;
    let tabBarInstance: MdcTabBar;
    let testComponent: SimpleTabs;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTabs);
      fixture.detectChanges();

      tabBarDebugElement = fixture.debugElement.query(By.directive(MdcTabBar));
      tabBarNativeElement = tabBarDebugElement.nativeElement;
      tabBarInstance = tabBarDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-tab-bar by default', () => {
      expect(tabBarDebugElement.nativeElement.classList)
        .toContain('mdc-tab-bar', 'Expected MdcTabBar to have mdc-tab-bar css class');
    });

    it('#should apply class based on property', () => {
      testComponent.isPrimary = true;
      fixture.detectChanges();
      expect(tabBarDebugElement.nativeElement.classList.contains('mdc-tab-bar--indicator-primary')).toBe(true);

      testComponent.isSecondary = true;
      fixture.detectChanges();
      expect(tabBarDebugElement.nativeElement.classList.contains('mdc-tab-bar--indicator-accent')).toBe(true);
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
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
