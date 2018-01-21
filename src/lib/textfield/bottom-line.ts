import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Output,
  Renderer2,
} from '@angular/core';
import { EventRegistry } from '@angular-mdc/web/common';

import { MDCTextFieldBottomLineAdapter } from '@material/textfield/bottom-line/adapter';
import { MDCTextFieldBottomLineFoundation } from '@material/textfield/bottom-line';

@Directive({
  selector: '[mdc-text-field-bottom-line], mdc-text-field-bottom-line'
})
export class MdcTextFieldBottomLine {
  @Output() animationEnd = new EventEmitter<boolean>();
  @HostBinding('class.mdc-text-field__bottom-line') isHostClass = true;

  private _mdcAdapter: MDCTextFieldBottomLineAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    setAttr: (attr: string, value: string) => this._renderer.setAttribute(this.elementRef.nativeElement, attr, value),
    registerEventHandler: (evtType: string, handler: EventListener) =>
      this._registry.listen(evtType, handler, this.elementRef.nativeElement),
    deregisterEventHandler: (evtType: string, handler: EventListener) => this._registry.unlisten(evtType, handler),
    notifyAnimationEnd: () => this.animationEnd.emit(true),
  };

  foundation: {
    init: Function,
    destroy: Function,
    activate: Function,
    deactivate: Function,
    setTransformOrigin: Function,
    handleTransitionEnd: Function,
  } = new MDCTextFieldBottomLineFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  destroy(): void {
    this.foundation.destroy();
  }

  /** Activates the bottom line */
  activate(): void {
    this.foundation.activate();
  }

  /** Deactivates the bottom line */
  deactivate(): void {
    this.foundation.deactivate();
  }

  /** Sets the transform origin given a user's click location. */
  setTransformOrigin(event: Event): void {
    this.foundation.setTransformOrigin(event);
  }

  /** Handles a transition end event */
  handleTransitionEnd(event: Event): void {
    this.foundation.handleTransitionEnd(event);
  }
}
