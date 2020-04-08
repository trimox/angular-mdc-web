import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, flush, tick} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Platform} from '@angular/cdk/platform';

import {dispatchMouseEvent, dispatchFakeEvent} from '@angular-mdc/web/testing';

import {MdcSlider, MdcSliderModule} from './index';

describe('MdcSlider', () => {
  let fixture: ComponentFixture<any>;
  let platform: {isBrowser: boolean};

  beforeEach(fakeAsync(() => {
    // Set the default Platform override that can be updated before component creation.
    platform = {isBrowser: true};

    TestBed.configureTestingModule({
      imports: [MdcSliderModule, FormsModule, ReactiveFormsModule],
      declarations: [SingleSlider, SliderModelTest],
      providers: [
        {provide: Platform, useFactory: () => platform}
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
      platform = {isBrowser: false};

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
      testComponent.discrete = true;
      fixture.detectChanges();
      expect(sliderDebugElement.nativeElement.classList.contains('mdc-slider--discrete')).toBe(true);
    }));

    it('#should NOT apply class mdc-slider--display-markers unless discrete is true', () => {
      testComponent.markers = true;
      fixture.detectChanges();
      expect(sliderDebugElement.nativeElement.classList.contains('mdc-slider--display-markers')).toBe(false);
    });

    it('#should apply class mdc-slider--display-markers if discrete is true', () => {
      testComponent.markers = true;
      testComponent.discrete = true;
      fixture.detectChanges();
      expect(sliderDebugElement.nativeElement.classList.contains('mdc-slider--display-markers')).toBe(true);
    });

    it('#should apply class mdc-slider--display-markers if discrete is true', () => {
      testComponent.discrete = true;
      fixture.detectChanges();
      testComponent.markers = true;
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
      testComponent.step = 2;
      fixture.detectChanges();
      expect(sliderInstance.step).toBe(2);
      expect(sliderInstance.value).toBe(10);
    });

    it('#should not re-set step to 3', () => {
      sliderInstance.step = 3;
      fixture.detectChanges();
      sliderInstance.step = 3;
      fixture.detectChanges();
      expect(sliderInstance.step).toBe(3);
    });

    it('#should set min to 10', () => {
      testComponent.min = 10;
      fixture.detectChanges();
      expect(sliderInstance.min).toBe(10);
    });

    it('#should set max to 150', () => {
      testComponent.max = 150;
      fixture.detectChanges();
      expect(sliderInstance.max).toBe(150);
    });

    it('#should set disabled to true', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(sliderInstance.disabled).toBe(true);
    });

    it('#should return value of 15', fakeAsync(() => {
      testComponent.value = 15;
      fixture.detectChanges();
      expect(sliderInstance.value).toBe(15);
    }));

    it('#should return value of 25', fakeAsync(() => {
      sliderInstance.value = 25;
      fixture.detectChanges();
      expect(sliderInstance.value).toBe(25);
    }));

    it('#should dispatch an event when the window is resized', fakeAsync(() => {
      dispatchFakeEvent(window, 'resize');
      tick(150);
      fixture.detectChanges();
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
      [value]="value"
      [max]="max"
      [min]="min"
      [step]="step"
      [discrete]="discrete"
      [markers]="markers"
      [disabled]="disabled">
    </mdc-slider>
  `,
})
class SingleSlider {
  disabled: boolean;
  discrete: boolean;
  markers: boolean;
  value: number = 10;
  max: number = 100;
  min: number = 0;
  step: number = 0;
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
