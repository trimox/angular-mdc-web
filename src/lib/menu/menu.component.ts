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
import { Platform } from '../common/platform';

const { MDCSimpleMenuFoundation } = require('@material/menu/simple');
const { getTransformPropertyName } = require('@material/menu/util');
const MDC_MENU_STYLES = require('@material/menu/mdc-menu.scss');
const MDC_LIST_STYLES = require('@material/list/mdc-list.scss');

export enum MDC_OPEN_FROM {
  TOP_LEFT = 'mdc-simple-menu--open-from-top-left',
  TOP_RIGHT = 'mdc-simple-menu--open-from-top-right',
  BOTTOM_LEFT = 'mdc-simple-menu--open-from-bottom-left',
  BOTTOM_RIGHT = 'mdc-simple-menu--open-from-bottom-right',
}

type UnlistenerMap = WeakMap<EventListener, Function>;

@Component({
  selector: 'mdc-menu',
  templateUrl: './menu.component.html',
  styles: [String(MDC_MENU_STYLES), String(MDC_LIST_STYLES)],
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
      const { _renderer: renderer, _root: root } = this;
      renderer.addClass(root.nativeElement, className);
    },
    removeClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.removeClass(root.nativeElement, className);
    },
    getAttributeForEventTarget: (target: any, attributeName) => {
      return target.getAttribute(attributeName);
    },
    hasClass: (className: string) => {
      const { _root: root } = this;
      return root.nativeElement.classList.contains(className);
    },
    hasNecessaryDom: () => Boolean(this.menuContainerEl),
    getInnerDimensions: () => {
      const { _root: root } = this;
      return {
        width: root.nativeElement.offsetWidth,
        height: root.nativeElement.offsetHeight
      };
    },
    hasAnchor: () => {
      const { _renderer: renderer, _root: root } = this;
      return renderer.parentNode(root.nativeElement) && renderer.parentNode(root.nativeElement).classList.contains('mdc-menu-anchor');
    },
    getAnchorDimensions: () => {
      const { _renderer: renderer, _root: root } = this;
      return renderer.parentNode(root.nativeElement).getBoundingClientRect();
    },
    getWindowDimensions: () => {
      return {
        width: this._platForm.isBrowser ? window.innerWidth : 0,
        height: this._platForm.isBrowser ? window.innerHeight : 0
      };
    },
    setScale: (x: number, y: number) => {
      if (this._platForm.isBrowser) {
        const { _renderer: renderer, _root: root } = this;
        renderer.setStyle(root.nativeElement, getTransformPropertyName(window), `scale(${x}, ${y})`);
      }
    },
    setInnerScale: (x: number, y: number) => {
      if (this._platForm.isBrowser) {
        const { _renderer: renderer, _root: root } = this;
        renderer.setStyle(this.menuContainerEl.nativeElement, getTransformPropertyName(window), `scale(${x}, ${y})`);
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
      const { _renderer: renderer, _root: root } = this;
      renderer.setStyle(this.menuItems.toArray()[index].itemEl.nativeElement, 'transition-delay', value);
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
      if (this._platForm.isBrowser) {
        this.previousFocus_ = document.activeElement;
      }
    },
    restoreFocus: () => {
      if (this.previousFocus_) {
        this.previousFocus_.focus();
      }
    },
    isFocused: () => {
      const { _root: root } = this;
      return root.nativeElement.ownerDocument.activeElement === root.nativeElement;
    },
    focus: () => {
      this._root.nativeElement.focus();
    },
    getFocusedItemIndex: () => {
      const { _root: root } = this;
      return this.menuItems.length ? this.menuItems.toArray().findIndex(_ =>
        _.itemEl.nativeElement === root.nativeElement.ownerDocument.activeElement) : -1;
    },
    focusItemAtIndex: (index: number) => {
      const { _root: root } = this;
      if (this.menuItems.toArray()[index] !== undefined) {
        this.menuItems.toArray()[index].itemEl.nativeElement.focus();
      } else {
        // set focus back to root element when index is undefined
        root.nativeElement.focus();
      }
    },
    isRtl: () => { /* TODO */
      return false;
    },
    setTransformOrigin: (origin: string) => {
      if (this._platForm.isBrowser) {
        const { _renderer: renderer, _root: root } = this;
        renderer.setStyle(root.nativeElement, `${getTransformPropertyName(window)}-origin`, origin);
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
      return this._platForm.isBrowser ? window.performance.now() : Date.now();
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
    private _root: ElementRef,
    private _platForm: Platform) { }

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
