import {
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {
  MDCSelectHelperTextFoundation,
  MDCSelectHelperTextAdapter
} from '@material/select';
import {MDCComponent} from '@angular-mdc/web/base';

let nextUniqueId = 0;

export class MdcSelectHelperTextFoundation extends MDCComponent<MDCSelectHelperTextFoundation>
  implements OnDestroy {
  private _initialized: boolean = false;
  _uniqueId: string = `helper-text-${++nextUniqueId}`;

  _helperLineElement?: HTMLElement;

  get foundation(): MDCSelectHelperTextFoundation {
    return this._foundation;
  }

  constructor(
    public _hostElement: ElementRef<HTMLElement>,
    private _document: Document) {
    super(_hostElement);
  }

  getDefaultFoundation() {
    const adapter: MDCSelectHelperTextAdapter = {
      addClass: (className: string) => this._helperLineElement!.classList.add(className),
      removeClass: (className: string) => this._helperLineElement!.classList.remove(className),
      hasClass: (className: string) => this._helperLineElement!.classList.contains(className),
      setAttr: (attr: string, value: string) => this._helperLineElement!.setAttribute(attr, value),
      removeAttr: (attr: string) => this._helperLineElement!.removeAttribute(attr),
      setContent: (content: string) => this._helperLineElement!.textContent = content,
    };
    return new MDCSelectHelperTextFoundation(adapter);
  }

  /** Sets the persistency of the helper text. */
  setValidationMsgPersistent(isPersistent: boolean) {
    this._foundation.setValidationMsgPersistent(isPersistent);
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

  /** Sets the content of the helper text. */
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
    this._hostElement = this._helperLineElement = null!;
    this._foundation.destroy();
    this._initialized = false;
  }

  /** Creates and appends the helper element. */
  private _createHelperElement() {
    this._helperLineElement = this._document.createElement('p');
    this._helperLineElement.className = 'mdc-select-helper-text';
    this._helperLineElement.id = this._uniqueId;
    this._appendHelperElement();
  }

  /**
   * Appends the helper element to the select.
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
