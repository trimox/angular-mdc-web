import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { isBrowser, EventRegistry } from '@angular-mdc/web/common';

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
  encapsulation: ViewEncapsulation.None,
  providers: [EventRegistry]
})
export class MdcSnackbarComponent implements OnInit, OnDestroy {
  data: { message: string, actionText: string };
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
    addClass: (className: string) => this._renderer.addClass(this._getHostElement(), className),
    removeClass: (className: string) => this._renderer.removeClass(this._getHostElement(), className),
    setAriaHidden: () => this._renderer.setAttribute(this._getHostElement(), 'aria-hidden', 'true'),
    unsetAriaHidden: () => this._renderer.removeAttribute(this._getHostElement(), 'aria-hidden'),
    setActionAriaHidden: () => {
      if (this.actionButton) {
        this._renderer.setAttribute(this.actionButton.nativeElement, 'aria-hidden', 'true');
      }
    },
    unsetActionAriaHidden: () => {
      if (this.actionButton) {
        this._renderer.removeAttribute(this.actionButton.nativeElement, 'aria-hidden');
      }
    },
    setMessageText: (message: string) => this.snackText.nativeElement.textContent = message,
    setActionText: (actionText: string) => {
      if (this.actionButton) {
        this.actionButton.nativeElement.textContent = actionText;
      }
    },
    setFocus: () => this.actionButton.nativeElement.focus(),
    visibilityIsHidden: () => isBrowser() ? document.hidden : false,
    registerCapturedBlurHandler: (handler: EventListener) => {
      if (this.actionButton) {
        this._registry.listen('blur', handler, this.actionButton.nativeElement, true);
      }
    },
    deregisterCapturedBlurHandler: (handler: EventListener) => this._registry.unlisten('blur', handler),
    registerVisibilityChangeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen('visibilitychange', handler, document);
      }
    },
    deregisterVisibilityChangeHandler: (handler: EventListener) => this._registry.unlisten('visibilitychange', handler),
    registerCapturedInteractionHandler: (evtType: string, handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen(evtType, handler, document.body, true);
      }
    },
    deregisterCapturedInteractionHandler: (evtType: string, handler: EventListener) =>
      this._registry.unlisten(evtType, handler),
    registerActionClickHandler: (handler: EventListener) => {
      if (this.actionButton) {
        this._registry.listen('click', handler, this.actionButton.nativeElement);
      }
    },
    deregisterActionClickHandler: (handler: EventListener) => this._registry.unlisten('click', handler),
    registerTransitionEndHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen(getCorrectEventName(window, 'transitionend'), handler, this._getHostElement());
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten(getCorrectEventName(window, 'transitionend'), handler);
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
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngOnInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  setDismissOnAction(dismissOnAction: boolean): void {
    this._foundation.setDismissOnAction(dismissOnAction);
  }

  show(): void {
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

    setTimeout(() => {
      this._foundation.show({ ...this.data, ...this.config });

      if (this.config.focusAction) {
        this._mdcAdapter.setFocus();
      }
    }, 40);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
