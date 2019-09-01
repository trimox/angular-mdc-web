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
import {Platform} from '@angular/cdk/platform';
import {merge, Observable, fromEvent, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MDCComponent} from '@angular-mdc/web/base';

import {
  MdcDialogButton,
  MdcDialogContent,
  MdcDialogSurface
} from './dialog-directives';
import {MdcDialogRef} from './dialog-ref';
import {MdcDialogConfig} from './dialog-config';

import {closest, matches} from '@material/dom/ponyfill';
import {MDCDialogFoundation, MDCDialogAdapter, strings, util} from '@material/dialog';

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
    '(click)': '_onClick($event)',
    '(keydown)': '_onKeydown($event)'
  },
  template: `
  <mdc-dialog-scrim></mdc-dialog-scrim>
  <ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcDialogComponent extends MDCComponent<MDCDialogFoundation> implements AfterViewInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _scrollable: boolean = true;

  config: MdcDialogConfig;

  @ContentChild(MdcDialogSurface, {static: false}) _surface!: MdcDialogSurface;
  @ContentChild(MdcDialogContent, {static: false}) _content!: MdcDialogContent;
  @ContentChildren(MdcDialogButton, {descendants: true}) _buttons!: QueryList<MdcDialogButton>;

  private _layoutEventSubscription: Subscription | null = null;

  /** Combined stream of all of the dialog layout events. */
  get layoutEvents(): Observable<any> {
    return merge(...LAYOUT_EVENTS.map(evt => fromEvent(window, evt)));
  }

  getDefaultFoundation() {
    const adapter: MDCDialogAdapter = {
      addClass: (className: string) => this._getDialog().classList.add(className),
      removeClass: (className: string) => this._getDialog().classList.remove(className),
      getInitialFocusEl: () => this._platform.isBrowser ? document.querySelector(`[cdk-focus-initial], ` +
        `[cdkFocusInitial]`) as HTMLElement : null,
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
      eventTargetMatches: (target: EventTarget, selector: string) => matches(target as HTMLElement, selector),
      trapFocus: () => {},
      releaseFocus: () => {},
      isContentScrollable: () =>
        !!this._content && this._scrollable && util.isScrollable(this._content.elementRef.nativeElement),
      areButtonsStacked: () => util.areTopsMisaligned(this._buttons as any),
      getActionFromEvent: (event: Event) => {
        const element = closest(event.target as Element, `[${strings.ACTION_ATTRIBUTE}]`);
        return element && element.getAttribute(strings.ACTION_ATTRIBUTE);
      },
      clickDefaultButton: () => {
        const defaultBtn = this._buttons.find(_ => _.default);
        if (defaultBtn) {
          defaultBtn.elementRef.nativeElement.click();
        }
      },
      reverseButtons: () => {
        this._buttons.toArray().reverse();
        this._buttons.forEach(button => button.getHostElement().parentElement!.appendChild(button.getHostElement()));
      },
      notifyOpened: () => this.dialogRef.opened(),
      notifyOpening: () => {},
      notifyClosed: (action: string) => this._closeDialogByRef(action),
      notifyClosing: () => {}
    };
    return new MDCDialogFoundation(adapter);
  }

  constructor(
    private _ngZone: NgZone,
    private _platform: Platform,
    public elementRef: ElementRef<HTMLElement>,
    public dialogRef: MdcDialogRef<MdcDialogComponent>) {

    super(elementRef);
    this.config = dialogRef._portalInstance._config;
  }

  ngAfterViewInit(): void {
    this._foundation = this.getDefaultFoundation();
    this._initialize();

    this._loadListeners();
    this._foundation.open();
  }

  private _initialize(): void {
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

  /** Recalculates layout and automatically adds/removes modifier classes like --scrollable. */
  layout(): void {
    this._foundation.layout();
  }

  _onKeydown(evt: KeyboardEvent): void {
    this._foundation.handleKeydown(evt);
  }

  _onClick(evt: MouseEvent): void {
    this._foundation.handleClick(evt);
  }

  private _closeDialogByRef(action?: string): void {
    this.dialogRef.close(action);
  }

  private _loadListeners(): void {
    this._layoutEventSubscription = this.layoutEvents.pipe()
      .subscribe(() => this.layout());

    if (this._platform.isBrowser) {
      this._ngZone.runOutsideAngular(() =>
        fromEvent<KeyboardEvent>(document, 'keydown').pipe(takeUntil(this._destroy))
          .subscribe(evt => this._ngZone.run(() => this._foundation.handleDocumentKeydown(evt))));
    }
  }

  /** Retrieves the DOM element of the component host. */
  private _getDialog(): HTMLElement {
    return this._elementRef.nativeElement;
  }
}
