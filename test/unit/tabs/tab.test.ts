import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcTab, MdcTabModule } from '../../../src/lib/public_api';

describe('MdcTab', () => {
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
    let tabDebugElement: DebugElement;
    let tabNativeElement: HTMLButtonElement;
    let tabInstance: MdcTab;
    let testComponent: SimpleTabs;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTabs);
      fixture.detectChanges();

      tabDebugElement = fixture.debugElement.query(By.directive(MdcTab));
      tabNativeElement = tabDebugElement.nativeElement;
      tabInstance = tabDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should disable ripple', () => {
      testComponent.isRippleDisabled = true;
      fixture.detectChanges();
      expect(tabInstance.disableRipple).toBeTruthy('Expected tab ripple to be disabled');
    });

    it('#should have mdc-tab by default', () => {
      expect(tabDebugElement.nativeElement.classList)
        .toContain('mdc-tab', 'Expected to have mdc-tab class applied');
      expect(tabInstance.isHostClass).toBe(true);
    });

    it('#should apply class based on property', () => {
      testComponent.isActive = true;
      fixture.detectChanges();
      expect(tabDebugElement.nativeElement.classList.contains('mdc-tab--active')).toBe(true);
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
    <mdc-tab-bar>
      <mdc-tab [active]="isActive" [disableRipple]="isRippleDisabled">
        <mdc-icon>phone</mdc-icon>
        <mdc-tab-icon-text>Recents</mdc-tab-icon-text>
      </mdc-tab>
      <mdc-tab>Merchandise</mdc-tab>
      <mdc-tab>About Us</mdc-tab>
    </mdc-tab-bar>
  `,
})
class SimpleTabs {
  isActive: boolean = false;
  isRippleDisabled: boolean = false;
}
