import {
  ElementRef,
  Injectable,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { toBoolean, isBrowser } from '../../common';
import { EventRegistry } from '../../common/event-registry';

import { MDCRippleAdapter } from './adapter';
import { supportsCssVariables, applyPassive } from '@material/ripple/util';
import { MDCRippleFoundation } from '@material/ripple';

@Injectable()
export class MdcRipple implements OnDestroy {
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
      const target = (evtType === 'mouseup' || evtType === 'pointerup') ? window : this.elementRef.nativeElement;
      this._registry.listen(this._renderer, evtType, handler, target, applyPassive());
    },
    deregisterInteractionHandler: (evtType: string, handler: EventListener) => {
      this._registry.unlisten(evtType, handler);
    },
    registerResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen(this._renderer, 'resize', handler, window);
      }
    },
    deregisterResizeHandler: (handler: EventListener) => {
      this._registry.unlisten('resize', handler);
    },
    updateCssVariable: (varName: string, value: string) => {
      this.elementRef.nativeElement.style.setProperty(varName, value);
    },
    computeBoundingRect: () => {
      return this.elementRef.nativeElement.getBoundingClientRect();
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
    private _registry: EventRegistry,
    public elementRef: ElementRef) { }

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
