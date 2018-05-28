import {
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { isBrowser, EventRegistry } from '@angular-mdc/web/common';

import { MDC_SNACK_BAR_DATA, MdcSnackbarConfig } from './snackbar-config';
import { MdcSnackbarRef } from './snackbar-ref';
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
  /** Data that was injected into the snackbar. */
  data: { message: string, actionText: string };
  /** The snackbar configuration. */
  config: MdcSnackbarConfig;

  @HostBinding('class.mdc-snackbar') isHostClass = true;
  @HostBinding('attr.aria-live') ariaLive: string = 'assertive';
  @HostBinding('attr.aria-atomic') ariaAtomic: string = 'true';
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';
  @ViewChild('text') snackText: ElementRef;
  @ViewChild('action') actionButton: ElementRef;

  private _mdcAdapter: MDCSnackbarAdapter = {
    addClass: (className: string) => this._renderer.addClass(this.elementRef.nativeElement, className),
    removeClass: (className: string) => this._renderer.removeClass(this.elementRef.nativeElement, className),
    setAriaHidden: () => this._renderer.setAttribute(this.elementRef.nativeElement, 'aria-hidden', 'true'),
    unsetAriaHidden: () => this._renderer.removeAttribute(this.elementRef.nativeElement, 'aria-hidden'),
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
        this._registry.listen('blur', handler, this.actionButton.nativeElement);
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
        this._registry.listen(evtType, handler, document.body);
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
      if (this.elementRef && isBrowser()) {
        this._registry.listen(getCorrectEventName(window, 'transitionend'), handler, this.elementRef.nativeElement);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten(getCorrectEventName(window, 'transitionend'), handler);
      }
    },
    notifyShow: () => { },
    notifyHide: () => this.snackbarRef.dismiss()
  };

  private _foundation: {
    init(): void,
    destroy(): void
    setDismissOnAction(dismissOnAction: boolean): void,
    show(data: any): void
  } = new MDCSnackbarFoundation(this._mdcAdapter);

  constructor(
    public snackbarRef: MdcSnackbarRef<MdcSnackbarComponent>,
    @Inject(MDC_SNACK_BAR_DATA) data: any,
    @Inject(MdcSnackbarConfig) config: MdcSnackbarConfig,
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) {

    this.data = data;
    this.config = config;
  }

  ngOnInit(): void {
    this._foundation.init();
    this.show();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  show(): void {
    const config = this.config;
    const data = this.data;

    if (config) {
      this._foundation.setDismissOnAction(config.dismissOnAction ? true : false);
      if (config.align === 'start') {
        this._mdcAdapter.addClass('mdc-snackbar--align-start');
      }

      if (!config.actionHandler && data.actionText) {
        config.actionHandler = () => { };
      }
      if (!data.actionText) {
        config.actionHandler = undefined;
      }

      setTimeout(() => {
        this._foundation.show({ ...data, ...config });
        if (config.focusAction) {
          this._mdcAdapter.setFocus();
        }
      }, 40);
    } else {
      this._foundation.show(data);
    }
  }
}
