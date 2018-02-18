import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  Renderer2,
  SkipSelf,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { isBrowser, EventRegistry, ESCAPE } from '@angular-mdc/web/common';
import {
  MdcDialogBackdrop,
  MdcDialogBody,
  MdcDialogButton,
  MdcDialogFooter,
  MdcDialogHeader,
  MdcDialogHeaderTitle,
  MdcDialogSurface,
} from './dialog-directives';
import { MdcDialogConfig } from './dialog-config';
import { MdcDialogRef } from './dialog-ref';

import { MDCDialogAdapter } from './adapter';
import { MDCDialogFoundation, util } from '@material/dialog';

@Component({
  moduleId: module.id,
  selector: 'mdc-dialog',
  template: `
  <mdc-dialog-surface>
    <ng-content></ng-content>
  </mdc-dialog-surface>
  <mdc-dialog-backdrop></mdc-dialog-backdrop>
  `,
  host: {
    '[attr.role]': '_config?.role',
    '[attr.aria-labelledby]': '_config?.ariaLabel ? null : _ariaLabelledBy',
    '[attr.aria-label]': '_config?.ariaLabel',
    '[attr.aria-describedby]': '_config?.ariaDescribedBy || null',
  },
  providers: [EventRegistry],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class MdcDialogComponent implements AfterViewInit, OnDestroy {
  _config: MdcDialogConfig;

  private _focusTrap: {
    activate: Function;
    deactivate: Function;
    pause: Function;
    unpause: Function;
  };

  /** ID of the element that should be considered as the dialog's label. */
  _ariaLabelledBy: string | null = null;

  @Input() clickOutsideToClose: boolean = true;
  @Input() escapeToClose: boolean = true;
  @HostBinding('class.mdc-dialog') isHostClass = true;
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';
  @HostBinding('tabindex') tabIndex: number = -1;
  @Output('accept') _accept: EventEmitter<string> = new EventEmitter();
  @Output('cancel') _cancel: EventEmitter<string> = new EventEmitter();
  @ViewChild(MdcDialogSurface) dialogSurface: MdcDialogSurface;
  @ContentChild(MdcDialogBody) dialogBody: MdcDialogBody;
  @ContentChildren(MdcDialogButton, { descendants: true }) dialogButtons: QueryList<MdcDialogButton>;

  private _mdcAdapter: MDCDialogAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    addBodyClass: (className: string) => {
      if (isBrowser()) {
        this._renderer.addClass(document.body, className);
      }
    },
    removeBodyClass: (className: string) => {
      if (isBrowser()) {
        this._renderer.removeClass(document.body, className);
      }
    },
    eventTargetHasClass: (target: HTMLElement, className: string) => target.classList.contains(className),
    registerInteractionHandler: (evt: string, handler: EventListener) => {
      const clickOutsideToClose = this._config ? this._config.clickOutsideToClose : this.clickOutsideToClose;

      handler = this.dialogSurface && clickOutsideToClose ? handler : (event) => {
        if ((<any>event.target).classList.contains('mdc-dialog__footer__button--accept')) {
          this.accept();
        } else if ((<any>event.target).classList.contains('mdc-dialog__footer__button--cancel')) {
          this.cancel();
        }
      };
      this._registry.listen(evt, handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerSurfaceInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.listen(evt, handler, this.dialogSurface.elementRef.nativeElement);
    },
    deregisterSurfaceInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerDocumentKeydownHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      const escapeToClose = this._config ? this._config.escapeToClose : this.escapeToClose;

      handler = escapeToClose ? handler : this._onKeyDown;
      this._registry.listen('keydown', handler, document);
    },
    deregisterDocumentKeydownHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      const escapeToClose = this._config ? this._config.escapeToClose : this.escapeToClose;
      handler = escapeToClose ? handler : this._onKeyDown;
      this._registry.unlisten('keydown', handler);
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this.dialogSurface) {
        this._registry.listen('transitionend', handler, this.dialogSurface.elementRef.nativeElement);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      if (this.dialogSurface) {
        this._registry.unlisten('transitionend', handler);
      }
    },
    notifyAccept: () => {
      this._accept.emit('MDCDialog:accept');
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    },
    notifyCancel: () => {
      this._cancel.emit('MDCDialog:cancel');
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    },
    trapFocusOnSurface: () => {
      if (this._focusTrap) {
        this._focusTrap.activate();
      }
    },
    untrapFocusOnSurface: () => {
      if (this._focusTrap) {
        this._focusTrap.deactivate();
      }
    },
    isDialog: (el: Element) => {
      return this.dialogSurface ? el === this.dialogSurface.elementRef.nativeElement : false;
    },
    layoutFooterRipples: () => {
      this.dialogButtons.forEach((_) => _.ripple.layout());
    },
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    open: Function,
    close: Function,
    isOpen: Function,
    accept: Function,
    cancel: Function,
  } = new MDCDialogFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry,
    @Optional() @SkipSelf() public dialogRef: MdcDialogRef<any>) {

    if (this.dialogRef) {
      this._config = this.dialogRef._containerInstance._config;
    }
  }

  ngAfterViewInit(): void {
    this._foundation.init();
    if (this._config) {
      this.show();
    }
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  private _onKeyDown(event: KeyboardEvent): void {
    if (ESCAPE === event.keyCode) {
      event.stopPropagation();
    }
  }

  show(): void {
    const focusedEl = this.dialogButtons.find((_) => _.focused || _.accept);

    if (isBrowser()) {
      this._focusTrap = util.createFocusTrapInstance(this.dialogSurface.elementRef.nativeElement, {
        initialFocus: focusedEl ? focusedEl.elementRef.nativeElement : this.elementRef.nativeElement,
        clickOutsideDeactivates: this._config ? this._config.clickOutsideToClose : this.clickOutsideToClose,
        escapeDeactivates: this._config ? this._config.escapeToClose : this.escapeToClose,
      });
    }
    setTimeout(() => {
      this._foundation.open();

      if (focusedEl) {
        focusedEl.elementRef.nativeElement.focus();
      }
    }, 10);
  }

  close(): void {
    this._foundation.close();
  }

  isOpen(): boolean {
    return this._foundation.isOpen();
  }

  accept(shouldNotify: boolean = true): void {
    this._foundation.accept(shouldNotify);
  }

  cancel(shouldNotify: boolean = true): void {
    this._foundation.cancel(shouldNotify);
  }

  layoutFooterRipples(): void {
    this._mdcAdapter.layoutFooterRipples();
  }
}
