import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import { isBrowser } from '../common';
import { EventRegistry } from '../common/event-registry';

import { MDCMenuAdapter } from './menu-adapter';
import { MdcMenuItemDirective } from './menu-item.directive';
import { getTransformPropertyName } from '@material/menu/util';
import { MDCSimpleMenuFoundation } from '@material/menu/simple';

export enum MenuOpenFrom {
  topLeft = <any>"mdc-simple-menu--open-from-top-left",
  topRight = <any>"mdc-simple-menu--open-from-top-right",
  bottomLeft = <any>"mdc-simple-menu--open-from-bottom-left",
  bottomRight = <any>"mdc-simple-menu--open-from-bottom-right"
}

@Directive({
  selector: '[mdc-menu-anchor]'
})
export class MdcMenuAnchorDirective {
  @HostBinding('class.mdc-menu-anchor') isHostClass = true;
}

@Component({
  selector: 'mdc-menu-divider',
  template:
  `<div class="mdc-list-divider" role="seperator"></div>`,
})
export class MdcMenuDividerComponent { }

@Component({
  selector: 'mdc-menu',
  template:
  `
  <ul #menuContainer class="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">
   <ng-content select="mdc-menu-item, mdc-menu-divider"></ng-content>
  </ul>
  `,
  providers: [EventRegistry],
})
export class MdcMenuComponent implements AfterViewInit, OnChanges, OnDestroy {
  private _previousFocus: any;

  @Input() openFrom: string;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @HostBinding('class.mdc-simple-menu') isHostClass = true;
  @HostBinding('tabindex') tabindex: number = -1;
  @ViewChild('menuContainer') public menuContainerEl: ElementRef;
  @ContentChildren(MdcMenuItemDirective) menuItems: QueryList<MdcMenuItemDirective>;

  private _mdcAdapter: MDCMenuAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    getAttributeForEventTarget: (target: any, attributeName) => {
      return target.getAttribute(attributeName);
    },
    hasClass: (className: string) => {
      return this.elementRef.nativeElement.classList.contains(className);
    },
    hasNecessaryDom: () => !!this.menuContainerEl,
    getInnerDimensions: () => {
      return {
        width: this.elementRef.nativeElement.offsetWidth,
        height: this.elementRef.nativeElement.offsetHeight
      };
    },
    hasAnchor: () => {
      return this._renderer.parentNode(this.elementRef.nativeElement)
        && this._renderer.parentNode(this.elementRef.nativeElement).classList.contains('mdc-menu-anchor');
    },
    getAnchorDimensions: () => {
      return this._renderer.parentNode(this.elementRef.nativeElement).getBoundingClientRect();
    },
    getWindowDimensions: () => {
      return {
        width: isBrowser() ? window.innerWidth : 0,
        height: isBrowser() ? window.innerHeight : 0
      };
    },
    setScale: (x: number, y: number) => {
      if (isBrowser()) {
        this._renderer.setStyle(this.elementRef.nativeElement, getTransformPropertyName(window), `scale(${x}, ${y})`);
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
      this._registry.listen_(this._renderer, type, handler, this.elementRef);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten_(type, handler);
    },
    registerBodyClickHandler: (handler: EventListener) => {
      this._registry.listen_(this._renderer, 'click', handler, 'body');
    },
    deregisterBodyClickHandler: (handler: EventListener) => {
      this._registry.unlisten_('click', handler);
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
    notifySelected: (evtData: { index: number }) => {
      this.select.emit({
        index: evtData.index,
        item: this.menuItems.toArray()[evtData.index].itemEl.nativeElement
      });
    },
    notifyCancel: () => {
      this.cancel.emit();
    },
    saveFocus: () => {
      if (isBrowser()) {
        this._previousFocus = document.activeElement;
      }
    },
    restoreFocus: () => {
      if (this._previousFocus) {
        this._previousFocus.focus();
      }
    },
    isFocused: () => {
      return this.elementRef.nativeElement.ownerDocument.activeElement === this.elementRef.nativeElement;
    },
    focus: () => {
      this.elementRef.nativeElement.focus();
    },
    getFocusedItemIndex: () => {
      return this.menuItems.length ? this.menuItems.toArray().findIndex(_ =>
        _.itemEl.nativeElement === this.elementRef.nativeElement.ownerDocument.activeElement) : -1;
    },
    focusItemAtIndex: (index: number) => {
      if (this.menuItems.toArray()[index] !== undefined) {
        this.menuItems.toArray()[index].itemEl.nativeElement.focus();
      } else {
        // set focus back to root element when index is undefined
        this.elementRef.nativeElement.focus();
      }
    },
    isRtl: () => { /* TODO */
      return false;
    },
    setTransformOrigin: (origin: string) => {
      if (isBrowser()) {
        this._renderer.setStyle(this.elementRef.nativeElement, `${getTransformPropertyName(window)}-origin`, origin);
      }
    },
    setPosition: (position) => {
      const { _renderer: renderer, elementRef: root } = this;
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
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit() {
    this._foundation.init();
  }
  ngOnDestroy() {
    this._foundation.destroy();
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    let change = changes['openFrom'];

    if (change) {
      if (change.previousValue) {
        this._mdcAdapter.removeClass(`${MenuOpenFrom[change.previousValue]}`);
      }
      if (change.currentValue) {
        this._mdcAdapter.addClass(`${MenuOpenFrom[change.currentValue]}`);
      }
    }
  }

  isOpen(): boolean {
    return this._foundation.isOpen();
  }

  open(focusIndex?: number): void {
    if (!this.isOpen()) {
      this._foundation.open({ focusIndex: focusIndex ? focusIndex : -1 });
    }
  }

  close(): void {
    this._foundation.close();
  }
}
