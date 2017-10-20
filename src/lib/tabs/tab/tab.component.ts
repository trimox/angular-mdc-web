import {
  AfterViewInit,
  Component,
  ContentChild,
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

import { MDCTabAdapter } from './tab-adapter';
import { MDCTabFoundation } from '@material/tabs';

@Directive({
  selector: '[mdc-tab-icon-text], mdc-tab-icon-text'
})
export class MdcTabIconTextDirective {
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
  encapsulation: ViewEncapsulation.None
})
export class MdcTabComponent implements AfterViewInit, OnDestroy {
  @Input()
  get active() { return this.foundation.isActive(); }
  set active(value) {
    this.foundation.setActive(value);
  }
  @Input()
  get preventsDefaultOnClick() { return this.foundation.preventsDefaultOnClick(); }
  set preventsDefaultOnClick(value: boolean) {
    this.foundation.setPreventDefaultOnClick(value);
  }
  @Input()
  get disableRipple() { return this.ripple_.disabled; }
  set disableRipple(value) {
    this.ripple_.disabled = toBoolean(value);
  }
  @Output() select: EventEmitter<{ tab: MdcTabComponent }> = new EventEmitter();
  @HostBinding('class.mdc-tab') isHostClass = true;
  @HostBinding('attr.role') role: string = 'tab';
  @HostBinding('class.mdc-tab--with-icon-and-text') get classIconText() {
    return this.tabIcon != null && this.tabIconText != null;
  }
  @HostBinding('class.mdc-tab--active') get classActive() {
    return this.foundation.isActive();
  }
  @ContentChild(MdcIcon) tabIcon: MdcIcon;
  @ContentChild(MdcTabIconTextDirective) tabIconText: MdcTabIconTextDirective;

  private _mdcAdapter: MDCTabAdapter = {
    addClass: (className: string) => {
      this.renderer_.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this.renderer_.removeClass(this.elementRef.nativeElement, className);
    },
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this.registry_.listen_(this.renderer_, type, handler, this.elementRef);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this.registry_.unlisten_(type, handler);
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
    private renderer_: Renderer2,
    private elementRef: ElementRef,
    private registry_: EventRegistry,
    private ripple_: MdcRipple) {
    this.ripple_.init();
  }

  ngAfterViewInit() {
    this.foundation.init();
    if (this.tabIcon) {
      this.renderer_.addClass(this.tabIcon.elementRef.nativeElement, 'mdc-tab__icon');
    }
  }

  ngOnDestroy() {
    this.foundation.destroy();
  }
}
