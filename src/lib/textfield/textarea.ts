import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  Provider,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventRegistry } from '../common/event-registry';
import { MdcTextfield } from './textfield';

export const MD_TEXTAREA_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcTextarea),
  multi: true
};

@Component({
  selector: 'mdc-textarea',
  template:
  `
  <textarea mdc-textfield-input
    type="text"
    [id]="id"
    [rows]="rows"
    [cols]="cols"
    [tabindex]="tabIndex"
    [attr.maxlength]="maxlength"
    [disabled]="disabled"
    [required]="required"
    (blur)="onBlur()"
    (input)="onInput($event)"
    (focus)="onFocus()"></textarea>
    <mdc-textfield-label [attr.for]="id">{{label}}</mdc-textfield-label>
  `,
  providers: [
    MD_TEXTAREA_CONTROL_VALUE_ACCESSOR,
    EventRegistry
  ],
})
export class MdcTextarea extends MdcTextfield {
  @Input() rows: number;
  @Input() cols: number;
  @HostBinding('class.mdc-textfield--textarea') isHostClass = true;

  constructor(
    @Inject(Renderer2) _renderer: Renderer2,
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(EventRegistry) _registry: EventRegistry) {
    super(_renderer, elementRef, _registry);
  }
}
