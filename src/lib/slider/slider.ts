import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  Provider,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { toNumber, isBrowser } from '../common';
import { EventRegistry } from '../common/event-registry';

import { MDCSliderAdapter } from './adapter';
import { MDCSliderFoundation } from '@material/slider';

export const MDC_SLIDER_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcSlider),
  multi: true
};

export class MdcSliderChange {
  source: MdcSlider;
  value: number | null;
}

@Directive({
  selector: 'mdc-slider-track'
})
export class MdcSliderTrack {
  @HostBinding('class.mdc-slider__track') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-slider-track-marker'
})
export class MdcSliderTrackMarker {
  @HostBinding('class.mdc-slider__track-marker') isHostClass = true;
}

@Directive({
  selector: 'mdc-slider-track-marker-container',
})
export class MdcSliderTrackMarkerContainer {
  @HostBinding('class.mdc-slider__track-marker-container') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-slider-track-container'
})
export class MdcSliderTrackContainer {
  @HostBinding('class.mdc-slider__track-container') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-slider-pin'
})
export class MdcSliderPin {
  @HostBinding('class.mdc-slider__pin') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-slider-pin-value-marker'
})
export class MdcSliderPinValueMarker {
  @HostBinding('class.mdc-slider__pin-value-marker') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-slider-thumb-container',
})
export class MdcSliderThumbContainer {
  @HostBinding('class.mdc-slider__thumb-container') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: 'mdc-slider',
  template:
  `
    <mdc-slider-track-container>
      <mdc-slider-track></mdc-slider-track>
      <mdc-slider-track-marker-container *ngIf="markers"></mdc-slider-track-marker-container>
    </mdc-slider-track-container>
    <mdc-slider-thumb-container>
      <mdc-slider-pin *ngIf="discrete">
        <mdc-slider-pin-value-marker></mdc-slider-pin-value-marker>
      </mdc-slider-pin>
      <svg class="mdc-slider__thumb" width="21" height="21">
        <circle cx="10.5" cy="10.5" r="7.875"></circle>
      </svg>
      <div class="mdc-slider__focus-ring"></div>
    </mdc-slider-thumb-container>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [
    MDC_SLIDER_CONTROL_VALUE_ACCESSOR,
    EventRegistry,
  ],
})
export class MdcSlider implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @Input() tabIndex: number = 0;
  @Input() name: string | null = null;
  @Input() discrete: boolean = false;
  @Input() markers: boolean = false;
  @Input('min')
  get min_(): number { return this._foundation.getMin(); }
  set min_(value: number) {
    this.layout(); // required to calculate slider dimensions
    if (value < this.max_) {
      this._foundation.setMin(toNumber(value, 0));
    }
  }
  @Input('max')
  get max_(): number { return this._foundation.getMax(); }
  set max_(value: number) {
    this.layout(); // required to calculate slider dimensions
    if (this.min_ < value) {
      this._foundation.setMax(toNumber(value, 100));
    }
  }
  @Input()
  get value() { return this._foundation.getValue(); }
  set value(v: number | null) {
    this.layout(); // required to calculate slider dimensions
    this._foundation.setValue(v);
  }
  @Input()
  get step(): number { return this._foundation.getStep(); }
  set step(value: number) {
    this.layout(); // required to calculate slider dimensions
    this._foundation.setStep(value);
  }
  @Input()
  get disabled(): boolean { return this._foundation.isDisabled(); }
  set disabled(value: boolean) {
    this._foundation.setDisabled(value);
  }
  @Output('change') change_ = new EventEmitter<MdcSliderChange>();
  @Output('input') input_ = new EventEmitter<MdcSliderChange>();
  @HostBinding('class.mdc-slider') isHostClass = true;
  @HostBinding('attr.role') role: string = 'slider';
  @HostBinding('class.mdc-slider--discrete') get classDiscrete(): string {
    return this.discrete ? 'mdc-slider--discrete' : '';
  }
  @HostBinding('class.mdc-slider--display-markers') get classDisplayMarkers(): string {
    return this.markers && this.discrete ? 'mdc-slider--display-markers' : '';
  }
  @ViewChild(MdcSliderTrackContainer) trackContainer: MdcSliderTrackContainer;
  @ViewChild(MdcSliderThumbContainer) thumbContainer: MdcSliderThumbContainer;
  @ViewChild(MdcSliderTrack) track: MdcSliderTrack;
  @ViewChild(MdcSliderPinValueMarker) pinValueMarker: MdcSliderPinValueMarker;
  @ViewChild(MdcSliderTrackMarkerContainer) trackMarkerContainer: MdcSliderTrackMarkerContainer;

  onTouched: () => any = () => { };

  private _controlValueAccessorChangeFn: (value: any) => void = () => { };

  private _mdcAdapter: MDCSliderAdapter = {
    hasClass: (className: string) => {
      return this.elementRef.nativeElement.classList.contains(className);
    },
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    getAttribute: (name: string) => {
      return this.elementRef.nativeElement.getAttribute(name);
    },
    setAttribute: (name: string, value: string) => {
      this._renderer.setAttribute(this.elementRef.nativeElement, name, value);
    },
    removeAttribute: (name: string) => {
      this._renderer.removeAttribute(this.elementRef.nativeElement, name);
    },
    computeBoundingRect: () => {
      return this.elementRef.nativeElement.getBoundingClientRect();
    },
    getTabIndex: () => this.elementRef.nativeElement.tabIndex,
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen(this._renderer, type, handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten(type, handler);
    },
    registerThumbContainerInteractionHandler: (type: string, handler: EventListener) => {
      if (this.thumbContainer) {
        this._registry.listen(this._renderer, type, handler, this.thumbContainer.elementRef.nativeElement);
      }
    },
    deregisterThumbContainerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten(type, handler);
    },
    registerBodyInteractionHandler: (type: string, handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen(this._renderer, type, handler, document.body);
      }
    },
    deregisterBodyInteractionHandler: (type: string, handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten(type, handler);
      }
    },
    registerResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen(this._renderer, 'resize', handler, window);
      }
    },
    deregisterResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten('resize', handler);
      }
    },
    notifyInput: () => {
      this.input_.emit({
        source: this,
        value: this.value
      });
      this._controlValueAccessorChangeFn(this.value);
    },
    notifyChange: () => {
      this.change_.emit({
        source: this,
        value: this.value
      });
      this._controlValueAccessorChangeFn(this.value);
    },
    setThumbContainerStyleProperty: (propertyName: string, value: string) => {
      this._renderer.setStyle(this.thumbContainer.elementRef.nativeElement, propertyName, value);
    },
    setTrackStyleProperty: (propertyName: string, value: string) => {
      this._renderer.setStyle(this.track.elementRef.nativeElement, propertyName, value);
    },
    setMarkerValue: (value: number) => {
      this.pinValueMarker.elementRef.nativeElement.innerText = value;
    },
    appendTrackMarkers: (numMarkers: number) => {
      let marker: HTMLElement;

      for (let i = 0; i < numMarkers; i++) {
        marker = this._renderer.createElement('div');
        this._renderer.addClass(marker, 'mdc-slider__track-marker');
        this._renderer.appendChild(this.trackMarkerContainer.elementRef.nativeElement, marker);
      }
    },
    removeTrackMarkers: () => {
      while (this.trackMarkerContainer.elementRef.nativeElement.firstChild) {
        this.trackMarkerContainer.elementRef.nativeElement.removeChild(this.trackMarkerContainer.elementRef.nativeElement.firstChild);
      }
    },
    setLastTrackMarkersStyleProperty: (propertyName: string, value: string) => {
      this._renderer.setStyle(this.trackMarkerContainer.elementRef.nativeElement.lastChild, propertyName, value);
    },
    isRTL: () => this.direction === 'rtl',
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    setDisabled: Function,
    isDisabled: Function,
    layout: Function,
    getValue: Function,
    setValue: Function,
    getMax: Function,
    setMax: Function,
    getMin: Function,
    setMin: Function,
    getStep: Function,
    setStep: Function,
    setupTrackMarker: Function,
  } = new MDCSliderFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) {
  }

  ngAfterViewInit(): void {
    // these must be run AfterViewInit - do not change
    this._foundation.init();
    this._foundation.setupTrackMarker();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  layout(): void {
    this._foundation.layout();
  }

  setMin(amount: number): void {
    this._foundation.setMin(amount);
  }

  getMin(): number | null {
    return this._foundation.getMin();
  }

  setMax(amount: number): void {
    this._foundation.setMax(amount);
  }

  getMax(): number | null {
    return this._foundation.getMax();
  }

  setStep(amount: number = (this.step || 0)): void {
    this._foundation.setStep(amount);
  }

  getStep(): number | null {
    return this._foundation.getStep();
  }
}
