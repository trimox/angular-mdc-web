import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { isBrowser } from '../common';
import { EventRegistry } from '../common/event-registry';

import { MDCSnackbarAdapter } from './snackbar-adapter';
import { SnackbarTextDirective } from './snackbar-text.directive';
import { SnackbarActionWrapperDirective } from './snackbar-action-wrapper.directive';
import { SnackbarActionButtonDirective } from './snackbar-action-button.directive';
import { SnackbarMessage } from './snackbar-message';

import { MDCSnackbarFoundation } from '@material/snackbar';
import { getCorrectEventName } from '@material/animation';

@Component({
  selector: 'mdc-snackbar',
  template:
  `
  <mdc-snackbar-text></mdc-snackbar-text>
  <mdc-snackbar-action-wrapper>
    <button mdc-snackbar-action-button></button>
  </mdc-snackbar-action-wrapper>
  `,
  encapsulation: ViewEncapsulation.None
})
export class SnackbarComponent implements AfterViewInit, OnDestroy {
  @Input() alignStart: boolean;
  @Input()
  get dismissOnAction() { return this._foundation.dismissesOnAction(); }
  set dismissOnAction(value) {
    this._foundation.setDismissOnAction(value);
  }
  @HostBinding('class.mdc-snackbar') isHostClass = true;
  @HostBinding('attr.aria-live') ariaLive: string = 'assertive';
  @HostBinding('attr.aria-atomic') ariaAtomic: string = 'true';
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';
  @HostBinding('class.mdc-snackbar--align-start') get classAlignStart(): string {
    return this.alignStart ? 'mdc-snackbar--align-start' : '';
  }
  @ViewChild(SnackbarTextDirective) snackText: SnackbarTextDirective;
  @ViewChild(SnackbarActionWrapperDirective) actionWrapper: SnackbarActionWrapperDirective;
  @ViewChild(SnackbarActionButtonDirective) actionButton: SnackbarActionButtonDirective;

  private _mdcAdapter: MDCSnackbarAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this._root.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this._root.nativeElement, className);
    },
    setAriaHidden: () => {
      this._renderer.setAttribute(this._root.nativeElement, 'aria-hidden', 'true');
    },
    unsetAriaHidden: () => {
      this._renderer.removeAttribute(this._root.nativeElement, 'aria-hidden');
    },
    setActionAriaHidden: () => {
      if (this.actionButton) {
        this._renderer.setAttribute(this.actionButton.elementRef.nativeElement, 'aria-hidden', 'true');
      }
    },
    unsetActionAriaHidden: () => {
      if (this.actionButton) {
        this._renderer.removeAttribute(this.actionButton.elementRef.nativeElement, 'aria-hidden');
      }
    },
    setMessageText: (message: string) => {
      if (this.snackText) {
        this.snackText.elementRef.nativeElement.textContent = message;
      }
    },
    setActionText: (actionText: string) => {
      if (this.actionButton) {
        this.actionButton.elementRef.nativeElement.textContent = actionText;
      }
    },
    setFocus: () => {
      if (isBrowser()) {
        this.actionButton.elementRef.nativeElement.focus();
      }
    },
    visibilityIsHidden: () => {
      return isBrowser ? document.hidden : false;
    },
    registerCapturedBlurHandler: (handler: EventListener) => {
      if (this._root && this.actionButton) {
        this._registry.listen_(this._renderer, 'blur', handler, this.actionButton.elementRef);
      }
    },
    deregisterCapturedBlurHandler: (handler: EventListener) => {
      if (this._root) {
        this._registry.unlisten_('blur', handler);
      }
    },
    registerVisibilityChangeHandler: (handler: EventListener) => {
      if (this._root && isBrowser()) {
        this._registry.listen_(this._renderer, 'visibilitychange', handler, this._root);
      }
    },
    deregisterVisibilityChangeHandler: (handler: EventListener) => {
      if (this._root && isBrowser()) {
        this._registry.unlisten_('visibilitychange', handler);
      }
    },
    registerCapturedInteractionHandler: (evtType: string, handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen_(this._renderer, evtType, handler, 'body');
      }
    },
    deregisterCapturedInteractionHandler: (evtType: string, handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten_(evtType, handler);
      }
    },
    registerActionClickHandler: (handler: EventListener) => {
      if (this._root && this.actionButton) {
        this._registry.listen_(this._renderer, 'click', handler, this.actionButton.elementRef);
      }
    },
    deregisterActionClickHandler: (handler: EventListener) => {
      this._registry.unlisten_('click', handler);
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this._root && isBrowser()) {
        this._registry.listen_(this._renderer, getCorrectEventName(window, 'transitionend'), handler, this._root);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten_(getCorrectEventName(window, 'transitionend'), handler);
      }
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    setDismissOnAction: Function,
    dismissesOnAction: Function,
    show: Function
  } = new MDCSnackbarFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit() {
    this._foundation.init();
  }
  ngOnDestroy() {
    this._foundation.destroy();
  }

  show(data: SnackbarMessage) {
    if (data) {
      if (!data.actionHandler && data.actionText) {
        data.actionHandler = () => { };
      }
      if (!data.actionText) {
        data.actionHandler = null;
      }
      this._foundation.show(data);
    }
  }
}
