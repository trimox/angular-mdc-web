import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MDCMenuAdapter } from './menu-adapter';
import { MenuItemDirective } from './menu-item.directive';
import { isBrowser } from '../common/platform';

import { MDCSimpleMenuFoundation } from '@material/menu/simple';
import { getTransformPropertyName } from '@material/menu/util';

export enum MDC_OPEN_FROM {
  TOP_LEFT = 'mdc-simple-menu--open-from-top-left',
  TOP_RIGHT = 'mdc-simple-menu--open-from-top-right',
  BOTTOM_LEFT = 'mdc-simple-menu--open-from-bottom-left',
  BOTTOM_RIGHT = 'mdc-simple-menu--open-from-bottom-right',
}

type UnlistenerMap = WeakMap<EventListener, Function>;

@Component({
  selector: 'mdc-menu',
  template:
  `
  <ul #menuContainer class="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">
   <ng-content select="mdc-menu-item, mdc-menu-divider"></ng-content>
  </ul>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements AfterViewInit, OnDestroy {
  private previousFocus_: any;

  @Input() openFrom: any;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() select: EventEmitter<number> = new EventEmitter<number>();
  @HostBinding('class') get className(): string {
    return `mdc-simple-menu${MDC_OPEN_FROM[this.openFrom] ? ` ${MDC_OPEN_FROM[this.openFrom]}` : ''}`;
  }
  @HostBinding('tabindex') tabindex: number = -1;
  @ViewChild('menuContainer') public menuContainerEl: ElementRef;
  @ContentChildren(MenuItemDirective) menuItems: QueryList<MenuItemDirective>;

  private _unlisteners: Map<string, UnlistenerMap> = new Map<string, UnlistenerMap>();

  private _mdcAdapter: MDCMenuAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this._root.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this._root.nativeElement, className);
    },
    getAttributeForEventTarget: (target: any, attributeName) => {
      return target.getAttribute(attributeName);
    },
    hasClass: (className: string) => {
      return this._root.nativeElement.classList.contains(className);
    },
    hasNecessaryDom: () => Boolean(this.menuContainerEl),
    getInnerDimensions: () => {
      return {
        width: this._root.nativeElement.offsetWidth,
        height: this._root.nativeElement.offsetHeight
      };
    },
    hasAnchor: () => {
      return this._renderer.parentNode(this._root.nativeElement) && this._renderer.parentNode(this._root.nativeElement).classList.contains('mdc-menu-anchor');
    },
    getAnchorDimensions: () => {
      return this._renderer.parentNode(this._root.nativeElement).getBoundingClientRect();
    },
    getWindowDimensions: () => {
      return {
        width: isBrowser() ? window.innerWidth : 0,
        height: isBrowser() ? window.innerHeight : 0
      };
    },
    setScale: (x: number, y: number) => {
      if (isBrowser()) {
        const { _renderer: renderer, _root: root } = this;
        renderer.setStyle(root.nativeElement, getTransformPropertyName(window), `scale(${x}, ${y})`);
      }
    },
    setInnerScale: (x: number, y: number) => {
      if (isBrowser()) {
        this._renderer.setStyle(this.menuContainerEl.nativeElement, getTransformPropertyName(window), `scale(${x}, ${y})`);
      }
    },
    getNumberOfItems: () => {
      return this.menuItems ? this.menuItems.length : 0;
    },
    registerInteractionHandler: (type: string, handler: EventListener) => {
      if (this._root) {
        this.listen_(type, handler, this._root.nativeElement);
      }
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this.unlisten_(type, handler);
    },
    registerBodyClickHandler: (handler: EventListener) => {
      if (this._root) {
        this.listen_('click', handler, this._root.nativeElement.ownerDocument);
      }
    },
    deregisterBodyClickHandler: (handler: EventListener) => {
      this.unlisten_('click', handler);
    },
    getYParamsForItemAtIndex: (index: number) => {
      const { offsetTop: top, offsetHeight: height } = this.menuItems.toArray()[index].itemEl.nativeElement;
      return { top, height };
    },
    setTransitionDelayForItemAtIndex: (index: number, value: string) => {
      this._renderer.setStyle(this.menuItems.toArray()[index].itemEl.nativeElement, 'transition-delay', value);
    },
    getIndexForEventTarget: (target: EventTarget) => {
      return this.menuItems.toArray().findIndex((_) => _.itemEl.nativeElement === target);
    },
    notifySelected: (evtData) => {
      this.select.emit(evtData.index);
    },
    notifyCancel: () => {
      this.cancel.emit();
    },
    saveFocus: () => {
      if (isBrowser()) {
        this.previousFocus_ = document.activeElement;
      }
    },
    restoreFocus: () => {
      if (this.previousFocus_) {
        this.previousFocus_.focus();
      }
    },
    isFocused: () => {
      return this._root.nativeElement.ownerDocument.activeElement === this._root.nativeElement;
    },
    focus: () => {
      this._root.nativeElement.focus();
    },
    getFocusedItemIndex: () => {
      return this.menuItems.length ? this.menuItems.toArray().findIndex(_ =>
        _.itemEl.nativeElement === this._root.nativeElement.ownerDocument.activeElement) : -1;
    },
    focusItemAtIndex: (index: number) => {
      if (this.menuItems.toArray()[index] !== undefined) {
        this.menuItems.toArray()[index].itemEl.nativeElement.focus();
      } else {
        // set focus back to root element when index is undefined
        this._root.nativeElement.focus();
      }
    },
    isRtl: () => { /* TODO */
      return false;
    },
    setTransformOrigin: (origin: string) => {
      if (isBrowser()) {
        this._renderer.setStyle(this._root.nativeElement, `${getTransformPropertyName(window)}-origin`, origin);
      }
    },
    setPosition: (position) => {
      const { _renderer: renderer, _root: root } = this;
      position.left ? renderer.setStyle(root.nativeElement, 'left', 0) : renderer.removeStyle(root.nativeElement, 'left');
      position.right ? renderer.setStyle(root.nativeElement, 'right', 0) : renderer.removeStyle(root.nativeElement, 'right');
      position.top ? renderer.setStyle(root.nativeElement, 'top', 0) : renderer.removeStyle(root.nativeElement, 'top');
      position.bottom ? renderer.setStyle(root.nativeElement, 'bottom', 0) : renderer.removeStyle(root.nativeElement, 'bottom');
    },
    getAccurateTime: () => {
      return isBrowser() ? window.performance.now() : Date.now();
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    open: Function,
    close: Function,
    isOpen: Function
  } = new MDCSimpleMenuFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef) { }

  ngAfterViewInit() {
    this._foundation.init();
  }
  ngOnDestroy() {
    this._foundation.destroy();
  }

  isOpen() {
    return this._foundation.isOpen();
  }

  open(focusIndex: number) {
    if (!this.isOpen()) {
      this._foundation.open({ focusIndex: focusIndex });
    }
  }

  close() {
    this._foundation.close();
  }

  listen_(type: string, listener: EventListener, ref: any) {
    if (!this._unlisteners.has(type)) {
      this._unlisteners.set(type, new WeakMap<EventListener, Function>());
    }
    const unlistener = this._renderer.listen(ref, type, listener);
    this._unlisteners.get(type).set(listener, unlistener);
  }

  unlisten_(type: string, listener: EventListener) {
    if (!this._unlisteners.has(type)) {
      return;
    }
    const unlisteners = this._unlisteners.get(type);
    if (!unlisteners.has(listener)) {
      return;
    }
    unlisteners.get(listener)();
    unlisteners.delete(listener);
  }
}
