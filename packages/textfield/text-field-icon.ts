import {
  Directive,
  Input
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Directive({
  selector: '[mdcTextFieldIcon]',
  exportAs: 'mdcTextFieldIcon',
  host: { 'class': 'mdc-text-field__icon' }
})
export class MdcTextFieldIcon {
  @Input()
  get leading(): boolean { return this._leading; }
  set leading(value: boolean) {
    this._leading = coerceBooleanProperty(value);
  }
  private _leading: boolean = false;

  @Input()
  get trailing(): boolean { return this._trailing; }
  set trailing(value: boolean) {
    this._trailing = coerceBooleanProperty(value);
  }
  private _trailing: boolean = false;
}
