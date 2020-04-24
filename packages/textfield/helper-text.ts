import {
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {
  MDCTextFieldHelperTextFoundation,
  MDCTextFieldHelperTextAdapter
} from '@material/textfield';
import {MDCComponent} from '@angular-mdc/web/base';

export class MdcTextFieldHelperTextFoundation extends MDCComponent<MDCTextFieldHelperTextFoundation>
  implements OnDestroy {
  private _initialized: boolean = false;

  _helperLineElement?: HTMLElement;
  private _helperTextContentElement?: HTMLElement;

  get foundation(): MDCTextFieldHelperTextFoundation {
    return this._foundation;
  }

  constructor(public _hostElement: ElementRef<HTMLElement>, private _document: Document) {
    super(_hostElement);
  }

  getDefaultFoundation() {
    const adapter: MDCTextFieldHelperTextAdapter = {
      addClass: (className: string) => this._helperTextContentElement!.classList.add(className),
      removeClass: (className: string) => this._helperTextContentElement!.classList.remove(className),
      hasClass: (className: string) => this._helperTextContentElement!.classList.contains(className),
      setAttr: (attr: string, value: string) => this._helperTextContentElement!.setAttribute(attr, value),
      removeAttr: (attr: string) => this._helperTextContentElement!.removeAttribute(attr),
      setContent: (content: string) => this._helperTextContentElement!.textContent = content,
    };
    return new MDCTextFieldHelperTextFoundation(adapter);
  }

  /** Sets the persistency of the helper text. */
  setPersistent(isPersistent: boolean) {
    this._foundation.setPersistent(isPersistent);
  }

  /** True to make the helper text act as an error validation message. */
  setValidation(isValidation: boolean) {
    this._foundation.setValidation(isValidation);
  }

  /** Sets the validity of the helper text based on inputIsValid. */
  setValidity(inputIsValid: boolean): void {
    this._foundation.setValidity(inputIsValid);
  }

  /** Makes the helper text visible to the screen reader. */
  showToScreenReader(): void {
    this._foundation.showToScreenReader();
  }

  /** Sets the content of the helper text field. */
  setContent(content: string) {
    this._foundation.setContent(content);
  }

  /** Initializes the foundation. */
  init() {
    if (this._initialized) {
      return;
    }

    this._createHelperElement();
    this._foundation.init();
    this._initialized = true;
  }

  /** Destroys the foundation. */
  destroy() {
    this._helperLineElement?.parentNode?.removeChild(this._helperLineElement);
    this._hostElement = this._helperLineElement = this._helperTextContentElement = null!;
    this._foundation.destroy();
    this._initialized = false;
  }

  /** Creates and appends the helper element. */
  private _createHelperElement() {
    this._helperLineElement = this._document.createElement('div');
    this._helperTextContentElement = this._document.createElement('div');

    this._helperLineElement.className = 'mdc-text-field-helper-line';
    this._helperTextContentElement.className = 'mdc-text-field-helper-text';

    this._helperLineElement.appendChild(this._helperTextContentElement);
    this._appendHelperElement();
  }

  /**
   * Appends the helper element to the textfield or textarea.
   */
  private _appendHelperElement() {
    if (!this._helperLineElement) {
      throw Error('Helper element has not been created and cannot be appended');
    }

    this._hostElement.nativeElement.insertAdjacentElement('afterend', this._helperLineElement);
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
