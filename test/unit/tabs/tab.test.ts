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
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLButtonElement;
    let testInstance: MdcTab;
    let testComponent: SimpleTabs;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTabs);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcTab));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should disable ripple', () => {
      testComponent.isRippleDisabled = true;
      fixture.detectChanges();
      expect(testInstance.disableRipple).toBeTruthy('Expected tab ripple to be disabled');
    });

    it('#should have mdc-tab by default', () => {
      expect(testDebugElement.nativeElement.classList)
        .toContain('mdc-tab', 'Expected to have mdc-tab class applied');
      expect(testInstance.isHostClass).toBe(true);
    });

    it('#should apply class based on property', () => {
      testComponent.isActive = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-tab--active')).toBe(true);
    });

    it('#should apply class based on property', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-tab--disabled')).toBe(true);
      expect(testInstance.disabled).toBe(true);
    });

    it('#should apply prevent default on click', () => {
      testComponent.isPreventDefault = false;
      fixture.detectChanges();
      expect(testInstance.preventsDefaultOnClick).toBe(false);
      expect(testInstance.getPreventDefaultOnClick()).toBe(false);
    });

    it('#should execute following methods', () => {
      expect(testInstance.getComputedWidth());
      expect(testInstance.getComputedLeft());
      expect(testInstance.measureSelf());
    });

    it('#should remove active', () => {
      testComponent.isActive = false;
      fixture.detectChanges();
      expect(testInstance.isActive()).toBe(false);
    });

    it('#should apply active', () => {
      testInstance.setActive(true);
      fixture.detectChanges();
      expect(testInstance.isActive()).toBe(true);
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
    `
    <mdc-tab-bar>
      <mdc-tab [active]="isActive" [disableRipple]="isRippleDisabled" [preventsDefaultOnClick]="isPreventDefault"
        [disabled]="isDisabled" (select)="handleSelect($event)">
        <mdc-icon>phone</mdc-icon>
        <mdc-tab-icon-text>Recents</mdc-tab-icon-text>
      </mdc-tab>
      <mdc-tab>Merchandise</mdc-tab>
      <mdc-tab>About Us</mdc-tab>
    </mdc-tab-bar>
  `,
})
class SimpleTabs {
  isActive: boolean = true;
  isRippleDisabled: boolean = false;
  isDisabled: boolean = false;
  isPreventDefault: boolean = true;

  handleSelect(event: any) {
  }
}
