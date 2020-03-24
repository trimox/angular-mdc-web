import {
  Injectable,
  OnDestroy,
  ElementRef,
  Optional
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {supportsPassiveEventListeners} from '@angular/cdk/platform';

import {EventType, SpecificEventListener} from '@material/base';
import {matches} from '@angular-mdc/web/dom';
import {MDCRippleFoundation, MDCRippleAdapter, util} from '@material/ripple';

export interface MDCRippleCapableSurface {
  readonly _root: Element;
  unbounded?: boolean;
  disabled?: boolean;
}

@Injectable()
export class MdcRipple implements OnDestroy {
  private _foundation!: MDCRippleFoundation;
  initialized: boolean = false;

  static createAdapter(instance: MDCRippleCapableSurface): MDCRippleAdapter {
    const adapter = {
      addClass: (className: string) => instance._root.classList.add(className),
      removeClass: (className: string) => instance._root.classList.remove(className),
      browserSupportsCssVars: () => typeof window !== 'undefined' ? util.supportsCssVariables(window) : false,
      isUnbounded: () => coerceBooleanProperty(instance.unbounded),
      isSurfaceActive: () => matches(instance._root, ':active'),
      isSurfaceDisabled: () => coerceBooleanProperty(instance.disabled),
      containsEventTarget: (target: EventTarget | null) => instance._root.contains(target as Node),
      registerDocumentInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        typeof document === 'object' && !!document ?
          document.documentElement!.addEventListener(evtType, handler, supportsPassiveEventListeners()) : {},
      deregisterDocumentInteractionHandler: <K extends EventType>(evtType: K, handler: SpecificEventListener<K>) =>
        typeof document === 'object' && !!document ?
          document.documentElement!.removeEventListener(evtType, handler, supportsPassiveEventListeners()) : {},
      registerResizeHandler: (handler: SpecificEventListener<'resize'>) => typeof window !== 'undefined' ?
        window.addEventListener('resize', handler) : {},
      deregisterResizeHandler: (handler: SpecificEventListener<'resize'>) => typeof window !== 'undefined' ?
        window.removeEventListener('resize', handler) : {},
      updateCssVariable: (varName: string, value: string | null) =>
        (instance._root as HTMLElement).style.setProperty(varName, value),
      computeBoundingRect: () => typeof document === 'object' && !!document ?
        instance._root.getBoundingClientRect() : ({top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0}),
      getWindowPageOffset: () => typeof window !== 'undefined' ?
        ({x: window.pageXOffset, y: window.pageYOffset}) : ({x: 0, y: 0}),
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
    if (!this.initialized) {
      this._foundation.init();
      this.initialized = true;
    }
  }

  destroy(): void {
    if (this.initialized) {
      this.initialized = false;
      this._foundation.destroy();
    }
  }

  layout(): void {
    this._foundation.layout();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  activateRipple(event?: Event): void {
    setTimeout(() => this._foundation!.activate(event));
  }

  deactivateRipple(): void {
    setTimeout(() => this._foundation!.deactivate());
  }

  handleBlur(): void {
    this._foundation.handleBlur();
  }
}
