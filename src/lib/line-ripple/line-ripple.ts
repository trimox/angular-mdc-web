import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { EventRegistry } from '@angular-mdc/web/common';

import { MDCLineRippleAdapter } from '@material/line-ripple/adapter';
import { MDCLineRippleFoundation } from '@material/line-ripple';

@Component({
  selector: '[mdc-line-ripple], mdc-line-ripple',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcLineRipple',
  providers: [
    EventRegistry,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class MdcLineRipple implements OnInit, OnDestroy {
  @HostBinding('class.mdc-line-ripple') isHostClass = true;

  private _mdcAdapter: MDCLineRippleAdapter = {
    addClass: (className: string) => this._renderer.addClass(this._getHostElement(), className),
    removeClass: (className: string) => this._renderer.removeClass(this._getHostElement(), className),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    setAttr: (attr: string, value: string) => this._renderer.setAttribute(this._getHostElement(), attr, value),
    registerEventHandler: (evtType: string, handler: EventListener) =>
      this._registry.listen(evtType, handler, this._getHostElement()),
    deregisterEventHandler: (evtType: string, handler: EventListener) => this._registry.unlisten(evtType, handler),
  };

  foundation: {
    init(): void,
    destroy(): void,
    activate(): void,
    deactivate(): void,
    setRippleCenter(xCoordinate: number): void,
  } = new MDCLineRippleFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngOnInit(): void {
    this.foundation.init();
  }

  ngOnDestroy(): void {
    this.foundation.destroy();
  }

  destroy(): void {
    this.foundation.destroy();
  }

  /** Activates the line ripple */
  activate(): void {
    this.foundation.activate();
  }

  /** Deactivates the line ripple */
  deactivate(): void {
    this.foundation.deactivate();
  }

  /**
   * Sets the transform origin given a user's click location.
   * The `rippleCenter` is the x-coordinate of the middle of the ripple.
  */
  setRippleCenter(xCoordinate: number): void {
    this.foundation.setRippleCenter(xCoordinate);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
