import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventRegistry } from '@angular-mdc/web/common';
import { MdcTextField } from './text-field';

export const MD_TEXTAREA_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcTextarea),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'mdc-textarea',
  template: `
  <textarea mdc-text-field-input
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
    <mdc-text-field-label [attr.for]="id">{{label}}</mdc-text-field-label>
  `,
  providers: [
    MD_TEXTAREA_CONTROL_VALUE_ACCESSOR,
    EventRegistry
  ],
})
export class MdcTextarea extends MdcTextField {
  @Input() rows: number;
  @Input() cols: number;
  @HostBinding('class.mdc-text-field--textarea') isHostClass = true;

  constructor(
    @Inject(Renderer2) _renderer: Renderer2,
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(EventRegistry) _registry: EventRegistry) {
    super(_renderer, elementRef, _registry);
  }
}
