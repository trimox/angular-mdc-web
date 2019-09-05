import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {FocusMonitor, FocusOrigin, FocusTrap, FocusTrapFactory} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Platform} from '@angular/cdk/platform';
import {Subject, Subscription, fromEvent, Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MDCComponent} from '@angular-mdc/web/base';
import {MdcList} from '@angular-mdc/web/list';

import {
  cssClasses,
  MDCDrawerAdapter,
  MDCDismissibleDrawerFoundation,
  MDCModalDrawerFoundation
} from '@material/drawer';

export type MdcDrawerType = 'dismissible' | 'modal';

@Component({
  moduleId: module.id,
  selector: 'mdc-drawer-header',
  template: `
  <ng-content></ng-content>
  <h3 class="mdc-drawer__title" *ngIf="title">{{title}}</h3>
  <h6 class="mdc-drawer__subtitle" *ngIf="subtitle">{{subtitle}}</h6>`,
  host: {'class': 'mdc-drawer__header'},
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcDrawerHeader {
  @Input() title?: string;
  @Input() subtitle?: string;

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Component({
  moduleId: module.id,
  selector: 'mdc-drawer',
  exportAs: 'mdcDrawer',
  host: {
    'role': 'navigation',
    'class': 'mdc-drawer',
    '(transitionend)': '_handleTransitionEnd($event)'
  },
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcDrawer extends MDCComponent<MDCDismissibleDrawerFoundation | MDCModalDrawerFoundation>
  implements AfterContentInit, OnDestroy {
  /** Emits when the component is destroyed. */
  private readonly _destroyed = new Subject<void>();

  private _scrimElement: HTMLElement | null = null;

  /** How the drawer was opened (keypress, mouse click etc.) */
  private _openedVia!: FocusOrigin | null;

  /** Element that was focused before the drawer was opened. Save this to restore upon close. */
  private _elementFocusedBeforeDrawerWasOpened: HTMLElement | null = null;

  /** The class that traps and manages focus within the drawer. */
  private _focusTrap!: FocusTrap;

  @Input()
  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    if (this._platform.isBrowser && this._open !== value) {
      this._open = coerceBooleanProperty(value);
      this._open ? this._foundation.open() : this._foundation.close();
      this.openedChange.emit(this._open);
      this._updateFocusTrapState();
      this._changeDetectorRef.markForCheck();
    }
  }
  private _open: boolean = false;

  @Input()
  get drawer(): string {
    return this._drawer;
  }
  set drawer(drawer: string) {
    if (this._drawer !== drawer) {
      this._drawer = drawer;
      this.drawerChange.emit();
      this._updateFocusTrapState();
    }
  }
  private _drawer: string = '';

  @Input()
  get autoFocus(): boolean {
    return this._autoFocus;
  }
  set autoFocus(value: boolean) {
    this._autoFocus = coerceBooleanProperty(value);
  }
  private _autoFocus: boolean = true;

  @Input()
  get restoreFocus(): boolean {
    return this._restoreFocus;
  }
  set restoreFocus(value: boolean) {
    this._restoreFocus = coerceBooleanProperty(value);
  }
  private _restoreFocus: boolean = true;

  @Input()
  get fixedAdjustElement(): any {
    return this._fixedAdjustElement;
  }
  set fixedAdjustElement(element: any) {
    this._fixedAdjustElement = element;
    element ? this._getHostElement().style.setProperty('position', 'absolute') :
      this._getHostElement().style.removeProperty('position');
    this._changeDetectorRef.markForCheck();
  }
  private _fixedAdjustElement: any;

  @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();
  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the drawer open state is changed. */
  @Output() readonly openedChange: EventEmitter<boolean> = new EventEmitter<boolean>(/* isAsync */true);

  /** Event emitted when the drawer variant is changed. */
  @Output() readonly drawerChange: EventEmitter<void> = new EventEmitter<void>(/* isAsync */true);

  @ContentChild(MdcList, {static: false}) _list?: MdcList;

  private _scrimSubscription: Subscription | null = null;

  get modal(): boolean {
    return this.drawer === 'modal';
  }
  get dismissible(): boolean {
    return this.drawer === 'dismissible';
  }
  get _isFocusTrapEnabled(): boolean {
    // The focus trap is only enabled when the drawer is open and modal.
    return this.open && this.modal;
  }

  getDefaultFoundation() {
    const adapter: MDCDrawerAdapter = {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      elementHasClass: (element: Element, className: string) => element.classList.contains(className),
      saveFocus: () => this._savePreviouslyFocusedElement(),
      restoreFocus: () => this._releaseFocus(),
      focusActiveNavigationItem: () => {
        if (!this._platform.isBrowser || !this._list || !this._autoFocus) {
          return;
        }

        const selectedItem = this._list.getSelectedItem();
        if (selectedItem) {
          selectedItem.focus();
        } else {
          const cdkInitialItem = this._platform.isBrowser ?
            document.querySelector(`[cdkFocusInitial]`) as HTMLElement : null;
          if (cdkInitialItem) {
            cdkInitialItem.focus();
          }
        }
      },
      notifyClose: () => this.closed.emit(),
      notifyOpen: () => this.opened.emit(),
      trapFocus: () => {},
      releaseFocus: () => this._releaseFocus()
    };
    return this.modal ? new MDCModalDrawerFoundation(adapter) : new MDCDismissibleDrawerFoundation(adapter);
  }

  constructor(
    private _platform: Platform,
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    private _focusTrapFactory: FocusTrapFactory,
    private _focusMonitor: FocusMonitor,
    @Optional() @Inject(DOCUMENT) private _document: any,
    public elementRef: ElementRef<HTMLElement>) {

    super(elementRef);

    this.openedChange.subscribe((opened: boolean) => {
      if (opened) {
        if (this._document) {
          this._elementFocusedBeforeDrawerWasOpened = this._document.activeElement as HTMLElement;
        }

        if (this._isFocusTrapEnabled && this._focusTrap) {
          this._trapFocus();
        }
      } else {
        this._releaseFocus();
      }
    });

    this.drawerChange.subscribe(() => this._initFoundation());

    /**
     * Listen to `keydown` events outside the zone so that change detection is not run every
     * time a key is pressed. Instead we re-enter the zone only if the `ESC` key is pressed
     * and we don't have close disabled.
     */
    this._ngZone.runOutsideAngular(() => {
      (fromEvent(this._elementRef.nativeElement, 'keydown') as Observable<KeyboardEvent>)
        .pipe(takeUntil(this._destroyed)).subscribe(event => this._ngZone.run(() => {
          this._foundation.handleKeydown(event);
          if (this.modal) {
            event.stopPropagation();
            event.preventDefault();
          }
        }));
    });
  }

  ngAfterContentInit(): void {
    this._initListType();
  }

  ngOnDestroy(): void {
    this.open = false;

    if (this._focusTrap) {
      this._focusTrap.destroy();
    }
    if (this._scrimElement) {
      this._scrimElement.remove();
    }
    if (this._scrimSubscription) {
      this._scrimSubscription.unsubscribe();
    }

    this._destroyed.next();
    this._destroyed.complete();

    if (this._foundation && this._platform.isBrowser) {
      this._foundation.destroy();
    }
  }

  _handleTransitionEnd(event: TransitionEvent): void {
    this._foundation.handleTransitionEnd(event);
  }

  private _createScrim(): void {
    if (this._platform.isBrowser) {
      this._scrimElement = document.createElement('div');
      this._scrimElement.classList.add('mdc-drawer-scrim');
      this._getHostElement().insertAdjacentElement('afterend', this._scrimElement);

      this._scrimSubscription =
        this._ngZone.runOutsideAngular(() =>
          fromEvent<MouseEvent>(this._scrimElement!, 'click')
            .subscribe(() => this._ngZone.run(() => this.open = false)));
    }
  }

  private _initFoundation(): void {
    this._getHostElement().classList.remove(cssClasses.MODAL);
    this._getHostElement().classList.remove(cssClasses.DISMISSIBLE);

    this._foundation = this.getDefaultFoundation();
    this._foundation.init();

    if (this.modal || this.dismissible) {
      this._getHostElement().classList.add(`${cssClasses.ROOT}--${this.drawer}`);
    }

    if (this._scrimElement) {
      if (this._scrimSubscription) {
        this._scrimSubscription.unsubscribe();
      }
      this._scrimElement.remove();
      this._scrimElement = null;
    }

    if (this.modal) {
      this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
      this._updateFocusTrapState();
      this._createScrim();
    } else if (this._focusTrap) {
      this._focusTrap.destroy();
    }
    this._changeDetectorRef.markForCheck();
  }

  private _initListType(): void {
    if (this._list && (this._list.singleSelection || this._list.singleSelection === undefined)) {
      this._list.wrapFocus = true;
      this._list.singleSelection = true;
      this._list.useActivatedClass = true;
    }
  }

  /** Updates the enabled state of the focus trap. */
  private _updateFocusTrapState(): void {
    if (this._focusTrap) {
      this._focusTrap.enabled = this._isFocusTrapEnabled;
    }
  }

  private _trapFocus(): void {
    if (!this.autoFocus) {
      return;
    }

    this._focusTrap.focusInitialElementWhenReady().then(hasMovedFocus => {
      // If there were no focusable elements, focus the drawer itself so the keyboard navigation
      // still works. We need to check that `focus` is a function due to Universal.
      if (!hasMovedFocus && typeof this._elementRef.nativeElement.focus === 'function') {
        this._elementRef.nativeElement.focus();
      }
    });
  }

  /** Restores focus to the element that was focused before the drawer opened. */
  private _releaseFocus(): void {
    if (!this.autoFocus) {
      return;
    }

    const activeEl = this._document && this._document.activeElement;

    if (activeEl && this._elementRef.nativeElement.contains(activeEl)) {
      if (this._elementFocusedBeforeDrawerWasOpened instanceof HTMLElement) {
        this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened, this._openedVia);
      } else {
        this._elementRef.nativeElement.blur();
      }
    }

    this._elementFocusedBeforeDrawerWasOpened = null;
    this._openedVia = null;
  }

  /** Saves a reference to the element that was focused before the drawer was opened. */
  private _savePreviouslyFocusedElement(): void {
    if (this._document) {
      this._elementFocusedBeforeDrawerWasOpened = this._document.activeElement as HTMLElement;

      // Note that there is no focus method when rendering on the server.
      if (this._elementRef.nativeElement.focus) {
        // Move focus onto the drawer immediately. Needs to be async, because the element
        // may not be focusable immediately.
        Promise.resolve().then(() => this._elementRef.nativeElement.focus());
      }
    }
  }

  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
