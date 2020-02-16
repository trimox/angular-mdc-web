import {
  Directive,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {MDCComponent} from '@angular-mdc/web/base';
import {MDCTextFieldIconFoundation, MDCTextFieldIconAdapter} from '@material/textfield';

@Directive({
  selector: '[mdcTextFieldIcon]',
  exportAs: 'mdcTextFieldIcon',
  host: {
    '[attr.tabindex]': 'trailing ? 0 : -1',
    'class': 'mdc-text-field__icon',
    '[class.mdc-text-field__icon--leading]': 'leading',
    '[class.mdc-text-field__icon--trailing]': 'trailing'
  }
})
export class MdcTextFieldIcon extends MDCComponent<MDCTextFieldIconFoundation> implements OnDestroy {
  @Input()
  get leading(): boolean {
    return this._leading;
  }
  set leading(value: boolean) {
    this._leading = coerceBooleanProperty(value);
  }
  private _leading = false;

  @Input()
  get trailing(): boolean {
    return this._trailing;
  }
  set trailing(value: boolean) {
    this._trailing = coerceBooleanProperty(value);
  }
  private _trailing = false;

  get foundation(): MDCTextFieldIconFoundation {
    return this._foundation;
  }

  getDefaultFoundation() {
    const adapter: MDCTextFieldIconAdapter = {
      getAttr: (attr: string) => this._elementRef.nativeElement.getAttribute(attr),
      setAttr: (attr: string, value: string) => this._elementRef.nativeElement.setAttribute(attr, value),
      removeAttr: (attr: string) => this._elementRef.nativeElement.removeAttribute(attr),
      setContent: () => {},
      registerInteractionHandler: () => {},
      deregisterInteractionHandler: () => {},
      notifyIconAction: () => {},
    };
    return new MDCTextFieldIconFoundation(adapter);
  }

  constructor(public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
