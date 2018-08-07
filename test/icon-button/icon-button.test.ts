import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcIconButton, MdcIconButtonModule } from '@angular-mdc/web';

describe('MdcIconButton', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MdcIconButtonModule],
      declarations: [
        SimpleButton,
        IconButtonToggle,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLButtonElement;
    let buttonInstance: MdcIconButton;
    let testComponent: SimpleButton;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleButton);
      fixture.detectChanges();

      buttonDebugElement = fixture.debugElement.query(By.directive(MdcIconButton));
      buttonNativeElement = buttonDebugElement.nativeElement;
      buttonInstance = buttonDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-icon-button by default', () => {
      expect(buttonDebugElement.nativeElement.classList)
        .toContain('mdc-icon-button', 'Expected buttons to have mdc-icon-button');
      expect(buttonInstance.isHostClass).toBe(true);
    });
    it('#should apply primary class', () => {
      testComponent.primary = true;
      fixture.detectChanges();
      expect(buttonNativeElement.classList.contains('ng-mdc-icon-button--primary')).toBe(true);
    });

    it('#should apply secondary class', () => {
      testComponent.secondary = true;
      fixture.detectChanges();
      expect(buttonNativeElement.classList.contains('ng-mdc-icon-button--secondary')).toBe(true);
    });

    it('#should set disabled to true', () => {
      testComponent.disabled = true;
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
      expect(testComponent.clickCount).toBe(1);
    });

    it('iconOn should be set to favorite', () => {
      expect(buttonInstance.iconOn).toBe('favorite');
    });

    it('iconOff should be set to favorite_border', () => {
      expect(buttonInstance.iconOff).toBe('favorite_border');
    });

    it('#should stop propagation if disabled', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      buttonNativeElement.click();
      expect(testComponent.clickCount).toBe(0);
    });

    it('#should preserve the user-provided id', () => {
      expect(buttonNativeElement.id).toBe('simple-button');
    });

    it('#should generate a unique id, if no id is set', () => {
      testComponent.buttonId = null;
      fixture.detectChanges();

      expect(buttonInstance.inputId).toMatch(/mdc-icon-button-\d+/);
    });
  });

  describe('TestOnToggle behaviors', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLButtonElement;
    let buttonInstance: MdcIconButton;
    let testComponent: IconButtonToggle;

    beforeEach(() => {
      fixture = TestBed.createComponent(IconButtonToggle);
      fixture.detectChanges();

      buttonDebugElement = fixture.debugElement.query(By.directive(MdcIconButton));
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
    <button mdcIconButton [(ngModel)]="myModel"
      [id]="buttonId"
      [disabled]="disabled"
      (click)="increment()"
      [primary]="primary"
      [secondary]="secondary"
      iconOn="favorite" iconOff="favorite_border"
      labelOn="Add to Favorites" labelOff="Remove from Favorites">
    </button>
  `,
})
class SimpleButton {
  buttonId: string | null = 'simple-button';
  myModel: boolean = true;
  disabled: boolean = false;
  primary: boolean = false;
  secondary: boolean = false;

  clickCount: number = 0;

  increment() {
    this.clickCount++;
  }
}

@Component({
  template: `
    <button mdcIconButton
      [on]="isOn"
      iconOn="favorite" iconOff="favorite_border"
      labelOn="Add to Favorites" labelOff="Remove from Favorites">
      <i class="fa fa-star" aria-hidden="true"></i>
    </button>
  `,
})
class IconButtonToggle {
  isOn: boolean = true;
}
