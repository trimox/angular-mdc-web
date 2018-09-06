import {
  ElementRef,
  Injectable
} from '@angular/core';
import { Platform } from '@angular-mdc/web/common';

import { MDCRippleAdapter } from '@material/ripple/adapter';
import { MDCRippleFoundation, util } from '@material/ripple';

@Injectable()
export class MdcRipple {
  private _root: any;
  private _interactionElement: HTMLElement;
  private _unbounded: boolean = false;

  private _mdcAdapter: MDCRippleAdapter = {
    browserSupportsCssVars: () => (typeof window !== 'undefined') ? util.supportsCssVariables(window) : false,
    isUnbounded: () => this._unbounded,
    isSurfaceActive: () => this._root[util.getMatchesProperty(HTMLElement.prototype)](':active'),
    isSurfaceDisabled: () => this.isSurfaceDisabled(),
    addClass: (className: string) => this._root.classList.add(className),
    removeClass: (className: string) => this._root.classList.remove(className),
    containsEventTarget: (target: EventTarget) => this._root.contains(target),
    registerInteractionHandler: (evtType: string, handler: EventListener) => {
      if (this._interactionElement) {
        this._interactionElement.addEventListener(evtType, handler, util.applyPassive());
      } else {
        this._root.addEventListener(evtType, handler, util.applyPassive());
      }
    },
    deregisterInteractionHandler: (evtType: string, handler: EventListener) => {
      if (this._interactionElement) {
        this._interactionElement.removeEventListener(evtType, handler, util.applyPassive());
      } else {
        this._root.removeEventListener(evtType, handler, util.applyPassive());
      }
    },
    registerDocumentInteractionHandler: (evtType: string, handler: EventListener) => {
      if (!this._platform.isBrowser) { return; }

      document.documentElement.addEventListener(evtType, handler, util.applyPassive());
    },
    deregisterDocumentInteractionHandler: (evtType: string, handler: EventListener) => {
      if (!this._platform.isBrowser) { return; }

      document.documentElement.removeEventListener(evtType, handler, util.applyPassive());
    },
    registerResizeHandler: (handler: EventListener) => {
      if (!this._platform.isBrowser) { return; }

      window.addEventListener('resize', handler);
    },
    deregisterResizeHandler: (handler: EventListener) => {
      if (!this._platform.isBrowser) { return; }

      window.removeEventListener('resize', handler);
    },
    updateCssVariable: (varName: string, value: string) => this._root.style.setProperty(varName, value),
    computeBoundingRect: () => this._root.getBoundingClientRect(),
    getWindowPageOffset: () => {
      return {
        x: (typeof window !== 'undefined') ? window.pageXOffset : 0,
        y: (typeof window !== 'undefined') ? window.pageYOffset : 0
      };
    }
  };

  protected _foundation: {
    init(): void,
    destroy(): void,
    activate(event: any): void,
    deactivate(event: any): void,
    layout(): void,
    setUnbounded(unbounded: boolean): void,
    handleFocus(): void,
    handleBlur(): void
  } | any;

  constructor(
    private _platform: Platform,
    protected elementRef: ElementRef) { }

  attachTo(root: any, unbounded: boolean = false, interactionElement?: HTMLElement) {
    this._root = root;
    if (interactionElement) {
      this._interactionElement = interactionElement;
    }

    this._foundation = new MDCRippleFoundation(this._mdcAdapter);
    this.setUnbounded(unbounded);
    this._foundation.init();
  }

  init(): void {
    this._foundation = new MDCRippleFoundation(this._mdcAdapter);
    this._foundation.init();
  }

  destroy(): void {
    if (this._foundation) {
      this._foundation.destroy();
      this._foundation = null;
    }
  }

  activate(event?: any): void {
    this._foundation.activate(event);
  }

  deactivate(event?: any): void {
    this._foundation.deactivate(event);
  }

  setUnbounded(value: boolean): void {
    this._unbounded = value;
    this._foundation.setUnbounded(value);
  }

  layout(): void {
    this._foundation.layout();
  }

  handleFocus(): void {
    this._foundation.handleFocus();
  }

  handleBlur(): void {
    this._foundation.handleBlur();
  }

  isSurfaceDisabled(): boolean {
    return this._interactionElement ? this._interactionElement.attributes.getNamedItem('disabled') ? true : false :
      this._root.attributes.getNamedItem('disabled') ? true : false;
  }

  readonly attached: boolean = !!this._foundation;
}
