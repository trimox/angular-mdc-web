import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { isBrowser, toBoolean } from '@angular-mdc/web/common';

import { MDCMenuAdapter } from '@material/menu/adapter';
import { getTransformPropertyName } from '@material/menu/util';
import { MDCMenuFoundation, Corner } from '@material/menu';

export type MdcMenuAnchorCorner = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

export class MdcMenuChange {
  constructor(
    public index: number,
    public source: MdcMenuItem) { }
}

let nextUniqueId = 0;
let uniqueIdCounter = 0;

@Component({
  moduleId: module.id,
  selector: '[mdc-menu-anchor], [mdcMenuAnchor], mdc-menu-anchor',
  exportAs: 'mdcMenuAnchor',
  template: '<ng-content></ng-content>'
})
export class MdcMenuAnchor {
  @HostBinding('class.mdc-menu-anchor') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdc-menu-divider], mdc-menu-divider',
  exportAs: 'mdcMenuDivider',
  template: '<div class="mdc-list-divider" role="seperator"></div>',
})
export class MdcMenuDivider {
  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-menu-items',
  exportAs: 'mdcMenuItems'
})
export class MdcMenuItems {
  @HostBinding('class.mdc-list') isHostClass = true;
  @HostBinding('class.mdc-menu__items') isSelectClass = true;
  @HostBinding('attr.role') role: string = 'menu';
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-menu-item',
  exportAs: 'mdcMenuItem',
  host: {
    '[id]': 'id',
    '[attr.tabindex]': '_getTabIndex()',
  },
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcMenuItem {
  @Input() id: string = `mdc-menu-item-${uniqueIdCounter++}`;
  @Input() label: string;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
    value ? this._renderer.setAttribute(this.elementRef.nativeElement, 'aria-disabled', 'true')
      : this._renderer.removeAttribute(this.elementRef.nativeElement, 'aria-disabled');
  }
  private _disabled: boolean = false;

