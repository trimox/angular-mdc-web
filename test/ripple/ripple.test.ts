import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed, fakeAsync, flush} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Platform} from '@angular/cdk/platform';

import {dispatchMouseEvent} from '../testing/dispatch-events';

import {
  MdcRippleModule,
  MdcRippleDirective
} from '@angular-mdc/web';

describe('MdcRippleComponent', () => {
  let fixture: ComponentFixture<any>;
  let platform: {isBrowser: boolean};

  beforeEach(fakeAsync(() => {
    // Set the default Platform override that can be updated before component creation.
    platform = {isBrowser: true};

    TestBed.configureTestingModule({
      imports: [MdcRippleModule],
      declarations: [SimpleTest, SimpleRippleTest],
      providers: [
        {provide: Platform, useFactory: () => platform}
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcRippleDirective;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcRippleDirective));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.injector.get(MdcRippleDirective);
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should apply primary class modifier', () => {
      testComponent.primary = true;
      fixture.detectChanges();
      expect(testComponent.demodiv.nativeElement.classList.contains('mdc-ripple-surface--primary')).toBe(true);
      expect(testInstance.primary).toBe(true);
    });

    it('#should apply secondary class modifier', () => {
      testComponent.secondary = true;
      fixture.detectChanges();
      expect(testComponent.demodiv.nativeElement.classList.contains('mdc-ripple-surface--accent')).toBe(true);
      expect(testInstance.secondary).toBe(true);
    });

    it('#should be disabled', () => {
      testComponent.disabled = true;
      fixture.detectChanges();

      expect(testInstance.disabled).toBe(true);

      dispatchMouseEvent(testComponent.demodiv.nativeElement, 'mousedown');
      fixture.detectChanges();
    });

    it('#should be unbounded', () => {
      testComponent.unbounded = true;
      fixture.detectChanges();
      expect(testInstance.unbounded).toBe(true);
    });

    it('#should not do some ripple functions', () => {
      platform.isBrowser = false;
      fixture.detectChanges();

      dispatchMouseEvent(testComponent.demodiv.nativeElement, 'mousedown');
      fixture.detectChanges();

      dispatchMouseEvent(testComponent.demodiv.nativeElement, 'mouseup');
      fixture.detectChanges();
    });

    it('#should have null attachTo', fakeAsync(() => {
      testInstance.attachTo = null;
      fixture.detectChanges();
      flush();

      testInstance.attachTo = testComponent.demodiv.nativeElement;
      fixture.detectChanges();
      flush();
    }));

    it('#should not do some ripple functions', () => {
      platform.isBrowser = false;
      fixture.detectChanges();

      dispatchMouseEvent(testComponent.demodiv.nativeElement, 'mouseup');
      fixture.detectChanges();
    });
  });

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcRippleDirective;
    let testComponent: SimpleRippleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleRippleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcRippleDirective));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.injector.get(MdcRippleDirective);
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have data attribute is-unbounded', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      expect(testNativeElement.getAttribute('data-mdc-ripple-is-unbounded')).toBeDefined();
    }));
  });
});

@Component({
  template: `
  <mdc-ripple #demoripple [unbounded]="unbounded" [primary]="primary" [secondary]="secondary"
   [attachTo]="demodiv" [disabled]="disabled">
    <div #demodiv>
      Click me
    </div>
  </mdc-ripple>
  `
})
class SimpleTest {
  @ViewChild('demodiv', {static: false}) demodiv;
  primary: boolean;
  secondary: boolean;
  disabled: boolean;
  unbounded: boolean;
}

@Component({
  template: `
  <div mdcRipple></div>
  `
})
class SimpleRippleTest {}
