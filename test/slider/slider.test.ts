import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchMouseEvent } from '../testing/dispatch-events';

import { MdcSlider, MdcSliderModule } from '@angular-mdc/web';

describe('MdcSlider', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcSliderModule, FormsModule, ReactiveFormsModule],
      declarations: [SingleSlider]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let sliderInstance: MdcSlider;
    let testComponent: SingleSlider;

    beforeEach(() => {
      fixture = TestBed.createComponent(SingleSlider);
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(MdcSlider));
      sliderNativeElement = sliderDebugElement.nativeElement;
      sliderInstance = sliderDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-slider by default', () => {
      expect(sliderDebugElement.nativeElement.classList)
        .toContain('mdc-slider', 'Expected to have mdc-slider');
    });

    it('#should apply class mdc-slider--discrete based on property', fakeAsync(() => {
      testComponent.isDiscrete = true;
      fixture.detectChanges();
      expect(sliderDebugElement.nativeElement.classList.contains('mdc-slider--discrete')).toBe(true);
    }));

    it('#should NOT apply class mdc-slider--display-markers unless discrete is true', () => {
      testComponent.hasMarkers = true;
      fixture.detectChanges();
      expect(sliderDebugElement.nativeElement.classList.contains('mdc-slider--display-markers')).toBe(false);
    });

    it('#should apply class mdc-slider--display-markers if discrete is true', () => {
      testComponent.hasMarkers = true;
      testComponent.isDiscrete = true;
      fixture.detectChanges();
      expect(sliderDebugElement.nativeElement.classList.contains('mdc-slider--display-markers')).toBe(true);
    });

    it('#should handle document click', () => {
      dispatchMouseEvent(sliderNativeElement, 'touchstart');
      fixture.detectChanges();

      dispatchMouseEvent(sliderNativeElement, 'touchend');
      fixture.detectChanges();
    });

    it('#should set step to 2', () => {
      sliderInstance.step = 2;
      fixture.detectChanges();
      expect(sliderInstance.step).toBe(2);
      expect(sliderInstance.value).toBe(10);
    });

    it('#should set min to 10', () => {
      sliderInstance.min = 10;
      fixture.detectChanges();
      expect(sliderInstance.min).toBe(10);
    });

    it('#should NOT set min to 101', () => {
      sliderInstance.min = 101;
      fixture.detectChanges();
      expect(sliderInstance.min).toBeLessThanOrEqual(100);
    });

    it('#should set max to 150', () => {
      sliderInstance.max = 150;
      fixture.detectChanges();
      expect(sliderInstance.max).toBe(150);
    });

    it('#should NOT set max to -1', () => {
      sliderInstance.max = -1;
      fixture.detectChanges();
      expect(sliderInstance.max).toBeGreaterThan(0);
    });

    it('#should set disabled to true', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(sliderInstance.disabled).toBe(true);
    });

    it('#should return value of 15', fakeAsync(() => {
      testComponent.myValue = 15;
      fixture.detectChanges();
      expect(sliderInstance.value).toBe(15);
    }));

    it('#should return value of 15', fakeAsync(() => {
      sliderInstance.setValue(25);
      fixture.detectChanges();
      expect(sliderInstance.value).toBe(25);
    }));
  });
});

/** Simple component for testing. */
@Component({
  template: `
    <mdc-slider
      [(ngModel)]="myValue"
      [value]="myValue"
      [max]="myMax"
      [min]="myMin"
      [step]="myStep"
      [discrete]="isDiscrete"
      [markers]="hasMarkers"
      [disabled]="isDisabled">
    </mdc-slider>
  `,
})
class SingleSlider {
  isDisabled: boolean;
  isDiscrete: boolean;
  hasMarkers: boolean;
  myValue: number = 10;
  myMax: number = 100;
  myMin: number = 0;
  myStep: number = 0;
}
