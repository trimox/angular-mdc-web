import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { MDCLinearProgressAdapter } from './adapter';

import { MDCLinearProgressFoundation } from '@material/linear-progress';

@Component({
  moduleId: module.id,
  selector: 'mdc-linear-progress',
  exportAs: 'mdcLinearProgress',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class MdcLinearProgress implements AfterViewInit, OnDestroy {
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
  private _reversed: boolean = false;

  @Input() secondary: boolean = false;
  @Input() closed: boolean = false;

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

  @HostBinding('attr.role') role: string = 'progressbar';
  @HostBinding('class.mdc-linear-progress') isHostClass = true;
  @HostBinding('class.mdc-linear-progress--secondary') get classSecondary(): string {
    return this.secondary ? 'mdc-linear-progress--secondary' : '';
  }
  @HostBinding('class.mdc-linear-progress--closed') get classClosed(): string {
    return this.closed ? 'mdc-linear-progress--closed' : '';
  }
  @HostBinding('class.mdc-linear-progress--indeterminate') get classIndeterminate(): string {
    return !this.determinate ? 'mdc-linear-progress--indeterminate' : '';
  }

  private _mdcAdapter: MDCLinearProgressAdapter = {
    addClass: (className: string) => this._renderer.addClass(this._getHostElement(), className),
    getPrimaryBar: () => this._getHostElement().querySelector('.mdc-linear-progress__primary-bar'),
    getBuffer: () => this._getHostElement().querySelector('.mdc-linear-progress__buffer'),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    removeClass: (className: string) => this._renderer.removeClass(this._getHostElement(), className),
    setStyle: (el: Element, styleProperty: string, value: string) => this._renderer.setStyle(el, styleProperty, value)
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
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  open(): void {
    this._foundation.open();
  }

  close(): void {
    this._foundation.close();
  }

  setProgress(progress: number): void {
    this._progress = progress;
    this._foundation.setProgress(progress);

    this._changeDetectorRef.markForCheck();
  }

  setBuffer(buffer: number): void {
    this._buffer = buffer;
    this._foundation.setBuffer(buffer);

    this._changeDetectorRef.markForCheck();
  }

  setReverse(reverse: boolean): void {
    this._reversed = reverse;
    this._foundation.setReverse(reverse);

    this._changeDetectorRef.markForCheck();
  }

  setDeterminate(determinate: boolean): void {
    this._determinate = determinate;
    this._foundation.setDeterminate(determinate);

    this._changeDetectorRef.markForCheck();
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
