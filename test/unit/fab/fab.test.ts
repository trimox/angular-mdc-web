import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcFab, MdcFabModule } from '../../../src/lib/public_api';

describe('MdcFab', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcFabModule],
      declarations: [
        SimpleButton,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('button[mdc-fab]', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLButtonElement;
    let buttonInstance: MdcFab;
    let testComponent: SimpleButton;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleButton);
      fixture.detectChanges();

      buttonDebugElement = fixture.debugElement.query(By.directive(MdcFab));
      buttonNativeElement = buttonDebugElement.nativeElement;
      buttonInstance = buttonDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-fab by default', () => {
      expect(buttonDebugElement.nativeElement.classList)
        .toContain('mdc-fab', 'Expected buttons to have mdc-fab');
      expect(buttonInstance.isHostClass).toBe(true);
    });

    it('#should apply class based on property', () => {
      testComponent.isMini = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--mini')).toBe(true);
    });

    it('#should apply class `exited`', () => {
      testComponent.isExited = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--exited')).toBe(true);
    });

    it('#should apply class `exited` after toggleExited(true)', () => {
      buttonInstance.toggleExited(true);
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--exited')).toBe(true);
      expect(buttonInstance.exited).toBe(true);
    });

    it('#should remove class `exited` after toggleExited(false)', () => {
      buttonInstance.toggleExited();
      buttonInstance.toggleExited();
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--exited')).toBe(false);
    });

    it('#should handle a click on the button', () => {
      buttonDebugElement.nativeElement.click();
      expect(testComponent.clickCount).toBe(1);
    });

    it('#should handle a blur event', () => {
      buttonInstance.blur(null);
      fixture.detectChanges();
    });

    it('#should preserve any given tabIndex', () => {
      expect(buttonDebugElement.nativeElement.tabIndex).toBe(2);
    });

    it('#should apply class `bottom-left`', () => {
      testComponent.myPosition = 'bottom-left';
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--bottom-left')).toBe(true);
    });

    it('#should apply class `bottom-right`', () => {
      testComponent.myPosition = 'bottom-right';
      fixture.detectChanges();

      expect(buttonInstance.position).toBe('bottom-right');
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--bottom-right')).toBe(true);
    });

    it('#should remove class `bottom-right`', () => {
      testComponent.myPosition = 'bottom-right';
      fixture.detectChanges();

      expect(buttonInstance.position).toBe('bottom-right');

      testComponent.myPosition = '';
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--bottom-right')).toBe(false);
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
    <button mdc-fab
      (click)="increment()"
      [tabIndex]="customTabIndex"
      [exited]="isExited"
      [position]="myPosition"
      [mini]="isMini">
      <mdc-icon>search</mdc-icon>
    </button>
  `,
})
class SimpleButton {
  isMini: boolean = false;
  isExited: boolean = false;
  clickCount: number = 0;
  customTabIndex: number = 2;
  myPosition: string = 'bottom-left';

  increment() {
    this.clickCount++;
  }
}
