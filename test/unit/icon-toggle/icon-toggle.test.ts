import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcIconToggle, MdcIconToggleModule } from '../../../src/lib/public_api';

describe('MdcIconToggle', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcIconToggleModule],
      declarations: [
        SimpleButton,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLButtonElement;
    let buttonInstance: MdcIconToggle;
    let testComponent: SimpleButton;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleButton);
      fixture.detectChanges();

      buttonDebugElement = fixture.debugElement.query(By.directive(MdcIconToggle));
      buttonNativeElement = buttonDebugElement.nativeElement;
      buttonInstance = buttonDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-icon-toggle by default', () => {
      expect(buttonDebugElement.nativeElement.classList)
        .toContain('mdc-icon-toggle', 'Expected buttons to have mdc-icon-toggle');
      expect(buttonInstance.isHostClass).toBe(true);
    });
    it('#should apply class based on property', () => {
      testComponent.isPrimary = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-icon-toggle--primary')).toBe(true);

      testComponent.isSecondary = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-icon-toggle--accent')).toBe(true);
    });

    it('#should set disabled to true', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(buttonInstance.disabled).toBe(true);
    });

    it('#should set disabled to true', () => {
      buttonInstance.toggle(true);
      fixture.detectChanges();
      expect(buttonInstance.isOn()).toBe(true);
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
    <mdc-icon-toggle
      [disabled]="isDisabled"
      [primary]="isPrimary"
      [secondary]="isSecondary"
      iconOn="favorite" iconOff="favorite_border"
      labelOn="Add to Favorites" labelOff="Remove from Favorites">
    </mdc-icon-toggle>
  `,
})
class SimpleButton {
  isDisabled: boolean = false;
  isPrimary: boolean = false;
  isSecondary: boolean = false;
}
