import {
  AfterViewInit,
  ContentChild,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean } from '../../common';
import { EventRegistry } from '../../common/event-registry';
import { MdcIcon } from '../../icon/icon';
import { MdcRipple } from '../../core/ripple/ripple.service';

import { MDCTabAdapter } from './adapter';
import { MDCTabFoundation } from '@material/tabs';

@Directive({
  selector: '[mdc-tab-icon-text], mdc-tab-icon-text'
})
export class MdcTabIconText {
  @HostBinding('class.mdc-tab__icon-text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: '[mdc-tab], mdc-tab',
  template: '<ng-content></ng-content>',
  providers: [
    MdcRipple,
    EventRegistry
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MdcTab implements AfterViewInit, OnDestroy {
  @Input()
  get active(): boolean { return this.foundation.isActive(); }
  set active(value: boolean) {
    this.foundation.setActive(value);
  }
  @Input()
  get preventsDefaultOnClick(): boolean { return this.foundation.preventsDefaultOnClick(); }
  set preventsDefaultOnClick(value: boolean) {
    this.foundation.setPreventDefaultOnClick(value);
  }
  @Input()
  get disableRipple(): boolean { return this.ripple.disabled; }
  set disableRipple(value: boolean) {
    this.ripple.disabled = toBoolean(value);
  }
  @Output() select: EventEmitter<{ tab: MdcTab }> = new EventEmitter();
  @HostBinding('class.mdc-tab') isHostClass = true;
  @HostBinding('attr.role') role: string = 'tab';
  @HostBinding('class.mdc-tab--with-icon-and-text') get classIconText() {
    return this.tabIcon != null && this.tabIconText != null;
  }
  @HostBinding('class.mdc-tab--active') get classActive() {
    return this.foundation.isActive();
  }
  @ContentChild(MdcIcon) tabIcon: MdcIcon;
  @ContentChild(MdcTabIconText) tabIconText: MdcTabIconText;

  private _mdcAdapter: MDCTabAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen(this._renderer, type, handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten(type, handler);
    },
    getOffsetWidth: () => this.elementRef.nativeElement.offsetWidth,
    getOffsetLeft: () => this.elementRef.nativeElement.offsetLeft,
    notifySelected: () => this.select.emit({ tab: this })
  };

  public foundation: {
    init: Function,
    destroy: Function,
    isActive: Function,
    setActive: Function,
    getComputedWidth: Function,
    getComputedLeft: Function,
    preventsDefaultOnClick: Function,
    setPreventDefaultOnClick: Function,
    measureSelf: Function,
  } = new MDCTabFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry,
    public ripple: MdcRipple) {
    this.ripple.init();
  }

  ngAfterViewInit(): void {
    this.foundation.init();
    if (this.tabIcon) {
      this._renderer.addClass(this.tabIcon.elementRef.nativeElement, 'mdc-tab__icon');
    }
  }

  ngOnDestroy(): void {
    this.foundation.destroy();
  }
}
