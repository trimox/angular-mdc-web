import {
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { Platform, toBoolean } from '@angular-mdc/web/common';

import { MDCMenuSurfaceAdapter } from '@material/menu-surface/adapter';
import { getTransformPropertyName } from '@material/menu-surface/util';
import { Corner, strings } from '@material/menu-surface/constants';
import { MDCMenuSurfaceFoundation } from '@material/menu-surface';

export interface MdcMenuSurfaceOpenedEvent {
  detail: string;
}

export interface AnchorMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface AbsolutePosition {
  x: number;
  y: number;
}

export type Anchor = 'bottomEnd' | 'bottomLeft' | 'bottomRight' |
  'bottomStart' | 'topEnd' | 'topLeft' | 'topRight' | 'topStart';

const ANCHOR_CORNER_MAP = {
  bottomEnd: 'BOTTOM_END',
  bottomLeft: 'BOTTOM_LEFT',
  bottomRight: 'BOTTOM_RIGHT',
  bottomStart: 'BOTTOM_START',
  topEnd: 'TOP_END',
  topLeft: 'TOP_LEFT',
  topRight: 'TOP_RIGHT',
  topStart: 'TOP_START'
};

@Component({
  moduleId: module.id,
  selector: '[mdcMenuSurfaceAnchor], mdc-menu-surface-anchor',
  host: {
    'class': 'mdc-menu-surface--anchor'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdcMenuSurfaceAnchor {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

export class MdcMenuSurfaceBase {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _previousFocus: Element | null;
  private _firstFocusableElement: Element;
  private _lastFocusableElement: Element;
  private _anchorElement: HTMLElement | null;

  /** Emits an event whenever the menu surface is opened. */
  @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();

  /** Emits an event whenever the menu surface is closed. */
  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  /** Subscription to interaction events in menu-surface. */
  private _openedMenuSubscription: Subscription;

  private _mdcMenuSurfaceAdapter: MDCMenuSurfaceAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    hasAnchor: () => this._anchorElement,
    notifyClose: () => this.closed.emit(),
    notifyOpen: () => this.opened.emit(),
    isElementInContainer: (el: Element) => this._getHostElement() === el || this._getHostElement().contains(el),
    isRtl: () => getComputedStyle(this._getHostElement()).getPropertyValue('direction') === 'rtl',
    setTransformOrigin: (origin: string) => {
      this._getHostElement().style[`${getTransformPropertyName(window)}-origin`] = origin;
    },
    isFocused: () => this.platform.isBrowser ? document.activeElement === this._getHostElement() : false,
    saveFocus: () => {
      if (!this.platform.isBrowser) { return; }
      this._previousFocus = document.activeElement;
    },
    restoreFocus: () => {
      if (!this.platform.isBrowser) { return; }

      if (this._getHostElement().contains(document.activeElement)) {
        if (this._previousFocus && (<any>this._previousFocus).focus) {
          (<any>this._previousFocus).focus();
        }
      }
    },
    isFirstElementFocused: () => {
      if (!this.platform.isBrowser) { return false; }
      return this._firstFocusableElement && this._firstFocusableElement === document.activeElement;
    },
    isLastElementFocused: () => {
      if (!this.platform.isBrowser) { return false; }
      return this._lastFocusableElement && this._lastFocusableElement === document.activeElement;
    },
    focusFirstElement: () => {
      if (!this.platform.isBrowser) { return; }

      if (this._firstFocusableElement) {
        (<any>this._firstFocusableElement).focus();
      }
    },
    focusLastElement: () => {
      if (!this.platform.isBrowser) { return; }

      if (this._lastFocusableElement) {
        (<any>this._lastFocusableElement).focus();
      }
    },
    getInnerDimensions: () => {
      return { width: this._getHostElement().offsetWidth, height: this._getHostElement().offsetHeight };
    },
    getAnchorDimensions: () => this._anchorElement && this._anchorElement.getBoundingClientRect(),
    getWindowDimensions: () => {
      return {
        width: this.platform.isBrowser ? window.innerWidth : 0,
        height: this.platform.isBrowser ? window.innerHeight : 0
      };
    },
    getBodyDimensions: () => {
      return {
        width: this.platform.isBrowser ? document.body.clientWidth : 0,
        height: this.platform.isBrowser ? document.body.clientHeight : 0
      };
    },
    getWindowScroll: () => {
      return {
        x: this.platform.isBrowser ? window.pageXOffset : 0,
        y: this.platform.isBrowser ? window.pageYOffset : 0
      };
    },
    setPosition: (position: { left: string, right: string, top: string, bottom: string }) => {
      this._getHostElement().style.left = 'left' in position ? position.left : null;
      this._getHostElement().style.right = 'right' in position ? position.right : null;
      this._getHostElement().style.top = 'top' in position ? position.top : null;
      this._getHostElement().style.bottom = 'bottom' in position ? position.bottom : null;
    },
    setMaxHeight: (height: string) => this._getHostElement().style.maxHeight = height
  };

  private _foundation: {
    destroy(): void,
    open(): void,
    close(): void,
    isOpen(): boolean,
    setAnchorCorner(corner: Corner): void,
    setAnchorMargin(margin: AnchorMargin): void,
    setIsHoisted(isHoisted: boolean): void,
    setFixedPosition(isFixedPosition: boolean): void,
    setAbsolutePosition(x: number, y: number): void,
    setQuickOpen(quickOpen: boolean): void,
    handleBodyClick(evt: MouseEvent): void,
    handleKeydown(evt: KeyboardEvent): void
  } = new MDCMenuSurfaceFoundation(this._mdcMenuSurfaceAdapter);

  constructor(
    protected platform: Platform,
    protected ngZone: NgZone,
    protected elementRef: ElementRef<HTMLElement>) { }

  protected initMenuSurface(): void {
    this._loadListeners();

    if (this._getHostElement().parentElement) {
      this._anchorElement = this._getHostElement().parentElement;
    }
  }

  protected destroyMenuSurface(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._openedMenuSubscription) {
      this._openedMenuSubscription.unsubscribe();
    }

    this._foundation.destroy();
  }

  protected setOpen(open: boolean): void {
    const isOpen = toBoolean(open);

    if (isOpen) {
      const focusableElements = this._getHostElement().querySelectorAll(strings.FOCUSABLE_ELEMENTS);
      this._firstFocusableElement = focusableElements.length > 0 ? focusableElements[0] : null;
      this._lastFocusableElement = focusableElements.length > 0 ?
        focusableElements[focusableElements.length - 1] : null;

      this._foundation.open();
    } else {
      this._foundation.close();
    }
  }

  /**
   * Removes the menu-surface from it's current location and appends it to the
   * body to overcome any overflow:hidden issues.
   */
  protected setHoistMenuToBody(): void {
    if (!this.platform.isBrowser) { return; }

    const parentEl = this._getHostElement().parentElement;
    if (parentEl) {
      document.body.appendChild(parentEl.removeChild(this._getHostElement()));
      this.setIsHoisted(true);
    }
  }

  /**
   * Sets the foundation to use page offsets for an positioning when the menu
   * is hoisted to the body.
   */
  protected setIsHoisted(isHoisted: boolean): void {
    this._foundation.setIsHoisted(isHoisted);
  }

  /** Sets the element that the menu-surface is anchored to. */
  protected setMenuSurfaceAnchorElement(element: any): void {
    this._anchorElement = element;
  }

  /** Default anchor corner alignment of top - left surface corner. */
  protected setAnchorCorner(corner: string): void {
    const cornerBit = MDCMenuSurfaceFoundation.Corner[ANCHOR_CORNER_MAP[corner]];
    this._foundation.setAnchorCorner(cornerBit);
  }

  protected setAnchorMargin(margin: AnchorMargin): void {
    this._foundation.setAnchorMargin(margin);
  }

  protected setQuickOpen(quickOpen: boolean): void {
    this._foundation.setQuickOpen(quickOpen);
  }

  protected isOpen(): boolean {
    return this._foundation.isOpen();
  }

  /** Sets the menu-surface to position: fixed. */
  protected setFixedPosition(isFixed: boolean): void {
    const fixed = toBoolean(isFixed);

    fixed ? this._getHostElement().classList.add('mdc-menu-surface--fixed') :
      this._getHostElement().classList.remove('mdc-menu-surface--fixed');
    this._foundation.setFixedPosition(fixed);
  }

  /** Sets the absolute x/y position to position based on. Requires the menu to be hoisted. */
  protected setAbsolutePosition(x: number, y: number): void {
    this._foundation.setAbsolutePosition(x, y);
    this.setIsHoisted(true);
  }

  private _loadListeners(): void {
    this.ngZone.runOutsideAngular(() =>
      fromEvent<KeyboardEvent>(this._getHostElement(), 'keydown').pipe(takeUntil(this._destroy))
        .subscribe((evt) => this.ngZone.run(() => this._foundation.handleKeydown(evt))));
  }

  protected registerBodyCick(): void {
    this._openedMenuSubscription =
      this.ngZone.runOutsideAngular(() =>
        fromEvent<MouseEvent>(document.body, 'click')
          .subscribe((evt) => this.ngZone.run(() => this._foundation.handleBodyClick(evt))));
  }

  protected deregisterBodyClick(): void {
    if (this._openedMenuSubscription) {
      this._openedMenuSubscription.unsubscribe();
    }
  }

  /** Retrieves the DOM element of the component host. */
  protected _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
