import {
  ElementRef,
  Injectable,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { toBoolean, isBrowser } from '../../common';

import { MDCRippleAdapter } from './adapter';
import { supportsCssVariables } from '@material/ripple/util';
import { MDCRippleFoundation } from '@material/ripple';

@Injectable()
export class MdcRipple implements OnDestroy {
  private _interactionListenerFn: () => void;
  private _resizeListenerFn: () => void;
  private _disabled: boolean = false;

  unbounded: boolean;
  active: boolean;
  get disabled() { return this._disabled; }
  set disabled(value) {
    this._disabled = toBoolean(value);
    if (this._disabled) {
      this._foundation.destroy();
    } else {
      this._foundation.init();
    }
  }

  private _mdcAdapter: MDCRippleAdapter = {
    browserSupportsCssVars: () => (typeof window !== 'undefined') ? supportsCssVariables(window) : false,
    isUnbounded: () => this.unbounded,
    isSurfaceActive: () => this.active,
    isSurfaceDisabled: () => {
      return (this.elementRef.nativeElement.attributes.getNamedItem('disabled') || this.disabled) ? true : false;
    },
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    registerInteractionHandler: (evtType: string, handler: EventListener) => {
      this._resizeListenerFn = this._renderer.listen(this.elementRef.nativeElement, evtType, handler);
    },
    deregisterInteractionHandler: (evtType: string, handler: EventListener) => {
      if (this._interactionListenerFn) {
        this._interactionListenerFn();
      }
    },
    registerResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._resizeListenerFn = this._renderer.listen(window, 'resize', handler);
      }
    },
    deregisterResizeHandler: (handler: EventListener) => {
      if (isBrowser() && this._resizeListenerFn) {
        this._resizeListenerFn();
      }
    },
    updateCssVariable: (varName: string, value: string) => {
      this.elementRef.nativeElement.style.setProperty(varName, value);
    },
    computeBoundingRect: () => {
      const { left, top, height, width } = this.elementRef.nativeElement.getBoundingClientRect();
      return {
        top,
        left,
        right: left,
        bottom: top,
        width: width,
        height: height,
      };
    },
    getWindowPageOffset: () => {
      return {
        x: (typeof window !== 'undefined') ? window.pageXOffset : 0,
        y: (typeof window !== 'undefined') ? window.pageYOffset : 0
      };
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    activate: Function,
    deactivate: Function,
    layout: Function,
  } = new MDCRippleFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) {
  }

  ngOnDestroy() {
    this._foundation.destroy();
  }

  init(unbounded?: boolean): void {
    this._foundation.init();
    this.unbounded = unbounded;
  }

  activate(event?: Event): void {
    this._foundation.activate(event);
  }

  deactivate(event?: Event): void {
    this._foundation.deactivate(event);
  }

  layout(): void {
    this._foundation.layout();
  }

  isSurfaceDisabled(): boolean {
    return this._mdcAdapter.isSurfaceDisabled();
  }

  isSurfaceActive(): boolean {
    return this._mdcAdapter.isSurfaceActive();
  }
}
