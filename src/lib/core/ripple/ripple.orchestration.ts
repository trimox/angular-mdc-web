import {
  ElementRef,
  Renderer2,
  Injectable,
} from '@angular/core';
import { toBoolean, isBrowser } from '../../common';
import { EventRegistry } from '../../common/event-registry';

import { MDCRippleAdapter } from './adapter';
import { MDCRippleFoundation, util } from '@material/ripple';

@Injectable()
export abstract class MdcRippleOrchestration {
  private _mdcAdapter: MDCRippleAdapter = {
    browserSupportsCssVars: () => (typeof window !== 'undefined') ? util.supportsCssVariables(window) : false,
    isUnbounded: () => this.isUnbounded(),
    isSurfaceActive: () => this.isSurfaceActive(),
    isSurfaceDisabled: () => this.isSurfaceDisabled(),
    addClass: (className: string) => this._renderer.addClass(this.elementRef.nativeElement, className),
    removeClass: (className: string) => this._renderer.removeClass(this.elementRef.nativeElement, className),
    registerInteractionHandler: (evtType: string, handler: EventListener) => {
      const target = (evtType === 'mouseup' || evtType === 'pointerup') ? window : this.elementRef.nativeElement;
      this._registry.listen(evtType, handler, target, util.applyPassive());
    },
    deregisterInteractionHandler: (evtType: string, handler: EventListener) => {
      this._registry.unlisten(evtType, handler);
    },
    registerResizeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen('resize', handler, window);
      }
    },
    deregisterResizeHandler: (handler: EventListener) => {
      this._registry.unlisten('resize', handler);
    },
    updateCssVariable: (varName: string, value: string) => {
      this.elementRef.nativeElement.style.setProperty(varName, value);
    },
    computeBoundingRect: () => this.getBoundingClientRect(),
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
  };

  private _unbounded: boolean = false;
  public activeSurface: boolean = true;

  constructor(
    protected _renderer: Renderer2,
    protected _registry: EventRegistry,
    protected elementRef: ElementRef) { }

  destroy(): void {
    if (this._foundation) {
      this._foundation.destroy();
      this._foundation = null;
    }
  }

  init(unbounded: boolean = false): void {
    if (!this._foundation) {
      this._foundation = new MDCRippleFoundation(this._mdcAdapter);
      this._foundation.init();
    }
    this._unbounded = unbounded;
  }

  isAttached(): boolean {
    return this._foundation != null;
  }

  activate(event?: Event): void {
    if (this._foundation) {
      this._foundation.activate(event);
      this.activeSurface = true;
    }
  }

  deactivate(event?: Event): void {
    if (this._foundation) {
      this._foundation.deactivate(event);
      this.activeSurface = false;
    }
  }

  layout(): void {
    this._foundation.layout();
  }

  isSurfaceDisabled(): boolean {
    return this.elementRef.nativeElement.attributes.getNamedItem('disabled') ? true : false;
  }

  isSurfaceActive(): boolean {
    return this.activeSurface ? true : this.elementRef.nativeElement[util.getMatchesProperty(HTMLElement.prototype)](':active');
  }

  isUnbounded(): boolean {
    return this._unbounded;
  }

  getBoundingClientRect(): ClientRect {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }
}
