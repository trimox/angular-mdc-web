import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MDCComponent } from '@angular-mdc/web/base';
import { Platform, toBoolean } from '@angular-mdc/web/common';
import { MdcList } from '@angular-mdc/web/list';

import createFocusTrap, { FocusTrap } from 'focus-trap';

import { cssClasses } from '@material/drawer/constants';
import {
  MDCDrawerAdapter,
  MDCDismissibleDrawerFoundation,
  MDCModalDrawerFoundation
} from '@material/drawer';

export type MdcDrawerType = 'permanent' | 'dismissible' | 'modal';

@Component({
  moduleId: module.id,
  selector: 'mdc-drawer-header',
  template: `
  <ng-content></ng-content>
  <h3 class="mdc-drawer__title" *ngIf="title">{{title}}</h3>
  <h6 class="mdc-drawer__subtitle" *ngIf="subtitle">{{subtitle}}</h6>`,
  host: { 'class': 'mdc-drawer__header' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcDrawerHeader {
  @Input() title?: string;
  @Input() subtitle?: string;

  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Directive({
  selector: '[mdcDrawerTitle]',
  host: { 'class': 'mdc-drawer__title' }
})
export class MdcDrawerTitle { }

@Directive({
  selector: '[mdcDrawerSubtitle]',
  host: { 'class': 'mdc-drawer__subtitle' }
})
export class MdcDrawerSubtitle { }

@Directive({
  selector: 'mdc-drawer-content, [mdcDrawerContent]',
  host: { 'class': 'mdc-drawer__content' }
})
export class MdcDrawerContent { }

@Directive({
  selector: 'mdc-drawer-app-content, [mdcDrawerAppContent]',
  host: { 'class': 'mdc-drawer-app-content' }
})
export class MdcDrawerAppContent { }

@Component({
  moduleId: module.id,
  selector: 'mdc-drawer',
  exportAs: 'mdcDrawer',
  host: {
    'role': 'navigation',
    'class': 'mdc-drawer',
    '(keydown)': '_onKeydown($event)'
  },
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcDrawer extends MDCComponent<MDCDismissibleDrawerFoundation | MDCModalDrawerFoundation>
  implements AfterViewInit, OnDestroy {
  private _initialized: boolean = false;
  private _previousFocus: Element | null = null;
  private _scrimElement: HTMLElement | null = null;

  private _focusTrapInstance: FocusTrap | null = null;

  @Input()
  get open(): boolean { return this._open; }
  set open(value: boolean) {
    this._open = toBoolean(value);
    if (this._platform.isBrowser) {
      this._open ? this._foundation.open() : this._foundation.close();
    }
    this._changeDetectorRef.markForCheck();
  }
  private _open: boolean = false;

  @Input()
  get drawer(): string { return this._drawer; }
  set drawer(drawer: string) {
    if (this._drawer !== drawer) {
      this._initialized = false;
      this.setDrawer(drawer);
    }
  }
  private _drawer: string = 'permanent';

  @Input()
  get fixedAdjustElement(): any { return this._fixedAdjustElement; }
  set fixedAdjustElement(element: any) {
    this.setFixedAdjustElement(element);
  }
  private _fixedAdjustElement: any;

  @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();
  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild(MdcList) _list?: MdcList;

  private _transitionEndSubscription: Subscription | null = null;
  private _scrimSubscription: Subscription | null = null;

  get modal(): boolean { return this.drawer === 'modal'; }
  get dismissible(): boolean { return this.drawer === 'dismissible'; }
  get permanent(): boolean { return this.drawer === 'permanent'; }

  getDefaultFoundation() {
    const adapter: MDCDrawerAdapter = {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      elementHasClass: (element: Element, className: string) => element.classList.contains(className),
      saveFocus: () => this._previousFocus = this._platform.isBrowser ? document.activeElement! : null,
      restoreFocus: () => {
        if (!this._platform.isBrowser) { return; }

        const previousFocus = this._previousFocus as HTMLOrSVGElement | HTMLElement | null;
        if (previousFocus && previousFocus.focus && this._getHostElement().contains(document.activeElement)) {
          previousFocus.focus();
        }
      },
      focusActiveNavigationItem: () => {
        if (!this._platform.isBrowser || !this._list) { return; }

        const selectedItem = this._list.getSelectedItem();
        if (selectedItem) {
          selectedItem.focus();
        }
      },
      notifyClose: () => this.closed.emit(),
      notifyOpen: () => this.opened.emit(),
      trapFocus: () => this._focusTrapInstance!.activate(),
      releaseFocus: () => this._focusTrapInstance!.deactivate()
    };
    return this.modal ? new MDCModalDrawerFoundation(adapter) : new MDCDismissibleDrawerFoundation(adapter);
  }

  constructor(
    private _platform: Platform,
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  ngAfterViewInit(): void {
    this._initListType();

    if (!this._initialized) {
      this._initFoundation();
    }
  }

  ngOnDestroy(): void {
    this.open = false;
    if (this._scrimElement) {
      this._scrimElement.remove();
    }
    this._unloadListeners();

    if (this._foundation && this._platform.isBrowser) {
      this._foundation.destroy();
    }
  }

  setDrawer(drawer: string): void {
    if (!drawer) {
      drawer = 'permanent';
    }

    if (this.drawer !== drawer) {
      this._drawer = drawer;
      this._initFoundation();
    }
  }

  setFixedAdjustElement(element: any): void {
    this._fixedAdjustElement = element;

    element ? this._getHostElement().style.setProperty('position', 'absolute') :
      this._getHostElement().style.removeProperty('position');

    this._changeDetectorRef.markForCheck();
  }

  _onKeydown(evt: KeyboardEvent): void {
    this._foundation.handleKeydown(evt);
  }

  private _loadListeners(): void {
    this._unloadListeners();

    if (this.modal && this._platform.isBrowser) {
      this._createScrim();
      this._focusTrapInstance = this._createFocusTrapInstance();
    } else if (this._scrimElement) {
      this._scrimElement.remove();
    }
    this._initTransitionEndListener();
  }

  private _unloadListeners(): void {
    if (this._scrimSubscription) {
      this._scrimSubscription.unsubscribe();
    }
    if (this._transitionEndSubscription) {
      this._transitionEndSubscription.unsubscribe();
    }
  }

  private _createScrim(): void {
    this._scrimElement = document.createElement('div');
    this._scrimElement.classList.add('mdc-drawer-scrim');
    this._getHostElement().insertAdjacentElement('afterend', this._scrimElement);

    this._scrimSubscription =
      this._ngZone.runOutsideAngular(() =>
        fromEvent<MouseEvent>(this._scrimElement!, 'click')
          .subscribe(() => this._ngZone.run(() => this.open = false)));
  }

  private _initFoundation(): void {
    if (this._initialized) { return; }

    this._initialized = true;
    this._removeDrawerModifiers();
    this._foundation = this.getDefaultFoundation();
    this._foundation.init();

    if (!this.permanent) {
      this._getHostElement().classList.add(`${cssClasses.ROOT}--${this.drawer}`);
    }

    this._loadListeners();
    this._changeDetectorRef.markForCheck();
  }

  private _initListType(): void {
    if (this._list && (this._list.singleSelection || this._list.singleSelection === undefined)) {
      this._list.wrapFocus = true;
      this._list.singleSelection = true;
      this._list.useActivatedClass = true;
    }
  }

  private _removeDrawerModifiers(): void {
    this._getHostElement().classList.remove(cssClasses.MODAL);
    this._getHostElement().classList.remove(cssClasses.DISMISSIBLE);
  }

  private _initTransitionEndListener(): void {
    this._transitionEndSubscription =
      this._ngZone.runOutsideAngular(() =>
        fromEvent<TransitionEvent>(this._getHostElement(), 'transitionend').pipe(
          filter((e: TransitionEvent) => e.target === this._getHostElement()))
          .subscribe(evt => this._ngZone.run(() => this._foundation.handleTransitionEnd(evt))));
  }

  private _createFocusTrapInstance(focusTrapFactory = createFocusTrap): any {
    return focusTrapFactory(this._getHostElement(), {
      clickOutsideDeactivates: true,
      initialFocus: this._getHostElement(), // Navigation drawer sets focus to activated item
      escapeDeactivates: false, // Navigation drawer handles ESC.
      returnFocusOnDeactivate: false, // Navigation drawer handles restore focus.
    });
  }

  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
