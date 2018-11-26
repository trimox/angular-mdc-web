import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Platform } from '@angular-mdc/web/common';

import { MdcSnackbarRef } from './snackbar-ref';
import { MDC_SNACKBAR_DATA } from './snackbar-config';

import { MDCSnackbarFoundation } from '@material/snackbar/index';
import { getCorrectEventName } from '@material/animation/index';

@Component({
  moduleId: module.id,
  selector: 'mdc-snackbar',
  host: {
    'role': 'alert',
    'class': 'mdc-snackbar',
    'attr.aria-live': 'assertive',
    'attr.aria-atomic': 'true',
    'attr.aria-hidden': 'true'
  },
  template: `
  <div #message class="mdc-snackbar__text"></div>
  <div class="mdc-snackbar__action-wrapper" *ngIf="hasAction">
    <button #action type="button" class="mdc-snackbar__action-button"></button>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcSnackbarComponent implements AfterViewInit, OnDestroy {
  /** Data that was injected into the snack bar. */
  data: { message: string, actionText: string };

  @ViewChild('message') message: ElementRef<HTMLElement>;
  @ViewChild('action') actionButton: ElementRef<HTMLButtonElement>;

  createAdapter() {
    return {
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
      isFocused: () => this._platform.isBrowser ? document.activeElement! === this._getActionButton() : false,
      visibilityIsHidden: () => this._platform.isBrowser ? document.hidden : false,
      registerCapturedBlurHandler: (handler: EventListener) => {
        if (this.actionButton) {
          this._getActionButton().addEventListener('blur', handler, true);
        }
      },
      deregisterCapturedBlurHandler: (handler: EventListener) => {
        if (this.actionButton) {
          this._getActionButton().removeEventListener('blur', handler, true);
        }
      },
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

        document.body!.addEventListener(evtType, handler, true);
      },
      deregisterCapturedInteractionHandler: (evtType: string, handler: EventListener) => {
        if (!this._platform.isBrowser) { return; }

        document.body!.removeEventListener(evtType, handler, true);
      },
      registerActionClickHandler: (handler: EventListener) => {
        if (this.actionButton) {
          this._getActionButton().addEventListener('click', handler);
        }
      },
      deregisterActionClickHandler: (handler: EventListener) => {
        if (this.actionButton) {
          this._getActionButton().removeEventListener('click', handler);
        }
      },
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
      notifyHide: () => this.action()
    };
  }

  private _foundation: {
    init(): void,
    destroy(): void,
    dismissesOnAction(): void,
    setDismissOnAction(dismissOnAction: boolean): void,
    show(data: any): void
  } = new MDCSnackbarFoundation(this.createAdapter());

  constructor(
    private _platform: Platform,
    public elementRef: ElementRef<HTMLElement>,
    public snackbarRef: MdcSnackbarRef<MdcSnackbarComponent>,
    @Inject(MDC_SNACKBAR_DATA) data: any) {

    this.data = data;
  }

  ngAfterViewInit(): void {
    const config = this.snackbarRef.componentInstance.snackbarConfig;

    this._foundation.init();
    this._foundation.setDismissOnAction(config.dismissOnAction || true);

    if (config.align === 'start') {
      this._getHostElement().classList.add('mdc-snackbar--align-start');
    } else if (config.align === 'end') {
      this._getHostElement().classList.add('ng-mdc-snackbar--align-end');
    }

    if (!config.actionHandler && config.data.actionText) {
      config.actionHandler = () => { };
    }

    setTimeout(() => {
      this._foundation.show({ ...config.data, ...config });

      if (this.actionButton && config.focusAction && this._getActionButton()) {
        this._getActionButton().focus();
      }
    }, 10);
  }

  ngOnDestroy(): void {
    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  /** If the action button should be shown. */
  get hasAction(): boolean {
    return !!this.data.actionText;
  }

  /** Performs the action on the snackbar. */
  action(): void {
    this.snackbarRef.dismissWithAction();
  }

  private _getSnackText(): HTMLElement {
    return this.message.nativeElement;
  }

  private _getActionButton(): HTMLElement {
    return this.actionButton.nativeElement;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
