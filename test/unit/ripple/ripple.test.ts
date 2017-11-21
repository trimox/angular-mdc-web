import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcRippleModule,
  MdcRippleDirective,
  MdcSurfaceDirective,
} from '../../../src/lib/public_api';

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
    let testInstance: MdcRippleDirective;
    let testComponent: SimpleRipple;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleRipple);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcRippleDirective));
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
  });
});

describe('MdcSurfaceDirective', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcRippleModule,
      ],
      declarations: [
        SimpleSurface,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcSurfaceDirective;
    let testComponent: SimpleSurface;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleSurface);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcSurfaceDirective));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-ripple-surface if true', () => {
      testComponent.isSurfaceActive = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-ripple-surface')).toBe(true);
    });

    it('#should have mdc-ripple-surface if false', () => {
      testComponent.isSurfaceActive = false;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-ripple-surface')).toBe(false);
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
  <mdc-ripple [active]="isRippleActive" [primary]="isPrimary" [secondary]="isSecondary">Test</mdc-ripple>
  `,
})
class SimpleRipple {
  isRippleActive: boolean = true;
  isPrimary: boolean = false;
  isSecondary: boolean = false;
}

@Component({
  template: `
  <div [mdc-surface]="isSurfaceActive"></div>
  `,
})
class SimpleSurface {
  isSurfaceActive: boolean = true;
}
