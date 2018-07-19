import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';

import { MDCTextFieldHelperTextAdapter } from '@material/textfield/helper-text/adapter';
import { MDCTextFieldHelperTextFoundation } from '@material/textfield/helper-text';

@Directive({
  selector: '[mdcTextFieldHelperText], mdc-text-field-helper-text',
  exportAs: 'mdcHelperText'
})
export class MdcTextFieldHelperText implements OnInit, OnDestroy {
  @Input() id: string;

  @Input()
  get persistent(): boolean { return this._persistent; }
  set persistent(value: boolean) {
    this.setPersistent(value);
  }
  private _persistent: boolean;

  @Input()
  get validation(): boolean { return this._validation; }
  set validation(value: boolean) {
    this.setValidation(value);
  }
  private _validation: boolean;

  @HostBinding('class.mdc-text-field-helper-text') isHostClass = true;
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';
  @HostBinding('class.mdc-text-field-helper-text--persistent') get classPersistent(): string {
    return this.persistent ? 'mdc-text-field-helper-text--persistent' : '';
  }
  @HostBinding('class.mdc-text-field-helper-text--validation-msg') get classValidation(): string {
    return this.validation ? 'mdc-text-field-helper-text--validation-msg' : '';
  }

  private _mdcAdapter: MDCTextFieldHelperTextAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    setAttr: (attr: string, value: string) => this._getHostElement().setAttribute(attr, value),
    removeAttr: (attr: string) => this._getHostElement().removeAttribute(attr),
    setContent: (content: string) => this._getHostElement().textContent = content
  };

  foundation: {
    init(): void,
    destroy(): void,
    setContent(content: string): void,
    showToScreenReader(): boolean,
    setValidity(inputIsValid: boolean): void,
    setPersistent(isPersistent: boolean): void,
    setValidation(isValidation: boolean): void
  } = new MDCTextFieldHelperTextFoundation(this._mdcAdapter);

  constructor(public elementRef: ElementRef) { }

  ngOnInit(): void {
    this.foundation.init();
  }

  ngOnDestroy(): void {
    this.foundation.destroy();
  }

  /** Sets the content of the helper text field. */
  setContent(content: string): void {
    this.foundation.setContent(content);
  }

  /** Sets the validity of the helper text based on the input validity. */
  setValidity(validity: boolean): void {
    this.foundation.setValidity(validity);
  }

  /** Makes the helper text visible to the screen reader. */
  showToScreenReader(): void {
    this.foundation.showToScreenReader();
  }

  /** Sets the persistency of the helper text. */
  setPersistent(persistent: boolean): void {
    this._persistent = toBoolean(persistent);
    this.foundation.setPersistent(persistent);
  }

  /** True to make the helper text act as an error validation message. */
  setValidation(validation: boolean): void {
    this._validation = toBoolean(validation);
    this.foundation.setValidation(validation);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
