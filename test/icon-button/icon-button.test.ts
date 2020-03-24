import {Component, DebugElement} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {fakeAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {MdcIconButton, MdcIconButtonModule} from '@angular-mdc/web/icon-button';

describe('MdcIconButton', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MdcIconButtonModule],
      declarations: [
        SimpleButton,
        IconButtonToggle,
        SingleStateIconButton
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
    });

    it('#should set disabled to true', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(buttonInstance.disabled).toBe(true);
    });

    it('#should set toggle state to true', () => {
      buttonInstance.toggle(true);
      fixture.detectChanges();
      expect(buttonInstance.on).toBe(true);
    });

    it('#should set toggle state to true', () => {
      buttonInstance.toggle();
      buttonNativeElement.focus();
      fixture.detectChanges();
      expect(buttonInstance.on).toBe(true);
    });

    it('#should handle click event', () => {
      buttonNativeElement.click();
      fixture.detectChanges();
      expect(testComponent.clickCount).toBe(1);
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
      expect(buttonInstance.on).toBe(false);
    });
  });

  describe('Non toggle icon button behaviors', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLButtonElement;
    let buttonInstance: MdcIconButton;
    let testComponent: SingleStateIconButton;

    beforeEach(() => {
      fixture = TestBed.createComponent(SingleStateIconButton);
      fixture.detectChanges();

      buttonDebugElement = fixture.debugElement.query(By.directive(MdcIconButton));
      buttonNativeElement = buttonDebugElement.nativeElement;
      buttonInstance = buttonDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should handle click event', () => {
      buttonNativeElement.click();
      fixture.detectChanges();
    });
  });
});

@Component({
  template: `
    <button mdcIconButton [(ngModel)]="myModel"
      [id]="buttonId"
      [disabled]="disabled"
      (click)="increment()">
      <mdc-icon mdcIconOn>favorite</mdc-icon>
      <mdc-icon>favorite_border</mdc-icon>
    </button>
 `,
})
class SimpleButton {
  buttonId: string | null = 'simple-button';
  myModel: boolean = true;
  disabled: boolean = false;

  clickCount: number = 0;

  increment() {
    this.clickCount++;
  }
}

@Component({
  template: `
    <button mdcIconButton [on]="isOn">
      <mdc-icon fontSet="fa" fontIcon="fa-star" mdcIconOn></mdc-icon>
      <mdc-icon fontSet="fa" fontIcon="fa-star-o"></mdc-icon>
    </button>
  `,
})
class IconButtonToggle {
  isOn: boolean = true;
}

@Component({
  template: `
  <button mdcIconButton>
    <mdc-icon>favorite</mdc-icon>
  </button>`,
})
class SingleStateIconButton {}
