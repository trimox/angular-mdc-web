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
  ViewEncapsulation,
} from '@angular/core';
import { isBrowser } from '../../common';
import { EventRegistry } from '../../common/event-registry';

import { FOCUSABLE_ELEMENTS } from '../constants';
import { MDCDrawerTemporaryAdapter } from '../adapter';
import { MDCTemporaryDrawerFoundation, util } from '@material/drawer';

@Directive({
  selector: 'mdc-temporary-drawer-nav'
})
export class MdcTemporaryDrawerNavigation {
  @HostBinding('class.mdc-temporary-drawer__drawer') isHostClass = true;
  @HostBinding('attr.role') role: string = 'navigation';
  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-temporary-drawer-spacer], mdc-temporary-drawer-spacer'
})
export class MdcTemporaryDrawerSpacer {
  @HostBinding('class.mdc-temporary-drawer__toolbar-spacer') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-temporary-drawer-content], mdc-temporary-drawer-content'
})
export class MdcTemporaryDrawerContent {
  @HostBinding('class.mdc-temporary-drawer__content') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-temporary-drawer-header], mdc-temporary-drawer-header'
})
export class MdcTemporaryDrawerHeader {
  @HostBinding('class.mdc-temporary-drawer__header') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-temporary-drawer-header-content], mdc-temporary-drawer-header-content'
})
export class MdcTemporaryDrawerHeaderContent {
  @HostBinding('class.mdc-temporary-drawer__header-content') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-temporary-drawer-selected]'
})
export class MdcTemporaryDrawerSelected {
  @HostBinding('class.mdc-temporary-drawer--selected') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: 'mdc-temporary-drawer',
  template:
  `
  <mdc-temporary-drawer-nav>
    <ng-content></ng-content>
  </mdc-temporary-drawer-nav>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [EventRegistry],
})
export class MdcTemporaryDrawer implements AfterViewInit, OnDestroy {
  @Output() opened: EventEmitter<void> = new EventEmitter<void>();
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();
  @HostBinding('class.mdc-temporary-drawer') isHostClass = true;
  @ViewChild(MdcTemporaryDrawerNavigation) drawerNav: MdcTemporaryDrawerNavigation;
  @Input() closeOnClick: boolean = true;
  private get drawerElement(): ElementRef {
    return this.drawerNav && this.drawerNav.elementRef;
  }

  private _mdcAdapter: MDCDrawerTemporaryAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    hasClass: (className: string) => {
      return this.elementRef.nativeElement.classList.contains(className);
    },
    addBodyClass: (className: string) => {
      if (isBrowser()) {
        this._renderer.addClass(document.body, className);
      }
    },
    removeBodyClass: (className: string) => {
      if (isBrowser()) {
        this._renderer.removeClass(document.body, className);
      }
    },
    hasNecessaryDom: () => !!this.drawerNav,
    registerInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.listen(this._renderer, util.remapEvent(evt), handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerDrawerInteractionHandler: (evt: string, handler: EventListener) => {
      if (this.drawerElement) {
        this._registry.listen(this._renderer, util.remapEvent(evt), handler, this.drawerElement.nativeElement);
      }
    },
    deregisterDrawerInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this.drawerElement) {
        this._registry.listen(this._renderer, 'transitionend', handler, this.drawerElement.nativeElement);
      }
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
        this._renderer.setProperty(this.drawerNav.elementRef, util.getTransformPropertyName(), value === null ? null : `translateX(${value}px)`);
      }
    },
    updateCssVariable: (value: string) => {
      if (util.supportsCssCustomProperties()) {
        this._renderer.setStyle(this.elementRef.nativeElement, '--mdc-temporary-drawer-opacity', value);
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
  } = new MDCTemporaryDrawerFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._foundation.init();
    this._registry.listen(this._renderer, "click", (evt) => {
      if (this.closeOnClick) {
        this._foundation.close();
      }
    }, this.drawerElement.nativeElement);
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  open(): void {
    this._foundation.open();
  }

  close(): void {
    this._foundation.close();
  }

  isOpen(): boolean {
    return this._foundation.isOpen();
  }
}
