import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MdcSlider, MdcSliderModule } from '../../../src/lib/public_api';

describe('MdcSliderComponent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcSliderModule, FormsModule, ReactiveFormsModule],
      declarations: [
        SingleSlider,
      ]
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

    it('#should have mdc-button by default', () => {
      expect(sliderDebugElement.nativeElement.classList)
        .toContain('mdc-slider', 'Expected to have mdc-slider');
    });

    it('#should apply class mdc-slider--discrete based on property', () => {
      testComponent.isDiscrete = true;
      fixture.detectChanges();
      expect(sliderDebugElement.nativeElement.classList.contains('mdc-slider--discrete')).toBe(true);
    });

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

    it('#should set step to 2', () => {
      sliderInstance.setStep(2);
      fixture.detectChanges();
      expect(sliderInstance.getStep()).toBe(2);
      expect(sliderInstance.step).toBe(2);
      expect(sliderInstance.value).toBe(10);
    });

    it('#should set min to 10', () => {
      sliderInstance.setMin(10);
      fixture.detectChanges();
      expect(sliderInstance.getMin()).toBe(10);
    });

    it('#should set max to 150', () => {
      sliderInstance.setMax(150);
      fixture.detectChanges();
      expect(sliderInstance.getMax()).toBe(150);
    });

    it('#should set disabled to true', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(sliderInstance.disabled).toBe(true);
    });
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
      [tabIndex]="myTabIndex"
      [discrete]="isDiscrete"
      [markers]="hasMarkers"
      [disabled]="isDisabled">
    </mdc-slider>
  `,
})
class SingleSlider {
  isDisabled: boolean = false;
  isDiscrete: boolean = false;
  hasMarkers: boolean = false;
  myValue: number = 10;
  myMax: number = 100;
  myMin: number = 0;
  myStep: number = 0;
  myTabIndex: number = 0;
}
