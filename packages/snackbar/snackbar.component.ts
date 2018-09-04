import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Platform } from '@angular-mdc/web/common';

import { MdcSnackbarConfig } from './snackbar-config';
import { MDCSnackbarAdapter } from './adapter';

import { MDCSnackbarFoundation } from '@material/snackbar';
import { getCorrectEventName } from '@material/animation';

@Component({
  moduleId: module.id,
  selector: 'mdc-snackbar',
  template: `
  <div #text class="mdc-snackbar__text"></div>
  <div class="mdc-snackbar__action-wrapper">
    <button #action type="submit" class="mdc-snackbar__action-button"></button>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcSnackbarComponent implements AfterViewInit, OnInit, OnDestroy {
  data: {
    message: string,
    actionText: string
  };
  config: MdcSnackbarConfig;

  @HostBinding('class.mdc-snackbar') isHostClass = true;
  @HostBinding('attr.aria-live') ariaLive: string = 'assertive';
  @HostBinding('attr.aria-atomic') ariaAtomic: string = 'true';
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';

  @ViewChild('text') snackText: ElementRef;
  @ViewChild('action') actionButton: ElementRef;

  /** Event emitted when the snackbar is shown. */
  @Output() readonly shown: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the snackbar is dismissed. */
  @Output() readonly dismissed: EventEmitter<void> = new EventEmitter<void>();

  private _mdcAdapter: MDCSnackbarAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    setAriaHidden: () => this._getHostElement().setAttribute('aria-hidden', 'true'),
    unsetAriaHidden: () => this._getHostElement().removeAttribute('aria-hidden'),
    setActionAriaHidden: () => {
      if (this.actionButton) {
        this._getActionButton().setAttribute('aria-hidden', 'true');
      }
    },
    unsetActionAriaHidden: () => {
      if (this.actionButton) {
        this._getActionButton().removeAttribute('aria-hidden');
      }
    },
    setMessageText: (message: string) => this._getSnackText().textContent = message,
    setActionText: (actionText: string) => {
      if (this.actionButton) {
        this._getActionButton().textContent = actionText;
      }
    },
    setFocus: () => this._getActionButton().focus(),
    isFocused: () => this._platform.isBrowser ? document.activeElement === this._getActionButton() : false,
    visibilityIsHidden: () => this._platform.isBrowser ? document.hidden : false,
    registerCapturedBlurHandler: (handler: EventListener) => {
      if (this.actionButton) {
        this._getActionButton().addEventListener('blur', handler, true);
      }
    },
    deregisterCapturedBlurHandler: (handler: EventListener) => this._getActionButton().removeEventListener('blur', handler, true),
    registerVisibilityChangeHandler: (handler: EventListener) => {
      if (!this._platform.isBrowser) { return; }

      document.addEventListener('visibilitychange', handler);
    },
    deregisterVisibilityChangeHandler: (handler: EventListener) => {
      if (!this._platform.isBrowser) { return; }

      document.removeEventListener('visibilitychange', handler);
    },
    registerCapturedInteractionHandler: (evtType: string, handler: EventListener) => {
      if (!this._platform.isBrowser) { return; }

      document.body.addEventListener(evtType, handler, true);
    },
    deregisterCapturedInteractionHandler: (evtType: string, handler: EventListener) => {
      if (!this._platform.isBrowser) { return; }

      document.body.removeEventListener(evtType, handler, true);
    },
    registerActionClickHandler: (handler: EventListener) => {
      if (this.actionButton) {
        this._getActionButton().addEventListener('click', handler);
      }
    },
    deregisterActionClickHandler: (handler: EventListener) => this._getActionButton().removeEventListener('click', handler),
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this._platform.isBrowser) {
        this._getHostElement().addEventListener(getCorrectEventName(window, 'transitionend'), handler);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      if (this._platform.isBrowser) {
        this._getHostElement().removeEventListener(getCorrectEventName(window, 'transitionend'), handler);
      }
    },
    notifyShow: () => this.shown.emit(),
    notifyHide: () => this.dismissed.emit()
  };

  private _foundation: {
    init(): void,
    destroy(): void
    setDismissOnAction(dismissOnAction: boolean): void,
    show(data: any): void
  } = new MDCSnackbarFoundation(this._mdcAdapter);

  constructor(
    private _platform: Platform,
    public elementRef: ElementRef) { }

  ngOnInit(): void {
    this._getHostElement().style.setProperty('display', 'none');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._foundation.init();
      this.setDismissOnAction(this.config.dismissOnAction ? true : false);

      if (this.config.align === 'start') {
        this._mdcAdapter.addClass('mdc-snackbar--align-start');
      }

      if (!this.config.actionHandler && this.data.actionText) {
        this.config.actionHandler = () => { };
      }
      if (!this.data.actionText) {
        this.config.actionHandler = undefined;
      }
      this._getHostElement().style.setProperty('display', 'flex');
    }, 20);

    setTimeout(() => {
      this._foundation.show({ ...this.data, ...this.config });

      if (this.config.focusAction) {
        this._mdcAdapter.setFocus();
      }
    }, 40);
  }

  ngOnDestroy(): void {
    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  setDismissOnAction(dismissOnAction: boolean): void {
    this._foundation.setDismissOnAction(dismissOnAction);
  }

  private _getSnackText(): HTMLElement {
    return this.snackText.nativeElement;
  }

  private _getActionButton(): HTMLElement {
    return this.actionButton.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
