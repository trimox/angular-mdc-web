import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
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
  selector: 'mdc-slider',
  exportAs: 'mdcSlider',
  host: {
    'role': 'slider',
    'aria-orientation': 'horizontal',
    '[attr.tabindex]': 'tabIndex || 0',
    'class': 'mdc-slider',
    '[class.mdc-slider--discrete]': 'discrete',
    '[class.mdc-slider--display-markers]': 'markers && discrete',
    '(blur)': '_onTouched()',
  },
  templateUrl: 'slider.html',
  providers: [MDC_SLIDER_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcSlider extends MDCComponent<MDCSliderFoundation>
  implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  private _initialized = false;
  _root!: Element;

  @Input() tabIndex: number = 0;

  @Input()
  get discrete(): boolean {
    return this._discrete;
  }
  set discrete(value: boolean) {
    this._discrete = coerceBooleanProperty(value);
  }
  private _discrete = false;

  @Input()
  get markers(): boolean {
    return this._markers;
  }
  set markers(value: boolean) {
    this._markers = coerceBooleanProperty(value);
  }
  private _markers = false;

  @Input()
  get min(): number {
    return this._min;
  }
  set min(value: number) {
    const min = coerceNumberProperty(value);
    if (min !== this._min) {
      this._min = min;
    }
  }
  private _min: number = 0;

  @Input()
  get max(): number {
    return this._max;
  }
  set max(value: number) {
    const max = coerceNumberProperty(value);
    if (max !== this._max) {
      this._max = max;
    }
  }
  private _max: number = 100;

  @Input()
  get step(): number {
    return this._step;
  }
  set step(value: number) {
    const step = coerceNumberProperty(value, this._step);

    if (step !== this._step) {
      this._step = step;
    }
  }
  private _step: number = 1;

  @Input()
  get value(): number | null {
    if (this._value === null) {
      this.value = this.min;
    }
    return this._value;
  }
  set value(newValue: number | null) {
    this._value = coerceNumberProperty(newValue, null);
  }
  private _value: number | null = null;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  private _disabled = false;

  @Output() readonly change: EventEmitter<MdcSliderChange> = new EventEmitter<MdcSliderChange>();
  @Output() readonly input: EventEmitter<MdcSliderChange> = new EventEmitter<MdcSliderChange>();

  /**
   * Emits when the raw value of the slider changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   */
  @Output() readonly valueChange: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('thumbcontainer', {static: false}) thumbContainer!: ElementRef<HTMLElement>;
  @ViewChild('sliderThumb', {static: false}) _sliderThumb!: ElementRef<HTMLElement>;
  @ViewChild('track', {static: false}) track!: ElementRef<HTMLElement>;
  @ViewChild('pin', {static: false}) pinValueMarker?: ElementRef;
  @ViewChild('markercontainer', {static: false}) trackMarkerContainer?: ElementRef<HTMLElement>;

  /** Function when touched */
  _onTouched: () => any = () => {};

  /** Function when changed */
  _controlValueAccessorChangeFn: (value: number) => void = () => {};

  getDefaultFoundation() {
    const adapter: MDCSliderAdapter = {
      hasClass: (className: string) => this._root.classList.contains(className),
      addClass: (className: string) => this._root.classList.add(className),
      removeClass: (className: string) => this._root.classList.remove(className),
      getAttribute: (name: string) => this._root.getAttribute(name),
      setAttribute: (name: string, value: string) => this._root.setAttribute(name, value),
      removeAttribute: (name: string) => this._root.removeAttribute(name),
      computeBoundingRect: () => this._root.getBoundingClientRect(),
      getTabIndex: () => (<HTMLElement>this._root).tabIndex,
      registerInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        (<HTMLElement>this._root).addEventListener(evtType, handler),
      deregisterInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        (<HTMLElement>this._root).removeEventListener(evtType, handler),
      registerThumbContainerInteractionHandler:
        <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) => {
          this._ngZone.runOutsideAngular(() => {
            this.thumbContainer.nativeElement.addEventListener(evtType, handler, supportsPassiveEventListeners());
          });
        },
      deregisterThumbContainerInteractionHandler: <K extends EventType>(evtType: K,
        handler: SpecificEventListener<K>) =>
        this.thumbContainer.nativeElement.removeEventListener(evtType, handler, supportsPassiveEventListeners()),
      registerBodyInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        document.body.addEventListener(evtType, handler),
      deregisterBodyInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        document.body.removeEventListener(evtType, handler),
      registerResizeHandler: () => {},
      deregisterResizeHandler: () => {},
      notifyInput: () => {
        const newValue = this._foundation.getValue();
        if (newValue !== this.value) {
          this.value = newValue;
          this.input.emit(this._createChangeEvent(newValue));
        }
      },
      notifyChange: () => {
        this.value = this._foundation.getValue();
        this._emitChangeEvent(this.value!);
      },
      setThumbContainerStyleProperty: (propertyName: string, value: string) =>
        this.thumbContainer.nativeElement.style.setProperty(propertyName, value),
      setTrackStyleProperty: (propertyName: string, value: string) =>
        this.track.nativeElement.style.setProperty(propertyName, value),
      setMarkerValue: (value: number) => {
        this._changeDetectorRef.markForCheck();
        this.pinValueMarker!.nativeElement.innerText = value !== null ? value.toString() : null;
      },
      setTrackMarkers: (step: number, max: number, min: number) =>
        this.trackMarkerContainer!.nativeElement.style.setProperty('background',
          this._getTrackMarkersBackground(step, min, max)),
      isRTL: () => this._platform.isBrowser ?
        window.getComputedStyle(this._root).getPropertyValue('direction') === 'rtl' : false,
    };
    return new MDCSliderFoundation(adapter);
  }

  constructor(
    private _platform: Platform,
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    @Attribute('tabindex') tabIndex: string) {
    super(elementRef);

    this.tabIndex = parseInt(tabIndex, 10) || 0;
    this._root = this.elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this._initialized) {
      return;
    }

    if (changes['step']) {
      this._syncStepWithFoundation();
    }
    if (changes['max']) {
      this._syncMaxWithFoundation();
    }
    if (changes['min']) {
      this._syncMinWithFoundation();
    }
    if (changes['value']) {
      this._syncValueWithFoundation();
    }
    if (changes['markers'] || changes['discrete']) {
      this._refreshTrackMarkers();
    }
  }

  async _asyncInitializeFoundation(): Promise<void> {
    this._foundation.init();
  }

  ngAfterViewInit(): void {
    if (this._platform.isBrowser) {
      this._initialized = true;
      this._asyncInitializeFoundation()
        .then(() => {
          this._syncStepWithFoundation();
          this._syncMaxWithFoundation();
          this._syncMinWithFoundation();
          this._syncValueWithFoundation();

          this._foundation.setupTrackMarker();
          this._loadListeners();
          this._changeDetectorRef.markForCheck();
        });
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    this.destroy();
  }

  writeValue(value: any): void {
    this.value = value;
    this._syncValueWithFoundation();
  }

  registerOnChange(fn: any): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = coerceBooleanProperty(disabled);
    this._foundation.setDisabled(disabled);
    this._changeDetectorRef.markForCheck();
  }

  layout(): void {
    this._foundation.layout();
  }

  private _loadListeners(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent(window, 'resize')
        .pipe(auditTime(16), takeUntil(this._destroyed))
        .subscribe(() => this.layout()));
  }

  private _syncValueWithFoundation(): void {
    this._foundation.setValue(this.value!);
  }

  private _syncStepWithFoundation(): void {
    this._foundation.setStep(this.step);
  }

  private _syncMinWithFoundation(): void {
    this._foundation.setMin(this.min);
  }

  private _syncMaxWithFoundation(): void {
    this._foundation.setMax(this.max);
  }

  private _createChangeEvent(newValue: number): MdcSliderChange {
    return new MdcSliderChange(this, newValue);
  }

  private _emitChangeEvent(newValue: number) {
    this._controlValueAccessorChangeFn(newValue);
    this.valueChange.emit(newValue);
    this.change.emit(this._createChangeEvent(newValue));
  }

  /** Keep calculation in css for better rounding/subpixel behavior. */
  private _getTrackMarkersBackground(step: number, min: number, max: number): string {
    const stepStr = step.toLocaleString();
    const maxStr = max.toLocaleString();
    const minStr = min.toLocaleString();
    const markerAmount = `((${maxStr} - ${minStr}) / ${stepStr})`;
    const markerWidth = `2px`;
    const markerBkgdImage = `linear-gradient(to right, currentColor ${markerWidth}, transparent 0)`;
    const markerBkgdLayout = `0 center / calc((100% - ${markerWidth}) / ${markerAmount}) 100% repeat-x`;
    return `${markerBkgdImage} ${markerBkgdLayout}`;
  }

  /** Method that ensures that track markers are refreshed. */
  private _refreshTrackMarkers() {
    (this._foundation as any).hasTrackMarker_ = this.markers;
    this._foundation.setupTrackMarker();
  }
}
