import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcTab, MdcTabModule, MdcIconModule } from '@angular-mdc/web';

describe('MdcTab', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcTabModule, MdcIconModule],
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

    it('#should have mdc-tab by default', () => {
      expect(testDebugElement.nativeElement.classList)
        .toContain('mdc-tab', 'Expected to have mdc-tab class applied');
      expect(testInstance.isHostClass).toBe(true);
    });

    it('#should apply class based on property', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('ng-mdc-tab--disabled')).toBe(true);
      expect(testInstance.disabled).toBe(true);
    });

    it('#should NOT apply class based from method', () => {
      testInstance.setActive(true);
      testInstance.setDisabled(true);
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('ng-mdc-tab--disabled')).toBe(false);
      expect(testInstance.disabled).toBe(false);
    });

    it('#should execute following methods', () => {
      expect(testInstance.getComputedWidth());
      expect(testInstance.getComputedLeft());
      expect(testInstance.measureSelf());
    });

    it('#should apply active', () => {
      testInstance.setActive(true);
      fixture.detectChanges();
      expect(testInstance.isActive()).toBe(true);
      expect(testInstance.elementRef.nativeElement.click());
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
    <mdc-tab-bar>
      <mdc-tab [disabled]="isDisabled" (onSelected)="handleSelect($event)">
        <mdc-icon>phone</mdc-icon>
        <mdc-tab-icon-text>Recents</mdc-tab-icon-text>
      </mdc-tab>
      <mdc-tab>Merchandise</mdc-tab>
      <mdc-tab>About Us</mdc-tab>
    </mdc-tab-bar>
  `,
})
class SimpleTabs {
  isDisabled: boolean = false;

  handleSelect(event: any) { }
}
