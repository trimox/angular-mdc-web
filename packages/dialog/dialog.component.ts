import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  SkipSelf,
  ViewEncapsulation
} from '@angular/core';

import {
  isBrowser,
  EventRegistry,
  ESCAPE
} from '@angular-mdc/web/common';

import {
  MdcDialogBody,
  MdcDialogButton,
  MdcDialogSurface
} from './dialog-directives';
import { MdcDialogConfig } from './dialog-config';
import { MdcDialogRef } from './dialog-ref';

import { MDCDialogAdapter } from './adapter';
import { MDCDialogFoundation, util } from '@material/dialog';

@Component({
  moduleId: module.id,
  selector: 'mdc-dialog',
  template: `
  <ng-content></ng-content>
  <div class="mdc-dialog__backdrop" *ngIf="config?.backdrop"></div>
  `,
  host: {
    '[attr.aria-labelledby]': 'config?.ariaLabel',
    '[attr.aria-label]': 'config?.ariaLabel',
    '[attr.aria-describedby]': 'config?.ariaDescribedBy || null',
  },
  providers: [EventRegistry],
  encapsulation: ViewEncapsulation.None
})
export class MdcDialogComponent implements AfterContentInit, OnDestroy {
  private _focusTrap: {
    activate(): void,
    deactivate(): void
  };

  config: MdcDialogConfig;

  @Input() clickOutsideToClose: boolean = true;
  @Input() escapeToClose: boolean = true;
  @Input() backdrop: boolean = true;

  @HostBinding('class.mdc-dialog') isHostClass = true;
  @HostBinding('attr.role') alertDialog: string = 'alertdialog';
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';
  @HostBinding('tabindex') tabIndex: number = -1;

  /** Event emitted when the dialog is closed. */
  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  @Output('accept') readonly _accept: EventEmitter<string> = new EventEmitter();
  @Output('cancel') readonly _cancel: EventEmitter<string> = new EventEmitter();

  @ContentChild(MdcDialogSurface) _surface: MdcDialogSurface;
  @ContentChild(MdcDialogBody) _dialogBody: MdcDialogBody;
  @ContentChildren(MdcDialogButton, { descendants: true }) _actions: QueryList<MdcDialogButton>;

  private _mdcAdapter: MDCDialogAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    addBodyClass: (className: string) => {
      if (isBrowser()) {
        document.body.classList.add(className);
      }
    },
    removeBodyClass: (className: string) => {
      if (isBrowser()) {
        document.body.classList.remove(className);
      }
    },
    eventTargetHasClass: (target: HTMLElement, className: string) => target.classList.contains(className),
    registerInteractionHandler: (evt: string, handler: EventListener) => {
      const clickOutsideToClose = this.config ? this.config.clickOutsideToClose : this.clickOutsideToClose;

      handler = this._surface && clickOutsideToClose ? handler : (event) => {
        if ((<any>event.target).classList.contains('mdc-dialog__footer__button--accept')) {
          this.accept();
        } else if ((<any>event.target).classList.contains('mdc-dialog__footer__button--cancel')) {
          this.cancel();
        }
      };
      this._registry.listen(evt, handler, this._getHostElement());
    },
    deregisterInteractionHandler: (evt: string, handler: EventListener) => this._registry.unlisten(evt, handler),
    registerSurfaceInteractionHandler: (evt: string, handler: EventListener) =>
      this._registry.listen(evt, handler, this._surface.elementRef.nativeElement),
    deregisterSurfaceInteractionHandler: (evt: string, handler: EventListener) => this._registry.unlisten(evt, handler),
    registerDocumentKeydownHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      const escapeToClose = this.config ? this.config.escapeToClose : this.escapeToClose;

      handler = escapeToClose ? handler : this._onKeyDown;
      this._registry.listen('keydown', handler, document);
    },
    deregisterDocumentKeydownHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      const escapeToClose = this.config ? this.config.escapeToClose : this.escapeToClose;
      this._registry.unlisten('keydown', escapeToClose ? handler : this._onKeyDown);
    },
    registerTransitionEndHandler: (handler: EventListener) =>
      this._registry.listen('transitionend', handler, this._surface.elementRef.nativeElement),
    deregisterTransitionEndHandler: (handler: EventListener) => this._registry.unlisten('transitionend', handler),
    notifyAccept: () => {
      this._accept.emit();
      this._closeDialogRef();
    },
    notifyCancel: () => {
      this._cancel.emit();
      this._closeDialogRef();
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
    isDialog: (el: Element) => this._surface ? el === this._surface.elementRef.nativeElement : false
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    open(): void,
    close(): void,
    isOpen(): boolean,
    accept(shouldNotify: boolean): void,
    cancel(shouldNotify: boolean): void
  } = new MDCDialogFoundation(this._mdcAdapter);

  constructor(
    public elementRef: ElementRef,
    private _registry: EventRegistry,
    @Optional() @SkipSelf() public dialogRef: MdcDialogRef<any>) { }

  ngAfterContentInit(): void {
    if (this.dialogRef) {
      this.config = this.dialogRef.componentInstance.config;

      setTimeout(() => {
        this.show();
      });
    }
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  initDeclarativeConfig(): void {
    this.config = new MdcDialogConfig();

    this.config.backdrop = this.backdrop;
    this.config.clickOutsideToClose = this.clickOutsideToClose;
    this.config.escapeToClose = this.escapeToClose;
  }

  show(): void {
    if (!this.dialogRef) {
      this.initDeclarativeConfig();
    }

    this._foundation.init();

    const focusedEl = this._actions.find((_) => _.accept);

    if (isBrowser()) {
      this._focusTrap = util.createFocusTrapInstance(this._surface.elementRef.nativeElement, {
        initialFocus: focusedEl ? focusedEl.getHostElement() : this._getHostElement(),
        clickOutsideDeactivates: this.config ? this.config.clickOutsideToClose : this.clickOutsideToClose,
        escapeDeactivates: this.config ? this.config.escapeToClose : this.escapeToClose,
      });
    }

    this._foundation.open();

    if (focusedEl) {
      focusedEl.focus();
    }
  }

  private _closeDialogRef(result?: any): void {
    if (this.dialogRef) {
      this.dialogRef.close(result);
    }
  }

  close(): void {
    this.closed.emit();
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

  private _onKeyDown(event: KeyboardEvent): void {
    if (ESCAPE === event.keyCode) {
      event.stopPropagation();
    }
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
