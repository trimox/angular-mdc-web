import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MDCTextFieldHelperTextAdapter } from '@material/textfield/helper-text/adapter';
import { MDCTextFieldHelperTextFoundation } from '@material/textfield/helper-text';

@Directive({
  selector: '[mdc-text-field-helper-text], mdc-text-field-helper-text',
  exportAs: 'mdcHelperText'
})
export class MdcTextFieldHelperText implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() persistent: boolean = false;
  @Input() validation: boolean = false;
  @HostBinding('class.mdc-text-field-helper-text') isHostClass = true;
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';
  @HostBinding('class.mdc-text-field-helper-text--persistent') get classPersistent(): string {
    return this.persistent ? 'mdc-text-field-helper-text--persistent' : '';
  }
  @HostBinding('class.mdc-text-field-helper-text--validation-msg') get classValidation(): string {
    return this.validation ? 'mdc-text-field-helper-text--validation-msg' : '';
  }

  private _mdcAdapter: MDCTextFieldHelperTextAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    hasClass: (className: string) => {
      return this.elementRef.nativeElement.classList.contains(className);
    },
    setAttr: (attr: string, value: string) => this._renderer.setAttribute(this.elementRef.nativeElement, attr, value),
    removeAttr: (attr: string) => this._renderer.removeAttribute(this.elementRef.nativeElement, attr),
    setContent: (content: string) => this.elementRef.nativeElement.textContent = content,
  };

  foundation: {
    init(): void,
    destroy(): void,
    setContent(content: string): void,
    showToScreenReader(): boolean,
    setValidity(inputIsValid: boolean): void,
    setPersistent(isPersistent: boolean): void,
    setValidation(isValidation: boolean)
  } = new MDCTextFieldHelperTextFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  ngOnInit(): void {
    this.foundation.init();
  }

  ngOnDestroy(): void {
    this.foundation.destroy();
  }

  destroy(): void {
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
  setPersistent(isPersistent: boolean): void {
    this.persistent = isPersistent;
    this.foundation.setPersistent(isPersistent);
  }

  /** True to make the helper text act as an error validation message. */
  setValidation(isValidation: boolean): void {
    this.validation = isValidation;
    this.foundation.setValidation(isValidation);
  }
}
