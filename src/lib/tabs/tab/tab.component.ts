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
import { EventRegistry } from '../../common/event-registry';
import { toBoolean } from '../../common/boolean-property';
import { Ripple } from '../../ripple/ripple.directive';

import { MDCTabAdapter } from './tab-adapter';
import { MDCTabFoundation } from '@material/tabs';

@Directive({
  selector: '[mdc-tab-icon], mdc-tab-icon'
})
export class TabIconDirective {
  @HostBinding('class.mdc-tab__icon') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-tab-icon-text], mdc-tab-icon-text'
})
export class TabIconTextDirective {
  @HostBinding('class.mdc-tab__icon-text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: '[mdc-tab], mdc-tab',
  template: '<ng-content></ng-content>',
  providers: [Ripple],
  encapsulation: ViewEncapsulation.None
})
export class TabComponent implements AfterViewInit, OnDestroy {
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
  get disableRipple() { return this._ripple.disabled; }
  set disableRipple(value) {
    this._ripple.disabled = toBoolean(value);
  }
  @Output() select: EventEmitter<{ tab: TabComponent }> = new EventEmitter();
  @HostBinding('class.mdc-tab') isHostClass = true;
  @HostBinding('attr.role') role: string = 'tab';
  @HostBinding('class.mdc-tab--with-icon-and-text') get classIconText() {
    return this.tabIcon != null && this.tabIconText != null;
  }
  @HostBinding('class.mdc-tab--active') get classActive() {
    return this.foundation.isActive();
  }
  @ContentChild(TabIconDirective) tabIcon: TabIconDirective;
  @ContentChild(TabIconTextDirective) tabIconText: TabIconTextDirective;

  private _mdcAdapter: MDCTabAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this._root.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this._root.nativeElement, className);
    },
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen_(this._renderer, type, handler, this._root);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten_(type, handler);
    },
    getOffsetWidth: () => this._root.nativeElement.offsetWidth,
    getOffsetLeft: () => this._root.nativeElement.offsetLeft,
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
    private _root: ElementRef,
    private _registry: EventRegistry,
    private _ripple: Ripple) {
    this._ripple.init();
  }

  ngAfterViewInit() {
    this.foundation.init();
  }

  ngOnDestroy() {
    this.foundation.destroy();
  }
}
