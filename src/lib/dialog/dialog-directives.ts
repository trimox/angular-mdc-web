import {
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  Renderer2,
} from '@angular/core';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcButton } from '@angular-mdc/web/button';

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
    return this._renderer.parentNode(this._elementRef) === MdcDialogFooter ? 'mdc-dialog__footer__button' : '';
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
    _renderer: Renderer2,
    _elementRef: ElementRef,
    _ripple: MdcRipple) {

    super(_renderer, _elementRef, _ripple);
  }
}
