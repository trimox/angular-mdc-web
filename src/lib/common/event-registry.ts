import {
  ElementRef,
  Injectable,
  Renderer2
} from '@angular/core';

type UnlistenerMap = WeakMap<EventListener, Function>;

@Injectable()
export class EventRegistry {
  private unlisteners: Map<string, UnlistenerMap> = new Map<string, UnlistenerMap>();

  constructor() { }

  listen(renderer: Renderer2, type: string, listener: EventListener, target: Element | Window | Document, passive?: any) {
    if (!this.unlisteners.has(type)) {
      this.unlisteners.set(type, new WeakMap<EventListener, Function>());
    }
    target.addEventListener(type, listener, passive);
    this.unlisteners.get(type).set(listener, () => { target.removeEventListener(type, listener, passive); });
  }

  unlisten(type: string, listener: EventListener) {
    if (!this.unlisteners.has(type)) {
      return;
    }
    const unlisteners = this.unlisteners.get(type);
    if (!unlisteners.has(listener)) {
      return;
    }
    unlisteners.get(listener)();
    unlisteners.delete(listener);
  }
}
