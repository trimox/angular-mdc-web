import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChange,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { isBrowser, EventRegistry } from '@angular-mdc/web/common';

import { MdcDrawerNavigation } from './drawer.directives';
import { MDCDrawerAdapter } from './adapter';
import { MDCTemporaryDrawerFoundation, MDCPersistentDrawerFoundation, util } from '@material/drawer';

export const FOCUSABLE_ELEMENTS =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' +
  'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';

export type MdcDrawerType = 'persistent' | 'permanent' | 'temporary';

@Component({
  moduleId: module.id,
  selector: 'mdc-drawer',
  template: `
  <mdc-drawer-navigation>
    <ng-content></ng-content>
  </mdc-drawer-navigation>
  `,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [
    EventRegistry,
  ]
})
export class MdcDrawer implements OnChanges, OnDestroy {
  private _drawer = 'permanent';
  private _fixedAdjustElement: ElementRef;

  @Input() fixed: boolean = false;
  @Input() direction: 'ltr' | 'rtl' = 'ltr';

  @Input()
  get drawer(): string { return this._drawer; }
  set drawer(drawer: string) {
    if (drawer !== this._drawer) {
      this._drawer = drawer;
    }
  }

  @Input()
  get fixedAdjustElement(): ElementRef { return this._fixedAdjustElement; }
  set fixedAdjustElement(element: ElementRef) {
    this._fixedAdjustElement = element;
  }

  @Input() closeOnClick: boolean = true;
  private get drawerElement(): ElementRef {
    return this.drawerNav && this.drawerNav.elementRef;
  }

  @Output() opened: EventEmitter<void> = new EventEmitter<void>();
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('class.mdc-drawer') isHostClass = true;
  @HostBinding('attr.role') role: string = 'navigation';
  @HostBinding('class.ng-mdc-drawer--fixed') get classFixed(): string {
    return this.fixed && this.isDrawerPermanent() ? 'ng-mdc-drawer--fixed' : '';
  }

  @ViewChild(MdcDrawerNavigation) drawerNav: MdcDrawerNavigation;

