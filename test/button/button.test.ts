import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcButton, MdcButtonLabel, MdcIcon, MdcIconModule, MdcButtonModule } from '@angular-mdc/web';

describe('MdcButton', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcButtonModule, MdcIconModule],
      declarations: [
        SimpleButton,
        HrefButton,
        SimpleButtonWithIcon,
        SimpleButtonWithTrailingIcon,
        SimpleButtonWithTrailingIconLabelElement,
        SimpleButtonWithTrailingIconLabelAttr
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
      expect(buttonDebugElement.nativeElement.classList.contains('ngx-mdc-button--primary')).toBe(true);

      testComponent.isSecondary = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('ngx-mdc-button--secondary')).toBe(true);
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

    it('#should NOT have mdc-button-label by default', () => {
      expect(fixture.debugElement.query(By.directive(MdcButtonLabel)))
        .toBe(null, 'Expected buttons not to have mdc-button-label by default');
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
  describe('mdc-button with icon', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLElement;
    let buttonInstance: MdcIcon;
    let testComponent: SimpleButtonWithIcon;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleButtonWithIcon);
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

  // Trailing icon button tests
  describe('mdc-button with trailing icon', () => {
    let buttonLabelDebugElement: DebugElement;

    it('#should have class mdc-button__label when using MdcButtonLabel attr', () => {
      fixture = TestBed.createComponent(SimpleButtonWithTrailingIcon);
      fixture.detectChanges();

      buttonLabelDebugElement = fixture.debugElement.query(By.directive(MdcButtonLabel));

      expect(buttonLabelDebugElement.nativeElement.classList.contains('mdc-button__label')).toBe(true);
    });

    it('#should have class mdc-button__label when using MdcButtonLabel element', () => {
      fixture = TestBed.createComponent(SimpleButtonWithTrailingIconLabelElement);
      fixture.detectChanges();

      buttonLabelDebugElement = fixture.debugElement.query(By.directive(MdcButtonLabel));

      expect(buttonLabelDebugElement.nativeElement.classList.contains('mdc-button__label')).toBe(true);
    });

    it('#should have class mdc-button__label when using MdcButton label attribute', () => {
      fixture = TestBed.createComponent(SimpleButtonWithTrailingIconLabelAttr);
      fixture.detectChanges();

      buttonLabelDebugElement = fixture.debugElement.query(By.directive(MdcButtonLabel));

      expect(buttonLabelDebugElement.nativeElement.classList.contains('mdc-button__label')).toBe(true);
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

@Component({
  template: `
    <button mdc-button>
      <mdc-icon>search</mdc-icon>
      Search
    </button>
  `,
})
class SimpleButtonWithIcon { }

@Component({
  template: `
    <button mdc-button>
      <span mdcButtonLabel>Search</span>
      <mdc-icon>search</mdc-icon>
    </button>
  `,
})
class SimpleButtonWithTrailingIcon { }

@Component({
  template: `
    <button mdc-button>
      <mdc-button-label>Search</mdc-button-label>
      <mdc-icon>search</mdc-icon>
    </button>
  `,
})
class SimpleButtonWithTrailingIconLabelElement { }

@Component({
  template: `
    <button mdc-button label="Search">
      <mdc-icon>search</mdc-icon>
    </button>
  `,
})
class SimpleButtonWithTrailingIconLabelAttr { }
