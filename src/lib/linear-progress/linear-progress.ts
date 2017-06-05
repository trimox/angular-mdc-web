import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { MDCLinearProgressAdapter } from './linear-progress-adapter';

const { MDCLinearProgressFoundation } = require('@material/linear-progress');
const MDC_PROGRESS_STYLES = require('@material/linear-progress/mdc-linear-progress.scss');

type UnlistenerMap = WeakMap<EventListener, Function>;

@Component({
  selector: 'mdc-linear-progress',
  templateUrl: './linear-progress.html',
  styles: [String(MDC_PROGRESS_STYLES)],
  encapsulation: ViewEncapsulation.None
})
export class LinearProgressComponent implements AfterViewInit {
  @Input() indeterminate: boolean;
  @Input() reversed: boolean;
  @Input() accent: boolean;
  @Input()
  set buffer(value: number) {
    this._foundation.setBuffer(value);
  }
  @Input()
  set progress(value: number) {
    this._foundation.setProgress(value);
  }
  @HostBinding('attr.role') role: string = 'progressbar';
  @HostBinding('class') className: string = 'mdc-linear-progress';
  @HostBinding('class.mdc-linear-progress--indeterminate') get classIndeterminate(): string {
    return this.indeterminate ? 'mdc-linear-progress--indeterminate' : '';
  }
  @HostBinding('class.mdc-linear-progress--reversed') get classReversed(): string {
    return this.reversed ? 'mdc-linear-progress--reversed' : '';
  }
  @HostBinding('class.mdc-linear-progress--accent') get classAccent(): string {
    return this.accent ? 'mdc-linear-progress--accent' : '';
  }

  private _mdcAdapter: MDCLinearProgressAdapter = {
    addClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.addClass(root.nativeElement, className);
    },
    getPrimaryBar: () => {
      const { _root: root } = this;
      return root.nativeElement.querySelector(MDCLinearProgressFoundation.strings.PRIMARY_BAR_SELECTOR);
    },
    getBuffer: () => {
      const { _root: root } = this;
      return root.nativeElement.querySelector(MDCLinearProgressFoundation.strings.BUFFER_SELECTOR);
    },
    hasClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      return renderer.parentNode(root.nativeElement).classList.contains(className);
    },
    removeClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.removeClass(root.nativeElement, className);
    },
    setStyle: (el: Element, styleProperty: string, value: number) => {
      const { _renderer: renderer } = this;
      renderer.setStyle(el, styleProperty, value);
    }
  };

  private _foundation: {
    init: Function,
    setProgress: Function,
    setBuffer: Function,
    open: Function,
    close: Function
  } = new MDCLinearProgressFoundation(this._mdcAdapter);

  constructor(private _renderer: Renderer2, private _root: ElementRef) { }

  ngAfterViewInit() {
    this._foundation.init();
  }

  open() {
    this._foundation.open();
  }

  close() {
    this._foundation.close();
  }
}