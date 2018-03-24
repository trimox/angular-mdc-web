import { Component, DebugElement, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcRippleModule,
  MdcRippleComponent,
  MdcRippleDirective
} from '@angular-mdc/web';

describe('MdcRippleDirective', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcRippleModule,
      ],
      declarations: [
        SimpleRipple,
      ],
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcRippleComponent;
    let testComponent: SimpleRipple;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleRipple);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcRippleComponent));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-ripple-surface if true', () => {
      testComponent.isRippleActive = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-ripple-surface')).toBe(true);
    });

    it('#should have mdc-ripple-surface if false', () => {
      testComponent.isRippleActive = false;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-ripple-surface')).toBe(false);
    });

    it('#should have mdc-ripple-surface--primary if true', () => {
      testComponent.isPrimary = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-ripple-surface--primary')).toBe(true);
    });

    it('#should have mdc-ripple-surface--accent if true', () => {
      testComponent.isSecondary = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-ripple-surface--accent')).toBe(true);
    });

    it('#should have mdc-ripple-upgraded--unbounded', () => {
      testInstance.setUnbounded(true);
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-ripple-upgraded--unbounded')).toBe(true);
    });

    it('#should have NOT mdc-ripple-upgraded--unbounded', () => {
      testInstance.setUnbounded(false);
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-ripple-upgraded--unbounded')).toBe(false);
    });
  });
});

@Component({
  template: `
  <mdc-ripple [active]="isRippleActive" [primary]="isPrimary" [secondary]="isSecondary"
    [disabled]="disabled" [attachTo]="test">
    <div #test>Test</div>
  </mdc-ripple>
  `,
})
class SimpleRipple {
  isRippleActive: boolean = true;
  isPrimary: boolean = false;
  isSecondary: boolean = false;
  disabled: boolean = false;
}
