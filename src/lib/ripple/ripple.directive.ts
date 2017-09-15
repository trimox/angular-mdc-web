import {
  ElementRef,
  Injectable,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { toBoolean, isBrowser } from '../common';

import { MDCRippleAdapter } from './ripple-adapter';
import { supportsCssVariables } from '@material/ripple/util';
import { MDCRippleFoundation } from '@material/ripple';

@Injectable()
export class MdcRipple implements OnDestroy {
  interactionListenerFn: () => void;
  resizeListenerFn: () => void;
  private disabled_: boolean;

  unbounded: boolean;
  active: boolean;
  get disabled() { return this.disabled_; }
  set disabled(value) {
    this.disabled_ = toBoolean(value);
    if (this.disabled_) {
      this._foundation.deactivate();
    } else {
      this._foundation.activate();
    }
  }

  private _mdcAdapter: MDCRippleAdapter = {
    browserSupportsCssVars: () => (typeof window !== 'undefined') ? supportsCssVariables(window) : false,
    isUnbounded: () => this.unbounded,
    isSurfaceActive: () => this.active,
    isSurfaceDisabled: () => {
      return (this._root.nativeElement.attributes.getNamedItem('disabled') || this.disabled) ? true : false;
    },
    addClass: (className: string) => {
      this._renderer.addClass(this._root.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this._root.nativeElement, className);
    },
    registerInteractionHandler: (evtType: string, handler: EventListener) => {
      this.resizeListenerFn = this._renderer.listen(this._root.nativeElement, evtType, handler);
    },
    deregisterInteractionHandler: (evtType: string, handler: EventListener) => {
      if (this.interactionListenerFn) {
        this.interactionListenerFn();
      }
    },
    registerResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this.resizeListenerFn = this._renderer.listen(window, 'resize', handler);
      }
    },
    deregisterResizeHandler: (handler: EventListener) => {
      if (isBrowser() && this.resizeListenerFn) {
        this.resizeListenerFn();
      }
    },
    updateCssVariable: (varName: string, value: string) => {
      if (this._root) {
        this._root.nativeElement.style.setProperty(varName, value);
      }
    },
    computeBoundingRect: () => {
      const { left, top, height, width } = this._root.nativeElement.getBoundingClientRect();
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
    private _root: ElementRef) {
  }

  ngOnDestroy() {
    this._foundation.destroy();
  }

  init(unbounded?: boolean) {
    this._foundation.init();
    this.unbounded = unbounded;
  }

  activate() {
    this._foundation.activate();
  }

  deactivate() {
    this._foundation.deactivate();
  }

  layout() {
    this._foundation.layout();
  }
}
