import {
  Directive,
  Input
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';
import { MdcIcon } from '@angular-mdc/web/icon';

@Directive({
  selector: '[mdcTextFieldIcon]',
  exportAs: 'mdcTextFieldIcon',
  host: { 'class': 'mdc-text-field__icon' }
})
export class MdcTextFieldIcon extends MdcIcon {
  @Input()
  get leading(): boolean { return this._leading; }
  set leading(value: boolean) {
    this._leading = toBoolean(value);
  }
  private _leading: boolean = false;

  @Input()
  get trailing(): boolean { return this._trailing; }
  set trailing(value: boolean) {
    this._trailing = toBoolean(value);
  }
  private _trailing: boolean = false;
}
