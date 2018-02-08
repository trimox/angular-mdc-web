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
import { isBrowser, toBoolean, EventRegistry } from '@angular-mdc/web/common';

import { MDCMenuAdapter } from '@material/menu/adapter';
import { getTransformPropertyName } from '@material/menu/util';
import { MDCMenuFoundation, Corner } from '@material/menu';

export type MdcMenuAnchorCorner = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

let nextUniqueId = 0;
let uniqueIdCounter = 0;

@Directive({
  selector: '[mdc-menu-anchor]'
})
export class MdcMenuAnchor {
  @HostBinding('class.mdc-menu-anchor') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdc-menu-divider], mdc-menu-divider',
  template: '<div class="mdc-list-divider" role="seperator"></div>',
})
export class MdcMenuDivider {
  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-menu-items',
})
export class MdcMenuItems {
  @HostBinding('class.mdc-list') isHostClass = true;
  @HostBinding('class.mdc-menu__items') isSelectClass = true;
  @HostBinding('attr.role') role: string = 'menu';
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-menu-item',
  host: {
    '[id]': 'id',
  },
})
export class MdcMenuItem {
  private _disabled: boolean = false;

  @Input() id: string = `mdc-menu-item-${uniqueIdCounter++}`;
  @Input() label: string;
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
    if (value) {
      this._renderer.setAttribute(this.elementRef.nativeElement, 'aria-disabled', 'true');
      this.tabindex = -1;
    } else {
      this._renderer.removeAttribute(this.elementRef.nativeElement, 'aria-disabled');
      this.tabindex = 0;
    }
  }
  @HostBinding('class.mdc-list-item') isHostClass = true;
  @HostBinding('attr.role') role: string = 'menuitem';
  @HostBinding('tabindex') tabindex: number = 0;

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-menu',
  host: {
    '[id]': 'id',
  },
  template: `
  <mdc-menu-items>
    <ng-content></ng-content>
  </mdc-menu-items>
  `,
  providers: [EventRegistry],
})
export class MdcMenu implements AfterViewInit, OnChanges, OnDestroy {
  private _uniqueId: string = `mdc-menu-${++nextUniqueId}`;
  private _previousFocus: any;

  @Input() id: string = this._uniqueId;
  @Input() anchorCorner: string | MdcMenuAnchorCorner;
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @HostBinding('class.mdc-menu') isHostClass = true;
  @HostBinding('tabindex') tabindex: number = -1;
  @ViewChild(MdcMenuItems) menuContainer: MdcMenuItems;
  @ContentChildren(MdcMenuItem) options: QueryList<MdcMenuItem>;

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
    hasNecessaryDom: () => !!this.menuContainer,
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
    getNumberOfItems: () => {
      return this.options ? this.options.length : 0;
    },
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen(type, handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten(type, handler);
    },
    registerBodyClickHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen('click', handler, document.body);
      }
    },
    deregisterBodyClickHandler: (handler: EventListener) => {
      this._registry.unlisten('click', handler);
    },
    getIndexForEventTarget: (target: EventTarget) => {
      return this.options.toArray().findIndex((_) => _.elementRef.nativeElement === target);
    },
    notifySelected: (evtData: { index: number }) => {
      this.select.emit({
        index: evtData.index,
        item: this.options.toArray()[evtData.index].elementRef.nativeElement
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
      return document.activeElement === this.elementRef.nativeElement;
    },
    focus: () => {
      this.elementRef.nativeElement.focus();
    },
    getFocusedItemIndex: () => {
      return this.options.length ? this.options.toArray().findIndex(_ =>
        _.elementRef.nativeElement === this.elementRef.nativeElement.ownerDocument.activeElement) : -1;
    },
    focusItemAtIndex: (index: number) => {
      index ? this.options.toArray()[index].elementRef.nativeElement.focus() : this.elementRef.nativeElement.focus();
    },
    isRtl: () => this.direction === 'rtl',
    setTransformOrigin: (origin: string) => {
      if (isBrowser()) {
        this._renderer.setStyle(this.elementRef.nativeElement, `${getTransformPropertyName(window)}-origin`, origin);
      }
    },
    setPosition: (position) => {
      position.left ? this._setStyle(position.left, 'left') : this._removeStyle('left');
      position.right ? this._setStyle(position.right, 'right') : this._removeStyle('right');
      position.top ? this._setStyle(position.top, 'top') : this._removeStyle('top');
      position.bottom ? this._setStyle(position.bottom, 'bottom') : this._removeStyle('bottom');
    },
    setMaxHeight: (height) => {
      this._renderer.setStyle(this.elementRef.nativeElement, 'maxHeight', height);
    },
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    open({ focusIndex: number }): void,
    close(evt?: Event): void,
    isOpen(): boolean,
    setAnchorCorner(corner: Corner): void,
    setAnchorMargin(): void,
    setQuickOpen(quickOpen: boolean): void,
  } = new MDCMenuFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    const anchorCorner = changes['anchorCorner'];

    if (anchorCorner) {
      this.setAnchorCorner(anchorCorner.currentValue);
    }
  }

  private _setStyle(position: string, anchorPoint: string): void {
    this._renderer.setStyle(this.elementRef.nativeElement, anchorPoint, position);
  }

  private _removeStyle(anchorPoint: string): void {
    this._renderer.removeStyle(this.elementRef.nativeElement, anchorPoint);
  }

  private _parseAnchorCorner(value: string | MdcMenuAnchorCorner): Corner {
    switch (value) {
      case 'top-end': {
        return Corner.TOP_END;
      }
      case 'bottom-start': {
        return Corner.BOTTOM_START;
      }
      case 'bottom-end': {
        return Corner.BOTTOM_END;
      }
      default: {
        return Corner.TOP_START;
      }
    }
  }

  setAnchorCorner(value: string | MdcMenuAnchorCorner): void {
    this._foundation.setAnchorCorner(this._parseAnchorCorner(value));
  }

  isOpen(): boolean {
    return this._foundation.isOpen();
  }

  open(focusIndex?: number): void {
    if (!this.isOpen()) {
      this._foundation.open({ focusIndex: focusIndex });
    }
  }

  close(): void {
    this._foundation.close();
  }

  focus(): void {
    this._mdcAdapter.focus();
  }

  isFocused(): boolean {
    return this._mdcAdapter.isFocused();
  }

  getFocusedItemIndex(): number {
    return this._mdcAdapter.getFocusedItemIndex();
  }

  hasAnchor(): boolean {
    return this._mdcAdapter.hasAnchor();
  }

  isRtl(): boolean {
    return this._mdcAdapter.isRtl();
  }

  setQuickOpen(quickOpen: boolean): void {
    this._foundation.setQuickOpen(quickOpen);
  }
}
