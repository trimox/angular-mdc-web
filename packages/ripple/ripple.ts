import {AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {supportsPassiveEventListeners} from '@angular/cdk/platform';

import {MdcRipple, MDCRippleCapableSurface} from './ripple.service';
import {matches} from '@material/dom/ponyfill';
import {MDCRippleFoundation, MDCRippleAdapter} from '@material/ripple';

@Directive({
  selector: '[mdcRipple], mdc-ripple',
  providers: [MdcRipple],
})
export class MdcRippleDirective implements AfterViewInit, OnChanges, OnDestroy, MDCRippleCapableSurface {
  _root!: Element;

  @Input()
  get attachTo(): any {
    return this._attachTo;
  }
  set attachTo(element: any) {
    this._attachTo = element;
    this._attachTo?.classList?.add('mdc-ripple-surface');
  }
  private _attachTo?: any;

  @Input()
  get primary(): boolean {
    return this._primary;
  }
  set primary(value: boolean) {
    this._primary = coerceBooleanProperty(value);
  }
  private _primary = false;

  @Input()
  get secondary(): boolean {
    return this._secondary;
  }
  set secondary(value: boolean) {
    this._secondary = coerceBooleanProperty(value);
  }
  private _secondary = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  @Input()
  get unbounded(): boolean {
    return this._unbounded;
  }
  set unbounded(value: boolean) {
    this._unbounded = coerceBooleanProperty(value);
  }
  protected _unbounded = false;

  constructor(
    private _ripple: MdcRipple,
    public elementRef: ElementRef<HTMLElement>) {
    this._root = this.elementRef.nativeElement;
    this._ripple = this._createRipple();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['primary'] && this.attachTo) {
      if (this._primary) {
        this.attachTo.classList.add('mdc-ripple-surface--primary');
      } else {
        this.attachTo.classList.remove('mdc-ripple-surface--primary');
      }
    }

    if (changes['secondary'] && this.attachTo) {
      if (this._secondary) {
        this.attachTo.classList.add('mdc-ripple-surface--accent');
      } else {
        this.attachTo.classList.remove('mdc-ripple-surface--accent');
      }
    }
  }

  ngAfterViewInit(): void {
    this._ripple.init();
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }

  private _createRipple(): MdcRipple {
    const adapter: MDCRippleAdapter = {
      ...MdcRipple.createAdapter(this),
      addClass: (className: string) => this.attachTo?.classList?.add(className),
      computeBoundingRect: () => this.attachTo?.getBoundingClientRect()
        ?? ({top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0}),
      isSurfaceActive: () => matches(this.attachTo, ':active'),
      isSurfaceDisabled: () => this._disabled,
      isUnbounded: () => this._unbounded,
      removeClass: (className: string) => this.attachTo?.classList?.remove(className),
      updateCssVariable: (varName: string, value: string) =>
        this.attachTo?.style?.setProperty(varName, value),
      registerInteractionHandler: (evtType: any, handler: any) =>
        this.attachTo?.addEventListener(evtType, handler, supportsPassiveEventListeners()),
      deregisterInteractionHandler: (evtType: any, handler: any) =>
        this.attachTo?.removeEventListener(evtType, handler, supportsPassiveEventListeners())
    };
    return new MdcRipple(this.elementRef, new MDCRippleFoundation(adapter));
  }
}
