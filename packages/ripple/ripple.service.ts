import {
  Injectable,
  OnDestroy,
  ElementRef,
  Optional
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {supportsPassiveEventListeners} from '@angular/cdk/platform';

import {EventType, SpecificEventListener} from '@material/base';
import {matches} from '@material/dom/ponyfill';
import {supportsCssVariables} from '@material/ripple/util';
import {MDCRippleFoundation, MDCRippleAdapter} from '@material/ripple';

export interface MDCRippleCapableSurface {
  readonly _root: Element;
  unbounded?: boolean;
  disabled?: boolean;
}

@Injectable()
export class MdcRipple implements OnDestroy {
  private _foundation?: MDCRippleFoundation;

  static createAdapter(instance: MDCRippleCapableSurface): MDCRippleAdapter {
    const adapter = {
      addClass: (className: string) => instance._root.classList.add(className),
      removeClass: (className: string) => instance._root.classList.remove(className),
      browserSupportsCssVars: () => supportsCssVariables(window),
      isUnbounded: () => coerceBooleanProperty(instance.unbounded),
      isSurfaceActive: () => matches(instance._root, ':active'),
      isSurfaceDisabled: () => coerceBooleanProperty(instance.disabled),
      containsEventTarget: (target: EventTarget) => instance._root.contains(target as Node),
      registerDocumentInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        document.documentElement!.addEventListener(evtType, handler, supportsPassiveEventListeners()),
      deregisterDocumentInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        document.documentElement!.removeEventListener(evtType, handler, supportsPassiveEventListeners()),
      registerResizeHandler: (handler: SpecificEventListener<'resize'>) => window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler: SpecificEventListener<'resize'>) =>
        window.removeEventListener('resize', handler),
      updateCssVariable: (varName: string, value: string) =>
        (instance._root as HTMLElement).style.setProperty(varName, value),
      computeBoundingRect: () => instance._root.getBoundingClientRect(),
      getWindowPageOffset: () => ({x: window.pageXOffset, y: window.pageYOffset}),
      registerInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        (instance._root as HTMLElement).addEventListener(evtType, handler, supportsPassiveEventListeners()),
      deregisterInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        (instance._root as HTMLElement).removeEventListener(evtType, handler, supportsPassiveEventListeners())
    };
    return adapter;
  }

  constructor(
    public element: ElementRef,
    @Optional() foundation?: MDCRippleFoundation) {
    this._foundation = foundation || new MDCRippleFoundation(MdcRipple.createAdapter({
      _root: element.nativeElement
    } as MDCRippleCapableSurface));
  }

  init(): void {
    if (this._foundation) {
      this._foundation.init();
    }
  }

  destroy(): void {
    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  layout(): void {
    if (this._foundation) {
      this._foundation.layout();
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  activateRipple(event?: Event): void {
    if (this._foundation) {
      setTimeout(() => this._foundation!.activate(event));
    }
  }

  deactivateRipple(): void {
    if (this._foundation) {
      setTimeout(() => this._foundation!.deactivate());
    }
  }

  handleBlur(): void {
    if (this._foundation) {
      this._foundation.handleBlur();
    }
  }
}
