import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
import { startWith, takeUntil, filter } from 'rxjs/operators';

import { Platform, toBoolean } from '@angular-mdc/web/common';
import { MdcList, MdcListItem } from '@angular-mdc/web/list';

import createFocusTrap from 'focus-trap';

import { createFocusTrapInstance } from '@material/drawer/util';
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

  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Directive({
  selector: '[mdcDrawerTitle]',
  host: {
    'class': 'mdc-drawer__title'
  }
})
export class MdcDrawerTitle { }

@Directive({
  selector: '[mdcDrawerSubtitle]',
  host: {
    'class': 'mdc-drawer__subtitle'
  }
})
export class MdcDrawerSubtitle { }

@Directive({
  selector: 'mdc-drawer-content, [mdcDrawerContent]',
  host: {
    'class': 'mdc-drawer__content'
  }
})
export class MdcDrawerContent { }

@Directive({
  selector: 'mdc-drawer-app-content, [mdcDrawerAppContent]',
  host: {
    'class': 'mdc-drawer-app-content'
  }
})
export class MdcDrawerAppContent { }

@Component({
  moduleId: module.id,
  selector: 'mdc-drawer',
  exportAs: 'mdcDrawer',
  host: {
    'role': 'navigation',
    'class': 'mdc-drawer'
  },
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcDrawer implements AfterViewInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _initialized: boolean;
  private _previousFocus: Element | null;
  private _scrimElement: Element | null;

  private _focusTrapFactory = createFocusTrap;
  private _focusTrap: any;

  @Input()
  get open(): boolean { return this._open; }
  set open(value: boolean) {
    this._open = toBoolean(value);
    if (this._open) {
      this._foundation.open();
    } else {
      this._foundation.close();
    }
    this._changeDetectorRef.markForCheck();
  }
  private _open: boolean;

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

  @ContentChildren(MdcList, { descendants: true }) _list: QueryList<MdcList>;
  @ContentChildren(MdcListItem, { descendants: true }) _listItems: QueryList<MdcListItem>;

  private _scrimSubscription: Subscription | null;

  /** Subscription to a list. */
  private _listSubscription: Subscription;

  get modal(): boolean { return this.drawer === 'modal'; }
  get dismissible(): boolean { return this.drawer === 'dismissible'; }
  get permanent(): boolean { return this.drawer === 'permanent'; }

  createAdapter() {
    return {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      elementHasClass: (element: Element, className: string) => element.classList.contains(className),
      computeBoundingRect: () => this._getHostElement().getBoundingClientRect(),
      saveFocus: () => this._previousFocus = this._platform.isBrowser ? document.activeElement! : null,
      restoreFocus: () => {
        if (!this._platform.isBrowser) { return; }

        const previousFocus = this._previousFocus && (<any>this._previousFocus).focus;
        if (this._getHostElement().contains(document.activeElement!) && previousFocus) {
          (<any>this._previousFocus).focus();
        }
      },
      focusActiveNavigationItem: () => {
        if (!this._platform.isBrowser) { return; }

        const activeNavItemEl = this._listItems.find((_: MdcListItem) => _.activated || _.selected);
        if (activeNavItemEl) {
          activeNavItemEl.focus();
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
  }

  private _foundation: {
    open(): void,
    close(): void,
    isOpen(): boolean,
    handleKeydown(evt: KeyboardEvent): void,
    handleTransitionEnd(evt: TransitionEvent): void
  } = new MDCDismissibleDrawerFoundation(this.createAdapter());

  constructor(
    private _platform: Platform,
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    this._listSubscription = this._list.changes.pipe(startWith(null)).subscribe(() => {
      this._initListType();
    });

    if (!this._initialized) {
      this._initFoundation();
    }
  }

  ngOnDestroy(): void {
    this._unloadListeners();

    if (this._listSubscription) {
      this._listSubscription.unsubscribe();
    }
  }

  private _loadListeners(): void {
    if (this.modal && this._platform.isBrowser) {
      this._scrimElement = document.createElement('div');
      this._scrimElement.classList.add('mdc-drawer-scrim');
      this._getHostElement().insertAdjacentElement('afterend', this._scrimElement);

      this._ngZone.runOutsideAngular(() =>
        this._scrimSubscription = fromEvent<MouseEvent>(this._scrimElement!, 'click')
          .subscribe(() => this._ngZone.run(() => this.open = false)));

      this._focusTrapFactory = createFocusTrapInstance(this._getHostElement(), this._focusTrapFactory);
    } else if (this._scrimElement) {
      this._scrimElement.remove();
    }

    this._ngZone.runOutsideAngular(() =>
      fromEvent<KeyboardEvent>(this._getHostElement(), 'keydown').pipe(takeUntil(this._destroy))
        .subscribe(evt => this._ngZone.run(() => this._foundation.handleKeydown(evt))));

    this._ngZone.runOutsideAngular(() =>
      fromEvent<TransitionEvent>(this._getHostElement(), 'transitionend')
        .pipe(takeUntil(this._destroy), filter((e: TransitionEvent) =>
          e.target === this._getHostElement()))
        .subscribe(evt => this._ngZone.run(() => this._foundation.handleTransitionEnd(evt))));
  }

  private _unloadListeners(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._scrimSubscription) {
      this._scrimSubscription.unsubscribe();
    }
  }

  private _initFoundation(): void {
    if (this._initialized) { return; }

    this._initialized = true;
    this._removeDrawerModifiers();

    if (this.modal) {
      this._foundation = new MDCModalDrawerFoundation(this.createAdapter());
    } else {
      this._foundation = new MDCDismissibleDrawerFoundation(this.createAdapter());
    }

    if (!this.permanent) {
      this._getHostElement().classList.add(`mdc-drawer--${this.drawer}`);
    }

    this._loadListeners();
    this._changeDetectorRef.markForCheck();
  }

  private _initListType(): void {
    if (this._list.length > 0) {
      this._list.first.singleSelection = true;
      this._list.first.wrapFocus = true;
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

    if (element) {
      this._getHostElement().style.setProperty('position', 'absolute');
    } else {
      this._getHostElement().style.removeProperty('position');
    }

    this._changeDetectorRef.markForCheck();
  }

  private _removeDrawerModifiers(): void {
    this._getHostElement().classList.remove('mdc-drawer--modal');
    this._getHostElement().classList.remove('mdc-drawer--dismissible');
  }

  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
