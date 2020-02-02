import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

import {MDCComponent} from '@angular-mdc/web/base';
import {MDCSelectHelperTextFoundation, MDCSelectHelperTextAdapter} from '@material/select';

@Component({
  moduleId: module.id,
  selector: `mdc-select-helper-text, [mdcSelectHelperText]`,
  exportAs: 'mdcSelectHelperText',
  host: {'class': 'mdc-select-helper-text'},
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MDCSelectHelperText extends MDCComponent<MDCSelectHelperTextFoundation> {
  @Input() id?: string;

  @Input()
  get persistent(): boolean {
    return this._persistent;
  }
  set persistent(value: boolean) {
    this._persistent = coerceBooleanProperty(value);
    this._foundation.setPersistent(this._persistent);
  }
  private _persistent = false;

  @Input()
  get validation(): boolean {
    return this._validation;
  }
  set validation(value: boolean) {
    this._validation = coerceBooleanProperty(value);
    this._foundation.setValidation(this._validation);
  }
  private _validation = false;

  constructor(public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  getDefaultFoundation() {
    const adapter: MDCSelectHelperTextAdapter = {
      addClass: (className: string) => this.elementRef.nativeElement.classList.add(className),
      removeClass: (className: string) => this.elementRef.nativeElement.classList.remove(className),
      hasClass: (className: string) => this.elementRef.nativeElement.classList.contains(className),
      setAttr: (attr: string, value: string) => this.elementRef.nativeElement.setAttribute(attr, value),
      removeAttr: (attr: string) => this.elementRef.nativeElement.removeAttribute(attr),
      setContent: () => {}
    };
    return new MDCSelectHelperTextFoundation(adapter);
  }

  /** Sets the validity of the helper text. */
  setValidity(inputIsValid: boolean): void {
    this._foundation.setValidity(inputIsValid);
  }

  /** Makes the helper text visible to the screen reader. */
  showToScreenReader(): void {
    this._foundation.showToScreenReader();
  }

  init(): void {
    this._foundation.setPersistent(this.persistent);
    this._foundation.setValidation(this.validation);
  }
}