  @HostBinding('class.mdc-list-item') isHostClass = true;
  @HostBinding('attr.role') role: string = 'menuitem';

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  /** Used to set the `tabindex`. */
  _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-menu',
  host: {
    '[id]': 'id',
  },
  exportAs: 'mdcMenu',
  template: `
  <mdc-menu-items>
    <ng-content></ng-content>
  </mdc-menu-items>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcMenu implements AfterViewInit, OnDestroy {
  private _uniqueId: string = `mdc-menu-${++nextUniqueId}`;
  private _previousFocus: any;

  @Input() id: string = this._uniqueId;

  @Input() anchor: MdcMenuAnchor;

  @Input()
  get anchorCorner(): string { return this._anchorCorner; }
  set anchorCorner(value: string) {
    this.setAnchorCorner(value);
  }
  private _anchorCorner: string = 'top-start';

  @Input()
  get rememberSelection(): boolean { return this._rememberSelection; }
  set rememberSelection(value: boolean) {
    this.setRememberSelection(value);
  }
  private _rememberSelection: boolean = false;

  @Input()
  get quickOpen(): boolean { return this._quickOpen; }
  set quickOpen(value: boolean) {
    this.setQuickOpen(value);
  }
  private _quickOpen: boolean = false;

  @Output() readonly cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() readonly select: EventEmitter<MdcMenuChange> = new EventEmitter<MdcMenuChange>();

  @HostBinding('class.mdc-menu') isHostClass = true;
  @HostBinding('tabindex') tabindex: number = -1;

  @ViewChild(MdcMenuItems) menuContainer: MdcMenuItems;
  @ContentChildren(MdcMenuItem) options: QueryList<MdcMenuItem>;

  private _mdcAdapter: MDCMenuAdapter = {
    addClass: (className: string) => this._renderer.addClass(this._getHostElement(), className),
    removeClass: (className: string) => this._renderer.removeClass(this._getHostElement(), className),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    hasNecessaryDom: () => this.menuContainer,
    getAttributeForEventTarget: (target: any, attributeName: string) => target.getAttribute(attributeName),
    getInnerDimensions: () => {
      return {
        width: this.menuContainer.elementRef.nativeElement.offsetWidth,
        height: this.menuContainer.elementRef.nativeElement.offsetHeight
      };
    },
    hasAnchor: () => this.anchor,
    getAnchorDimensions: () => this.anchor.elementRef.nativeElement.getBoundingClientRect(),
    getWindowDimensions: () => {
      return {
        width: isBrowser() ? window.innerWidth : 0,
        height: isBrowser() ? window.innerHeight : 0
      };
    },
    getNumberOfItems: () => this.options ? this.options.length : 0,
    registerInteractionHandler: (type: string, handler: EventListener) => this._getHostElement().addEventListener(type, handler),
    deregisterInteractionHandler: (type: string, handler: EventListener) => this._getHostElement().removeEventListener(type, handler),
    registerBodyClickHandler: (handler: EventListener) => document.body.addEventListener('click', handler),
    deregisterBodyClickHandler: (handler: EventListener) => document.body.removeEventListener('click', handler),
    getIndexForEventTarget: (target: EventTarget) => this.options.toArray().findIndex((_) => _.elementRef.nativeElement === target),
    notifySelected: (evtData: { index: number }) =>
      this.select.emit(new MdcMenuChange(evtData.index, this.options.toArray()[evtData.index])),
    notifyCancel: () => this.cancel.emit(),
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
    isFocused: () => document.activeElement === this._getHostElement(),
    focus: () => this._getHostElement().focus(),
    getFocusedItemIndex: () => this.options.toArray().map(_ => _.elementRef.nativeElement).indexOf(document.activeElement),
    focusItemAtIndex: (index: number) => this.options.toArray()[index].elementRef.nativeElement.focus(),
    isRtl: () => getComputedStyle(this._getHostElement()).getPropertyValue('direction') === 'rtl',
    setTransformOrigin: (origin: string) => {
      if (isBrowser()) {
        this._renderer.setStyle(this._getHostElement(), `${getTransformPropertyName(window)}-origin`, origin);
      }
    },
    setPosition: (position: { left: string, right: string, top: string, bottom: string }) => {
      position.left ? this._setStyle('left', position.left) : this._setStyle('left');
      position.right ? this._setStyle('right', position.right) : this._setStyle('right');
      position.top ? this._setStyle('top', position.top) : this._setStyle('top');
      position.bottom ? this._setStyle('bottom', position.bottom) : this._setStyle('bottom');
    },
    setMaxHeight: (height: string) => this._renderer.setStyle(this._getHostElement(), 'maxHeight', height),
    setAttrForOptionAtIndex: (index: number, attr: string, value: string) =>
      this._renderer.setAttribute(this.options.toArray()[index].elementRef.nativeElement, attr, value),
    rmAttrForOptionAtIndex: (index: number, attr: string) =>
      this._renderer.removeAttribute(this.options.toArray()[index].elementRef.nativeElement, attr),
    addClassForOptionAtIndex: (index: number, className: string) =>
      this._renderer.addClass(this.options.toArray()[index].elementRef.nativeElement, className),
    rmClassForOptionAtIndex: (index: number, className: string) =>
      this._renderer.removeClass(this.options.toArray()[index].elementRef.nativeElement, className),
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    open(): void,
    close(evt?: Event): void,
    isOpen(): boolean,
    setAnchorCorner(corner: Corner): void,
    setAnchorMargin(): void,
    setQuickOpen(quickOpen: boolean): void,
    setRememberSelection(rememberSelection: boolean): void,
    setSelectedIndex(index: number): void,
    getSelectedIndex(): number
  } = new MDCMenuFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  setRememberSelection(rememberSelection: boolean): void {
    this._rememberSelection = toBoolean(rememberSelection);
    this._foundation.setRememberSelection(rememberSelection);

    this._changeDetectorRef.markForCheck();
  }

  setSelectedIndex(index: number): void {
    this._foundation.setSelectedIndex(index);
  }

  getSelectedIndex(): number {
    return this._foundation.getSelectedIndex();
  }

  setAnchorCorner(value: string): void {
    this._anchorCorner = value;
    if (this._foundation) {
      const corner = this._parseAnchorCorner(value);
      this._foundation.setAnchorCorner(corner);
    }

    this._changeDetectorRef.markForCheck();
  }

  setQuickOpen(quickOpen: boolean): void {
    this._quickOpen = toBoolean(quickOpen);
    this._foundation.setQuickOpen(quickOpen);

    this._changeDetectorRef.markForCheck();
  }

  setMaxHeight(height: string): void {
    this._mdcAdapter.setMaxHeight(height);
  }

  isOpen(): boolean {
    return this._foundation.isOpen();
  }

  open(): void {
    if (!this.isOpen()) {
      this._foundation.open();
    }
  }

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  close(): void {
    this._foundation.close();
  }

  focus(): void {
    this._getHostElement().focus();
  }

  private _setStyle(anchorPoint: string, position?: string): void {
    position ? this._renderer.setStyle(this._getHostElement(), anchorPoint, position)
      : this._renderer.removeStyle(this._getHostElement(), anchorPoint);
  }

  private _parseAnchorCorner(value: string): Corner {
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

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
