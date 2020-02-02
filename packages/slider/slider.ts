import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';
import {Platform, supportsPassiveEventListeners} from '@angular/cdk/platform';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil, auditTime} from 'rxjs/operators';

import {MDCComponent} from '@angular-mdc/web/base';

import {EventType, SpecificEventListener} from '@material/base/types';
import {MDCSliderFoundation, MDCSliderAdapter} from '@material/slider';

export const MDC_SLIDER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcSlider),
  multi: true
};

export class MdcSliderChange {
  constructor(
    public source: MdcSlider,
    public value: number) {}
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
  </div>`,
  providers: [MDC_SLIDER_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcSlider extends MDCComponent<MDCSliderFoundation>
  implements AfterViewInit, OnDestroy, ControlValueAccessor {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  private _initialized = false;

  @Input()
  get discrete(): boolean { return this._discrete; }
  set discrete(value: boolean) {
    this._discrete = coerceBooleanProperty(value);
    if (this._foundation) {
      if (this._discrete && this.markers) {
        this._foundation.setupTrackMarker();
      }
    }
  }
  private _discrete: boolean = false;

  @Input()
  get markers(): boolean { return this._markers; }
  set markers(value: boolean) {
    this._markers = coerceBooleanProperty(value);
    if (this._foundation) {
      if (this._markers && this.discrete) {
        this._foundation.setupTrackMarker();
      }
    }
  }
  private _markers: boolean = false;

  @Input()
  get min(): number { return this._min; }
  set min(value: number) {
    const min = coerceNumberProperty(value, this._min);
    if (min > this._max) { return; }

    if (min !== this._min) {
      this._min = min;
      if (this._foundation && this._initialized) {
        this._foundation.setMin(this._min);
      }
      this._changeDetectorRef.markForCheck();
    }
  }
  private _min: number = 0;

  @Input()
  get max(): number { return this._max; }
  set max(value: number) {
    const max = coerceNumberProperty(value, this._max);
    if (max < this._min) { return; }

    if (max !== this._max) {
      this._max = max;
      if (this._foundation && this._initialized) {
        this._foundation.setMax(this._max);
      }
      this._changeDetectorRef.markForCheck();
    }
  }
  private _max: number = 100;

  @Input()
  get step(): number { return this._step; }
  set step(value: number) {
    const step = coerceNumberProperty(value, this._step);

    if (step !== this._step) {
      this._step = step;
      if (this._foundation && this._initialized) {
        this._foundation.setStep(this._step);
      }
      this._changeDetectorRef.markForCheck();
    }
  }
  private _step: number = 0;

  @Input()
  get value(): number { return this._value; }
  set value(newValue: number) {
    this.setValue(newValue, true);
  }
  private _value: number = 0;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  private _disabled: boolean = false;

  @Output() readonly change: EventEmitter<MdcSliderChange> = new EventEmitter<MdcSliderChange>();
  @Output() readonly input: EventEmitter<MdcSliderChange> = new EventEmitter<MdcSliderChange>();

  @ViewChild('thumbcontainer', {static: false}) thumbContainer!: ElementRef<HTMLElement>;
  @ViewChild('sliderThumb', {static: false}) _sliderThumb!: ElementRef<HTMLElement>;
  @ViewChild('track', {static: false}) track!: ElementRef<HTMLElement>;
  @ViewChild('pin', {static: false}) pinValueMarker?: ElementRef;
  @ViewChild('markercontainer', {static: false}) trackMarkerContainer?: ElementRef<HTMLElement>;

  /** View to model callback called when value changes */
  _onChanged: (value: any) => void = () => {};

  /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
  _onTouched: () => any = () => {};

  getDefaultFoundation() {
    const adapter: MDCSliderAdapter = {
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      getAttribute: (name: string) => this._getHostElement().getAttribute(name),
      setAttribute: (name: string, value: string) => this._getHostElement().setAttribute(name, value),
      removeAttribute: (name: string) => this._getHostElement().removeAttribute(name),
      computeBoundingRect: () => this._getHostElement().getBoundingClientRect(),
      getTabIndex: () => this._getHostElement().tabIndex,
      registerInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        this._getHostElement().addEventListener(evtType, handler, supportsPassiveEventListeners()),
      deregisterInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        this._getHostElement().removeEventListener(evtType, handler, supportsPassiveEventListeners()),
      registerThumbContainerInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        this.thumbContainer.nativeElement.addEventListener(evtType, handler, supportsPassiveEventListeners()),
      deregisterThumbContainerInteractionHandler: <K extends EventType>(evtType: K,
        handler: SpecificEventListener<K>) =>
        this.thumbContainer.nativeElement.removeEventListener(evtType, handler, supportsPassiveEventListeners()),
      registerBodyInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        document.body.addEventListener(evtType, handler),
      deregisterBodyInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        document.body.removeEventListener(evtType, handler),
      registerResizeHandler: () => {},
      deregisterResizeHandler: () => {},
      notifyInput: () => this._onInput(),
      notifyChange: () => this._onChange(),
      setThumbContainerStyleProperty: (propertyName: string, value: string) =>
        this.thumbContainer.nativeElement.style.setProperty(propertyName, value),
      setTrackStyleProperty: (propertyName: string, value: string) =>
        this.track.nativeElement.style.setProperty(propertyName, value),
      setMarkerValue: (value: number) =>
        this.pinValueMarker!.nativeElement.innerText = value !== null ? value.toString() : null,
      setTrackMarkers: (step: number, max: number, min: number) => {
        const stepStr = step.toLocaleString();
        const maxStr = max.toLocaleString();
        const minStr = min.toLocaleString();
        // keep calculation in css for better rounding/subpixel behavior
        const markerAmount = `((${maxStr} - ${minStr}) / ${stepStr})`;
        const markerWidth = `2px`;
        const markerBkgdImage = `linear-gradient(to right, currentColor ${markerWidth}, transparent 0)`;
        const markerBkgdLayout = `0 center / calc((100% - ${markerWidth}) / ${markerAmount}) 100% repeat-x`;
        const markerBkgdShorthand = `${markerBkgdImage} ${markerBkgdLayout}`;
        this.trackMarkerContainer!.nativeElement.style.setProperty('background', markerBkgdShorthand);
      },
      isRTL: () => getComputedStyle(this._getHostElement()).direction === 'rtl'
    };
    return new MDCSliderFoundation(adapter);
  }

  constructor(
    private _platform: Platform,
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) {
    super(elementRef);
  }

  ngAfterViewInit(): void {
    if (this._platform.isBrowser) {
      this._foundation.init();
      this._initializeSelection();
      this._foundation.setupTrackMarker();
      this._loadListeners();
      this._initialized = true;
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  writeValue(value: any): void {
    this.setValue(value);
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }

  setValue(value: number, isUserInput?: boolean): void {
    if (this.disabled) { return; }

    const newValue = coerceNumberProperty(value, this.min);
    this._value = Math.round(newValue);

    if (this._foundation && this._initialized) {
      this._foundation.setValue(this._value);
    }

    if (isUserInput) {
      this._onChanged(this._value);
    }
    this._changeDetectorRef.markForCheck();
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = coerceBooleanProperty(disabled);

    if (!this._foundation) { return; }
    this._foundation.setDisabled(this._disabled);
    this._changeDetectorRef.markForCheck();
  }

  layout(): void {
    this._foundation.layout();
  }

  private _onInput(): void {
    this.setValue(this._foundation.getValue(), true);
    this.input.emit(new MdcSliderChange(this, this._value));
  }

  private _onChange(): void {
    this.setValue(this._foundation.getValue(), true);
    this.change.emit(new MdcSliderChange(this, this._value));
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      this._foundation.setMin(this._min);
      this._foundation.setMax(this._max);
      this._foundation.setStep(this._step);
      this._foundation.setValue(this._value);
    });
  }

  private _loadListeners(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent(window, 'resize')
        .pipe(auditTime(16), takeUntil(this._destroyed))
        .subscribe(() => this.layout()));
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
