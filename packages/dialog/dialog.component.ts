import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  NgZone,
  OnDestroy,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { merge, Observable, fromEvent, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import createFocusTrap, { FocusTrap } from 'focus-trap';

import { Platform } from '@angular-mdc/web/common';

import {
  MdcDialogButton,
  MdcDialogContent,
  MdcDialogSurface
} from './dialog-directives';
import { MdcDialogRef } from './dialog-ref';
import { MdcDialogConfig } from './dialog-config';

import {
  isScrollable,
  areTopsMisaligned
} from '@material/dialog/util';
import { strings } from '@material/dialog/constants';
import { closest, matches } from '@material/dom/ponyfill';
import { MDCDialogFoundation } from '@material/dialog/index';

const LAYOUT_EVENTS = ['resize', 'orientationchange'];

@Component({
  moduleId: module.id,
  selector: 'mdc-dialog',
  exportAs: 'mdc-dialog',
  host: {
    '[attr.id]': 'config?.id',
    'role': 'alertdialog',
    'class': 'mdc-dialog',
    '[attr.aria-modal]': 'true',
    '[attr.aria-labelledby]': 'config?.ariaLabel',
    '[attr.aria-label]': 'config?.ariaLabel',
    '[attr.aria-describedby]': 'config?.ariaDescribedBy || null',
    '(click)': '_onInteraction($event)',
    '(keydown)': '_onInteraction($event)'
  },
  template: `
  <mdc-dialog-scrim></mdc-dialog-scrim>
  <ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcDialogComponent implements AfterViewInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _focusTrapInstance: FocusTrap | null = null;

  private _scrollable: boolean = true;

  config: MdcDialogConfig;

  @ContentChild(MdcDialogSurface) _surface!: MdcDialogSurface;
  @ContentChild(MdcDialogContent) _content!: MdcDialogContent;
  @ContentChildren(MdcDialogButton, { descendants: true }) _buttons?: QueryList<MdcDialogButton>;

  private _layoutEventSubscription: Subscription | null = null;

  /** Combined stream of all of the dialog layout events. */
  get layoutEvents(): Observable<any> {
    return merge(...LAYOUT_EVENTS.map(evt => fromEvent(window, evt)));
  }

  private _createAdapter() {
    return {
      addClass: (className: string) => this._getDialog().classList.add(className),
      removeClass: (className: string) => this._getDialog().classList.remove(className),
      hasClass: (className: string) => this._getDialog().classList.contains(className),
      addBodyClass: (className: string) => {
        if (this._platform.isBrowser) {
          document.body!.classList.add(className);
        }
      },
      removeBodyClass: (className: string) => {
        if (this._platform.isBrowser) {
          document.body!.classList.remove(className);
        }
      },
      eventTargetMatches: (target: EventTarget, selector: string) => matches(target, selector),
      trapFocus: () => this._focusTrapInstance!.activate(),
      releaseFocus: () => this._focusTrapInstance!.deactivate(),
      isContentScrollable: () =>
        !!this._content && this._scrollable && isScrollable(this._content.elementRef.nativeElement),
      areButtonsStacked: () => areTopsMisaligned(this._buttons),
      getActionFromEvent: (event: Event) => {
        const element = closest(event.target, `[${strings.ACTION_ATTRIBUTE}]`);
        return element && element.getAttribute(strings.ACTION_ATTRIBUTE);
      },
      clickDefaultButton: () => {
        const defaultBtn = this._getDefaultButton();
        if (defaultBtn) {
          defaultBtn.click();
        }
      },
      reverseButtons: () => {
        if (!this._buttons) { return; }

        this._buttons.toArray().reverse();
        this._buttons.forEach(button => button.getHostElement().parentElement!.appendChild(button.getHostElement()));
      },
      notifyOpened: () => this.dialogRef.opened(),
      notifyClosed: (action: string) => this._closeDialogByRef(action)
    };
  }

  private _foundation!: {
    init(): void,
    destroy(): void,
    open(): void,
    close(action?: string): void,
    setEscapeKeyAction(action: string): void,
    setScrimClickAction(action: string): void,
    setAutoStackButtons(autoStack: boolean): void,
    layout(): void,
    handleInteraction(evt: KeyboardEvent | MouseEvent): void,
    handleDocumentKeydown(evt: KeyboardEvent): void
  };

  constructor(
    private _ngZone: NgZone,
    private _platform: Platform,
    private _elementRef: ElementRef<HTMLElement>,
    public dialogRef: MdcDialogRef<MdcDialogComponent>) {

    this.config = dialogRef._portalInstance._config;
  }

  ngAfterViewInit(): void {
    this._foundation = new MDCDialogFoundation(this._createAdapter());
    this._focusTrapInstance = this._createFocusTrapInstance();
    this._initialize();

    this._loadListeners();
    this._foundation.open();
  }

  private _initialize(): void {
    if (!this.config) { return; }

    this._scrollable = !!this.config.scrollable;

    if (!this.config.clickOutsideToClose) {
      this._foundation.setScrimClickAction('');
    }
    if (!this.config.escapeToClose) {
      this._foundation.setEscapeKeyAction('');
    }
    if (!this.config.buttonsStacked) {
      this._foundation.setAutoStackButtons(false);
    }
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._layoutEventSubscription) {
      this._layoutEventSubscription.unsubscribe();
    }

    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  _onInteraction(evt: KeyboardEvent | MouseEvent): void {
    this._foundation.handleInteraction(evt);
  }

  private _getDefaultButton(): HTMLElement | undefined {
    const defaultBtn = this._buttons ? this._buttons.find(_ => _.default) : undefined;
    return defaultBtn ? defaultBtn.getHostElement() : undefined;
  }

  private _closeDialogByRef(action?: string): void {
    this.dialogRef.close(action);
  }

  private _loadListeners(): void {
    this._layoutEventSubscription = this.layoutEvents.pipe()
      .subscribe(() =>
        this._ngZone.runOutsideAngular(() => this._foundation.layout()));

    if (this._platform.isBrowser) {
      this._ngZone.runOutsideAngular(() =>
        fromEvent<KeyboardEvent>(document, 'keydown').pipe(takeUntil(this._destroy))
          .subscribe(evt => this._ngZone.run(() => this._foundation.handleDocumentKeydown(evt))));
    }
  }

  private _createFocusTrapInstance(focusTrapFactory = createFocusTrap): any {
    return focusTrapFactory(this._getDialog(), {
      initialFocus: this._getDefaultButton(),
      clickOutsideDeactivates: true, // Allow handling of scrim clicks
      escapeDeactivates: false // Dialog foundation handles escape key
    });
  }

  /** Retrieves the DOM element of the component host. */
  private _getDialog(): HTMLElement {
    return this._elementRef.nativeElement;
  }
}
