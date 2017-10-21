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
import { MdcTextfield } from './textfield';

export const MD_TEXTFIELD_BOX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcTextfieldBox),
  multi: true
};

@Component({
  selector: 'mdc-textfield-box',
  template:
  `
  <input mdc-textfield-input
    [type]="type"
    [id]="id"
    [tabindex]="tabIndex"
    [attr.maxlength]="maxlength"
    [disabled]="disabled"
    [required]="required"
    (blur)="onBlur()"
    (input)="onInput($event)"
    (focus)="onFocus()" />
  <mdc-textfield-label [attr.for]="id">{{label}}</mdc-textfield-label>
  <mdc-textfield-bottom-line></mdc-textfield-bottom-line>
  <ng-content select="mdc-icon"></ng-content>
  `,
  providers: [
    MD_TEXTFIELD_BOX_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
    EventRegistry,
  ]
})
export class MdcTextfieldBox extends MdcTextfield {
  @HostBinding('class.mdc-textfield--box') isHostClass = true;

  constructor(
    @Inject(Renderer2) _renderer: Renderer2,
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(EventRegistry) _registry: EventRegistry,
    private _ripple: MdcRipple) {
    super(_renderer, elementRef, _registry);
    this._ripple.init();
  }
}
