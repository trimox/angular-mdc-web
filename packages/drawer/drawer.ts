import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
import { isBrowser, toBoolean } from '@angular-mdc/web/common';

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
  exportAs: 'mdcDrawer',
  template: `
  <mdc-drawer-navigation>
    <ng-content></ng-content>
  </mdc-drawer-navigation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcDrawer implements OnDestroy {
  @Input()
  get fixed(): boolean { return this._fixed; }
  set fixed(value: boolean) {
    this.setFixed(value);
  }
  private _fixed: boolean = false;

  @Input()
  get drawer(): string { return this._drawer; }
  set drawer(drawer: string) {
    this.setDrawer(drawer);
  }
  private _drawer = 'permanent';

  @Input()
  get fixedAdjustElement(): any { return this._fixedAdjustElement; }
  set fixedAdjustElement(element: any) {
    this.setFixedAdjustElement(element);
  }
  private _fixedAdjustElement: any;

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
    addClass: (className: string) => this.renderer.addClass(this._getHostElement(), className),
    removeClass: (className: string) => this.renderer.removeClass(this._getHostElement(), className),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    addBodyClass: (className: string) => {
      if (isBrowser()) {
        this.renderer.addClass(this.fixedAdjustElement
          ? this.fixedAdjustElement : document.body, className);
      }
    },
    removeBodyClass: (className: string) => {
      if (isBrowser()) {
        this.renderer.removeClass(this.fixedAdjustElement
          ? this.fixedAdjustElement : document.body, className);
      }
    },
    eventTargetHasClass: (target: HTMLElement, className: string) => target.classList.contains(className),
    hasNecessaryDom: () => !!this.drawerNav,
    registerInteractionHandler: (evt: string, handler: EventListener) =>
      this._getHostElement().addEventListener(util.remapEvent(evt), handler, util.applyPassive()),
    deregisterInteractionHandler: (evt: string, handler: EventListener) =>
      this._getHostElement().removeEventListener(evt, handler, util.applyPassive()),
    registerDrawerInteractionHandler: (evt: string, handler: EventListener) => {
      if (this.drawerElement) {
        this.drawerElement.nativeElement.addEventListener(util.remapEvent(evt), handler);
      }
    },
    deregisterDrawerInteractionHandler: (evt: string, handler: EventListener) =>
      this.drawerElement.nativeElement.removeEventListener(evt, handler),
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this.drawerElement) {
        this.drawerElement.nativeElement.addEventListener('transitionend', handler);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) =>
      this.drawerElement.nativeElement.removeEventListener('transitionend', handler),
    registerDocumentKeydownHandler: (handler: EventListener) => {
      if (isBrowser()) {
        document.addEventListener('keydown', handler);
      }
    },
    deregisterDocumentKeydownHandler: (handler: EventListener) => document.removeEventListener('keydown', handler),
    getDrawerWidth: () => this._getHostElement().offsetWidth,
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
    getFocusableElements: () =>
      this.drawerNav ? this.drawerNav.elementRef.nativeElement.querySelectorAll(FOCUSABLE_ELEMENTS) : null,
    saveElementTabState: (el: Element) => util.saveElementTabState(el),
    restoreElementTabState: (el: Element) => util.restoreElementTabState(el),
    makeElementUntabbable: (el: Element) => this.renderer.setAttribute(el, 'tabindex', '-1'),
    notifyOpen: () => this.opened.emit(),
    notifyClose: () => this.closed.emit(),
    isRtl: () => getComputedStyle(this._getHostElement()).direction === 'rtl',
    isDrawer: (el) => {
      return this.drawerNav ? el === this.drawerNav.elementRef.nativeElement : false;
    }
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    open(): void,
    close(): void,
    isOpen(): boolean
  };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public renderer: Renderer2,
    public elementRef: ElementRef) {

    this._initializeFoundation(this._drawer);
  }

  ngOnDestroy(): void {
    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  setDrawer(drawer: string): void {
    this._drawer = drawer ? drawer : 'permanent';

    this._initializeFoundation(drawer);

    if (drawer === 'temporary') {
      this.drawerElement.nativeElement.addEventListener('click', () => {
        if (this.closeOnClick) {
          this._foundation.close();
        }
      });
    } else if (drawer === 'temporary') {
      this.drawerElement.nativeElement.removeEventListener('click', () => {
        if (this.closeOnClick) {
          this._foundation.close();
        }
      });
    }
    this._changeDetectorRef.markForCheck();
  }

  setFixedAdjustElement(element: any): void {
    this._fixedAdjustElement = element;

    if (element) {
      this.renderer.setStyle(this._getHostElement(), 'position', 'absolute');
    } else {
      this.renderer.removeStyle(this._getHostElement(), 'position');
    }

    this._changeDetectorRef.markForCheck();
  }

  setFixed(fixed: boolean): void {
    this._fixed = toBoolean(fixed);
    this._changeDetectorRef.markForCheck();
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

  private _initializeFoundation(drawer: string): void {
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

  private _removeDrawerModifierClass(): void {
    this.renderer.removeClass(this._getHostElement(), 'mdc-drawer--temporary');
    this.renderer.removeClass(this._getHostElement(), 'mdc-drawer--persistent');
    this.renderer.removeClass(this._getHostElement(), 'mdc-drawer--permanent');
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

  getDrawerWidth(): number {
    return this._foundation ? this._mdcAdapter.getDrawerWidth() : this._getHostElement().offsetWidth;
  }

  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
