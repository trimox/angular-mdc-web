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

@Component({
  selector: 'mdc-linear-progress',
  templateUrl: './linear-progress.component.html',
  styles: [String(MDC_PROGRESS_STYLES)],
  encapsulation: ViewEncapsulation.None
})
export class LinearProgressComponent implements AfterViewInit {
  private _indeterminate: boolean = true;
  private _reversed: boolean;

  @Input()
  get indeterminate() { return this._indeterminate; }
  set indeterminate(value) {
    this._foundation.setDeterminate(!value);
    this._indeterminate = !value;
  }
  @Input()
  get reversed() { return this._reversed; }
  set reversed(value) {
    this._foundation.setReverse(value);
    this._reversed = value;
  }
  @Input() accent: boolean;
  @HostBinding('attr.role') role: string = 'progressbar';
  @HostBinding('class.mdc-linear-progress') className: string = 'mdc-linear-progress';
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
    setReverse: Function,
    setDeterminate: Function,
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

  setProgress(value: number) {
    this._foundation.setProgress(value);
  }

  setBuffer(value: number) {
    this._foundation.setBuffer(value);
  }
}