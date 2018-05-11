import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcButton, MdcIcon, MdcIconModule, MdcButtonModule } from '@angular-mdc/web';

describe('MdcButton', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcButtonModule, MdcIconModule],
      declarations: [
        SimpleButton,
        HrefButton,
        IconButton,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('button[mdc-button]', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLButtonElement;
    let buttonInstance: MdcButton;
    let testComponent: SimpleButton;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleButton);
      fixture.detectChanges();

      buttonDebugElement = fixture.debugElement.query(By.directive(MdcButton));
      buttonNativeElement = buttonDebugElement.nativeElement;
      buttonInstance = buttonDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-button by default', () => {
      expect(buttonDebugElement.nativeElement.classList)
        .toContain('mdc-button', 'Expected buttons to have mdc-button');
    });

    it('#should apply class based on property', () => {
      testComponent.isRaised = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--raised')).toBe(true);

      testComponent.isDense = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--dense')).toBe(true);

      testComponent.isUnelevated = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--unelevated')).toBe(true);

      testComponent.outlined = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--outlined')).toBe(true);

      testComponent.isPrimary = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--primary')).toBe(true);

      testComponent.isSecondary = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--secondary')).toBe(true);
    });

    it('#should handle a click on the button', () => {
      buttonDebugElement.nativeElement.click();
      expect(testComponent.clickCount).toBe(1);
    });

    it('#should not increment if disabled', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();

      buttonDebugElement.nativeElement.click();
      expect(testComponent.clickCount).toBe(0);
    });

    it('#should focus on button when focus() is called', () => {
      buttonInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(buttonNativeElement);
    });

    it('#should handle a click on the button', () => {
      let fixture = TestBed.createComponent(SimpleButton);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('button'));

      buttonDebugElement.nativeElement.click();
      expect(testComponent.clickCount).toBe(1);
    });

    it('#should disable the native button element', () => {
      expect(buttonNativeElement.disabled).toBeFalsy('Expected button not to be disabled');

      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(buttonNativeElement.disabled).toBeTruthy('Expected button to be disabled');
    });
  });

  // Anchor button tests
  describe('a[mdc-button]', () => {
    it('#should not redirect if disabled', () => {
      let fixture = TestBed.createComponent(HrefButton);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('a'));

      testComponent.isDisabled = true;
      fixture.detectChanges();

      buttonDebugElement.nativeElement.click();
    });

    it('#should remove tabindex if disabled', () => {
      let fixture = TestBed.createComponent(HrefButton);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('a'));
      expect(buttonDebugElement.nativeElement.getAttribute('tabIndex')).toBe(null);

      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.getAttribute('tabIndex')).toBe('-1');
    });

    it('#should add aria-disabled attribute if disabled', () => {
      let fixture = TestBed.createComponent(HrefButton);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('a'));
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled')).toBeDefined();

      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('#should not add aria-disabled attribute if disabled is false', () => {
      let fixture = TestBed.createComponent(HrefButton);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('a'));

      testComponent.isDisabled = false;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.getAttribute('disabled'))
        .toBeNull('Expect no disabled');
    });
  });

  // Icon button tests
  describe('mdc-icon-button', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLElement;
    let buttonInstance: MdcIcon;
    let testComponent: IconButton;

    beforeEach(() => {
      fixture = TestBed.createComponent(IconButton);
      fixture.detectChanges();

      buttonDebugElement = fixture.debugElement.query(By.directive(MdcIcon));
      buttonNativeElement = buttonDebugElement.nativeElement;
      buttonInstance = buttonDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have class mdc-button__icon by default', () => {
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button__icon')).toBe(true);
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
    <button mdc-button
      (click)="increment()"
      [disabled]="isDisabled"
      [raised]="isRaised"
      [primary]="isPrimary"
      [secondary]="isSecondary"
      [dense]="isDense"
      [unelevated]="isUnelevated"
      [outlined]="outlined">
      My label
    </button>
  `,
})
class SimpleButton {
  isDisabled: boolean = false;
  isRaised: boolean = false;
  isDense: boolean = false;
  isPrimary: boolean = false;
  isSecondary: boolean = false;
  isUnelevated: boolean = false;
  outlined: boolean = false;
  clickCount: number = 0;

  increment() {
    this.clickCount++;
  }
}

/** href button. */
@Component({
  template: `
    <a href="http://www.google.com" mdc-button [disabled]="isDisabled">Link</a>
  `,
})
class HrefButton {
  isDisabled: boolean = false;
}

/** icon button. */
@Component({
  template: `
    <button mdc-button [icon]="icon">
      <mdc-icon>search</mdc-icon>
      Search
    </button>
  `,
})
class IconButton {
  icon: boolean = true;
}
