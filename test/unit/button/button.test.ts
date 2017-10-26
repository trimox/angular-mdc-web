import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcButton, MdcIcon, MdcButtonModule } from '../../../src/lib/public_api';

describe('MdcButton', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcButtonModule],
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

    it('#should disable ripple', () => {
      testComponent.isRippleDisabled = true;
      fixture.detectChanges();
      expect(buttonInstance.disableRipple).toBeTruthy('Expected ripple to be disabled');
    });

    it('#should apply class based on property', () => {
      testComponent.isRaised = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--raised')).toBe(true);

      testComponent.isDense = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--dense')).toBe(true);

      testComponent.isCompact = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--compact')).toBe(true);

      testComponent.isUnelevated = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--unelevated')).toBe(true);

      testComponent.isStroked = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--stroked')).toBe(true);

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

    it('#should handle a blur event', () => {
      buttonInstance.blur(null);
      fixture.detectChanges();
    });

    it('#should disable the native button element', () => {
      expect(buttonNativeElement.disabled).toBeFalsy('Expected button not to be disabled');

      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(buttonNativeElement.disabled).toBeTruthy('Expected button to be disabled');
    });

    it('#ripple should be deactivated', () => {
      buttonInstance.ripple.deactivate();
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-ripple-surface')).toBe(false);
    });

    it('#ripple surface should be removed', () => {
      buttonInstance.ripple.active = false;
      fixture.detectChanges();
      expect(buttonInstance.ripple.isSurfaceActive()).toBe(false);
    });

    it('#ripple should be disabled', () => {
      buttonInstance.ripple.disabled = true;
      fixture.detectChanges();
      expect(buttonInstance.ripple.isSurfaceDisabled()).toBe(true);
    });

    it('#ripple should be updated', () => {
      buttonInstance.ripple.layout();
      fixture.detectChanges();
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
      expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled')).toBe('false');

      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('#should not add aria-disabled attribute if disabled is false', () => {
      let fixture = TestBed.createComponent(HrefButton);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('a'));
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled'))
        .toBe('false', 'Expect aria-disabled="false"');
      expect(buttonDebugElement.nativeElement.getAttribute('disabled'))
        .toBeNull('Expect disabled="false"');

      testComponent.isDisabled = false;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled'))
        .toBe('false', 'Expect no aria-disabled');
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
      [disableRipple]="isRippleDisabled"
      [raised]="isRaised"
      [primary]="isPrimary"
      [secondary]="isSecondary"
      [dense]="isDense"
      [compact]="isCompact"
      [unelevated]="isUnelevated"
      [stroked]="isStroked">
      My label
    </button>
  `,
})
class SimpleButton {
  isDisabled: boolean = false;
  isRaised: boolean = false;
  isDense: boolean = false;
  isCompact: boolean = false;
  isPrimary: boolean = false;
  isSecondary: boolean = false;
  isRippleDisabled: boolean = false;
  isUnelevated: boolean = false;
  isStroked: boolean = false;
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
  template:
  `
    <button mdc-button>
      <mdc-icon>search</mdc-icon>
      Search
    </button>
  `,
})
class IconButton { }
