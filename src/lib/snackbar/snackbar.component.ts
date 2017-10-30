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
import { isBrowser } from '../common';
import { EventRegistry } from '../common/event-registry';

import { MDC_SNACK_BAR_DATA, MdcSnackbarConfig } from './snackbar-config';
import { MdcSnackbarRef } from './snackbar-ref';
import { MDCSnackbarAdapter } from './adapter';

import { MDCSnackbarFoundation } from '@material/snackbar';
import { getCorrectEventName } from '@material/animation';

@Directive({
  selector: '[mdc-snackbar-text], mdc-snackbar-text'
})
export class MdcSnackbarText {
  @HostBinding('class.mdc-snackbar__text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-snackbar-action-wrapper'
})
export class MdcSnackbarActionWrapper {
  @HostBinding('class.mdc-snackbar__action-wrapper') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: 'mdc-snackbar',
  template:
  `
  <mdc-snackbar-text></mdc-snackbar-text>
  <mdc-snackbar-action-wrapper>
    <button #action type="submit" class="mdc-snackbar__action-button"></button>
  </mdc-snackbar-action-wrapper>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [EventRegistry]
})
export class MdcSnackbarComponent implements OnInit, OnDestroy {
  /** Data that was injected into the snack bar. */
  data: { message: string, actionText: string };
  /** The snack bar configuration. */
  config: MdcSnackbarConfig;

  @HostBinding('class.mdc-snackbar') isHostClass = true;
  @HostBinding('attr.aria-live') ariaLive: string = 'assertive';
  @HostBinding('attr.aria-atomic') ariaAtomic: string = 'true';
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';
  @ViewChild(MdcSnackbarText) snackText: MdcSnackbarText;
  @ViewChild(MdcSnackbarActionWrapper) actionWrapper: MdcSnackbarActionWrapper;
  @ViewChild('action') actionButton: ElementRef;

  private _mdcAdapter: MDCSnackbarAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    setAriaHidden: () => {
      this._renderer.setAttribute(this.elementRef.nativeElement, 'aria-hidden', 'true');
    },
    unsetAriaHidden: () => {
      this._renderer.removeAttribute(this.elementRef.nativeElement, 'aria-hidden');
    },
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
    setMessageText: (message: string) => {
      if (this.snackText) {
        this.snackText.elementRef.nativeElement.textContent = message;
      }
    },
    setActionText: (actionText: string) => {
      if (this.actionButton) {
        this.actionButton.nativeElement.textContent = actionText;
      }
    },
    setFocus: () => {
      if (isBrowser()) {
        this.actionButton.nativeElement.focus();
      }
    },
    visibilityIsHidden: () => {
      return isBrowser() ? document.hidden : false;
    },
    registerCapturedBlurHandler: (handler: EventListener) => {
      if (this.elementRef && this.actionButton) {
        this._registry.listen(this._renderer, 'blur', handler, this.actionButton.nativeElement);
      }
    },
    deregisterCapturedBlurHandler: (handler: EventListener) => {
      if (this.elementRef) {
        this._registry.unlisten('blur', handler);
      }
    },
    registerVisibilityChangeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen(this._renderer, 'visibilitychange', handler, document);
      }
    },
    deregisterVisibilityChangeHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten('visibilitychange', handler);
      }
    },
    registerCapturedInteractionHandler: (evtType: string, handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen(this._renderer, evtType, handler, document.body);
      }
    },
    deregisterCapturedInteractionHandler: (evtType: string, handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten(evtType, handler);
      }
    },
    registerActionClickHandler: (handler: EventListener) => {
      if (this.elementRef && this.actionButton) {
        this._registry.listen(this._renderer, 'click', handler, this.actionButton.nativeElement);
      }
    },
    deregisterActionClickHandler: (handler: EventListener) => {
      this._registry.unlisten('click', handler);
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this.elementRef && isBrowser()) {
        this._registry.listen(this._renderer, getCorrectEventName(window, 'transitionend'), handler, this.elementRef.nativeElement);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten(getCorrectEventName(window, 'transitionend'), handler);
        this.snackbarRef.dismiss(); // remove container from dom host
      }
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    active: Function,
    setDismissOnAction: Function,
    dismissesOnAction: Function,
    show: Function
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
    const config_ = this.config;
    const data_ = this.data;

    if (config_) {
      this._foundation.setDismissOnAction(config_.dismissOnAction);
      if (config_.align == 'start') {
        this._mdcAdapter.addClass('mdc-snackbar--align-start');
      }

      if (!config_.actionHandler && data_.actionText) {
        config_.actionHandler = () => { };
      }
      if (!data_.actionText) {
        config_.actionHandler = null;
      }

      setTimeout(() => {
        this._foundation.show({ ...data_, ...config_ });
        if (config_.focusAction) {
          this._mdcAdapter.setFocus();
        }
      }, 10);
    } else {
      this._foundation.show(data_);
    }
  }
}
