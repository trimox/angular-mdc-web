import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { toNumber, toBoolean, isBrowser, EventRegistry } from '@angular-mdc/web/common';

import { MDCSliderAdapter } from '@material/slider/adapter';
import { MDCSliderFoundation } from '@material/slider';

export const MDC_SLIDER_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcSlider),
  multi: true
};

export class MdcSliderChange {
  constructor(
    public source: MdcSlider,
    public value: number) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-slider',
  exportAs: 'mdcSlider',
  template: `
    <div class="mdc-slider__track-container">
      <div #track class="mdc-slider__track"></div>
      <div #markercontainer *ngIf="markers" class="mdc-slider__track-marker-container"></div>
    </div>
    <div #thumbcontainer class="mdc-slider__thumb-container">
      <div *ngIf="discrete" class="mdc-slider__pin">
        <span #pin class="mdc-slider__pin-value-marker"></span>
      </div>
      <svg class="mdc-slider__thumb" width="21" height="21">
        <circle cx="10.5" cy="10.5" r="7.875"></circle>
      </svg>
      <div class="mdc-slider__focus-ring"></div>
    </div>
  `,
  providers: [
    MDC_SLIDER_CONTROL_VALUE_ACCESSOR,
    EventRegistry,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcSlider implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() tabIndex: number = 0;
  @Input() name: string | null = null;

  @Input()
  get discrete(): boolean { return this._discrete; }
  set discrete(value: boolean) {
    this.setDiscrete(value);
  }
  private _discrete: boolean = false;

  @Input()
  get markers(): boolean { return this._markers; }
  set markers(value: boolean) {
    this.setMarkers(value);
  }
  private _markers: boolean = false;

  @Input()
  get min(): number { return this._min; }
  set min(value: number) {
    this.setMin(value);
  }
  private _min: number = 0;

  @Input()
  get max(): number { return this._max; }
  set max(value: number) {
    this.setMax(value);
  }
  private _max: number = 100;

  @Input()
  get step(): number { return this._step; }
  set step(value: number) {
    this.setStep(value);
  }
  private _step: number = 0;

  @Input()
  get value(): number { return this._value; }
  set value(newValue: number) {
    this.setValue(newValue);
  }
  private _value: number = 0;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabled(value);
  }
  private _disabled: boolean = false;

  @Output() readonly change: EventEmitter<MdcSliderChange> = new EventEmitter<MdcSliderChange>();
  @Output() readonly input: EventEmitter<MdcSliderChange> = new EventEmitter<MdcSliderChange>();

  @HostBinding('class.mdc-slider') isHostClass = true;
  @HostBinding('attr.role') role: string = 'slider';
  @HostBinding('class.mdc-slider--discrete') get classDiscrete(): string {
    return this.discrete ? 'mdc-slider--discrete' : '';
  }
  @HostBinding('class.mdc-slider--display-markers') get classDisplayMarkers(): string {
    return this.markers && this.discrete ? 'mdc-slider--display-markers' : '';
  }

  @ViewChild('thumbcontainer') thumbContainer: ElementRef;
  @ViewChild('track') track: ElementRef;
  @ViewChild('pin') pinValueMarker: ElementRef;
  @ViewChild('markercontainer') trackMarkerContainer: ElementRef;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when radio has been touched */
  _onTouched = () => { };