  private _mdcAdapter: MDCDrawerAdapter = {
    addClass: (className: string) => {
      this.renderer.addClass(this._getHostElement(), className);
    },
    removeClass: (className: string) => {
      this.renderer.removeClass(this._getHostElement(), className);
    },
    hasClass: (className: string) => {
      return this._getHostElement().classList.contains(className);
    },
    addBodyClass: (className: string) => {
      if (isBrowser()) {
        this.renderer.addClass(this.fixedAdjustElement
          ? (this.fixedAdjustElement.nativeElement ? this.fixedAdjustElement.nativeElement
            : this.fixedAdjustElement) : document.body, className);
      }
    },
    removeBodyClass: (className: string) => {
      if (isBrowser()) {
        this.renderer.removeClass(this.fixedAdjustElement
          ? (this.fixedAdjustElement.nativeElement ? this.fixedAdjustElement.nativeElement
            : this.fixedAdjustElement) : document.body, className);
      }
    },
    eventTargetHasClass: (target: HTMLElement, className: string) => {
      return target.classList.contains(className);
    },
    hasNecessaryDom: () => !!this.drawerNav,
    registerInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.listen(util.remapEvent(evt), handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerDrawerInteractionHandler: (evt: string, handler: EventListener) => {
      if (this.drawerElement) {
        this._registry.listen(util.remapEvent(evt), handler, this.drawerElement.nativeElement);
      }
    },
    deregisterDrawerInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this.drawerElement) {
        this._registry.listen('transitionend', handler, this.drawerElement.nativeElement);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      this._registry.unlisten('transitionend', handler);
    },
    registerDocumentKeydownHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen('keydown', handler, document);
      }
    },
    deregisterDocumentKeydownHandler: (handler: EventListener) => {
      this._registry.unlisten('keydown', handler);
    },
    getDrawerWidth: () => {
      return this.drawerNav ? this.drawerNav.elementRef.nativeElement.offsetWidth : 0;
    },
    setTranslateX: (value) => {
      if (this.drawerNav) {
        this.renderer.setProperty(this.drawerNav.elementRef, util.getTransformPropertyName(),
          value === null ? null : `translateX(${value}px)`);
      }
    },
    updateCssVariable: (value: string) => {
      if (util.supportsCssCustomProperties()) {
        this.renderer.setStyle(this._getHostElement(), '--mdc-temporary-drawer-opacity', value);
      }
    },
    getFocusableElements: () => {
      return this.drawerNav ?
        this.drawerNav.elementRef.nativeElement.querySelectorAll(FOCUSABLE_ELEMENTS) : null;
    },
    saveElementTabState: (el: Element) => {
      util.saveElementTabState(el);
    },
    restoreElementTabState: (el: Element) => {
      util.restoreElementTabState(el);
    },
    makeElementUntabbable: (el: Element) => {
      this.renderer.setAttribute(el, 'tabindex', '-1');
    },
    notifyOpen: () => this.opened.emit(),
    notifyClose: () => this.closed.emit(),
    isRtl: () => this.isRtl(),
    isDrawer: (el) => {
      return this.drawerNav ? el === this.drawerNav.elementRef.nativeElement : false;
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    open: Function,
    close: Function,
    isOpen: Function,
  };

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) {

    this._initDrawerFoundation(this._drawer);
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    const drawer = changes['drawer'];
    const fixedAdjustElement = changes['fixedAdjustElement'];

    if (drawer) {
      this._initDrawerFoundation(drawer.currentValue);
      if (drawer.currentValue === 'temporary') {
        this._registry.listen('click', () => {
          if (this.closeOnClick) {
            this._foundation.close();
          }
        }, this.drawerElement.nativeElement);
      } else if (drawer.previousValue === 'temporary') {
        this._registry.unlisten('click', () => {
          if (this.closeOnClick) {
            this._foundation.close();
          }
        });
      }
    }

    if (fixedAdjustElement && !this.fixed) {
      if (fixedAdjustElement.currentValue) {
        this.renderer.setStyle(this._getHostElement(), 'position', 'absolute');
      } else {
        this.renderer.removeStyle(this._getHostElement(), 'position');
      }
    }
  }

  ngOnDestroy(): void {
    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  private _initDrawerFoundation(drawer: string): void {
    this._removeDrawerModifierClass();
    this.renderer.addClass(this._getHostElement(), `mdc-drawer--${drawer}`);

    if (!this.isDrawerPermanent()) {
      if (drawer === 'temporary') {
        this._foundation = new MDCTemporaryDrawerFoundation(this._mdcAdapter);
      } else if (drawer === 'persistent') {
        this._foundation = new MDCPersistentDrawerFoundation(this._mdcAdapter);
      }

      this._foundation.init();
    } else {
      if (this._foundation) {
        this._foundation.destroy();
      }
    }
  }

  isDrawerPermanent(): boolean {
    return this._drawer === 'permanent';
  }

  isDrawerTemporary(): boolean {
    return this._drawer === 'temporary';
  }

  isDrawerPersistent(): boolean {
    return this._drawer === 'persistent';
  }

  private _removeDrawerModifierClass(): void {
    this.renderer.removeClass(this._getHostElement(), 'mdc-drawer--temporary');
    this.renderer.removeClass(this._getHostElement(), 'mdc-drawer--persistent');
    this.renderer.removeClass(this._getHostElement(), 'mdc-drawer--permanent');
  }

  private _getHostElement() {
    return this.elementRef.nativeElement;
  }

  isOpen(): boolean {
    if (this.isDrawerPermanent()) { return true; }

    return this._foundation.isOpen();
  }

  open(): void {
    if (this._foundation) {
      this.isOpen() ? this._foundation.close() : this._foundation.open();
    }
  }

  close(): void {
    if (this._foundation) {
      this._foundation.close();
    }
  }

  getDrawerWidth(): any {
    return this._foundation ? this._mdcAdapter.getDrawerWidth() : this._getHostElement().offsetWidth;
  }

  isRtl(): boolean {
    return this.direction === 'rtl';
  }
}
