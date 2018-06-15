import {
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit
} from '@angular/core';
import { EventRegistry } from '@angular-mdc/web/common';

import { MDCLineRippleAdapter } from '@material/line-ripple/adapter';
import { MDCLineRippleFoundation } from '@material/line-ripple';

@Directive({
  selector: '[mdcLineRipple], mdc-line-ripple',
  providers: [EventRegistry]
})
export class MdcLineRipple implements OnInit, OnDestroy {
  @HostBinding('class.mdc-line-ripple') isHostClass = true;

  private _mdcAdapter: MDCLineRippleAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    setStyle: (propertyName: string, value: string) => this._getHostElement().style.setProperty(propertyName, value),
    registerEventHandler: (evtType: string, handler: EventListener) =>
      this._registry.listen(evtType, handler, this._getHostElement()),
    deregisterEventHandler: (evtType: string, handler: EventListener) => this._registry.unlisten(evtType, handler)
  };

  foundation: {
    init(): void,
    destroy(): void,
    activate(): void,
    deactivate(): void,
    setRippleCenter(xCoordinate: number): void
  } = new MDCLineRippleFoundation(this._mdcAdapter);

  constructor(
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngOnInit(): void {
    this.foundation.init();
  }

  ngOnDestroy(): void {
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
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
