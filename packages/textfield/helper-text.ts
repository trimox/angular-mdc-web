import {
  Directive,
  ElementRef,
  Input
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';

import { MDCTextFieldHelperTextFoundation } from '@material/textfield/helper-text/index';
import { MdcHelperTextBase } from '@angular-mdc/web/form-field';

@Directive({
  selector: '[mdcTextFieldHelperText], mdc-text-field-helper-text',
  exportAs: 'mdcHelperText',
  host: {
    'class': 'mdc-text-field-helper-text',
    '[class.mdc-text-field-helper-text--persistent]': 'persistent',
    '[class.mdc-text-field-helper-text--validation-msg]': 'validation'
  }
})
export class MdcTextFieldHelperText extends MdcHelperTextBase {
  @Input()
  get persistent(): boolean { return this._persistent; }
  set persistent(value: boolean) {
    this._persistent = toBoolean(value);
    this._foundation.setPersistent(this.persistent);
  }
  private _persistent: boolean = false;

  @Input()
  get validation(): boolean { return this._validation; }
  set validation(value: boolean) {
    this._validation = toBoolean(value);
    this._foundation.setValidation(this.validation);
  }
  private _validation: boolean = false;

  private _createAdapter() {
    return {
      addClass: (className: string) => this.getHostElement().classList.add(className),
      removeClass: (className: string) => this.getHostElement().classList.remove(className),
      hasClass: (className: string) => this.getHostElement().classList.contains(className),
      setAttr: (attr: string, value: string) => this.getHostElement().setAttribute(attr, value),
      removeAttr: (attr: string) => this.getHostElement().removeAttribute(attr),
      setContent: (content: string) => this.getHostElement().textContent = content
    };
  }

  private _foundation: {
    setContent(content: string): void,
    showToScreenReader(): boolean,
    setValidity(inputIsValid: boolean): void,
    setPersistent(isPersistent: boolean): void,
    setValidation(isValidation: boolean): void
  } = new MDCTextFieldHelperTextFoundation(this._createAdapter());

  constructor(public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  /** Sets the content of the helper text field. */
  setContent(content: string): void {
    this._foundation.setContent(content);
  }

  /** Sets the validity of the helper text based on the input validity. */
  setValidity(validity: boolean): void {
    this._foundation.setValidity(validity);
  }

  /** Makes the helper text visible to the screen reader. */
  showToScreenReader(): void {
    this._foundation.showToScreenReader();
  }
}
