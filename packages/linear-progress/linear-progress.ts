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
import { toBoolean, toNumber } from '@angular-mdc/web/common';
import { MDCLinearProgressAdapter } from './adapter';

import { MDCLinearProgressFoundation } from '@material/linear-progress';

@Component({
  moduleId: module.id,
  selector: 'mdc-linear-progress',
  exportAs: 'mdcLinearProgress',
  host: {
    'role': 'progressbar',
    'class': 'mdc-linear-progress',
    '[class.mdc-linear-progress--secondary]': 'secondary',
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
  </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcLinearProgress implements AfterViewInit, OnDestroy {
  @Input()
  get open(): boolean { return this._open; }
  set open(value: boolean) {
    if (this._open !== value) {
      this._open = toBoolean(value);
      this._open ? this._foundation.open() : this._foundation.close();
    }
  }
  private _open: boolean = true;

  @Input()
  get determinate(): boolean { return this._determinate; }
  set determinate(value: boolean) {
    this.setDeterminate(value);
  }
  private _determinate: boolean;

  @Input()
  get reversed(): boolean { return this._reversed; }
  set reversed(value: boolean) {
    this.setReverse(value);
  }
  private _reversed: boolean;

  @Input() secondary: boolean;

  @Input()
  get progress(): number { return this._progress; }
  set progress(value: number) {
    this.setProgress(value);
  }
  private _progress: number;

  @Input()
  get buffer(): number { return this._buffer; }
  set buffer(value: number) {
    this.setBuffer(value);
  }
  private _buffer: number;

  private _mdcAdapter: MDCLinearProgressAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    getPrimaryBar: () => this._getHostElement().querySelector('.mdc-linear-progress__primary-bar'),
    getBuffer: () => this._getHostElement().querySelector('.mdc-linear-progress__buffer'),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    setStyle: (el: HTMLElement, styleProperty: string, value: string) => el.style.setProperty(styleProperty, value)
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    setProgress(value: number): void,
    setBuffer(value: number): void,
    setReverse(value: boolean): void,
    setDeterminate(value: boolean): void,
    open(): void,
    close(): void
  } = new MDCLinearProgressFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  setProgress(progress: number): void {
    this._progress = toNumber(progress);
    this._foundation.setProgress(this._progress);

    this._changeDetectorRef.markForCheck();
  }

  setBuffer(buffer: number): void {
    this._buffer = toNumber(buffer);
    this._foundation.setBuffer(this._buffer);

    this._changeDetectorRef.markForCheck();
  }

  setReverse(reverse: boolean): void {
    this._reversed = toBoolean(reverse);
    this._foundation.setReverse(this._reversed);

    this._changeDetectorRef.markForCheck();
  }

  setDeterminate(determinate: boolean): void {
    this._determinate = toBoolean(determinate);
    this._foundation.setDeterminate(this._determinate);

    this._changeDetectorRef.markForCheck();
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
