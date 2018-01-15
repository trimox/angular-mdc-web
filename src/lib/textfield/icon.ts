import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { EventRegistry } from '@angular-mdc/web/common';

import { MDCTextFieldIconAdapter } from '@material/textfield/icon/adapter';
import { MDCTextFieldIconFoundation } from '@material/textfield/icon';

export abstract class MdcTextFieldIcon {
  @Output() iconAction = new EventEmitter<boolean>();

  private _mdcAdapter: MDCTextFieldIconFoundation = {
    setAttr: (attr: string, value: string) => this._renderer.setAttribute(this.elementRef.nativeElement, attr, value),
    registerInteractionHandler: (evtType: string, handler: EventListener) =>
      this._registry.listen(evtType, handler, this.elementRef.nativeElement),
    deregisterInteractionHandler: (evtType: string, handler: EventListener) => this._registry.unlisten(evtType, handler),
    notifyIconAction: () => this.iconAction.emit(true)
  };

  foundation: {
    destroy: () => {},
    setDisabled: (disabled: boolean) => {},
    handleInteraction: (evt: any) => {}
  } = new MDCTextFieldIconFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  destroy(): void {
    this.foundation.destroy();
  }

  /** Sets the content of the helper text field. */
  setDisabled(value: boolean): void {
    this.foundation.setDisabled(value);
  }

  /** Handles an interaction event */
  handleInteraction(evt: any): void {
    this.foundation.handleInteraction(evt);
  }
}

@Directive({
  selector: 'mdc-icon[leading]'
})
export class MdcTextFieldLeadingIcon extends MdcTextFieldIcon {
  @Input() tabIndex: number = 0;
  @HostBinding('class.mdc-text-field__icon') isHostClass = true;

  constructor(
    @Inject(Renderer2) _renderer: Renderer2,
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(EventRegistry) _registry: EventRegistry) {
    super(_renderer, elementRef, _registry);
  }
}

@Directive({
  selector: 'mdc-icon[trailing]'
})
export class MdcTextFieldTrailingIcon extends MdcTextFieldIcon {
  @Input() tabIndex: number = 0;
  @HostBinding('class.mdc-text-field__icon') isHostClass = true;

  constructor(
    @Inject(Renderer2) _renderer: Renderer2,
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(EventRegistry) _registry: EventRegistry) {
    super(_renderer, elementRef, _registry);
  }
}
