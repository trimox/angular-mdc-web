import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { isBrowser, EventRegistry } from '@angular-mdc/web/common';

import { MdcDrawer } from '../drawer';
import { FOCUSABLE_ELEMENTS } from '../constants';
import { MDCDrawerPersistentAdapter } from '../adapter';
import { MDCPersistentDrawerFoundation, util } from '@material/drawer';

@Directive({
  selector: 'mdc-drawer-persistent-nav'
})
export class MdcDrawerPersistentNavigation {
  @HostBinding('class.mdc-drawer__drawer') isHostClass = true;
  @HostBinding('attr.role') role: string = 'navigation';

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-drawer-persistent',
  template: `
  <mdc-drawer-persistent-nav>
    <ng-content></ng-content>
  </mdc-drawer-persistent-nav>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [EventRegistry],
  preserveWhitespaces: false,
})
export class MdcDrawerPersistent extends MdcDrawer implements AfterViewInit, OnDestroy {
  @Output() opened: EventEmitter<void> = new EventEmitter<void>();
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();
  @HostBinding('class.mdc-drawer--persistent') isHostClass = true;
  @ViewChild(MdcDrawerPersistentNavigation) drawerNav: MdcDrawerPersistentNavigation;

  private _mdcAdapter: MDCDrawerPersistentAdapter = {
    addClass: (className: string) => {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this.renderer.removeClass(this.elementRef.nativeElement, className);
    },
    hasClass: (className: string) => {
      return this.elementRef.nativeElement.classList.contains(className);
    },
    hasNecessaryDom: () => !!this.drawerNav,
    registerInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.listen(util.remapEvent(evt), handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerDrawerInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.listen(util.remapEvent(evt), handler, this.elementRef.nativeElement);
    },
    deregisterDrawerInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      this._registry.listen('transitionend', handler, this.elementRef.nativeElement);
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
    isRtl: () => {
      return getComputedStyle(this.elementRef.nativeElement).getPropertyValue('direction') === 'rtl';
    },
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
  } = new MDCPersistentDrawerFoundation(this._mdcAdapter);

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) {
    super(renderer, elementRef);
  }

  ngAfterViewInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  isOpen(): boolean {
    return this._foundation.isOpen();
  }

  open(): void {
    this.isOpen() ? this._foundation.close() : this._foundation.open();
  }

  close(): void {
    this._foundation.close();
  }

  getDrawerWidth(): number {
    return this._mdcAdapter.getDrawerWidth();
  }

  isRtl(): boolean {
    return this._mdcAdapter.isRtl();
  }
}
