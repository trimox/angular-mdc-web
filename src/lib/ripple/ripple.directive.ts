import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { MDCRippleAdapter } from './ripple-adapter';
import { supportsCssVariables } from '@material/ripple/util';

const { MDCRippleFoundation } = require('@material/ripple');

type UnlistenerMap = WeakMap<EventListener, Function>;

@Directive({
  selector: '[mdc-ripple]'
})
export class Ripple implements OnDestroy {
  unbounded: boolean;
  active: boolean;

  private _unlisteners: Map<string, UnlistenerMap> = new Map<string, UnlistenerMap>();

  private _mdcAdapter: MDCRippleAdapter = {
    browserSupportsCssVars: () => (typeof window !== 'undefined') ? supportsCssVariables(window) : false,
    isUnbounded: () => this.unbounded,
    isSurfaceActive: () => this.active,
    isSurfaceDisabled: () => {
      const { _renderer: renderer, _root: root } = this;
      return root.nativeElement.attributes.getNamedItem('disabled') ? true : false;
    },
    addClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.addClass(root.nativeElement, className);
    },
    removeClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.removeClass(root.nativeElement, className);
    },
    registerInteractionHandler: (evtType: string, handler: EventListener) => {
      if (this._root) {
        this.listen_(evtType, handler);
      }
    },
    deregisterInteractionHandler: (evtType: string, handler: EventListener) => {
      this.unlisten_(evtType, handler);
    },
    registerResizeHandler: (handler: EventListener) => {
      if (this._root) {
        this.listen_('resize', handler);
      }
    },
    deregisterResizeHandler: (handler: EventListener) => {
      this.unlisten_('resize', handler);
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
        x: window.pageXOffset,
        y: window.pageYOffset
      };
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    activate: Function,
    deactivate: Function
  } = new MDCRippleFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef) {
    this._foundation.init();
  }

  ngOnDestroy() {
    this._foundation.destroy();
  }

  activate() {
    this._foundation.activate();
  }

  deactivate() {
    this._foundation.deactivate();
  }

  listen_(type: string, listener: EventListener, ref: ElementRef = this._root) {
    if (!this._unlisteners.has(type)) {
      this._unlisteners.set(type, new WeakMap<EventListener, Function>());
    }
    const unlistener = this._renderer.listen(ref.nativeElement, type, listener);
    this._unlisteners.get(type).set(listener, unlistener);
  }

  unlisten_(type: string, listener: EventListener) {
    if (!this._unlisteners.has(type)) {
      return;
    }
    const unlisteners = this._unlisteners.get(type);
    if (!unlisteners.has(listener)) {
      return;
    }
    unlisteners.get(listener)();
    unlisteners.delete(listener);
  }
}
