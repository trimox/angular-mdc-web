import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  Provider,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventRegistry } from '../common/event-registry';
import { MdcRipple } from '../core/ripple/ripple.service';
import { MdcTextField } from './text-field';

export const MD_TEXTFIELD_BOX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcTextFieldBox),
  multi: true
};

@Component({
  selector: 'mdc-text-field-box',
  template:
  `
  <input mdc-text-field-input
    [type]="type"
    [id]="id"
    [tabindex]="tabIndex"
    [attr.maxlength]="maxlength"
    [disabled]="disabled"
    [required]="required"
    (blur)="onBlur()"
    (input)="onInput($event)"
    (focus)="onFocus()" />
  <mdc-text-field-label [attr.for]="id">{{label}}</mdc-text-field-label>
  <mdc-text-field-bottom-line></mdc-text-field-bottom-line>
  <ng-content select="mdc-icon"></ng-content>
  `,
  providers: [
    MD_TEXTFIELD_BOX_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
    EventRegistry,
  ]
})
export class MdcTextFieldBox extends MdcTextField {
  @HostBinding('class.mdc-text-field--box') isHostClass = true;

  constructor(
    @Inject(Renderer2) _renderer: Renderer2,
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(EventRegistry) _registry: EventRegistry,
    private _ripple: MdcRipple) {
    super(_renderer, elementRef, _registry);
    this._ripple.init();
  }
}