  private _mdcAdapter: MDCSliderAdapter = {
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    addClass: (className: string) => this._renderer.addClass(this._getHostElement(), className),
    removeClass: (className: string) => this._renderer.removeClass(this._getHostElement(), className),
    getAttribute: (name: string) => this._getHostElement().getAttribute(name),
    setAttribute: (name: string, value: string) => this._renderer.setAttribute(this._getHostElement(), name, value),
    removeAttribute: (name: string) => this._renderer.removeAttribute(this._getHostElement(), name),
    computeBoundingRect: () => this._getHostElement().getBoundingClientRect(),
    getTabIndex: () => this._getHostElement().tabIndex,
    registerInteractionHandler: (type: string, handler: EventListener) =>
      this._registry.listen(type, handler, this._getHostElement()),
    deregisterInteractionHandler: (type: string, handler: EventListener) => this._registry.unlisten(type, handler),
    registerThumbContainerInteractionHandler: (type: string, handler: EventListener) => {
      if (this.thumbContainer) {
        this._registry.listen(type, handler, this.thumbContainer.nativeElement);
      }
    },
    deregisterThumbContainerInteractionHandler: (type: string, handler: EventListener) =>
      this._registry.unlisten(type, handler),
    registerBodyInteractionHandler: (type: string, handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen(type, handler, document.body);
      }
    },
    deregisterBodyInteractionHandler: (type: string, handler: EventListener) => this._registry.unlisten(type, handler),
    registerResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen('resize', handler, window);
      }
    },
    deregisterResizeHandler: (handler: EventListener) => this._registry.unlisten('resize', handler),
    notifyInput: () => {
      this.input.emit(new MdcSliderChange(this, this.getValue()));
      this._onTouched();
    },
    notifyChange: () => {
      this.change.emit(new MdcSliderChange(this, this.getValue()));
      this.setValue(this.getValue());
    },
    setThumbContainerStyleProperty: (propertyName: string, value: string) =>
      this._renderer.setStyle(this.thumbContainer.nativeElement, propertyName, value),
    setTrackStyleProperty: (propertyName: string, value: string) =>
      this._renderer.setStyle(this.track.nativeElement, propertyName, value),
    setMarkerValue: (value: number) => this.pinValueMarker.nativeElement.innerText = value,
    appendTrackMarkers: (numMarkers: number) => {
      for (let i = 0; i < numMarkers; i++) {
        const marker = this._renderer.createElement('div');
        this._renderer.addClass(marker, 'mdc-slider__track-marker');
        this._renderer.appendChild(this.trackMarkerContainer.nativeElement, marker);
      }
    },
    removeTrackMarkers: () => {
      while (this.trackMarkerContainer.nativeElement.firstChild) {
        this._renderer.removeChild(this.trackMarkerContainer.nativeElement,
          this.trackMarkerContainer.nativeElement.firstChild);
      }
    },
    setLastTrackMarkersStyleProperty: (propertyName: string, value: string) =>
      this._renderer.setStyle(this.trackMarkerContainer.nativeElement.lastChild, propertyName, value),
    isRTL: () => getComputedStyle(this._getHostElement()).direction === 'rtl'
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    setDisabled(disabled: boolean): void,
    isDisabled(): boolean,
    layout(): void,
    getValue(): number,
    setValue(value: number): void,
    getMax(): number,
    setMax(max: number): void,
    getMin(): number,
    setMin(min: number): void,
    getStep(): number,
    setStep(step: number): void,
    setupTrackMarker(): void
  };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._foundation = new MDCSliderFoundation(this._mdcAdapter);
    this._foundation.init();

    this.setMin(this.min);
    this.setMax(this.max);
    this.setStep(this.step);
    this.setValue(this.value);

    this._foundation.setupTrackMarker();
  }

  ngOnDestroy(): void {
    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  writeValue(value: any): void {
    if (value) {
      if (value !== this.value) {
        this.setValue(value);
      }
    }
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  setDiscrete(discrete: boolean): void {
    this._discrete = toBoolean(discrete);
  }

  setMarkers(markers: boolean): void {
    this._markers = toBoolean(markers);
  }

  setValue(value: number): void {
    if (this.disabled) { return; }

    const previousValue = this.value;
    this._value = value;

    if (!this._foundation) { return; }

    this._foundation.setValue(value);

    if (value !== previousValue) {
      this._onChange(value);
    }
    this._changeDetectorRef.markForCheck();
  }

  getValue(): number {
    return this._foundation.getValue();
  }

  layout(): void {
    this._foundation.layout();
  }

  setMin(min: number): void {
    if (min > this.max) { return; }
    this._min = min;

    if (!this._foundation) { return; }
    this._foundation.setMin(toNumber(min, 0));
    this._changeDetectorRef.markForCheck();
  }

  getMin(): number {
    return this._foundation.getMin();
  }

  setMax(max: number): void {
    if (this.min > max) { return; }
    this._max = max;

    if (!this._foundation) { return; }
    this._foundation.setMax(toNumber(max, 100));
    this._changeDetectorRef.markForCheck();
  }

  getMax(): number {
    return this._foundation.getMax();
  }

  setStep(step: number): void {
    this._step = step;

    if (!this._foundation) { return; }
    this._foundation.setStep(step);
    this._changeDetectorRef.markForCheck();
  }

  getStep(): number {
    return this._foundation.getStep();
  }

  setDisabled(disabled: boolean): void {
    this.setDisabledState(disabled);
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = toBoolean(disabled);

    if (!this._foundation) { return; }
    this._foundation.setDisabled(disabled);
    this._changeDetectorRef.markForCheck();
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
