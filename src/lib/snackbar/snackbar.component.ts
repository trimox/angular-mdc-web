import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { MDCSnackbarAdapter } from './snackbar-adapter';

const { MDCSnackbarFoundation } = require('@material/snackbar');
const { getCorrectEventName } = require('@material/animation');
const MDC_SNACKBAR_STYLES = require('@material/snackbar/mdc-snackbar.scss');

type UnlistenerMap = WeakMap<EventListener, Function>;

@Component({
  selector: 'mdc-snackbar',
  templateUrl: './snackbar.component.html',
  styles: [String(MDC_SNACKBAR_STYLES)],
  encapsulation: ViewEncapsulation.None
})
export class SnackbarComponent implements AfterViewInit, OnDestroy {
  private message: string;
  private actionText: string;
  @HostBinding('class') className: string = 'mdc-snackbar';
  @HostBinding('attr.aria-live') ariaLive: string = 'assertive';
  @HostBinding('attr.aria-atomic') ariaAtomic: string = 'true';
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';

  private _unlisteners: Map<string, UnlistenerMap> = new Map<string, UnlistenerMap>();

  private _mdcAdapter: MDCSnackbarAdapter = {
    addClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.addClass(root.nativeElement, className);
    },
    removeClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.removeClass(root.nativeElement, className);
    },
    setAriaHidden: () => {
      const { _renderer: renderer, _root: root } = this;
      renderer.setAttribute(root.nativeElement, 'aria-hidden', 'true');
    },
    unsetAriaHidden: () => {
      const { _renderer: renderer, _root: root } = this;
      renderer.removeAttribute(root.nativeElement, 'aria-hidden');
    },
    setMessageText: (message: string) => {
      this.message = message;
    },
    setActionText: (actionText: string) => {
      this.actionText = actionText;
    },
    setActionAriaHidden: () => {
      const { _renderer: renderer, _root: root } = this;
      renderer.setAttribute(root.nativeElement.querySelector(MDCSnackbarFoundation.strings.ACTION_BUTTON_SELECTOR), 'aria-hidden', 'true');
    },
    unsetActionAriaHidden: () => {
      const { _renderer: renderer, _root: root } = this;
      renderer.removeAttribute(root.nativeElement.querySelector(MDCSnackbarFoundation.strings.ACTION_BUTTON_SELECTOR), 'aria-hidden');
    },
    registerActionClickHandler: (handler: EventListener) => {
      if (this._root) {
        this.listen_('click', handler);
      }
    },
    deregisterActionClickHandler: (handler: EventListener) => {
      this.unlisten_('click', handler);
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this._root) {
        this.listen_(getCorrectEventName(window, 'transitionend'), handler);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      this.unlisten_(getCorrectEventName(window, 'transitionend'), handler);
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    show: Function,
    setDismissOnAction: Function
  } = new MDCSnackbarFoundation(this._mdcAdapter);

  constructor(private _renderer: Renderer2, private _root: ElementRef) { }

  ngAfterViewInit() {
    this._foundation.init();
  }
  ngOnDestroy() {
    this._foundation.destroy();
  }

  show(data: any, dismissOnAction: boolean = true) {
    this._foundation.setDismissOnAction(dismissOnAction);
    this._foundation.show(data);
  }

  listen_(type: string, listener: EventListener, ref: ElementRef = this._root) {
    if (!this._unlisteners.has(type)) {
      this._unlisteners.set(type, new WeakMap<EventListener, Function>());
    }
    const unlistener = this._renderer.listen(ref.nativeElement, type, listener);
    this._unlisteners.get(type).set(listener, unlistener);
  }

  unlisten_(type: string, listener: EventListener) {
    if (!this._unlisteners.has(type)) {
      return;
    }
    const unlisteners = this._unlisteners.get(type);
    if (!unlisteners.has(listener)) {
      return;
    }
    unlisteners.get(listener)();
    unlisteners.delete(listener);
  }
}