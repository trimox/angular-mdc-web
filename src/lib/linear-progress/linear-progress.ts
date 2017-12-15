import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { MDCLinearProgressAdapter } from './adapter';

import { MDCLinearProgressFoundation } from '@material/linear-progress';

@Component({
  moduleId: module.id,
  selector: 'mdc-linear-progress',
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
export class MdcLinearProgress implements AfterViewInit {
  private _indeterminate: boolean = false;
  private _reversed: boolean = false;

  @Input()
  get indeterminate(): boolean { return this._indeterminate; }
  set indeterminate(value: boolean) {
    this._foundation.setDeterminate(!value);
    this._indeterminate = !value;
  }
  @Input()
  get reversed(): boolean { return this._reversed; }
  set reversed(value: boolean) {
    this._foundation.setReverse(value);
    this._reversed = value;
  }
  @Input() secondary: boolean = false;
  @Input() closed: boolean = false;
  @HostBinding('attr.role') role: string = 'progressbar';
  @HostBinding('class.mdc-linear-progress') isHostClass = true;
  @HostBinding('class.mdc-linear-progress--secondary') get classSecondary(): string {
    return this.secondary ? 'mdc-linear-progress--secondary' : '';
  }
  @HostBinding('class.mdc-linear-progress--closed') get classClosed(): string {
    return this.closed ? 'mdc-linear-progress--closed' : '';
  }

  private _mdcAdapter: MDCLinearProgressAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    getPrimaryBar: () => {
      return this.elementRef.nativeElement.querySelector('.mdc-linear-progress__primary-bar');
    },
    getBuffer: () => {
      return this.elementRef.nativeElement.querySelector('.mdc-linear-progress__buffer');
    },
    hasClass: (className: string) => {
      return this._renderer.parentNode(this.elementRef.nativeElement).classList.contains(className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    setStyle: (el: Element, styleProperty: string, value: string) => {
      this._renderer.setStyle(el, styleProperty, value);
    }
  };

  private _foundation: {
    init: Function,
    setProgress: Function,
    setBuffer: Function,
    setReverse: Function,
    setDeterminate: Function,
    open: Function,
    close: Function
  } = new MDCLinearProgressFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this._foundation.init();
  }

  open(): void {
    this._foundation.open();
  }

  close(): void {
    this._foundation.close();
  }

  setProgress(value: number): void {
    this._foundation.setProgress(value);
  }

  setBuffer(value: number): void {
    this._foundation.setBuffer(value);
  }

  setReverse(value: boolean): void {
    this._reversed = value;
    this._foundation.setReverse(value);
  }

  setDeterminate(value: boolean): void {
    this._indeterminate = !value;
    this._foundation.setDeterminate(value);
  }
}
