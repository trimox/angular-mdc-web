import {
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcButton } from '@angular-mdc/web/button';

@Directive({
  selector: '[mdcDialogSurface], mdc-dialog-surface',
  exportAs: 'mdcDialogSurface'
})
export class MdcDialogSurface {
  @HostBinding('class.mdc-dialog__surface') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdcDialogHeader], mdc-dialog-header',
  exportAs: 'mdcDialogHeader',
  template: `
  <ng-content></ng-content>
  <h2 class="mdc-dialog__header__title" *ngIf="title">{{title}}</h2>
  `
})
export class MdcDialogHeader {
  @Input() title: string;

  @HostBinding('class.mdc-dialog__header') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcDialogHeaderTitle], mdc-dialog-header-title',
  exportAs: 'mdcDialogHeaderTitle'
})
export class MdcDialogHeaderTitle {
  @HostBinding('class.mdc-dialog__header__title') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcDialogBody], mdc-dialog-body',
  exportAs: 'mdcDialogBody'
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
  selector: '[mdcDialogFooter], mdc-dialog-footer',
  exportAs: 'mdcDialogFooter'
})
export class MdcDialogFooter {
  @HostBinding('class.mdc-dialog__footer') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'button[mdc-dialog-button], a[mdc-dialog-button]',
  providers: [MdcRipple]
})
export class MdcDialogButton extends MdcButton {
  @Input()
  get accept(): boolean { return this._accept; }
  set accept(value: boolean) {
    this._accept = toBoolean(value);
  }
  private _accept: boolean;

  @Input()
  get cancel(): boolean { return this._cancel; }
  set cancel(value: boolean) {
    this._cancel = toBoolean(value);
  }
  private _cancel: boolean;

  @Input()
  get action(): boolean { return this._action; }
  set action(value: boolean) {
    this._action = toBoolean(value);
  }
  private _action: boolean;

  @HostBinding('class.mdc-dialog__footer__button') isFooterButton = true;
  @HostBinding('class.mdc-dialog__action') get classAction(): string {
    return this.action ? 'mdc-dialog__action' : '';
  }
  @HostBinding('class.mdc-dialog__footer__button--accept') get classAccept(): string {
    return this.accept ? 'mdc-dialog__footer__button--accept' : '';
  }
  @HostBinding('class.mdc-dialog__footer__button--cancel') get classCancel(): string {
    return this.cancel ? 'mdc-dialog__footer__button--cancel' : '';
  }
}
