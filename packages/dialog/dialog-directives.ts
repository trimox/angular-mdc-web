import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Input,
  ViewEncapsulation
} from '@angular/core';

import {MdcButton} from '@angular-mdc/web/button';
import {toBoolean} from '@angular-mdc/web/common';
import {MdcRipple} from '@angular-mdc/web/ripple';

@Directive({ selector: '[mdcDialogAction]' })
export class MdcDialogAction {
  @Input('mdcDialogAction')
  get action(): string { return this._action; }
  set action(action: string) {
    // If the directive is set without a name (updated programatically), then this setter will
    // trigger with an empty string and should not overwrite the programatically set value.
    if (!action) { return; }

    this._action = action;
    this.elementRef.nativeElement.setAttribute('data-mdc-dialog-action', this._action);
  }
  private _action: string = '';

  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Directive({
  selector: 'mdc-dialog-scrim',
  host: { 'class': 'mdc-dialog__scrim' }
})
export class MdcDialogScrim {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Directive({
  selector: '[mdcDialogContainer], mdc-dialog-container',
  host: { 'class': 'mdc-dialog__container' }
})
export class MdcDialogContainer {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Directive({
  selector: '[mdcDialogSurface], mdc-dialog-surface',
  host: { 'class': 'mdc-dialog__surface' }
})
export class MdcDialogSurface {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Directive({
  selector: '[mdcDialogTitle], mdc-dialog-title',
  host: { 'class': 'mdc-dialog__title' }
})
export class MdcDialogTitle {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Directive({
  selector: '[mdcDialogContent], mdc-dialog-content',
  host: { 'class': 'mdc-dialog__content' }
})
export class MdcDialogContent {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-dialog-actions, [mdcDialogActions]',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcDialogActions',
  host: {
    'class': 'mdc-dialog__actions',
    '[class.mdc-dialog--stacked]': 'stacked'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcDialogActions {
  @Input()
  get stacked(): boolean { return this._stacked; }
  set stacked(value: boolean) {
    this._stacked = toBoolean(value);
  }
  private _stacked: boolean = false;

  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdcDialogButton]',
  exportAs: 'mdcDialogButton',
  host: {
    'class': 'mdc-dialog__button',
    '[class.mdc-button]': 'true',
    '[class.mdc-dialog__button--default]': 'default'
  },
  template: '<ng-content></ng-content>',
  providers: [MdcRipple],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcDialogButton extends MdcButton {
  @Input()
  get default(): boolean { return this._default; }
  set default(value: boolean) {
    this._default = toBoolean(value);
  }
  private _default: boolean = false;
}
