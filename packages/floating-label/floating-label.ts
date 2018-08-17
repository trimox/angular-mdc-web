import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MDCFloatingLabelAdapter } from '@material/floating-label/adapter';
import { MDCFloatingLabelFoundation } from '@material/floating-label';

@Component({
  selector: 'label[mdcFloatingLabel], mdc-floating-label',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcFloatingLabel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcFloatingLabel implements OnInit, OnDestroy {
  @HostBinding('class.mdc-floating-label') isHostClass = true;

  private _mdcAdapter: MDCFloatingLabelAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    getWidth: () => this._getHostElement().offsetWidth,
    registerInteractionHandler: (evtType: string, handler: EventListener) =>
      this._getHostElement().addEventListener(evtType, handler),
    deregisterInteractionHandler: (evtType: string, handler: EventListener) =>
      this._getHostElement().removeEventListener(evtType, handler)
  };

  foundation: {
    init(): void,
    destroy(): void,
    getWidth(): number,
    shake(shouldShake: boolean): void,
    float(shouldFloat: boolean): void
  } = new MDCFloatingLabelFoundation(this._mdcAdapter);

  constructor(
    public elementRef: ElementRef) { }

  ngOnInit(): void {
    this.foundation.init();
  }

  ngOnDestroy(): void {
    this.foundation.destroy();
  }

  /** Returns the width of the label element. */
  getWidth(): number {
    return this.foundation.getWidth();
  }

  /** Styles the label to produce the label shake for errors. */
  shake(shouldShake: boolean): void {
    this.foundation.shake(shouldShake);
  }

  /** Styles the label to float or dock. */
  float(shouldFloat: boolean): void {
    this.foundation.float(shouldFloat);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
