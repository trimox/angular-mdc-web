import {
  AfterViewInit,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { isBrowser } from '../common/platform';
import { EventRegistry } from '../common/event-registry';
import { ButtonComponent } from '../button/button.component';

import * as createFocusTrap from 'focus-trap';

import { MDCDialogAdapter } from './dialog-adapter';
import { MDCDialogFoundation } from '@material/dialog';

@Directive({
  selector: '[mdc-dialog-surface], mdc-dialog-surface'
})
export class DialogSurfaceDirective {
  @HostBinding('class.mdc-dialog__surface') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-header], mdc-dialog-header'
})
export class DialogHeaderDirective {
  @HostBinding('class.mdc-dialog__header') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-header-title], mdc-dialog-header-title'
})
export class DialogHeaderTitleDirective {
  @HostBinding('class.mdc-dialog__header__title') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-body], mdc-dialog-body'
})
export class DialogBodyDirective {
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
export class DialogFooterDirective {
  @HostBinding('class.mdc-dialog__footer') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-backdrop], mdc-dialog-backdrop'
})
export class DialogBackdropDirective {
  @HostBinding('class.mdc-dialog__backdrop') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-button-accept], mdc-dialog-button-accept'
})
export class DialogButtonAcceptDirective {
  @HostBinding('class.mdc-dialog__footer__button--accept') isHostClass = true;
  @HostBinding('class.mdc-dialog__footer__button') isFooterButton = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-dialog-button-cancel], mdc-dialog-button-cancel'
})
export class DialogButtonCancelDirective {
  @HostBinding('class.mdc-dialog__footer__button--cancel') isHostClass = true;
  @HostBinding('class.mdc-dialog__footer__button') isFooterButton = true;

  constructor(public elementRef: ElementRef) { }
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
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  private focusTrap_: any;

  @Output('accept') accept_: EventEmitter<string> = new EventEmitter();
  @Output('cancel') cancel_: EventEmitter<string> = new EventEmitter();
  @HostBinding('class.mdc-dialog') isHostClass = true;
  @HostBinding('attr.role') role: string = 'alertdialog';
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';
  @ViewChild(DialogSurfaceDirective) dialogSurface: DialogSurfaceDirective;
  @ContentChild(DialogButtonAcceptDirective) dialogAcceptButton: DialogButtonAcceptDirective;
  @ContentChild(DialogBodyDirective) dialogBody: DialogBodyDirective;

  private _mdcAdapter: MDCDialogAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this._root.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this._root.nativeElement, className);
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
      this._registry.listen_(this._renderer, evt, handler, this._root);
    },
    deregisterInteractionHandler: (evt: string, handler: EventListener) => {
      this._registry.unlisten_(evt, handler);
    },
    registerSurfaceInteractionHandler: (evt: string, handler: EventListener) => {
      if (this.dialogSurface) {
        this._registry.listen_(this._renderer, evt, handler, this.dialogSurface.elementRef);
      }
    },
    deregisterSurfaceInteractionHandler: (evt: string, handler: EventListener) => {
      if (this.dialogSurface) {
        this._registry.unlisten_(evt, handler);
      }
    },
    registerDocumentKeydownHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.listen_(this._renderer, 'keydown', handler, 'document');
      }
    },
    deregisterDocumentKeydownHandler: (handler: EventListener) => {
      if (isBrowser()) {
        this._registry.unlisten_('keydown', handler);
      }
    },
    registerTransitionEndHandler: (handler: EventListener) => {
      if (this.dialogSurface) {
        this._registry.listen_(this._renderer, 'transitionend', handler, this.dialogSurface.elementRef);
      }
    },
    deregisterTransitionEndHandler: (handler: EventListener) => {
      if (this.dialogSurface) {
        this._registry.unlisten_('transitionend', handler);
      }
    },
    notifyAccept: () => this.accept_.emit('MDCDialog:accept'),
    notifyCancel: () => this.cancel_.emit('MDCDialog:cancel'),
    trapFocusOnSurface: () => {
      if (this.focusTrap_) {
        this.focusTrap_.activate();
      }
    },
    untrapFocusOnSurface: () => {
      if (this.focusTrap_) {
        this.focusTrap_.deactivate();
      }
    },
    isDialog: (el: Element) => {
      return this.dialogSurface ? el === this.dialogSurface.elementRef.nativeElement : false;
    }
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
    private _root: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit() {
    this._foundation.init();
  }

  ngOnDestroy() {
    this._foundation.destroy();
  }

  show() {
    if (this.dialogSurface && this.dialogAcceptButton) {
      this.focusTrap_ = createFocusTrap.focusTrap(this.dialogSurface.elementRef.nativeElement, {
        initialFocus: this.dialogAcceptButton.elementRef.nativeElement,
        clickOutsideDeactivates: true
      });
    }
    this._foundation.open();
  }

  close() {
    this._foundation.close();
  }

  isOpen() {
    return this._foundation.isOpen();
  }

  accept() {
    this._foundation.accept();
  }

  cancel() {
    this._foundation.cancel();
  }
}
