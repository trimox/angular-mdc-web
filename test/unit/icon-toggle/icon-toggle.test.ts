import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcIconToggle, MdcIconToggleModule } from '@angular-mdc/web';

describe('MdcIconToggle', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MdcIconToggleModule],
      declarations: [
        SimpleButton,
        TestOnToggle,
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
      expect(buttonDebugElement.nativeElement.classList.contains('ng-mdc-icon-toggle--primary')).toBe(true);

      testComponent.isSecondary = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('ng-mdc-icon-toggle--secondary')).toBe(true);
    });

    it('#should set disabled to true', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(buttonInstance.disabled).toBe(true);
    });

    it('#should set toggle state to true', () => {
      buttonInstance.toggle(true);
      fixture.detectChanges();
      expect(buttonInstance.isOn()).toBe(true);
    });

    it('#should set value to false', () => {
      testComponent.myModel = false;
      buttonInstance.refreshToggleData();
      fixture.detectChanges();
      expect(buttonInstance.isOn()).toBe(false);
    });

    it('#should handle click event', () => {
      buttonNativeElement.click();
      fixture.detectChanges();
    });

    it('#should stop propagation if disabled', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();
      buttonNativeElement.click();
      fixture.detectChanges();
    });
  });

  describe('TestOnToggle behaviors', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLButtonElement;
    let buttonInstance: MdcIconToggle;
    let testComponent: TestOnToggle;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestOnToggle);
      fixture.detectChanges();

      buttonDebugElement = fixture.debugElement.query(By.directive(MdcIconToggle));
      buttonNativeElement = buttonDebugElement.nativeElement;
      buttonInstance = buttonDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should set button toggle state', () => {
      testComponent.isOn = false;
      fixture.detectChanges();
      expect(buttonInstance.isOn()).toBe(false);
      expect(buttonInstance.on).toBe(false);
    });
  });
});

@Component({
  template: `
    <mdc-icon-toggle [(ngModel)]="myModel"
      [disabled]="isDisabled"
      [primary]="isPrimary"
      [secondary]="isSecondary"
      iconOn="favorite" iconOff="favorite_border"
      labelOn="Add to Favorites" labelOff="Remove from Favorites">
    </mdc-icon-toggle>
  `,
})
class SimpleButton {
  myModel: boolean = true;
  isDisabled: boolean = false;
  isPrimary: boolean = false;
  isSecondary: boolean = false;
}

@Component({
  template: `
    <mdc-icon-toggle
      [on]="isOn"
      iconOn="favorite" iconOff="favorite_border"
      labelOn="Add to Favorites" labelOff="Remove from Favorites">
    </mdc-icon-toggle>
  `,
})
class TestOnToggle {
  isOn: boolean = true;
}
