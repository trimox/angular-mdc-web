import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

import {MdcCharacterCounter} from './character-counter';

@Component({
  selector: `mdc-helper-text, [mdcHelperText], mdc-text-field-helper-text, [mdcTextFieldHelperText]`,
  exportAs: 'mdcHelperText',
  host: {'class': 'mdc-text-field-helper-line'},
  template: `<div #helperText><ng-content></ng-content></div>
  <div mdcCharacterCounter *ngIf="characterCounter"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcHelperText {
  characterCounter = false;

  @Input() id?: string;

  @Input()
  get persistent(): boolean {
    return this._persistent;
  }
  set persistent(value: boolean) {
    this._persistent = coerceBooleanProperty(value);
    if (this._foundation) {
      this._foundation.setPersistent(this._persistent);
    }
  }
  private _persistent = false;

  @Input()
  get validation(): boolean {
    return this._validation;
  }
  set validation(value: boolean) {
    this._validation = coerceBooleanProperty(value);
    if (this._foundation) {
      this._foundation.setValidation(this._validation);
    }
  }
  private _validation = false;

  @ViewChild('helperText', {static: true}) _helperTextElement?: ElementRef<HTMLElement>;
  @ViewChild(MdcCharacterCounter, {static: false}) _characterCounterElement?: MdcCharacterCounter;

  constructor(public elementRef: ElementRef<HTMLElement>) {}

  private _foundation!: {
    init(): void,
    destroy(): void,
    showToScreenReader(): boolean,
    setValidity(inputIsValid: boolean): void,
    setPersistent(isPersistent: boolean): void,
    setValidation(isValidation: boolean): void,
    setContent(content: string): void
  };

  get foundation(): any {
    return this._foundation;
  }

  /** Sets the validity of the helper text based on inputIsValid. */
  setValidity(inputIsValid: boolean): void {
    this._foundation.setValidity(inputIsValid);
  }

  /** Makes the helper text visible to the screen reader. */
  showToScreenReader(): void {
    this._foundation.showToScreenReader();
  }

  init(foundation: any): void {
    this._foundation = new foundation(this._createAdapter());
    this._foundation.setPersistent(this.persistent);
    this._foundation.setValidation(this.validation);
  }

  addHelperTextClass(className: string): void {
    this._helperTextElement!.nativeElement.classList.add(`${className}-helper-text`);
  }

  private _createAdapter() {
    return {
      addClass: (className: string) => this._helperTextElement!.nativeElement.classList.add(className),
      removeClass: (className: string) => this._helperTextElement!.nativeElement.classList.remove(className),
      hasClass: (className: string) => this._helperTextElement!.nativeElement.classList.contains(className),
      setAttr: (attr: string, value: string) => this._helperTextElement!.nativeElement.setAttribute(attr, value),
      removeAttr: (attr: string) => this._helperTextElement!.nativeElement.removeAttribute(attr)
    };
  }
}
