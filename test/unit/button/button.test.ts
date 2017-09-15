import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcButtonComponent, MdcButtonModule } from '../../../src/lib/public_api';

describe('MdcButtonComponent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcButtonModule],
      declarations: [
        SimpleButton,
        HrefButton,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('button[mdc-button]', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLButtonElement;
    let buttonInstance: MdcButtonComponent;
    let testComponent: SimpleButton;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleButton);
      fixture.detectChanges();

      buttonDebugElement = fixture.debugElement.query(By.directive(MdcButtonComponent));
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

      testComponent.isCompact = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--compact')).toBe(true);

      testComponent.isUnelevated = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--unelevated')).toBe(true);

      testComponent.isStroked = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-button--stroked')).toBe(true);
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
});

/** Simple component for testing. */
@Component({
  template: `
    <button mdc-button
      (click)="increment()"
      [disabled]="isDisabled"
      [raised]="isRaised"
      [dense]="isDense"
      [compact]="isCompact"
      [unelevated]="isUnelevated"
      [stroked]="isStroked">
    </button>
  `,
})
class SimpleButton {
  isDisabled: boolean = false;
  isRaised: boolean = false;
  isDense: boolean = false;
  isCompact: boolean = false;
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
