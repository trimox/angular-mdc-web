import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  Provider,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { toNumber, toBoolean, Platform } from '@angular-mdc/web/common';

import { strings } from '@material/slider/constants';
import { MDCSliderFoundation } from '@material/slider/index';

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
  host: {
    'role': 'slider',
    'tabindex': '0',
    'class': 'mdc-slider',
    '[class.mdc-slider--discrete]': 'discrete',
    '[class.mdc-slider--display-markers]': 'markers && discrete'
  },
  template: `
    <div class="mdc-slider__track-container">
      <div #track class="mdc-slider__track"></div>
      <div #markercontainer *ngIf="markers" class="mdc-slider__track-marker-container"></div>
    </div>
    <div #thumbcontainer class="mdc-slider__thumb-container">
      <div *ngIf="discrete" class="mdc-slider__pin">
        <span #pin class="mdc-slider__pin-value-marker"></span>
      </div>
      <svg #sliderThumb
        class="mdc-slider__thumb"
        width="21" height="21"
        focusable="false">
        <circle cx="10.5" cy="10.5" r="7.875"></circle>
      </svg>
      <div class="mdc-slider__focus-ring"></div>
    </div>
  `,
  providers: [MDC_SLIDER_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcSlider implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input()
  get discrete(): boolean { return this._discrete; }
  set discrete(value: boolean) {
    this._discrete = toBoolean(value);
  }
  private _discrete: boolean;

  @Input()
  get markers(): boolean { return this._markers; }
  set markers(value: boolean) {
    this._markers = toBoolean(value);
  }
  private _markers: boolean;

  @Input()
  get min(): number { return this._min; }
  set min(value: number) {
    const min = toNumber(value);
    if (min > this.max) { return; }

    this._min = min;
    if (this._foundation) {
      this._foundation.setMin(toNumber(min, 0));
    }
    this._changeDetectorRef.markForCheck();
  }
  private _min: number = 0;

  @Input()
  get max(): number { return this._max; }
  set max(value: number) {
    const max = toNumber(value);
    if (this.min > max) { return; }

    this._max = max;
    if (this._foundation) {
      this._foundation.setMax(toNumber(max, 100));
    }
    this._changeDetectorRef.markForCheck();
  }
  private _max: number = 100;

  @Input()
  get step(): number { return this._step; }
  set step(value: number) {
    this._step = toNumber(value);

    if (this._foundation) {
      this._foundation.setStep(this._step);
    }
    this._changeDetectorRef.markForCheck();
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

  @ViewChild('thumbcontainer') thumbContainer: ElementRef<HTMLElement>;
  @ViewChild('sliderThumb') _sliderThumb: ElementRef<HTMLElement>;
  @ViewChild('track') track: ElementRef<HTMLElement>;
  @ViewChild('pin') pinValueMarker: ElementRef;
  @ViewChild('markercontainer') trackMarkerContainer: ElementRef<HTMLElement>;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
  _onTouched: () => any = () => { };

  private _createAdapter() {
    return {
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      getAttribute: (name: string) => this._getHostElement().getAttribute(name),
      setAttribute: (name: string, value: string) => this._getHostElement().setAttribute(name, value),
      removeAttribute: (name: string) => this._getHostElement().removeAttribute(name),
      computeBoundingRect: () => {
        if (!this._platform.isBrowser) { return; }

        return this._getHostElement().getBoundingClientRect();
      },
      getTabIndex: () => this._getHostElement().tabIndex,
      registerInteractionHandler: (type: string, handler: EventListener) =>
        this._getHostElement().addEventListener(type, handler),
      deregisterInteractionHandler: (type: string, handler: EventListener) =>
        this._getHostElement().removeEventListener(type, handler),
      registerThumbContainerInteractionHandler: (type: string, handler: EventListener) => {
        if (this.thumbContainer) {
          this.thumbContainer.nativeElement.addEventListener(type, handler);
        }
      },
      deregisterThumbContainerInteractionHandler: (type: string, handler: EventListener) =>
        this.thumbContainer.nativeElement.removeEventListener(type, handler),
      registerBodyInteractionHandler: (type: string, handler: EventListener) => {
        if (!this._platform.isBrowser) { return; }

        document.body.addEventListener(type, handler);
      },
      deregisterBodyInteractionHandler: (type: string, handler: EventListener) => {
        if (!this._platform.isBrowser) { return; }

        document.body.removeEventListener(type, handler);
      },
      registerResizeHandler: (handler: EventListener) => {
        if (!this._platform.isBrowser) { return; }

        window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: (handler: EventListener) => {
        if (!this._platform.isBrowser) { return; }

        window.removeEventListener('resize', handler);
      },
      notifyInput: () => {
        this.input.emit(new MdcSliderChange(this, this._foundation.getValue()));
        this._onTouched();
      },
      notifyChange: () => {
        this.change.emit(new MdcSliderChange(this, this._value));
        this.setValue(this._foundation.getValue());
      },
      setThumbContainerStyleProperty: (propertyName: string, value: string) =>
        this.thumbContainer.nativeElement.style.setProperty(propertyName, value),
      setTrackStyleProperty: (propertyName: string, value: string) =>
        this.track.nativeElement.style.setProperty(propertyName, value),
      setMarkerValue: (value: number) =>
        this.pinValueMarker.nativeElement.innerText = value !== null ? value.toString() : null,
      appendTrackMarkers: (numMarkers: number) => {
        const docFrag = document.createDocumentFragment();
        for (let i = 0; i < numMarkers; i++) {
          const marker = document.createElement('div');
          marker.classList.add('mdc-slider__track-marker');
          docFrag.appendChild(marker);
        }
        this.trackMarkerContainer.nativeElement.appendChild(docFrag);
      },
      removeTrackMarkers: () => {
        while (this.trackMarkerContainer.nativeElement.firstChild) {
          this.trackMarkerContainer.nativeElement
            .removeChild(this.trackMarkerContainer.nativeElement.firstChild);
        }
      },
      setLastTrackMarkersStyleProperty: (propertyName: string, value: string) => {
        const lastTrackMarker =
          this._getHostElement().querySelector(strings.LAST_TRACK_MARKER_SELECTOR);
        lastTrackMarker.style.setProperty(propertyName, value);
      },
      isRTL: () => getComputedStyle(this._getHostElement()).direction === 'rtl'
    };
  }

  private _foundation: {
    init(): void,
    destroy(): void,
    setDisabled(disabled: boolean): void,
    layout(): void,
    setValue(value: number): void,
    getValue(): number,
    setMax(max: number): void,
    setMin(min: number): void,
    setStep(step: number): void,
    setupTrackMarker(): void
  };

  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    if (this._platform.isBrowser) {
      this._foundation = new MDCSliderFoundation(this._createAdapter());
      this._foundation.init();

      this._foundation.setMin(this.min);
      this._foundation.setMax(this.max);
      this._foundation.setStep(this.step);
      this._foundation.setValue(this.value);

      this._foundation.setupTrackMarker();
    }
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

  setValue(value: number): void {
    if (this.disabled) { return; }

    const previousValue = this.value;
    this._value = value;

    if (this._foundation) {
      this._foundation.setValue(value);
    }

    if (value !== previousValue) {
      this._onChange(value);
    }
    this._changeDetectorRef.markForCheck();
  }

  setDisabled(disabled: boolean): void {
    this.setDisabledState(disabled);
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = toBoolean(disabled);

    if (!this._foundation) { return; }
    this._foundation.setDisabled(this._disabled);
    this._changeDetectorRef.markForCheck();
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
