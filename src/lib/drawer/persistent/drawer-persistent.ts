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
import { isBrowser } from '../../common';
import { EventRegistry } from '../../common/event-registry';

import { FOCUSABLE_ELEMENTS } from '../constants';
import { MDCDrawerPersistentAdapter } from '../adapter';
import { MDCPersistentDrawerFoundation, util } from '@material/drawer';

@Directive({
  selector: 'mdc-persistent-drawer-nav'
})
export class MdcPersistentDrawerNavigation {
  @HostBinding('class.mdc-persistent-drawer__drawer') isHostClass = true;
  @HostBinding('attr.role') role: string = 'navigation';

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-persistent-drawer-spacer], mdc-persistent-drawer-spacer'
})
export class MdcPersistentDrawerSpacer {
  @HostBinding('class.mdc-persistent-drawer__toolbar-spacer') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-persistent-drawer-header], mdc-persistent-drawer-header'
})
export class MdcPersistentDrawerHeader {
  @HostBinding('class.mdc-persistent-drawer__header') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-persistent-drawer-header-content], mdc-persistent-drawer-header-content'
})
export class MdcPersistentDrawerHeaderContent {
  @HostBinding('class.mdc-persistent-drawer__header-content') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-persistent-drawer-content], mdc-persistent-drawer-content'
})
export class MdcPersistentDrawerContent {
  @HostBinding('class.mdc-persistent-drawer__content') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-persistent-drawer-selected]'
})
export class MdcPersistentDrawerSelected {
  @HostBinding('class.mdc-persistent-drawer--selected') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: 'mdc-persistent-drawer',
  template:
  `
  <mdc-persistent-drawer-nav>
    <ng-content></ng-content>
  </mdc-persistent-drawer-nav>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [EventRegistry],
})
export class MdcPersistentDrawer implements AfterViewInit, OnDestroy {
  @Output() opened: EventEmitter<void> = new EventEmitter<void>();
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();
  @HostBinding('class.mdc-persistent-drawer') isHostClass = true;
  @ViewChild(MdcPersistentDrawerNavigation) drawerNav: MdcPersistentDrawerNavigation;

  private _mdcAdapter: MDCDrawerPersistentAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    hasClass: (className: string) => {
      return this.elementRef.nativeElement.classList.contains(className);
    },
    hasNecessaryDom: () => !!this.drawerNav,
    registerInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.listen(this._renderer, util.remapEvent(evt), handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerDrawerInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.listen(this._renderer, util.remapEvent(evt), handler, this.elementRef.nativeElement);
    },
    deregisterDrawerInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      this._registry.listen(this._renderer, 'transitionend', handler, this.elementRef.nativeElement);
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      this._registry.unlisten('transitionend', handler);
    },
    registerDocumentKeydownHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen(this._renderer, 'keydown', handler, document);
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
        this._renderer.setProperty(this.drawerNav.elementRef, util.getTransformPropertyName(),
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
      this._renderer.setAttribute(el, 'tabindex', '-1');
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
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

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
    this._foundation.open();
  }
  close(): void {
    this._foundation.close();
  }
}
