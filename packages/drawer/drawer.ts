import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { Subscription, fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Platform, toBoolean } from '@angular-mdc/web/common';
import { MdcList, MdcListItem } from '@angular-mdc/web/list';

// Workaround for focus-trap upstream export issue
import { util } from '@material/dialog';

import { MDCDrawerAdapter } from '@material/drawer/adapter';
import {
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
  <h6 class="mdc-drawer__subtitle" *ngIf="subtitle">{{subtitle}}</h6>
  `,
  host: {
    'class': 'mdc-drawer__header'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcDrawerHeader {
  @Input() title: string;
  @Input() subtitle: string;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-drawer-content, [mdcDrawerContent]',
  host: {
    'class': 'mdc-drawer__content'
  }
})
export class MdcDrawerContent { }

@Component({
  moduleId: module.id,
  selector: 'mdc-drawer',
  exportAs: 'mdcDrawer',
  host: {
    'role': 'navigation',
    'class': 'mdc-drawer'
  },
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcDrawer implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _foundationInitialized: boolean;
  private _previousFocus: Element | null;
  private _scrimElement: Element | null;

  private _focusTrap: {
    activate(): void,
    deactivate(): void
  };

  @Input()
  get drawer(): string { return this._drawer; }
  set drawer(drawer: string) {
    if (this._drawer !== drawer) {
      this._foundationInitialized = false;
      this.setDrawer(drawer);
    }
  }
  private _drawer = 'permanent';

  @Input()
  get fixedAdjustElement(): any { return this._fixedAdjustElement; }
  set fixedAdjustElement(element: any) {
    this.setFixedAdjustElement(element);
  }
  private _fixedAdjustElement: any;

  @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();
  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild(MdcList) list: MdcList;
  @ContentChildren(MdcListItem, { descendants: true }) listItems: QueryList<MdcListItem>;

  private _scrimSubscription: Subscription | null;

  get modal(): boolean { return this.drawer === 'modal'; }
  get dismissible(): boolean { return this.drawer === 'dismissible'; }
  get permanent(): boolean { return this.drawer === 'permanent'; }

  private _mdcAdapter: MDCDrawerAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    elementHasClass: (element: Element, className: string) => element.classList.contains(className),
    computeBoundingRect: () => this._getHostElement().getBoundingClientRect(),
    saveFocus: () => this._previousFocus = this._platform.isBrowser ? document.activeElement : null,
    restoreFocus: () => {
      if (!this._platform.isBrowser) { return; }

      const previousFocus = this._previousFocus && (<any>this._previousFocus).focus;
      if (this._getHostElement().contains(document.activeElement) && previousFocus) {
        (<any>this._previousFocus).focus();
      }
    },
    focusActiveNavigationItem: () => {
      if (!this._platform.isBrowser) { return; }

      const activeNavItemEl = this.listItems.find((_) => _.activated);
      if (activeNavItemEl) {
        (<MdcListItem>activeNavItemEl).focus();
      }
    },
    notifyClose: () => this.closed.emit(),
    notifyOpen: () => this.opened.emit(),
    trapFocus: () => {
      if (this._focusTrap) {
        this._focusTrap.activate();
      }
    },
    releaseFocus: () => {
      if (this._focusTrap) {
        this._focusTrap.deactivate();
      }
    }
  };

  private _foundation: {
    open(): void,
    close(): void,
    isOpen(): boolean,
    handleKeydown(evt: KeyboardEvent): void,
    handleTransitionEnd(evt: TransitionEvent): void,
    handleScrimClick(): void
  } | MDCDismissibleDrawerFoundation | MDCModalDrawerFoundation | null;

  constructor(
    private _platform: Platform,
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) { }

  ngAfterContentInit(): void {
    if (!this._foundationInitialized) {
      this._initFoundation();
    }
  }

  ngOnDestroy(): void {
    this._unloadListeners();
  }

  private _loadListeners() {
    if (!this._destroy) {
      this._destroy = new Subject<void>();
    }

    if (this.modal) {
      if (this._platform.isBrowser) {
        this._scrimElement = document.createElement('div');
        this._scrimElement.classList.add('mdc-drawer-scrim');
        this._getHostElement().insertAdjacentElement('afterend', this._scrimElement);

        this._ngZone.runOutsideAngular(() =>
          this._scrimSubscription = fromEvent<MouseEvent>(this._scrimElement!, 'click')
            .subscribe(() => this._ngZone.run(() => this._foundation.handleScrimClick())));

        this._focusTrap = util.createFocusTrapInstance(this._getHostElement(), {
          clickOutsideDeactivates: true,
          initialFocus: false, // Navigation drawer handles focusing on active nav item.
          escapeDeactivates: false, // Navigation drawer handles ESC.
          returnFocusOnDeactivate: false, // Navigation drawer handles restore focus.
        });
      }
    } else {
      if (this._scrimElement) {
        this._scrimElement.remove();
      }
    }

    this._ngZone.runOutsideAngular(() =>
      fromEvent<KeyboardEvent>(this._getHostElement(), 'keydown').pipe(takeUntil(this._destroy))
        .subscribe((evt) => this._ngZone.run(() => this._foundation.handleKeydown(evt))));

    this._ngZone.runOutsideAngular(() =>
      fromEvent<TransitionEvent>(this._getHostElement(), 'transitionend').pipe(takeUntil(this._destroy))
        .subscribe((evt) => this._ngZone.run(() => this._foundation.handleTransitionEnd(evt))));
  }

  private _unloadListeners(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._scrimSubscription) {
      this._scrimSubscription.unsubscribe();
    }
  }

  private _initFoundation(): void {
    if (this._foundationInitialized) { return; }

    this._initListType();

    this._unloadListeners();
    this._removeDrawerModifierClass();

    if (this.modal) {
      this._foundation = new MDCModalDrawerFoundation(this._mdcAdapter);
    } else {
      this._foundation = new MDCDismissibleDrawerFoundation(this._mdcAdapter);
    }

    if (!this.permanent) {
      this._getHostElement().classList.add(`mdc-drawer--${this.drawer}`);
    }

    this._loadListeners();
    this._foundationInitialized = true;

    this._changeDetectorRef.markForCheck();
  }

  private _initListType(): void {
    this.list.wrapFocus = true;
    this.list.singleSelection = true;
  }

  setDrawer(drawer: string = 'permanent'): void {
    if (this._drawer !== drawer) {
      this._drawer = drawer;

      this._initFoundation();
      this._changeDetectorRef.markForCheck();
    }
  }

  setFixedAdjustElement(element: any): void {
    this._fixedAdjustElement = element;

    if (element) {
      this._getHostElement().style.setProperty('position', 'absolute');
    } else {
      this._getHostElement().style.removeProperty('position');
    }

    this._changeDetectorRef.markForCheck();
  }

  open(): void {
    if (this.permanent) { return; }

    this._foundation.open();
  }

  // Function to close the drawer.
  close(): void {
    if (this.permanent) { return; }

    this._foundation.close();
  }

  // Returns true if drawer is in open state.
  isOpen(): boolean {
    return this.permanent ? true : this._foundation.isOpen();
  }

  private _removeDrawerModifierClass(): void {
    this._getHostElement().classList.remove('mdc-drawer--modal');
    this._getHostElement().classList.remove('mdc-drawer--dismissible');
  }

  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
