import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { isBrowser, KeyCodes } from '../common';
import { EventRegistry } from '../common/event-registry';
import createFocusTrap from 'focus-trap';

import { MdcRipple } from '../core/ripple/ripple.service';
import { MdcButton } from '../button/button';

import { MDCDialogAdapter } from './adapter';
import { MDCDialogFoundation } from '@material/dialog';

@Directive({
  selector: '[mdc-dialog-surface], mdc-dialog-surface'
})
export class MdcDialogSurface {
  @HostBinding('class.mdc-dialog__surface') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-header], mdc-dialog-header'
})
export class MdcDialogHeader {
  @HostBinding('class.mdc-dialog__header') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-header-title], mdc-dialog-header-title'
})
export class MdcDialogHeaderTitle {
  @HostBinding('class.mdc-dialog__header__title') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-body], mdc-dialog-body'
})
export class MdcDialogBody {
  @Input() scrollable: boolean = false;
  @HostBinding('class.mdc-dialog__body') isHostClass = true;
  @HostBinding('class.mdc-dialog__body--scrollable') get classScrollable(): string {
    return this.scrollable ? 'mdc-dialog__body--scrollable' : '';
  }

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-footer], mdc-dialog-footer'
})
export class MdcDialogFooter {
  @HostBinding('class.mdc-dialog__footer') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-backdrop], mdc-dialog-backdrop'
})
export class MdcDialogBackdrop {
  @HostBinding('class.mdc-dialog__backdrop') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'button[mdc-dialog-button], a[mdc-dialog-button]',
  providers: [MdcRipple]
})
export class MdcDialogButton extends MdcButton {
  @Input() accept: boolean = false;
  @Input() cancel: boolean = false;
  @Input() action: boolean = false;
  @Input() focused: boolean = false;

  @HostBinding('class.mdc-dialog__footer__button') get isFooterButton(): string {
    return this.renderer.parentNode(this.elementRef) === MdcDialogFooter ? 'mdc-dialog__footer__button' : '';
  }
  @HostBinding('class.mdc-dialog__action') get classAction(): string {
    return this.action ? 'mdc-dialog__action' : '';
  }
  @HostBinding('class.mdc-dialog__footer__button--accept') get classAccept(): string {
    return this.accept ? 'mdc-dialog__footer__button--accept' : '';
  }
  @HostBinding('class.mdc-dialog__footer__button--cancel') get classCancel(): string {
    return this.cancel ? 'mdc-dialog__footer__button--cancel' : '';
  }

  constructor(
    @Inject(Renderer2) renderer: Renderer2,
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(MdcRipple) ripple: MdcRipple) {
    super(renderer, elementRef, ripple);
  }
}

@Component({
  selector: 'mdc-dialog',
  template:
  `
  <mdc-dialog-surface>
    <ng-content></ng-content>
  </mdc-dialog-surface>
  <mdc-dialog-backdrop></mdc-dialog-backdrop>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [EventRegistry],
})
export class MdcDialog implements AfterViewInit, OnDestroy {
  private _focusTrap: {
    activate: Function;
    deactivate: Function;
    pause: Function;
    unpause: Function;
  };

  @Input() clickOutsideToClose: boolean = true;
  @Input() escapeToClose: boolean = true;
  @Output('accept') _accept: EventEmitter<string> = new EventEmitter();
  @Output('cancel') _cancel: EventEmitter<string> = new EventEmitter();
  @HostBinding('class.mdc-dialog') isHostClass = true;
  @HostBinding('attr.role') role: string = 'alertdialog';
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';
  @HostBinding('tabindex') tabIndex: number = -1;
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
      handler = this.dialogSurface && this.clickOutsideToClose ? handler : () => {
        if ((<any>event.target).classList.contains('mdc-dialog__footer__button--accept')) {
          this.accept();
        } else if ((<any>event.target).classList.contains('mdc-dialog__footer__button--cancel')) {
          this.cancel();
        }
      };
      this._registry.listen(this._renderer, evt, handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerSurfaceInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.listen(this._renderer, evt, handler, this.dialogSurface.elementRef.nativeElement);
    },
    deregisterSurfaceInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten(evt, handler);
    },
    registerDocumentKeydownHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      handler = this.escapeToClose ? handler : this._onKeyDown;
      this._registry.listen(this._renderer, 'keydown', handler, document);
    },
    deregisterDocumentKeydownHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      handler = this.escapeToClose ? handler : this._onKeyDown;
      this._registry.unlisten('keydown', handler);
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this.dialogSurface) {
        this._registry.listen(this._renderer, 'transitionend', handler, this.dialogSurface.elementRef.nativeElement);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      if (this.dialogSurface) {
        this._registry.unlisten('transitionend', handler);
      }
    },
    notifyAccept: () => this._accept.emit('MDCDialog:accept'),
    notifyCancel: () => this._cancel.emit('MDCDialog:cancel'),
    trapFocusOnSurface: () => {
      this._focusTrap.activate();
    },
    untrapFocusOnSurface: () => {
      this._focusTrap.deactivate();
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
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  private _onKeyDown(keyboardEvent: KeyboardEvent): void {
    let keyCode = keyboardEvent.keyCode;

    if (keyCode === KeyCodes.ESCAPE) {
      keyboardEvent.stopPropagation();
    }
  }

  show(): void {
    const focusedEl = this.dialogButtons.find((_) => _.focused || _.accept);

    this._focusTrap = createFocusTrap(this.dialogSurface.elementRef.nativeElement, {
      initialFocus: focusedEl ? focusedEl.elementRef.nativeElement : this.elementRef.nativeElement,
      clickOutsideDeactivates: this.clickOutsideToClose,
      escapeDeactivates: this.escapeToClose,
    });
    this._foundation.open();
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
}
