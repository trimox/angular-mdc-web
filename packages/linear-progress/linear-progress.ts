import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import {Platform} from '@angular/cdk/platform';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';
import {strings, MDCLinearProgressFoundation, MDCLinearProgressAdapter} from '@material/linear-progress';

@Component({
  moduleId: module.id,
  selector: 'mdc-linear-progress',
  exportAs: 'mdcLinearProgress',
  host: {
    'role': 'progressbar',
    'class': 'mdc-linear-progress',
    '[class.mdc-linear-progress--indeterminate]': '!determinate'
  },
  template: `
  <div class="mdc-linear-progress__buffering-dots"></div>
  <div class="mdc-linear-progress__buffer"></div>
  <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
   <span class="mdc-linear-progress__bar-inner"></span>
  </div>
  <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
   <span class="mdc-linear-progress__bar-inner"></span>
  </div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcLinearProgress implements AfterViewInit, OnDestroy {
  private _foundation: MDCLinearProgressFoundation | undefined;

  @Input()
  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    this._open = coerceBooleanProperty(value);
    this._open ? this._foundation?.open() : this._foundation?.close();
  }
  private _open = true;

  @Input()
  get determinate(): boolean {
    return this._determinate;
  }
  set determinate(value: boolean) {
    this._determinate = coerceBooleanProperty(value);
    this._foundation?.setDeterminate(this._determinate);
    this._changeDetectorRef.markForCheck();
  }
  private _determinate = false;

  @Input()
  get reversed(): boolean {
    return this._reversed;
  }
  set reversed(value: boolean) {
    this._reversed = coerceBooleanProperty(value);
    this._foundation?.setReverse(this._reversed);
    this._changeDetectorRef.markForCheck();
  }
  private _reversed = false;

  @Input()
  get progress(): number {
    return this._progress;
  }
  set progress(value: number) {
    this._progress = coerceNumberProperty(value);
    this._foundation?.setProgress(this._progress);
    this._changeDetectorRef.markForCheck();
  }
  private _progress = 0;

  @Input()
  get buffer(): number {
    return this._buffer || 0;
  }
  set buffer(value: number) {
    this._buffer = coerceNumberProperty(value);
    this._foundation?.setBuffer(this._buffer);
    this._changeDetectorRef.markForCheck();
  }
  private _buffer = 0;

  private _adapter: MDCLinearProgressAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    forceLayout: () => this._getHostElement().offsetWidth,
    getPrimaryBar: () => this._getHostElement().querySelector(strings.PRIMARY_BAR_SELECTOR),
    getBuffer: () => this._getHostElement().querySelector(strings.BUFFER_SELECTOR),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    setStyle: (el: HTMLElement, styleProperty: string, value: string) => el.style.setProperty(styleProperty, value),
    removeAttribute: (name: string) => this._getHostElement().removeAttribute(name),
    setAttribute: (name: string, value: string) => this._getHostElement().setAttribute(name, value)
  };

  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this._foundation = new MDCLinearProgressFoundation(this._adapter);
    if (this._platform.isBrowser) {
      this._foundation.init();
      this._changeDetectorRef.markForCheck();
      this._syncProgressWithFoundation();
    }
  }

  private _syncProgressWithFoundation(): void {
    Promise.resolve().then(() => {
      this.determinate = this._determinate;
      this.progress = this._progress;
      this.buffer = this._buffer;
    });
  }

  ngOnDestroy() {
    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
