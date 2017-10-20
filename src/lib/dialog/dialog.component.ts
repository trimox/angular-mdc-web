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

import { MDCDialogAdapter } from './dialog-adapter';
import { MDCDialogFoundation } from '@material/dialog';

@Directive({
  selector: '[mdc-dialog-surface], mdc-dialog-surface'
})
export class MdcDialogSurfaceDirective {
  @HostBinding('class.mdc-dialog__surface') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-header], mdc-dialog-header'
})
export class MdcDialogHeaderDirective {
  @HostBinding('class.mdc-dialog__header') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-header-title], mdc-dialog-header-title'
})
export class MdcDialogHeaderTitleDirective {
  @HostBinding('class.mdc-dialog__header__title') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-body], mdc-dialog-body'
})
export class MdcDialogBodyDirective {
  @Input() scrollable: boolean;
  @HostBinding('class.mdc-dialog__body') isHostClass = true;
  @HostBinding('class.mdc-dialog__body--scrollable') get classScrollable(): string {
    return this.scrollable ? 'mdc-dialog__body--scrollable' : '';
  }

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-footer], mdc-dialog-footer'
})
export class MdcDialogFooterDirective {
  @HostBinding('class.mdc-dialog__footer') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-backdrop], mdc-dialog-backdrop'
})
export class MdcDialogBackdropDirective {
  @HostBinding('class.mdc-dialog__backdrop') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'button[mdc-dialog-button], a[mdc-dialog-button]',
  providers: [MdcRipple]
})
export class MdcDialogButtonDirective extends MdcButton {
  @Input() accept: boolean = false;
  @Input() cancel: boolean = false;
  @Input() action: boolean = false;
  @Input() focused: boolean = false;

  @HostBinding('class.mdc-dialog__footer__button') get isFooterButton(): string {
    return this.renderer.parentNode(this.elementRef) === MdcDialogFooterDirective ? 'mdc-dialog__footer__button' : '';
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
export class MdcDialogComponent implements AfterViewInit, OnDestroy {
  private focusTrap_: {
    activate: Function;
    deactivate: Function;
    pause: Function;
    unpause: Function;
  };

  @Input() clickOutsideToClose: boolean = true;
  @Input() escapeToClose: boolean = true;
  @Output('accept') accept_: EventEmitter<string> = new EventEmitter();
  @Output('cancel') cancel_: EventEmitter<string> = new EventEmitter();
  @HostBinding('class.mdc-dialog') isHostClass = true;
  @HostBinding('attr.role') role: string = 'alertdialog';
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';
  @HostBinding('tabindex') tabindex: number = -1;
  @ViewChild(MdcDialogSurfaceDirective) dialogSurface: MdcDialogSurfaceDirective;
  @ContentChild(MdcDialogBodyDirective) dialogBody: MdcDialogBodyDirective;
  @ContentChildren(MdcDialogButtonDirective, { descendants: true }) dialogButtons: QueryList<MdcDialogButtonDirective>;

  private _mdcAdapter: MDCDialogAdapter = {
    addClass: (className: string) => {
      this.renderer_.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this.renderer_.removeClass(this.elementRef.nativeElement, className);
    },
    addBodyClass: (className: string) => {
      if (isBrowser()) {
        this.renderer_.addClass(document.body, className);
      }
    },
    removeBodyClass: (className: string) => {
      if (isBrowser()) {
        this.renderer_.removeClass(document.body, className);
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
      this.registry_.listen_(this.renderer_, evt, handler, this.elementRef);
    },
    deregisterInteractionHandler: (evt: string, handler: EventListener) => {
      this.registry_.unlisten_(evt, handler);
    },
    registerSurfaceInteractionHandler: (evt: string, handler: EventListener) => {
      this.registry_.listen_(this.renderer_, evt, handler, this.dialogSurface.elementRef);
    },
    deregisterSurfaceInteractionHandler: (evt: string, handler: EventListener) => {
      this.registry_.unlisten_(evt, handler);
    },
    registerDocumentKeydownHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      handler = this.escapeToClose ? handler : this.handleKeyDown_;
      this.registry_.listen_(this.renderer_, 'keydown', handler, 'document');
    },
    deregisterDocumentKeydownHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      handler = this.escapeToClose ? handler : this.handleKeyDown_;
      this.registry_.unlisten_('keydown', handler);
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this.dialogSurface) {
        this.registry_.listen_(this.renderer_, 'transitionend', handler, this.dialogSurface.elementRef);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      if (this.dialogSurface) {
        this.registry_.unlisten_('transitionend', handler);
      }
    },
    notifyAccept: () => this.accept_.emit('MDCDialog:accept'),
    notifyCancel: () => this.cancel_.emit('MDCDialog:cancel'),
    trapFocusOnSurface: () => {
      this.focusTrap_.activate();
    },
    untrapFocusOnSurface: () => {
      this.focusTrap_.deactivate();
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
    private renderer_: Renderer2,
    public elementRef: ElementRef,
    private registry_: EventRegistry) { }

  ngAfterViewInit() {
    this._foundation.init();
  }

  ngOnDestroy() {
    this._foundation.destroy();
  }

  private handleKeyDown_(keyboardEvent: KeyboardEvent) {
    let keyCode = keyboardEvent.keyCode;

    if (keyCode === KeyCodes.ESCAPE) {
      keyboardEvent.stopPropagation();
    }
  }

  show(): void {
    const focusedEl = this.dialogButtons.find((_) => _.focused || _.accept);

    this.focusTrap_ = createFocusTrap(this.dialogSurface.elementRef.nativeElement, {
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
