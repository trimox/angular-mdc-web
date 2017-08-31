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

import { MDCDrawerPersistentAdapter } from '../drawer-adapter';
import { MDCPersistentDrawerFoundation, util } from '@material/drawer';

@Directive({
  selector: 'mdc-persistent-drawer-nav'
})
export class MdcPersistentDrawerNavigationDirective {
  @HostBinding('class.mdc-persistent-drawer__drawer') isHostClass = true;
  @HostBinding('attr.role') role: string = 'navigation';

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-persistent-drawer-spacer], mdc-persistent-drawer-spacer'
})
export class MdcPersistentDrawerSpacerDirective {
  @HostBinding('class.mdc-persistent-drawer__toolbar-spacer') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-persistent-drawer-header], mdc-persistent-drawer-header'
})
export class MdcPersistentDrawerHeaderDirective {
  @HostBinding('class.mdc-persistent-drawer__header') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-persistent-drawer-header-content], mdc-persistent-drawer-header-content'
})
export class MdcPersistentDrawerHeaderContentDirective {
  @HostBinding('class.mdc-persistent-drawer__header-content') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-persistent-drawer-content], mdc-persistent-drawer-content'
})
export class MdcPersistentDrawerContentDirective {
  @HostBinding('class.mdc-persistent-drawer__content') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-persistent-drawer-selected]'
})
export class MdcPersistentDrawerSelectedDirective {
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
  encapsulation: ViewEncapsulation.None
})
export class MdcPersistentDrawerComponent implements AfterViewInit, OnDestroy {
  @Output() opened: EventEmitter<void> = new EventEmitter<void>();
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();
  @HostBinding('class.mdc-persistent-drawer') isHostClass = true;
  @ViewChild(MdcPersistentDrawerNavigationDirective) drawerNav: MdcPersistentDrawerNavigationDirective;

  private _mdcAdapter: MDCDrawerPersistentAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this._root.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this._root.nativeElement, className);
    },
    hasClass: (className: string) => {
      return this._root.nativeElement.classList.contains(className);
    },
    hasNecessaryDom: () => !!this.drawerNav,
    registerInteractionHandler: (evt: string, handler: EventListener) => {
      if (this._root) {
        this._registry.listen_(this._renderer, util.remapEvent(evt), handler, this._root);
      }
    },
    deregisterInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten_(evt, handler);
    },
    registerDrawerInteractionHandler: (evt: string, handler: EventListener) => {
      if (this._root) {
        this._registry.listen_(this._renderer, util.remapEvent(evt), handler, this._root);
      }
    },
    deregisterDrawerInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten_(evt, handler);
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this._root) {
        this._registry.listen_(this._renderer, 'transitionend', handler, this._root);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      this._registry.unlisten_('transitionend', handler);
    },
    registerDocumentKeydownHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen_(this._renderer, 'keydown', handler, 'document');
      }
    },
    deregisterDocumentKeydownHandler: (handler: EventListener) => {
      this._registry.unlisten_('keydown', handler);
    },
    getDrawerWidth: () => {
      return this.drawerNav ? this.drawerNav.elementRef.nativeElement.offsetWidth : 0;
    },
    setTranslateX: (value) => {
      if (this.drawerNav) {
        this._renderer.setProperty(this.drawerNav.elementRef, util.getTransformPropertyName(), value === null ? null : `translateX(${value}px)`);
      }
    },
    getFocusableElements: () => {
      return this.drawerNav ?
        this.drawerNav.elementRef.nativeElement.querySelectorAll(MDCPersistentDrawerFoundation.strings.FOCUSABLE_ELEMENTS) : null;
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
      return getComputedStyle(this._root.nativeElement).getPropertyValue('direction') === 'rtl';
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
    private _root: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit() {
    this._foundation.init();
  }
  ngOnDestroy() {
    this._foundation.destroy();
  }

  isOpen() {
    return this._foundation.isOpen();
  }

  open() {
    this._foundation.open();
  }
  close() {
    this._foundation.close();
  }
}
