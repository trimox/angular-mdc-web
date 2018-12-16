import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';

@Component({
  selector: 'mdc-helper-text, [mdcHelperText]',
  exportAs: 'mdcHelperText',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcHelperText {
  @Input() id?: string;

  @Input()
  get persistent(): boolean { return this._persistent; }
  set persistent(value: boolean) {
    this._persistent = toBoolean(value);
    if (this._foundation) {
      this._foundation.setPersistent(this._persistent);
    }
  }
  private _persistent: boolean = false;

  @Input()
  get validation(): boolean { return this._validation; }
  set validation(value: boolean) {
    this._validation = toBoolean(value);
    if (this._foundation) {
      this._foundation.setValidation(this._validation);
    }
  }
  private _validation: boolean = false;

  constructor(public elementRef: ElementRef<HTMLElement>) { }

  private _foundation!: {
    showToScreenReader(): boolean,
    setValidity(inputIsValid: boolean): void,
    setPersistent(isPersistent: boolean): void,
    setValidation(isValidation: boolean): void
  };

  /** Sets the validity of the helper text based on inputIsValid. */
  setValidity(inputIsValid: boolean): void {
    this._foundation.setValidity(inputIsValid);
  }

  /** Makes the helper text visible to the screen reader. */
  showToScreenReader(): void {
    this._foundation.showToScreenReader();
  }

  initFoundation(foundation: any): void {
    this._foundation = new foundation(this._createAdapter());

    this._foundation.setPersistent(this.persistent);
    this._foundation.setValidation(this.validation);
  }

  addHelperTextClass(className: string): void {
    this._getHostElement().classList.add(`${className}-helper-text`);
  }

  private _createAdapter() {
    return {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      setAttr: (attr: string, value: string) => this._getHostElement().setAttribute(attr, value),
      removeAttr: (attr: string) => this._getHostElement().removeAttribute(attr)
    };
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
