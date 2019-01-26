import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, flush, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchMouseEvent } from '../testing/dispatch-events';

import { Platform, MdcSlider, MdcSliderModule } from '@angular-mdc/web';

describe('MdcSlider', () => {
  let fixture: ComponentFixture<any>;
  let platform: { isBrowser: boolean };

  beforeEach(fakeAsync(() => {
    // Set the default Platform override that can be updated before component creation.
    platform = { isBrowser: true };

    TestBed.configureTestingModule({
      imports: [MdcSliderModule, FormsModule, ReactiveFormsModule],
      declarations: [SingleSlider, SliderModelTest],
      providers: [
        { provide: Platform, useFactory: () => platform }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('Tests for SSR', () => {
    let sliderDebugElement: DebugElement;
    let sliderInstance: MdcSlider;
    let testComponent: SingleSlider;

    beforeEach(() => {
      // Set the default Platform override that can be updated before component creation.
      platform = { isBrowser: false };

      fixture = TestBed.createComponent(SingleSlider);
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(MdcSlider));
      sliderInstance = sliderDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-slider by default', () => {
      expect(sliderDebugElement.nativeElement.classList)
        .toContain('mdc-slider', 'Expected to have mdc-slider');
    });

    it('#should handle is not a browser', () => {
      platform.isBrowser = false;
      fixture.detectChanges();
    });

    it('#should set step to 5', () => {
      sliderInstance.step = 5;
      fixture.detectChanges();
      expect(sliderInstance.step).toBe(5);
    });

    it('#should set min to 15', () => {
      sliderInstance.min = 15;
      fixture.detectChanges();
      expect(sliderInstance.min).toBe(15);
    });

    it('#should set max to 200', () => {
      sliderInstance.max = 200;
      fixture.detectChanges();
      expect(sliderInstance.max).toBe(200);
    });
  });

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
      fixture.detectChanges();
      testComponent.isDiscrete = true;
      fixture.detectChanges();
      expect(sliderDebugElement.nativeElement.classList.contains('mdc-slider--display-markers')).toBe(true);
    });

    it('#should apply class mdc-slider--display-markers if discrete is true', () => {
      testComponent.isDiscrete = true;
      fixture.detectChanges();
      testComponent.hasMarkers = true;
      fixture.detectChanges();
      dispatchMouseEvent(sliderInstance.thumbContainer.nativeElement, 'mousedown');
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

    it('#should not set value if disabled', fakeAsync(() => {
      testComponent.isDisabled = true;
      fixture.detectChanges();
      testComponent.myValue = 70;
      fixture.detectChanges();
      expect(sliderInstance.value).toBe(10);
    }));

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

  describe('Slider with ngModel', () => {
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let sliderInstance: MdcSlider;
    let testComponent: SliderModelTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SliderModelTest);
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(MdcSlider));
      sliderNativeElement = sliderDebugElement.nativeElement;
      sliderInstance = sliderDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should return value of 15', fakeAsync(() => {
      testComponent.modelValue = 15;
      fixture.detectChanges();
      tick(10);
      expect(testComponent.modelValue).toBe(15);
      expect(sliderInstance.value).toBe(15);
      flush();
    }));
  });
});

/** Simple component for testing. */
@Component({
  template: `
    <mdc-slider
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

@Component({
  template: `
    <mdc-slider
      [(ngModel)]="modelValue"
      [max]="max"
      [min]="min"
      [step]="step"
      [discrete]="discrete"
      [markers]="markers"
      [disabled]="disabled">
    </mdc-slider>
  `,
})
class SliderModelTest {
  disabled: boolean;
  discrete: boolean;
  markers: boolean;
  modelValue: number = 10;
  max: number = 100;
  min: number = 0;
  step: number = 0;
}
