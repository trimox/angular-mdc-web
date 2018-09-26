import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';

import { MdcIcon } from '@angular-mdc/web/icon';
import { MDCTextFieldIconAdapter } from '@material/textfield/icon/adapter';
import { MDCTextFieldIconFoundation } from '@material/textfield/icon';

@Directive({
  selector: '[mdcTextFieldIcon]',
  exportAs: 'mdcTextFieldIcon',
  host: {
    'class': 'mdc-text-field__icon'
  }
})
export class MdcTextFieldIcon extends MdcIcon implements OnDestroy {
  @Input()
  get leading(): boolean { return this._leading; }
  set leading(value: boolean) {
    this._leading = toBoolean(value);
  }
  private _leading: boolean;

  @Input()
  get trailing(): boolean { return this._trailing; }
  set trailing(value: boolean) {
    this._trailing = toBoolean(value);
  }
  private _trailing: boolean;

  @Output() readonly iconAction = new EventEmitter<void>();

  private _mdcIconAdapter: MDCTextFieldIconAdapter = {
    getAttr: (attr: string) => this._getHostElement().getAttribute(attr),
    setAttr: (attr: string, value: string) => this._getHostElement().setAttribute(attr, value),
    removeAttr: (attr: string) => this._getHostElement().removeAttribute(attr),
    setContent: (content: string) => this._getHostElement().textContent = content,
    registerInteractionHandler: (evtType: string, handler: EventListener) =>
      this._getHostElement().addEventListener(evtType, handler),
    deregisterInteractionHandler: (evtType: string, handler: EventListener) =>
      this._getHostElement().removeEventListener(evtType, handler),
    notifyIconAction: () => this.iconAction.emit()
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    setDisabled(disabled: boolean): void,
    handleInteraction(evt: Event): void,
    setContent(content: string): void,
    setAriaLabel(label: string): void
  };

  init(): void {
    this._foundation = new MDCTextFieldIconFoundation(this._mdcIconAdapter);
    this._foundation.init();
  }

  destroy(): void {
    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  get iconTextFoundation(): MDCTextFieldIconFoundation {
    return this._foundation;
  }
}
