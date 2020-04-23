import {
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {
  MDCTextFieldCharacterCounterFoundation,
  MDCTextFieldCharacterCounterAdapter
} from '@material/textfield';
import {MDCComponent} from '@angular-mdc/web/base';

export class MdcTextFieldCharacterCounterFoundation
  extends MDCComponent<MDCTextFieldCharacterCounterFoundation> implements OnDestroy {
  _root!: ElementRef;

  private _initialized: boolean = false;
  private _characterCounterElement?: HTMLElement;

  get foundation(): MDCTextFieldCharacterCounterFoundation {
    return this._foundation;
  }

  constructor(
    private _hostElement: ElementRef<HTMLElement>,
    private _helperElement: HTMLElement,
    private _document: Document) {
    super(_hostElement);
    this._root = this._elementRef;
  }

  /** Initializes the foundation. */
  init() {
    if (this._initialized) {
      return;
    }

    this._createCounterElement();
    this._foundation.init();
    this._initialized = true;
  }

  getDefaultFoundation() {
    const adapter: MDCTextFieldCharacterCounterAdapter = {
      setContent: (content: string) => this._characterCounterElement!.textContent = content,
    };
    return new MDCTextFieldCharacterCounterFoundation(adapter);
  }

  setCounterValue(currentLength: number, maxLength: number) {
    this.foundation.setCounterValue(currentLength, maxLength);
  }

  /** Creates and appends counter to the helper element. */
  private _createCounterElement() {
    this._characterCounterElement = this._document.createElement('div');
    this._characterCounterElement.className = 'mdc-text-field-character-counter';
    this._appendCounterElement();
  }

  /**
   * Appends the counter element to the textfield or textarea.
   */
  private _appendCounterElement() {
    if (!this._characterCounterElement) {
      throw Error('Helper element has not been created and cannot be appended');
    }

    this._helperElement.appendChild(this._characterCounterElement);
  }

  /** Destroys the foundation. */
  destroy() {
    this._characterCounterElement?.parentNode?.removeChild(this._characterCounterElement);
    this._hostElement = this._characterCounterElement = null!;
    this._foundation.destroy();
    this._initialized = false;
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
